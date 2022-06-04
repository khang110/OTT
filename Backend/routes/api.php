<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::post('/logout', 'App\Http\Controllers\Whatsapp\AuthController@logout');
    Route::get('/user', 'App\Http\Controllers\Whatsapp\AuthController@fetchAuthUser');
    Route::get('/users', 'App\Http\Controllers\Whatsapp\AuthController@fetchAllUsers');
    Route::get('/contacted-users', 'App\Http\Controllers\Whatsapp\AuthController@fetchContactedUsers');

    // Info Updates
    Route::post('/update-info', 'App\Http\Controllers\Whatsapp\AuthController@updateUserInfo');

    // Avatar Update
    Route::post('/update-dp', 'App\Http\Controllers\Whatsapp\AuthController@updateUserDp');

    // Messaging Endpoints
    Route::get('/message/file/{id}', 'App\Http\Controllers\Whatsapp\WossopMessageController@fetchFile');
    //Route::get('/message/fileb/{id}', 'App\Http\Controllers\Whatsapp\WossopMessageController@fetchFileB');

    Route::get('/message/file-info/{id}', 'App\Http\Controllers\Whatsapp\WossopMessageController@fetchFileInfo');
    Route::get('/message', 'App\Http\Controllers\Whatsapp\WossopMessageController@fetchNewMess');
    Route::post('/message', 'App\Http\Controllers\Whatsapp\WossopMessageController@sendMessage');
    Route::get('/message/{id}/{is_group?}', 'App\Http\Controllers\Whatsapp\WossopMessageController@fetchUserMessages');

    //Add group
    Route::post('/group','App\Http\Controllers\GroupController@store');
    Route::get('/get-channels','App\Http\Controllers\GroupController@index');
});
Route::post('/register', 'App\Http\Controllers\Whatsapp\AuthController@register');
Route::post('/login', 'App\Http\Controllers\Whatsapp\AuthController@login');

// Broadcast routes for API
Broadcast::routes(['middleware' => ['auth:sanctum']]);


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('/register', [App\Http\Controllers\AuthController::class, 'register']);
    Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);
    Route::post('/refresh', [App\Http\Controllers\AuthController::class, 'refresh']);
    Route::get('/user-profile', [App\Http\Controllers\AuthController::class, 'userProfile']);
    Route::post('/change-pass', [App\Http\Controllers\AuthController::class, 'changePassWord']);
});

//users list
Route::get('/list-users', [App\Http\Controllers\UsersController::class, 'index']);
Route::get('/message/file/{id}', 'App\Http\Controllers\Whatsapp\WossopMessageController@fetchFile');

