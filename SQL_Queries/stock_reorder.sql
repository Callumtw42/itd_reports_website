use itdepos;                                                                                                                                                                                                                                                                                                                                                                        ;

SELECT ValueLng FROM SetupOptions WHERE Name="ReOrderLvlRpt";
SELECT * FROM supplier ORDER BY SupplierName;

SELECT COUNT(p.ProductID)AS SK FROM Stock sk  INNER JOIN Product p ON sk.ProductID = p.ProductID LEFT JOIN Supplier sp ON sp.SupplierID =p.PreferredSuppID WHERE p.Deleted=0;

SELECT  p.ProductID,sk.ReorderLevel,sk.ReorderAmt, p.FullProductName,p.PackSize,p.PackCost,p.WholeSale,sp.SupplierID,sp.SupplierName FROM Stock sk  INNER JOIN Product p ON sk.ProductID = p.ProductID LEFT JOIN Supplier sp ON sp.SupplierID =p.PreferredSuppID WHERE p.Deleted=0 ORDER BY p.PreferredSuppID,p.categoryID,FullProductName;

#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=4;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=6;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=7;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=11;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=12;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=13;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=9;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=10;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=26265;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=24724;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=21064;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18070;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18046;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18045;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18044;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18069;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=4821;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=4819;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=332;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=329;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=330;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=331;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=333;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=334;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18071;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5008;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5010;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18186;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5015;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5011;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18177;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=7912;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=7918;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=7830;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=7929;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=7937;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18195;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18198;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=6014;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=36240;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18257;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18201;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18205;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18207;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18262;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18256;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18218;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18261;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18204;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18220;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18202;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=4280;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5442;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18267;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18278;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18315;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18312;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18325;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18328;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18327;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18349;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18288;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=219;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18673;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18674;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18639;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=12667;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=212;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=210;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18719;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=213;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18676;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18627;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18625;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=215;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18544;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18563;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18566;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18576;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18577;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=17585;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18480;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18525;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18502;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18547;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18745;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=227;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=228;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18746;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=233;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18763;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18764;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=235;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=2058;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=2064;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=7346;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18735;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18846;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18844;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5699;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5708;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18830;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5704;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=10039;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=10040;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18826;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=9665;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18915;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19962;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19958;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19955;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19956;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19959;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19961;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18883;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18881;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18876;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18947;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18888;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19943;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18982;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19971;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18962;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18889;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=2069;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=2078;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=2071;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18935;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5691;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18904;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5706;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5690;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=18958;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19047;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19010;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19008;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19007;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19096;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=687;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=682;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=686;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19019;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5353;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5352;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19094;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5367;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5357;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19001;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19155;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19145;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19156;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19143;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19147;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19149;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19146;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19144;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19153;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=32153;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=21375;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=32067;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=28706;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=25941;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=32705;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=25950;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=31254;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19422;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=21930;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=25238;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=29923;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=33965;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=32264;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=32279;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=21825;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=21826;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=21889;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=32240;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19673;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19648;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19679;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19610;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19520;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20438;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20415;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20354;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20273;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20277;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20274;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20282;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19732;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=103;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=10759;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=271;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=277;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=459;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=270;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19859;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=9367;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19934;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20174;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20165;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20164;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=989;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=1724;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20183;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20172;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20127;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20126;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20141;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20180;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20157;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20166;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20170;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20162;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=1729;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20159;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5757;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20041;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20251;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=36305;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20307;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=7886;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=7887;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20337;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20321;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20320;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20327;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20346;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20338;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20324;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20329;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20335;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20330;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20328;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20343;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20332;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=33315;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20628;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20446;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20424;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20423;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20427;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20428;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20615;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20611;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20619;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20580;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20613;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19014;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19020;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=19100;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20493;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20479;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20492;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20520;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20530;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20528;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20517;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=5372;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20462;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20466;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20529;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20527;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20465;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20467;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20521;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20496;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=37784;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=36322;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=31251;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=31255;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=31257;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=31173;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=31190;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=31172;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=31188;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=31262;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=31265;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=31277;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=36307;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=35884;
#
# SELECT sum(si.UnitQuantity) as Stock FROM Product p INNER JOIN StockItem si ON p.ProductID = si.ProdID WHERE p.ProductID=20439;

