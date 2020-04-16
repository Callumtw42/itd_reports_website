SELECT p.ProductID,c.Description, p.FullProductName,p.WholeSale, p.Retail 
FROM Product p LEFT JOIN Category c ON p.CategoryID = c.CategoryID 
WHERE p.Deleted=0 ORDER BY p.ProductID ASC;