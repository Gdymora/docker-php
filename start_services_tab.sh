#!/bin/bash
#chmod +x start_services_tab.sh 

# Перехід до каталогу /www/VisionExp/generate2 та запуск команди npm run dev
gnome-terminal --tab -- bash -c "cd ~/www/VisionExp/generate2 && npm run dev"

# Затримка для очікування завершення запуску першої команди
sleep 5

# Перехід до каталогу /www/VisionExp/grapesjs-react та запуск команди npm run start
gnome-terminal --tab -- bash -c "cd ~/www/VisionExp/grapesjs-react && npm run start"

# Затримка для очікування завершення запуску другої команди
sleep 5

# Перехід до каталогу /www/php та запуск команди ./start 8
gnome-terminal --tab -- bash -c "cd ~/www/php && ./start 83"


# Утримання процесу терміналу відкритим
sleep infinity
