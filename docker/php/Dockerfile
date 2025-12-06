FROM php:8.4-fpm

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions \
    gd \
    zip \
    mysqli \
    pdo_mysql \
    opcache \
    soap \
    sockets \
    intl \
    xdebug \
    memcached

RUN apt-get update && apt-get install -y \
    mc \
    git \
    unzip \
    msmtp \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

WORKDIR /var/www/html