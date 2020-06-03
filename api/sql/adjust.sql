SELECT p.FullProductName                                as Product,
       p.ProductID                                      as Id,
       DATE_FORMAT(TransactionDate, '%y/%m/%d - %H:%i') as Date,
       InputAmount                                      as Adjustment,
       UnitQuantity                                     as NewTotal,
       li.ListItemName                                  as Reason,
       u.Username                                       as User

FROM StockItem si
         INNER JOIN Product p ON si.ProdID = p.ProductID
         LEFT JOIN ListItem li ON si.AdjustReasonID = li.ListItemID
         LEFT JOIN User u ON si.UserID = u.UserID
WHERE TransactionDate >= ${startDate}
  AND TransactionDate <= ${endDate}
ORDER BY ${orderBy} ${order}
limit ${offset},${bufferSize};
