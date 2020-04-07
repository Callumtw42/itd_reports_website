SELECT ti.*,p.ProductName,ri.ReturnID,ri.RefundDate,ri.Amount FROM TillItem ti INNER JOIN Till t ON ti.TillId = t.TillID LEFT JOIN Product p ON ti.ProdID = p.ProductID LEFT JOIN RefundItem ri ON ti.RefundID = ri.RefundID Where t.TillDate >= '2020-04-05' AND t.TillDate <= '2020-04-05' AND t.Reason = 'Sale';