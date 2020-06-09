
$obj =  netstat -ano | Select-String ":3000" | ConvertFrom-String -Delimiter " " | Select-Object P39 

Stop-Process -ID $obj.P39 -Force