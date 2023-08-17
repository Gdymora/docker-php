<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider {
  protected $policies = [
    'App\User' => 'App\Policies\UserPolicy',
    'App\Category' => 'App\Policies\UserPolicy',
    'App\Subcategory' => 'App\Policies\UserPolicy',
    'App\Article' => 'App\Policies\ArticlePolicy',
    'App\Comment' => 'App\Policies\CommentPolicy',
    'App\File' => 'App\Policies\FilePolicy',
  ];

  public function boot() {
    $this->registerPolicies();
  }
}
