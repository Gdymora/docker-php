<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\File;

class FilePolicy {
  use HandlesAuthorization;
  
  public function delete(User $user, File $file) {
    return ($user->id == $file->user);
  }
}
