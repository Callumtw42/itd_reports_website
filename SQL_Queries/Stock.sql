select p.ProductId,
       p.ProductName                                 as Product,
       Description                                   as Category,
       IFNULL(UnitQuantity, 0)                       as Quantity,
       @cst := IFNULL(p.PackSize / p.PackCost, 0)    as Cost,
       TRIM(LEADING '0' from WholeSale)              as WhSale,
       TRIM(LEADING '0' from Retail)                 as Retail,
       IFNULL(((Retail - @cst) / @cst), 1) * 100     as Profit,
       DATE_FORMAT(s.LastUpdate, '%y/%m/%d - %H:%i') as Updated
from product p
         left join stockitem s on s.ProdID = p.ProductID
         left join category c on p.CategoryID = c.CategoryID
order by ProductID asc
limit 500;


