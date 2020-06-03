SELECT p.ProductName, Reason, Date1, Qty, s.SupplierName
FROM retsuppaudit r
         LEFT JOIN Product p ON r.ProdID = p.ProductID
         LEFT JOIN Supplier s ON s.SupplierID = r.SupplierID
WHERE r.Date1 >= '2020-04-25 00:00:00'
  AND r.Date1 <= '2020-04-25 23:59:59';