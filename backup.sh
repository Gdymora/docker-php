#!/bin/bash

# Отримуємо поточну дату
DATE=$(date +%Y%m%d_%H%M%S)

# Створюємо бекап
docker exec mysql_container mysqldump -u root -p${MYSQL_ROOT_PASSWORD} --all-databases > "./docker/mysql/backups/backup_${DATE}.sql"

# Видаляємо бекапи старші 7 днів
find ./docker/mysql/backups -name "backup_*.sql" -mtime +7 -delete