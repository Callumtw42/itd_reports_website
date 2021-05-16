SELECT ti.TillID                                                                                                      as Receipt_No,
       DATE_FORMAT(ti.date, '%y/%m/%d')                                                                               as date,
       (ti.ItemTotal - IFNULL(ri.Amount, 0))                                                                          as Total_Sales,
       ti.Quantity,
       ti.Price,
       ti.VatRate,
       ti.Type,
       ti.IDiscount,
       t.Discount,
       t.PriceBand,
       ri.RefundID,
       ri.RefundDate,
       ri.Amount,
       ((ti.ItemTotal - IFNULL(ri.Amount, 0)) -
        ((ti.ItemTotal - IFNULL(ri.Amount, 0)) / (1 + (ti.VatRate / 100))))                                           as Total_VAT,
       ((ti.ItemTotal - IFNULL(ri.Amount, 0)) - ((ti.ItemTotal - IFNULL(ri.Amount, 0)) -
                                                 ((ti.ItemTotal - IFNULL(ri.Amount, 0)) / (1 + (ti.VatRate / 100))))) as Nett
FROM TillItem ti
         INNER JOIN Till t ON ti.TillId = t.TillID
         LEFT JOIN RefundItem ri ON ri.RefundID = ti.RefundID
WHERE t.TillDate >= IFNULL(@startDate, '2020-04-20')
  AND t.TillDate <= IFNULL(@endDate, '2020-04-20')
  AND t.Reason = 'Sale'
ORDER BY ti.TillID;


