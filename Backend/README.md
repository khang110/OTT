## Backend OTT App
### Install
```
cd Backend
```
```
cp .env.example .env
```
> Create database in your local, after fill infor database similar lines below
> Example
> DB_HOST=127.0.0.1
> DB_PORT=3306
> DB_DATABASE=ott
> DB_USERNAME=root
> DB_PASSWORD=
```
composer install --ignore-platform-reqs
```
```
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```
```
php artisan migrate
```
```
php artisan key:generate
```
```
php artisan jwt:secret
```
```
php artisan serve 
```
