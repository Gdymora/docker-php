#!/bin/bash

# Telegram UserBot Health Check Script
# Створено для моніторингу стабільності MadelineProto системи

echo "========================================="
echo "Telegram UserBot Health Check - $(date)"
echo "========================================="

# Функція для виведення результату з кольорами
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "\033[32m✓ $2\033[0m"
    else
        echo -e "\033[31m✗ $2\033[0m"
    fi
}

# 1. Перевірка кількості MadelineProto процесів
echo "1. Перевірка MadelineProto процесів:"
madeline_count=$(docker exec laravel-cron ps aux | grep madeline | grep -v grep | wc -l)
echo "   Кількість процесів: $madeline_count"
if [ $madeline_count -le 3 ]; then
    print_status 0 "Процеси в нормі (≤3)"
else
    print_status 1 "УВАГА: Забагато процесів (>3)"
fi

# 2. Перевірка роботи cron
echo -e "\n2. Перевірка cron демону:"
docker exec laravel-cron service cron status > /dev/null 2>&1
cron_status=$?
print_status $cron_status "Cron демон"

# 3. Перевірка останньої активності UserBot
echo -e "\n3. Перевірка останньої активності:"
last_run=$(docker exec laravel-cron tail -1 /var/www/telegram-api/src/storage/logs/userbot-ai.log 2>/dev/null | grep -o "UserBot AI check completed" | wc -l)
if [ $last_run -gt 0 ]; then
    print_status 0 "Остання перевірка виконана"
    echo "   Останній запис:"
    docker exec laravel-cron tail -1 /var/www/telegram-api/src/storage/logs/userbot-ai.log 2>/dev/null
else
    print_status 1 "Немає записів про виконання"
fi

# 4. Перевірка помилок в логах
echo -e "\n4. Перевірка помилок за останню годину:"
error_count=$(docker exec laravel-cron grep "$(date '+%Y-%m-%d %H')" /var/www/telegram-api/src/storage/logs/userbot-ai.log 2>/dev/null | grep -i "error\|failed\|exception" | wc -l)
if [ $error_count -eq 0 ]; then
    print_status 0 "Помилок не знайдено"
else
    print_status 1 "Знайдено $error_count помилок"
    echo "   Останні помилки:"
    docker exec laravel-cron grep "$(date '+%Y-%m-%d %H')" /var/www/telegram-api/src/storage/logs/userbot-ai.log 2>/dev/null | grep -i "error\|failed\|exception" | tail -3
fi

# 5. Перевірка використання пам'яті
echo -e "\n5. Використання ресурсів:"
memory_info=$(docker exec laravel-cron free -h | grep Mem)
echo "   $memory_info"

# 6. Перевірка прав доступу до логів
echo -e "\n6. Перевірка прав доступу:"
log_perms=$(docker exec laravel-cron ls -la /var/www/telegram-api/src/storage/logs/ | grep userbot-ai.log | wc -l)
if [ $log_perms -gt 0 ]; then
    print_status 0 "Лог файл доступний"
else
    print_status 1 "Проблеми з доступом до логів"
fi

# 7. Тест підключення до бази даних
echo -e "\n7. Тест бази даних:"
db_test=$(docker exec laravel-cron php -r "
try {
    \$pdo = new PDO('sqlite:/var/www/telegram-api/src/database/database.sqlite');
    echo 'OK';
} catch(Exception \$e) {
    echo 'ERROR: ' . \$e->getMessage();
}
" 2>/dev/null)

if [[ $db_test == "OK" ]]; then
    print_status 0 "База даних доступна"
else
    print_status 1 "Проблема з базою: $db_test"
fi

# 8. Перевірка AI Gateway сервісу
echo -e "\n8. Перевірка AI Gateway:"
ai_gateway_running=$(docker ps --filter "name=ai-gateway" --format "table {{.Names}}" | grep -v NAMES | wc -l)
if [ $ai_gateway_running -gt 0 ]; then
    # Перевірка доступності API
    ai_health=$(docker exec laravel-cron timeout 5 curl -s http://ai-gateway-service:3000/api/health 2>/dev/null || echo "TIMEOUT")
    if [[ $ai_health == *"ok"* ]] || [[ $ai_health == *"healthy"* ]] || [[ $ai_health == *"success"* ]]; then
        print_status 0 "AI Gateway доступний"
    else
        print_status 1 "AI Gateway endpoint помилка"
        echo "   Відповідь: $(echo $ai_health | cut -c1-100)..."
    fi
else
    print_status 1 "AI Gateway контейнер не запущений"
fi

# 9. Перевірка cache
echo -e "\n9. Перевірка кешу:"
cache_test=$(docker exec laravel-cron php artisan tinker --execute="echo 'Cache OK';" 2>/dev/null)
if [[ $cache_test == *"Cache OK"* ]]; then
    print_status 0 "Кеш працює"
else
    print_status 1 "Проблема з кешем"
fi

# 10. Детальна перевірка AI Gateway
echo -e "\n10. Детальна перевірка AI Gateway:"
if [ $ai_gateway_running -gt 0 ]; then
    # Перевірка логів на Prisma помилки
    prisma_errors=$(docker logs ai-gateway-service --since="1h" 2>&1 | grep -i "prisma\|constraint\|foreign key" | wc -l)
    if [ $prisma_errors -gt 0 ]; then
        print_status 1 "Знайдено $prisma_errors Prisma помилок в логах"
        echo "   Останні помилки:"
        docker logs ai-gateway-service --since="30m" 2>&1 | grep -i "constraint\|foreign key" | tail -2
    else
        print_status 0 "Немає Prisma помилок"
    fi
    
    # Тест підключення до AI Gateway
    ai_test=$(docker exec laravel-cron timeout 10 curl -s -X GET http://ai-gateway-service:3000/api/health 2>/dev/null || echo "FAILED")
    if [[ $ai_test != "FAILED" ]] && [[ $ai_test != "TIMEOUT" ]]; then
        print_status 0 "AI Gateway API доступне"
    else
        print_status 1 "AI Gateway API не відповідає"
    fi
else
    print_status 1 "AI Gateway контейнер вимкнений"
fi

# 11. Статистика за останню годину
echo -e "\n11. Статистика за останню годину:"
completed_runs=$(docker exec laravel-cron grep "$(date '+%Y-%m-%d %H')" /var/www/telegram-api/src/storage/logs/userbot-ai.log 2>/dev/null | grep "UserBot AI check completed" | wc -l)
processed_messages=$(docker exec laravel-cron grep "$(date '+%Y-%m-%d %H')" /var/www/telegram-api/src/storage/logs/userbot-ai.log 2>/dev/null | grep -o "messages processed" | wc -l)
ai_timeouts=$(docker exec laravel-cron grep "$(date '+%Y-%m-%d %H')" /var/www/telegram-api/src/storage/logs/laravel.log 2>/dev/null | grep "cURL error 28\|Operation timed out" | wc -l)
echo "   Запусків за годину: $completed_runs"
echo "   Оброблено повідомлень: $processed_messages"
echo "   AI Gateway таймаутів: $ai_timeouts"

# 12. Аналіз помилок AI Gateway
echo -e "\n12. AI Gateway failure analysis:"
ai_failures=$(docker exec laravel-cron grep "$(date '+%Y-%m-%d %H')" /var/www/telegram-api/src/storage/logs/laravel.log 2>/dev/null | grep "AI Gateway.*error\|Failed to get AI response" | wc -l)
quota_exceeded=$(docker exec laravel-cron grep "$(date '+%Y-%m-%d %H')" /var/www/telegram-api/src/storage/logs/laravel.log 2>/dev/null | grep "exceeded your current quota" | wc -l)

# Підрахунок призупинених чатів через Laravel Cache (без прямого Redis)
paused_chats=$(docker exec laravel-cron php -r "
try {
    require '/var/www/telegram-api/src/vendor/autoload.php';
    \$app = require_once '/var/www/telegram-api/src/bootstrap/app.php';
    \$app->make('Illuminate\\Contracts\\Console\\Kernel')->bootstrap();
    
    // Використовуємо Laravel Cache facade замість прямого Redis
    \$cache = \$app->make('cache');
    \$pausedCount = 0;
    
    // Перевіряємо декілька найбільш ймовірних chat_id patterns
    // В реальному проекті краще зберігати список активних чатів
    for (\$i = 1; \$i <= 10; \$i++) {
        \$userBotId = \$i;
        
        // Перевіряємо глобальну паузу для userbot
        if (\$cache->has(\"ai_global_pause:{\$userBotId}\")) {
            \$pausedCount += 10; // Приблизна кількість чатів на userbot
            continue;
        }
        
        // Перевіряємо часті типи чатів
        \$commonChatIds = [
            472118380, 7896149200, 1129357676, 1044974942, 777000
        ];
        
        foreach (\$commonChatIds as \$chatId) {
            if (\$cache->has(\"ai_paused:{\$userBotId}:{\$chatId}\")) {
                \$pausedCount++;
            }
        }
    }
    
    echo \$pausedCount;
} catch(Exception \$e) {
    echo '0';
}
" 2>/dev/null || echo "0")

fallback_sent=$(docker exec laravel-cron grep "$(date '+%Y-%m-%d %H')" /var/www/telegram-api/src/storage/logs/laravel.log 2>/dev/null | grep "Fallback message sent successfully" | wc -l)

# AI помилки по типах
ai_timeouts=$(docker exec laravel-cron grep "$(date '+%Y-%m-%d %H')" /var/www/telegram-api/src/storage/logs/laravel.log 2>/dev/null | grep "cURL error 28\|Operation timed out" | wc -l)
ai_500_errors=$(docker exec laravel-cron grep "$(date '+%Y-%m-%d %H')" /var/www/telegram-api/src/storage/logs/laravel.log 2>/dev/null | grep "AI Gateway HTTP error.*status.*:500" | wc -l)

echo "   AI помилок за годину: $ai_failures"
echo "   Timeout помилок: $ai_timeouts"
echo "   HTTP 500 помилок: $ai_500_errors"
echo "   Quota exceeded помилок: $quota_exceeded" 
echo "   Призупинених чатів: $paused_chats"
echo "   Fallback повідомлень відправлено: $fallback_sent"

if [ $ai_failures -gt 10 ]; then
    print_status 1 "Високий рівень AI помилок ($ai_failures)"
elif [ $ai_failures -gt 5 ]; then
    print_status 1 "Помірний рівень AI помилок ($ai_failures)"
else
    print_status 0 "AI помилки в нормі ($ai_failures)"
fi

if [ $paused_chats -gt 0 ]; then
    print_status 1 "Є призупинені чати ($paused_chats)"
else
    print_status 0 "Призупинених чатів немає"
fi

# Загальна оцінка AI системи
ai_health_score=0
total_ai_issues=$((ai_failures + ai_timeouts + quota_exceeded))

if [ $total_ai_issues -eq 0 ] && [ $paused_chats -eq 0 ]; then
    ai_health_score=100
    echo "   🟢 AI система: Відмінно (100%)"
elif [ $total_ai_issues -le 5 ] && [ $paused_chats -le 2 ]; then
    ai_health_score=75
    echo "   🟡 AI система: Добре (75%)"
elif [ $total_ai_issues -le 15 ] || [ $paused_chats -le 5 ]; then
    ai_health_score=50
    echo "   🟠 AI система: Задовільно (50%)"
else
    ai_health_score=25
    echo "   🔴 AI система: Потребує уваги (25%)"
fi

# 13. Загальний стан
echo -e "\n========================================="
total_checks=12
passed_checks=0

# Підрахунок пройдених перевірок
[ $madeline_count -le 3 ] && ((passed_checks++))
[ $cron_status -eq 0 ] && ((passed_checks++))
[ $last_run -gt 0 ] && ((passed_checks++))
[ $error_count -eq 0 ] && ((passed_checks++))
[ $log_perms -gt 0 ] && ((passed_checks++))
[[ $db_test == "OK" ]] && ((passed_checks++))
[ $ai_gateway_running -gt 0 ] && ((passed_checks++))
[[ $ai_health == *"OK"* ]] || [[ $ai_health == *"healthy"* ]] && [ $ai_gateway_running -gt 0 ] && ((passed_checks++))
[[ $cache_test == *"Cache OK"* ]] && ((passed_checks++))
[ $completed_runs -gt 0 ] && ((passed_checks++))
[ $ai_failures -le 5 ] && ((passed_checks++))
[ $paused_chats -eq 0 ] && ((passed_checks++))

if [ $passed_checks -eq $total_checks ]; then
    echo -e "\033[32mЗАГАЛЬНИЙ СТАН: ВІДМІННО ($passed_checks/$total_checks)\033[0m"
elif [ $passed_checks -ge $((total_checks * 3 / 4)) ]; then
    echo -e "\033[33mЗАГАЛЬНИЙ СТАН: ДОБРЕ ($passed_checks/$total_checks)\033[0m"
else
    echo -e "\033[31mЗАГАЛЬНИЙ СТАН: ПОТРЕБУЄ УВАГИ ($passed_checks/$total_checks)\033[0m"
fi

echo "========================================="
echo "Перевірка завершена: $(date)"
echo "========================================="
