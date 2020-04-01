use itdepos;

SELECT ProdID, ProductName, Description, UnitQuantity, stockitem.LastUpdate FROM itdepos.stockitem JOIN product ON stockitem.ProdID = product.ProductID JOIN category ON product.CategoryID = category.CategoryID;


SELECT * FROM itdepos.stockitem JOIN product ON stockitem.ProdID = product.ProductID JOIN category ON product.CategoryID = category.CategoryID;