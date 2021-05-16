SELECT SaleID,
       Date1,
       Qty,
       ItemTotal,
       TillNumber,
       Cashier,
       Comment
FROM VoidSalesLog
WHERE Date1 >= '2020-04-25 00:00:00'
  AND Date1 <= '2020-04-25 23:59:59'
ORDER BY tillnumber, SaleID;