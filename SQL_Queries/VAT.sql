use itdepos;

SELECT *
    FROM TillItem ti INNER JOIN Till t ON ti.TillId = t.TillID LEFT JOIN RefundItem ri ON ri.RefundID = ti.RefundID 
    WHERE t.TillDate >= '20-04-01' AND t.TillDate <= '20-04-14' AND t.Reason = 'Sale' ORDER BY ti.TillID;