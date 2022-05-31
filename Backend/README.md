## Backend OTT App
### Install
```
cd Backend
```
```
cp .env.example .env
```
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
