use itdepos;

SELECT t.* FROM Till t WHERE t.TillDate >= '2020-04-18' AND t.TillDate <= '2020-04-18' AND t.Reason = 'Sale';