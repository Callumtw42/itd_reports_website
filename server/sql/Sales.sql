SELECT
       Description                                                                          as Category,
       ProdName                                                                             as Product,
       if(ISNULL(AssocProdID), 'Non-PM', 'PM')                                               as PriceMark,
       TillID                                                                               as Receipt,
       ProdId                                                                               as Id,
       Cat,
       Quantity                                                                             as Qty,
       ItemTotal                                                                            as Sales,
       IFNULL(PackCost / PackSize, 0) * Quantity                                            as Cost,
       IFNULL(Amount, 0)                                                                    as Refund,
       Discount,
       ItemTotal - IFNULL(PackCost / PackSize, 0) * Quantity - IFNULL(Amount, 0) - Discount as Profit,
       DATE_FORMAT(TillDate, '%y/%m/%d')                                                    as TillDate,
       TIME_FORMAT(TillTime, '%H:%m')                                                       as TillHour,
       DsctReason,
       TillTime,
       Cashier,
       ASCII(Cashier) * LENGTH(Cashier)                                                     as CashierNum,
       Card,
       Voucher,
       Cash
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
             t.Voucher,
             t.Credit                                                      as Card,
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
      WHERE t.TillDate >= IFNULL(@startDate, '2020-05-20')
        AND t.TillDate <= IFNULL(@endDate, '2020-05-20')
      ORDER BY t.TillID, ti.TillItemID) as b
     ON b.CategoryID = a.Cat
         LEFT JOIN pricemark pm ON pm.AssocProdID = ProdID
    )
order by Sales desc;