select id, name
from user
where name = IFNULL(@name, 'demo')
  and password = IFNULL(@password, 'demo');