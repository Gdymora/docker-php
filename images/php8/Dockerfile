
FROM php:8.2-fpm
# Install "curl", "libmemcached-dev", "libpq-dev", "libjpeg-dev",
#         "libpng-dev", "libfreetype6-dev", "libssl-dev", "libmcrypt-dev",
RUN set -eux; \
    apt-get update; \
    apt-get upgrade -y; \
    apt-get install -y --no-install-recommends \
    curl \
    wget \
    nano \
    git \
    libmemcached-dev \
    libz-dev \
    libpq-dev \
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev \
    libssl-dev \
    libwebp-dev \
    libxpm-dev \
    libmcrypt-dev \
    libxml2-dev \
    libonig-dev \
    libzip-dev; \
    docker-php-ext-install -j$(nproc) iconv mbstring mysqli pdo_mysql zip intl xml; \
    docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/; \
    docker-php-ext-install -j$(nproc) gd; \ 
    docker-php-ext-enable  xml
    #curl pdo pdo_mysql calendar ctype exif ffi fileinfo ftp gettext iconv phar posix readline shmop sockets sysvmsg sysvsem sysvshm tokenizer xml
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN apt-get install -y nodejs npm;
#ADD ./php.ini /etc/php/8.2/fpm/php.ini

WORKDIR /var/www

# Запускаем контейнер
CMD ["php-fpm"]
