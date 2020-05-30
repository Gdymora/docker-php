phpmyadmin
http://local:8090/
http://localhost:8090/

Laravel

Устанавливаем права доступа на каталоги, для которых необходимы права на запись:

sudo chgrp -R www-data storage bootstrap/cache; sudo chmod -R ug+rwx storage bootstrap/cache
