nano /etc/hosts
add site

# Зміст
/var/www/html: Фактичний веб-вміст, який за замовчуванням складається лише зі сторінки Nginx за умовчанням, яку ви бачили раніше, подається з каталогу /var/www/html. Це можна змінити, змінивши конфігураційні файли Nginx.
# Конфігурація сервера
/etc/nginx: каталог конфігурації Nginx. Усі конфігураційні файли Nginx знаходяться тут.
/etc/nginx/nginx.conf: основний файл конфігурації Nginx. Це можна змінити, щоб внести зміни до глобальної конфігурації Nginx.
/etc/nginx/sites-available/: каталог, де можуть зберігатися серверні блоки для кожного сайту. Nginx не використовуватиме файли конфігурації, знайдені в цьому каталозі, якщо вони не пов’язані з sites-enabled каталогом. Як правило, уся конфігурація блоків сервера виконується в цьому каталозі, а потім вмикається за допомогою посилання на інший каталог.

/etc/nginx/sites-enabled/: каталог, де зберігаються ввімкнені серверні блоки сайту. Як правило, вони створюються шляхом посилань на файли конфігурації, знайдені в sites-available каталозі. 
- sudo ln -s ${PWD}/conf/nginx/sites-available/wordpress.conf ${PWD}/conf/nginx/sites-enabled/
# services command
- docker exec -it nginx nginx -s reload
- docker exec -it nginx sh
/etc/nginx/snippets: Цей каталог містить фрагменти конфігурації, які можна включити в інше місце конфігурації Nginx. Потенційно повторювані сегменти конфігурації є хорошими кандидатами для рефакторингу у фрагменти.

# Журнали сервера
/var/log/nginx/access.log: кожен запит до вашого веб-сервера записується в цей файл журналу, якщо Nginx не налаштовано на інше.
/var/log/nginx/error.log: будь-які помилки Nginx будуть записані в цей журнал.

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
-keyout conf/nginx/ssl/private.key \
-out conf/nginx/ssl/certificate.crt \
-subj "/CN=91.211.121.216" \
-addext "subjectAltName=IP:91.211.121.216"