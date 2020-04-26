SELECT  ti.Description as Product,
       Reason,
       Amount,
       Date,
       Method,
       RefundCashier as Casher
FROM RefundItem r
         LEFT JOIN TillItem ti ON ti.TillItemID = r.TillItemID
WHERE r.Type = 'RT'
  AND r.RefundDate >= IFNULL(@startDate, '2020-03-01')
  AND r.RefundDate <= IFNULL(@endDate, '2020-04-25')
