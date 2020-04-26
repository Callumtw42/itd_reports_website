SELECT p.FullProductName                                as Product,
       DATE_FORMAT(TransactionDate, '%y/%m/%d - %H:%i') as Date,
       InputAmount                                      as Adjustment,
       UnitQuantity                                     as NewTotal,
       li.ListItemName                                  as Reason,
       u.Username                                       as User

FROM StockItem si
         INNER JOIN Product p ON si.ProdID = p.ProductID
         LEFT JOIN ListItem li ON si.AdjustReasonID = li.ListItemID
         LEFT JOIN User u ON si.UserID = u.UserID
WHERE TransactionDate >= IFNULL(@startDate, '2020-04-23')
  AND TransactionDate <= IFNULL(@endDate, '2020-04-23')
ORDER BY si.TransactionDate
LIMIT 500;