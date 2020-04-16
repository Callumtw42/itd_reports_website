use itdepos;

SELECT * FROM pricemark pm JOIN tillitem ti on pm.AssocProdID = ti.ProdID where ti.Date >= '2020-04-08' AND ti.Date <= '2020-04-08';