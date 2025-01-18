Давайте створимо сертифікати покроково:

Спочатку створіть директорії (запустіть з правами root або sudo):

bashCopysudo mkdir -p conf/nginx/ssl
sudo chmod 755 conf/nginx/ssl

Перейдіть у директорію:

bashCopycd conf/nginx/ssl

Згенеруйте сертифікати:

bashCopysudo openssl genrsa -out private.key 2048
sudo openssl req -new -x509 -key private.key -out certificate.crt -days 365 \
-subj "/CN=91.211.121.216" \
-addext "subjectAltName=IP:91.211.121.216"

Встановіть правильні права:

bashCopysudo chmod 644 certificate.crt
sudo chmod 600 private.key

Перевірте що файли створені:

bashCopyls -la


# Встановлення certbot
sudo apt install certbot python3-certbot-nginx

Для Let's Encrypt сертифіката для домену storage.jdymora.com процес має бути таким:

Спочатку переконайтесь що DNS A-запис вказує на ваш IP:

dig storage.jdymora.com

Встановіть certbot якщо ще не встановлений:

bashCopysudo apt update
sudo apt install certbot

Зупиніть nginx перед отриманням сертифіката:

bashCopysudo systemctl stop nginx

# або якщо в докері
docker-compose stop nginx

Запустіть команду:
## повинен бути доступ зовні на 80 порту
sudo certbot certonly --standalone -d storage.jdymora.com
Після успішного виконання сертифікати будуть збережені в:

/etc/letsencrypt/live/storage.jdymora.com/fullchain.pem
/etc/letsencrypt/live/storage.jdymora.com/privkey.pem


Потім ці сертифікати потрібно вказати в конфігурації nginx:

ssl_certificate /etc/letsencrypt/live/storage.jdymora.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/storage.jdymora.com/privkey.pem;
