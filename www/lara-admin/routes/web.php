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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::group(['middleware'=>['statusAdmin','auth']], function(){
    //админская часть
    $groupDataAdmin = [
        'namespace' => 'Blog\Admin',
        'prefix' => 'admin',// Соответствует URL "/admin/index"
    ];

    Route::group($groupDataAdmin, function(){
        Route::resource('index', 'MainController')
        ->names('blog.admin.index');
        Route::resource('orders', 'OrderController')
        ->names('blog.admin.orders');
        Route::get('/orders/change/{id}','OrderController@change')
        ->name('blog.admin.orders.change');
        Route::post('/orders/save/{id}','OrderController@save')
        ->name('blog.admin.orders.save');
        Route::get('/orders/forcedestroy/{id}','OrderController@forcedestroy')
        ->name('blog.admin.orders.forcedestroy');
        Route::get('/categories/mydel','CategoryController@mydel')
        ->name('blog.admin.categories.mydel');
        Route::get('/categories/mydel','CategoryController@mydel')
        ->name('blog.admin.categories.mydel');
        

      //  $methods = ['index','edit','update','create','store', 'destroy','mydel'];
        Route::resource('categories', 'CategoryController')
            ->names('blog.admin.categories');
        Route::resource('users','UserController')
            ->names('blog.admin.users');

        Route::resource('products','ProductController')
            ->names('blog.admin.products');    
        Route::get('/products/related','ProductController@related');
        Route::match(['get', 'post'], '/products/ajax-image-upload', 'ProductController@ajaxImage');
        Route::delete('/products/ajax-remove-image/{filename}', 'ProductController@deleteImage');

        Route::post('/products/gallery','ProductController@gallery')
            ->name('blog.admin.products.gallery');

        Route::post('/products/delete-gallery','ProductController@deleteGallery')
            ->name('blog.admin.products.deletegallery');

        Route::get('/products/return-status/{id}','ProductController@returnStatus')
            ->name('blog.admin.products.returnstatus');
        Route::get('/products/delete-status/{id}','ProductController@deleteStatus')
                ->name('blog.admin.products.deletestatus');
        Route::get('/products/delete-product/{id}', 'ProductController@deleteProduct')
            ->name('blog.admin.products.deleteproduct');  
            
    });
   
});


Route::group(['middleware'=>['statusUser','auth']], function(){
  //пользовательская часть
     $groupDataUser = [
        'namespace' => 'Blog\User',
        'prefix' => 'user',// Соответствует URL "/admin/index"
    ];

    Route::group($groupDataUser, function(){
           Route::get('/index', 'MainController@index');  
    });
});
