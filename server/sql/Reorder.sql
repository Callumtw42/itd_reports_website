SELECT p.FullProductName                           as Name,
       IFNULL(sk.UnitsInStock, 0)                  as Quantity,
       TRIM(LEADING '0' from sk.ReorderLevel)      as Level,
       sk.ReorderAmt                               as Amount,
       p.PackSize                                  as PkSize,
       p.PackCost                                  as PkCost,
       @cost := IFNULL(p.PackSize / p.PackCost, 0) as UtCost,
       @cost * sk.ReorderAmt                       as Total,
       p.ProductID                                 as Id,
       sp.SupplierName                             as Supplier
FROM Stock sk
         INNER JOIN Product p ON sk.ProductID = p.ProductID
         LEFT JOIN Supplier sp ON sp.SupplierID = p.PreferredSuppID
WHERE p.Deleted = 0 && ReorderAmt > 0
ORDER BY p.PreferredSuppID, p.categoryID, FullProductName;