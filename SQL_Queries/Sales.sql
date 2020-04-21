SELECT TillID                            as Receipt,
       ProdName                          as Product,
       ProdId                            as Id,
       Cat,
       Description                       as Category,
       Quantity                          as Qty,
       (PackCost / PackSize) * Quantity  as Cost,
       ItemTotal                         as Sales,
       IFNULL(Amount, 0)                 as Refund,
       DATE_FORMAT(TillDate, '%y-%m-%d') as TillDate,
       TIME_FORMAT(TillTime, '%H:%m')    as TillHour,
       Discount,
       DsctReason,
       TillTime,
       Cashier,
       ASCII(Cashier) * LENGTH(Cashier)  as CashierNum,
       AssocProdID
FROM (
          (SELECT Description, CategoryID as Cat FROM Category) as a
         JOIN
     (SELECT ti.TillItemID,
             t.TillID,
             t.TillDate,
             t.TillTime,
             t.PriceBand,
             t.Cash,
             t.Cashier,
             ROUND((t.Discount / (t.Cash + t.Discount) * ti.ItemTotal), 2) AS Discount,
             t.DiscountReason                                              AS DsctReason,
             c.CategoryID,
             ti.ProdID,
             ti.Barcode                                                    AS ItemID,
             ti.PLU,
             ti.Price,
             ti.ItemTotal,
             ti.Quantity,
             ti.VATRate,
             ti.SaleByWeight                                               AS SoldByWeight,
             ti.IDiscount,
             ti.RefundID,
             p.BarCode,
             p.PackBarcode,
             p.PackPLU,
             p.PackSize,
             p.PackCost,
             p.Wholesale,
             p.PackSalePrice,
             p.Retail,
             p.RetailAWt,
             p.PackSalePriceB,
             p.RetailB,
             p.RetailBWt,
             p.SaleByWeight,
             p.UnitKg,
             ti.Type                                                       AS ItemType,
             ti.SPOffer,
             ti.SPOfferText,
             ti.SPGroupID,
             ti.Description                                                as ProdName,
             ri.Amount,
             ri.RefundDate
      FROM TillItem ti
               INNER JOIN Till t ON ti.TillID = t.TillID
               LEFT JOIN Product p ON ti.ProdID = p.ProductID
               LEFT JOIN Category c ON p.CategoryID = c.CategoryID
               LEFT JOIN RefundItem ri ON ti.RefundID = ri.RefundID
      WHERE t.TillDate >= IFNULL(@startDate, '2020-04-20')
        AND t.TillDate <= IFNULL(@endDate, '2020-04-20')
      ORDER BY t.TillID, ti.TillItemID) as b
     ON b.CategoryID = a.Cat
         LEFT JOIN pricemark pm ON pm.AssocProdID = ProdID
    );