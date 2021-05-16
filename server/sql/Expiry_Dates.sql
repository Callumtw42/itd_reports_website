SELECT ProductName                     as Product,
       trim(leading 0 from Retail) + 0 as Retail,
       InputAmount                     as Amount,
       DATE_FORMAT(Expiry, '%y/%m/%d') as Expiry
FROM itdepos.stockitem t
         left JOIN product p on t.ProdID = p.ProductID
WHERE Expiry >= IFNULL(@startDate, '2020-04-24')
  AND Expiry <= IFNULL(@endDate, '2020-05-24')
ORDER BY Expiry DESC;