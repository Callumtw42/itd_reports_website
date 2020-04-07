use itdepos;
         SELECT * FROM(
         (SELECT Description as d1, CategoryID FROM Category) as a
          JOIN
		  (SELECT ti.TillItemID,t.TillID, t.TillDate,t.TillTime,t.PriceBand,c.CategoryID,ti.ProdID,ti.Barcode AS ItemID,ti.PLU,ti.Price,ti.ItemTotal,ti.Quantity,ti.VATRate,ti.SaleByWeight AS SoldByWeight,ti.IDiscount,ti.RefundID,p.BarCode,p.PackBarcode,p.PackPLU,p.PackSize,p.PackCost,p.Wholesale,p.PackSalePrice,p.Retail,p.RetailAWt,p.PackSalePriceB,p.RetailB,p.RetailBWt,p.SaleByWeight,p.UnitKg,ti.Type AS ItemType,ti.SPOffer,ti.SPOfferText,ti.SPGroupID,ti.Description as d2, ri.Amount,ri.RefundDate FROM TillItem ti INNER JOIN Till t ON ti.TillID = t.TillID LEFT JOIN Product p ON ti.ProdID = p.ProductID LEFT JOIN Category c ON p.CategoryID = c.CategoryID LEFT JOIN RefundItem ri ON ti.RefundID = ri.RefundID WHERE t.TillDate >= '2020-04-07' AND t.TillDate <= '2020-04-07' ORDER BY t.TillID,ti.TillItemID) as b
          ON b.CategoryID = a.CategoryID
          );
          
		  SELECT Description as Department, SUM(Quantity) as Qty, SUM((PackCost / PackSize)) as Cost, SUM(Price * Quantity) as Sales, Amount as Refund  FROM(
         (SELECT Description, CategoryID FROM Category) as a
          JOIN
		  (SELECT ti.TillItemID,t.TillID, t.TillDate,t.TillTime,t.PriceBand,c.CategoryID,ti.ProdID,ti.Barcode AS ItemID,ti.PLU,ti.Price,ti.ItemTotal,ti.Quantity,ti.VATRate,ti.SaleByWeight AS SoldByWeight,ti.IDiscount,ti.RefundID,p.BarCode,p.PackBarcode,p.PackPLU,p.PackSize,p.PackCost,p.Wholesale,p.PackSalePrice,p.Retail,p.RetailAWt,p.PackSalePriceB,p.RetailB,p.RetailBWt,p.SaleByWeight,p.UnitKg,ti.Type AS ItemType,ti.SPOffer,ti.SPOfferText,ti.SPGroupID,ti.Description as ProdName,ri.Amount,ri.RefundDate FROM TillItem ti INNER JOIN Till t ON ti.TillID = t.TillID LEFT JOIN Product p ON ti.ProdID = p.ProductID LEFT JOIN Category c ON p.CategoryID = c.CategoryID LEFT JOIN RefundItem ri ON ti.RefundID = ri.RefundID WHERE t.TillDate >= '2020-03-19' AND t.TillDate <= '2020-03-19' ORDER BY t.TillID,ti.TillItemID) as b
          ON b.CategoryID = a.CategoryID
          ) Group by Department;

		