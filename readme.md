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

Команды

пересобрать контейнер docker-compose build

запустить как демона docker-compose up -d
остановить docker-compose down

phpmyadmin
http://local:8090/
http://localhost:8090/

Laravel

Устанавливаем права доступа на каталоги, для которых необходимы права на запись:

sudo chgrp -R www-data storage bootstrap/cache; sudo chmod -R ug+rwx storage bootstrap/cache
после

php artisan route:clear

php artisan config:clear

php artisan cache:clear


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
# artisan
docker exec -it php8 bash
cd example-1/
php artisan serve --host=0.0.0.0 --port=8000
После создания artisan 
нужно добавить прав для каталога что б можно исполнять chmod +x 
и для файлов
-rw-rw-r-- выглядят как 664
sudo chown ${USER}:${USER}


