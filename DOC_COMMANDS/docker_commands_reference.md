# Довідник команд для Docker контейнерів

## Основні команди управління

### Запуск та зупинка
```bash
# Запустити всі сервіси
docker-compose -f docker-compose-php83.yml up -d

# Зупинити всі сервіси
docker-compose -f docker-compose-php83.yml down

# Перезапустити всі сервіси
docker-compose -f docker-compose-php83.yml restart

# Перезапустити конкретний контейнер
docker-compose -f docker-compose-php83.yml restart php83
docker-compose -f docker-compose-php83.yml restart nginx
docker-compose -f docker-compose-php83.yml restart laravel-cron
docker-compose -f docker-compose-php83.yml restart ai-queue-worker
```

### Перевірка статусу
```bash
# Статус всіх контейнерів
docker-compose -f docker-compose-php83.yml ps

# Детальна інформація про контейнери
docker ps -a

# Використання ресурсів
docker stats
```

## Логи та моніторинг

### Перегляд логів
```bash
# Логи конкретного контейнера
docker logs php83
docker logs nginx
docker logs laravel-cron
docker logs ai-queue-worker
docker logs mysql_container

# Останні 20 рядків логів
docker logs php83 --tail 20

# Логи в реальному часі
docker logs php83 -f

# Логи з часовими мітками
docker logs php83 -t
```

### Логи Laravel додатку
```bash
# Laravel логи
docker exec -it php83 tail -f /var/www/telegram-api/src/storage/logs/laravel.log

# MadelineProto логи
docker exec -it php83 tail -f /var/www/telegram-api/src/storage/logs/madeline-$(date +%Y-%m-%d).log

# Cron логи
docker exec -it laravel-cron tail -f /var/www/telegram-api/src/storage/logs/cron.log

# AI worker логи
docker exec -it php83 tail -f /var/www/telegram-api/src/storage/logs/ai-health.log
```

## Робота з контейнерами

### Вхід у контейнер
```bash
# Вхід у PHP контейнер
docker exec -it php83 bash

# Вхід у MySQL контейнер
docker exec -it mysql_container bash

# Вхід у Nginx контейнер
docker exec -it nginx bash

# Вхід у Redis контейнер
docker exec -it redis_container bash
```

### Виконання команд
```bash
# Laravel Artisan команди
docker exec -it php83 /usr/local/bin/php /var/www/telegram-api/src/artisan --version
docker exec -it php83 /usr/local/bin/php /var/www/telegram-api/src/artisan migrate:status
docker exec -it php83 /usr/local/bin/php /var/www/telegram-api/src/artisan queue:work --once

# Composer команди
docker exec -it php83 composer --version
docker exec -it php83 composer install --working-dir=/var/www/telegram-api/src

# Перевірка користувача
docker exec -it php83 whoami
docker exec -it php83 id
```

## Управління файлами та правами

### Перевірка прав доступу
```bash
# Права на storage
docker exec -it php83 ls -la /var/www/telegram-api/src/storage/
docker exec -it php83 ls -la /var/www/telegram-api/src/storage/logs/

# На хості
ls -la ./www/telegram-api/src/storage/logs/
```

### Виправлення прав
```bash
# На хості - повні права на storage
sudo chmod -R 777 ./www/telegram-api/src/storage/

# Встановити власника
sudo chown -R 33:33 ./www/telegram-api/src/storage/

# Створити файл логу якщо не існує
sudo touch ./www/telegram-api/src/storage/logs/madeline-$(date +%Y-%m-%d).log
sudo chmod 666 ./www/telegram-api/src/storage/logs/madeline-$(date +%Y-%m-%d).log
```

## База даних MySQL

### Підключення
```bash
# Підключення до MySQL
docker exec -it mysql_container mysql -u root -p

# Підключення з конкретною базою
docker exec -it mysql_container mysql -u root -p file_storage
```

### Бекап та відновлення
```bash
# Створити бекап
docker exec mysql_container mysqldump -u root -p file_storage > backup_$(date +%Y%m%d).sql

# Відновити з бекапу
docker exec -i mysql_container mysql -u root -p file_storage < backup.sql
```

## Очищення та обслуговування

### Очищення Docker
```bash
# Видалити зупинені контейнери
docker container prune

# Видалити невикористовувані образи
docker image prune

# Видалити все невикористовуване
docker system prune

# Видалити volumes (ОБЕРЕЖНО!)
docker volume prune
```

### Очищення логів Laravel
```bash
# Очистити Laravel логи
docker exec -it php83 truncate -s 0 /var/www/telegram-api/src/storage/logs/laravel.log

# Видалити старі MadelineProto логи (старше 7 днів)
docker exec -it php83 find /var/www/telegram-api/src/storage/logs/ -name "madeline-*.log" -mtime +7 -delete
```

## Налагодження проблем

### Перевірка мережі
```bash
# Перевірити мережеві з'єднання між контейнерами
docker exec -it php83 ping mysql
docker exec -it php83 ping redis_container

# Перевірити порти
docker exec -it php83 nc -zv mysql 3306
docker exec -it php83 nc -zv redis_container 6379
```

### Перевірка сервісів
```bash
# Перевірити статус PHP-FPM
docker exec -it php83 ps aux | grep php

# Перевірити Nginx конфігурацію
docker exec -it nginx nginx -t

# Перевірити crontab
docker exec -it laravel-cron crontab -l

# Перевірити активні процеси в MySQL
docker exec -it mysql_container mysql -u root -p -e "SHOW PROCESSLIST;"
```

### Тестування API
```bash
# Тест локального підключення
curl -I http://localhost

# Тест через Traefik
curl -I https://telegram.crumpel.site

# Тест API endpoint
curl -X POST https://telegram.crumpel.site/api/telegram/base/execute-method \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"method": "ping"}'
```

## Корисні alias для швидкого доступу

Додайте в ~/.bashrc:
```bash
alias dcu='docker-compose -f docker-compose-php83.yml up -d'
alias dcd='docker-compose -f docker-compose-php83.yml down'
alias dcr='docker-compose -f docker-compose-php83.yml restart'
alias dcp='docker-compose -f docker-compose-php83.yml ps'
alias dlog='docker logs'
alias dexec='docker exec -it'

# Швидкий доступ до контейнерів
alias php-bash='docker exec -it php83 bash'
alias mysql-cli='docker exec -it mysql_container mysql -u root -p'
alias artisan='docker exec -it php83 /usr/local/bin/php /var/www/telegram-api/src/artisan'
</bash>

## Аварійні команди

### При повній поломці
```bash
# Зупинити все
docker-compose -f docker-compose-php83.yml down

# Видалити контейнери (дані в volumes збережуться)
docker-compose -f docker-compose-php83.yml down --rmi all

# Повний перезапуск
docker-compose -f docker-compose-php83.yml up -d --force-recreate

# Виправити права після проблем
sudo chmod -R 777 ./www/telegram-api/src/storage/
sudo chown -R 33:33 ./www/telegram-api/src/storage/
```

### Моніторинг ресурсів
```bash
# Використання дискового простору
docker system df

# Розмір контейнерів
docker ps -s

# Використання пам'яті та CPU
docker stats --no-stream
```