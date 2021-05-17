select p.ProductId                                as Id,
       p.ProductName                              as Prod,
       IFNULL(UnitQuantity, 0)                    as Qty,
       @cst := IFNULL(p.PackSize / p.PackCost, 0) as Cost,
       trim(leading '0' from WholeSale) + 0       as WhSale,
       trim(leading '0' from Retail) + 0          as Rtl,
       IFNULL(((Retail - @cst) / @cst), 1) * 100  as Profit,
       DATE_FORMAT(s.LastUpdate, '%y/%m/%d')      as Updated
from product p
         left join stockitem s
                   on s.ProdID = p.ProductID
         left join category c on p.CategoryID = c.CategoryID
order by ${orderBy} ${order}

