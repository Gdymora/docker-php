<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /**
     * Атрибуты, для которых разрешено массовое назначение.
     *Поэтому, для начала надо определить, для каких атрибутов разрешить 
     *массовое назначение. Это делается с помощью свойства модели $fillable. 
     * @var array
     */
    protected $fillable = [
        'name',
        'id',
    ];

    public $timestamps = false;


}
