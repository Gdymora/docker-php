<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Article;

class ArticlePolicy {
  use HandlesAuthorization;
  
  public function manipulate(User $user, Article $article) {
    return (($user->role == "a") && ($user->id == $article->author)) ||
    ($user->role != "a");
  }
}
