SELECT c.CustomerID,
       c.CustName,
       c.CustReference,
       c.CreditLimit,
       c.Terms,
       v.InvoiceDate,
       v.Paid,
       v.InvoiceTotal
FROM Customer c
         INNER JOIN Invoice v ON c.CustomerID = v.CustomerID
         INNER JOIN Till t ON t.TillID = v.TillID
Where v.Paid = 0
ORDER BY c.CustName;