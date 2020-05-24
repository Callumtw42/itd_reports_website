select p.ProductId                                as Id,
       p.ProductName                              as Prod,
       IFNULL(UnitQuantity, 0)                    as Qty,
       @cst := IFNULL(p.PackSize / p.PackCost, 0) as Cost,
       WholeSale                                  as WhSale,
       Retail                                     as Rtl,
       IFNULL(((Retail - @cst) / @cst), 1) * 100  as Profit,
       DATE_FORMAT(s.LastUpdate, '%y/%m/%d')      as Updated
from product p
         left join stockitem s on s.ProdID = p.ProductID
         left join category c on p.CategoryID = c.CategoryID
order by ProductID asc;


