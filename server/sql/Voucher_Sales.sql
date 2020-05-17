SELECT t.TillDate, t.TillTime, t.Cashier, t.TillID, vi.*
FROM VoucherItem vi
         INNER JOIN Till t ON vi.TillID = t.TillID
Where t.TillDate >= IFNULL(@startDate, '2020-04-24')
  AND t.TillDate <= IFNULL(@endDate, '2020-04-24')
  AND t.Reason = 'Sale'
ORDER BY t.TillID DESC;