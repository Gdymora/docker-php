<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Comment;

class CommentPolicy {
  use HandlesAuthorization;
  
  public function manipulate(User $user) {
    return $user->role != "a";
  }
}
