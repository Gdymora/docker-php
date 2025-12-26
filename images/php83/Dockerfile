FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libicu-dev \
    libcurl4-openssl-dev \
    pkg-config \
    zip \
    unzip \
    nodejs \
    npm \
    apt-utils \
    cron \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Configure PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-configure intl

# Install PHP extensions
RUN docker-php-ext-install -j$(nproc) \
    pdo_mysql \
    mysqli \
    intl \
    mbstring \
    zip \
    bcmath \
    gd \
    xml

# Install and configure Xdebug
RUN pecl install xdebug \
    && echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.client_port=9003" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.idekey=PHPSTORM" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.log=/var/log/php/xdebug.log" >> /usr/local/etc/php/conf.d/xdebug.ini

# Create required directories and set permissions
RUN mkdir -p /var/log/php \
    && chown -R www-data:www-data /var/log/php \
    && chmod 777 /var/log/php \
    && touch /var/log/php/xdebug.log \
    && chmod 666 /var/log/php/xdebug.log

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy custom php.ini
COPY php.ini /usr/local/etc/php/conf.d/custom.ini

# Enable proc_open and other functions
RUN echo "disable_functions=" >> /usr/local/etc/php/conf.d/docker-php-disable-functions.ini

# Configure PHP-FPM
RUN echo "pm.max_children = 50" >> /usr/local/etc/php-fpm.d/zz-docker.conf \
    && echo "pm.start_servers = 5" >> /usr/local/etc/php-fpm.d/zz-docker.conf \
    && echo "pm.min_spare_servers = 5" >> /usr/local/etc/php-fpm.d/zz-docker.conf \
    && echo "pm.max_spare_servers = 35" >> /usr/local/etc/php-fpm.d/zz-docker.conf

# Встановлюємо права для www-data користувача
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

# Створюємо директорію для cron логів
RUN mkdir -p /var/log && touch /var/log/cron.log && chmod 666 /var/log/cron.log

EXPOSE 9000

CMD ["php-fpm"]
