SELECT ProductID, FullProductName, Barcode, Retail
FROM Product
WHERE Temp = 1
  AND Deleted = 0
ORDER BY FullProductName
limit 500;