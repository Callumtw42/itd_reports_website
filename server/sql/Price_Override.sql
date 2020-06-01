SELECT date_format(t.TillDate, '%d/%m/%y') as Date,
       t.TillTime                          as Time,
       t.Cashier,
       t.TillNumber                        as Till,
       ti.Description                      as Product,
       ti.Price,
       ti.ItemTotal                        as Sale,
       ti.Quantity                         as Quant,
       ti.IDiscount                        as Dsct,
       ti.Type
FROM TillItem ti
         INNER JOIN Till t ON ti.TillID = t.TillID
Where t.TillDate >= '2020-04-24'
  AND t.TillDate <= '2020-04-25'
  AND t.Reason = 'Sale';