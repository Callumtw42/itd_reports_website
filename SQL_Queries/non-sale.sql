use itdepos;

SELECT p.ProductID, c.Description, p.FullProductName, p.WholeSale, p.Retail
FROM Product p
         LEFT JOIN Category c ON p.CategoryID = c.CategoryID
WHERE p.Deleted = 0
ORDER BY p.ProductID ASC;

SELECT SUM(s.UnitQuantity) as UnitsInStock
FROM StockItem s
WHERE s.ProdID = 4;

SELECT ti.ProdID
FROM TillItem ti
         INNER JOIN Till t ON t.TillID = ti.TillID
WHERE t.TillDate >= '2020-04-20'
  AND t.TillDate <= '2020-04-20';