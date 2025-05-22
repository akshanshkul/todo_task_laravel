<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });



use App\Http\Controllers\TodoTaskController;

Route::get('/', function () {
    return view('task.index'); // your Blade file
});

Route::get('/task', [TodoTaskController::class, 'index']);
Route::post('/task', [TodoTaskController::class, 'store']);
Route::post('/task/{id}/complete', [TodoTaskController::class, 'markComplete']);
Route::delete('/task/{id}', [TodoTaskController::class, 'delete']);
