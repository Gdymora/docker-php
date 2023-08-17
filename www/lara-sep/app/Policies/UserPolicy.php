<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy {
  use HandlesAuthorization;
  
  public function manipulate(User $user) {
    return $user->role == "m";
  }
}
