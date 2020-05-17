SELECT DATE_FORMAT(w.Date1, '%y/%m/%d - %H:%i') as TillDate,
       w.Reason,
       Qty,
       ProductName                              as Product,
       TillNumber                               as Till
FROM wastageaudit w
         LEFT JOIN Product p ON w.ProdID = p.ProductID
WHERE w.Date1 >= IFNULL(@startDate, '2020-04-23')
  AND w.Date1 <= IFNULL(@endDate, '2020-04-25');