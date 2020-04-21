
select p.ProductId,
       p.ProductName,
       Description                                   as Category,
       UnitQuantity,
       DATE_FORMAT(s.LastUpdate, '%y/%m/%d - %H:%i') as LastUpdate
from stockitem s
         join product p on s.ProdID = p.ProductID
         left join category c on p.CategoryID = c.CategoryID;


