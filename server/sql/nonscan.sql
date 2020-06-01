SELECT ProductID                   as Id,
       FullProductName,
       Barcode,
       trim(leading 0 from Retail)+0 as Retail
FROM Product
WHERE Temp = 1
  AND Deleted = 0
ORDER BY ${orderBy} ${order}
limit ${offset}, ${bufferSize}
;