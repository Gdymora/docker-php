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
docker exec -it php3 bash
docker exec -it php83 bash

використовувати наступні псевдоніми, щоб не заходити щоразу в контейнер:

alias phpunit="docker-compose exec app vendor/bin/phpunit"
alias artisan="docker-compose exec app php artisan"
alias composer="docker-compose exec php composer"

або команди
docker exec -it php83 bash
composer команда
npm command
npm install moment
# artisan
docker exec -it php83 bash
cd example-1/
php artisan serve --host=0.0.0.0 --port=8000
После создания artisan 
нужно добавить прав для каталога что б можно исполнять chmod +x 
и для файлов
-rw-rw-r-- выглядят как 664
sudo chown ${USER}:${USER}

# docker php
- Якщо потрібно перевірити всі встановлені розширення:
docker exec -it php83 php -m
- Також можна перевірити конфігурацію GD:
docker exec -it php83 php -i | grep -i gd
- Перевірте статус розширень:
docker exec -it php83 php -m
- Перевірити статус PHP-FPM:
docker exec -it php83 php-fpm -t
- перевірка версії PHP та встановлених розширень:
docker exec -it php83 php -v
docker exec -it php83 php -i
# Перевірка конфігурації Xdebug
docker exec -it php83 php -i | grep xdebug

Якщо ви все ще бачите помилки, можна додатково:
- Перевірити наявність конфліктів у директорії з розширеннями:
docker-compose exec php-83 ls -la /usr/local/lib/php/extensions/no-debug-non-zts-20230831/
- Подивитися логи PHP:
docker exec -it php-8 logs

# docker mysql
# Перевірка часової зони MySQL
docker exec -it mysql_container mysql -u root -p${MYSQL_ROOT_PASSWORD} -e "SELECT @@global.time_zone, @@session.time_zone;"

# Перевірка поточного часу в MySQL
docker exec -it mysql_container mysql -u root -p${MYSQL_ROOT_PASSWORD} -e "SELECT NOW();"

# docker:
- Зупиніть всі контейнери:
docker-compose down

- Видаліть старі образи:
docker rmi $(docker images -q)
# Видалити всі образи примусово
docker rmi -f $(docker images -q)
- Очистіть кеш:
docker builder prune -f

- Перезберіть і запустіть:
docker-compose up -d --build

docker-compose logs php-83

## Зупинити всі запущені контейнери:
   docker stop $(docker ps -a -q)
- Видалити всі контейнери:
   docker rm $(docker ps -a -q)
- Видалити всі образи:
    docker rmi $(docker images -q)
- Видалити всі volumes:
    docker volume rm $(docker volume ls -q)
- Видалити всі невикористані networks:
    docker network prune -f

### Очистити Docker систему (невикористані образи, контейнери, volumes і networks):
docker system prune -a --volumes

Після цього можна перевірити, що все дійсно зупинено і видалено:
# Перевірка контейнерів
docker ps -a

# Перевірка образів
docker images

# Перевірка volumes
docker volume ls

# Перевірка networks
docker network ls
Якщо ви використовуєте docker-compose, можна також використати:
docker-compose down --rmi all --volumes --remove-orphans

# Відкриваємо редактор cron
crontab -e

# Додаємо рядок для щоденного бекапу о 2 годині ночі
0 2 * * * /path/to/backup.sh

# Зупиняємо контейнери
docker-compose -f docker-compose-php83.yml down

# Видаляємо дані MySQL
sudo rm -rf docker/mysql/data/*

# Перезапускаємо
docker-compose -f docker-compose-php83.yml up -d 
