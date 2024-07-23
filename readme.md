Установка

Установка compose
sudo snap install docker          # version 18.06.1-ce, or
sudo apt  install docker-compose  # version 1.25.0-1

Добавить пользователя в группу
sudo usermod -aG docker ${USER}

Запускать: service start docker

запускать из каталога где находится docker-compose.yml
перед запуском остановить nginx mysql:

sudo service mysql stop
sudo service nginx stop
# зупинити dockerdocker ps -a
docker stop $(docker ps -q)
# якщо зайнятий порт подивитись
sudo lsof -i -P -n | grep 8090

Команды

пересобрать контейнер docker-compose build

запустить как демона docker-compose up -d
остановить docker-compose down

phpmyadmin
http://local:8090/
http://localhost:8090/

Laravel
# storagesudo 

chown -R www-data:www-data storage
chown -R www-data:www-data bootstrap
sudo chmod -R 755 storage
Устанавливаем права доступа на каталоги, для которых необходимы права на запись:

sudo chgrp -R www-data storage bootstrap/cache; sudo chmod -R ug+rwx storage bootstrap/cache
после
docker exec -it php8 bash

php artisan config:clear
php artisan route:clear
php artisan cache:clear

Якщо dataкаталог не існує під ( storage/framework/cache/data), то ви отримаєте цю помилку:
ERROR  Failed to clear cache. Make sure you have the appropriate permissions. 
Цей dataкаталог не існує за замовчуванням під час нової інсталяції.
Створення dataкаталогу вручну за адресою (storage/framework/cache) має вирішити цю проблему.

#
sudo ln -s /conf/nginx/sites-available/your_domain /conf/nginx/sites-enabled/

Примітка: Nginx використовує загальну практику під назвою символічні посилання, 
або символічні посилання, щоб відстежувати, які блоки вашого сервера ввімкнено.
 Створення символічного посилання подібне до створення ярлика на диску, щоб пізніше 
ви могли видалити ярлик із каталогу, 
sites-enabled зберігаючи блок сервера, sites-available якщо хочете його ввімкнути.

# 
Bash into your container:
composer create-project laravel/laravel lara10-1
sudo chown -R ${USER}:${USER} lara10-1/
docker exec -it php bash
docker exec -it php8 bash

використовувати наступні псевдоніми, щоб не заходити щоразу в контейнер:

alias phpunit="docker-compose exec app vendor/bin/phpunit"
alias artisan="docker-compose exec app php artisan"
alias composer="docker-compose exec php composer"

або команди
docker exec -it php8 bash
composer команда
npm command
npm install moment
# artisan
docker exec -it php8 bash
cd example-1/
php artisan serve --host=0.0.0.0 --port=8000
После создания artisan 
нужно добавить прав для каталога что б можно исполнять chmod +x 
и для файлов
-rw-rw-r-- выглядят как 664
sudo chown ${USER}:${USER}


