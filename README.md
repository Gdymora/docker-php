user: wordpress.loc
pass: http://wordpress.loc/

# set permission

cd www/wordpress.loc/
chmod 700 -R wp-content

# conteiner menedgment
```Bash
npm run start
```
open localhost:3000

# найкраще рішення це:

Повернутися до останньої робочої версії
Вносити мінімальні необхідні зміни
Не ускладнювати те, що вже працює

# Налаштування Nginx щоб уникнути CORS error
1. Зайдіть в контейнер:
```Bash
docker exec -it nginx bash
```
2. Встановіть правильні права:
```Bash 
# Специфічні права для директорій, які потребують запису
sudo chown -R www-data:www-data filestorage/src/storage
sudo chown -R www-data:www-data filestorage/src/bootstrap/cache
sudo chown -R ${USER}:${USER} storage/app/telegram/sessions

Встановимо правильні дозволи:

# Для директорій
sudo find filestorage -type d -exec chmod 775 {} \;
# Для файлів
sudo find filestorage -type f -exec chmod 664 {} \;

Додайте вашого користувача до групи www-data:

sudo usermod -a -G www-data $USER
sudo chmod -R 777 filestorage/src/storage
sudo chmod -R 777 filestorage/src/public
sudo chmod -R 777 storage/app/telegram/sessions
```
