SELECT u.Username,
       u.EmployeeNo,
       u.PayRate,
       DATE_FORMAT(TimeIn, '%d/%m/%y - %H:%i')  as TimeIn,
       DATE_FORMAT(TimeOut, '%d/%m/%y - %H:%i') as TimeOut,
       @hours := timediff(TimeOut, TimeIn)      as Hours
FROM StaffClock sc
         INNER JOIN User u ON u.UserID = sc.USerID
WHERE (sc.TimeIn >= IFNULL(@startDate, '2020-04-01') AND sc.TimeOut <= IFNULL(@endDate, '2020-04-25'))
  AND Void = 0
  AND NOT TimeOut IS NULL
ORDER BY u.Username;