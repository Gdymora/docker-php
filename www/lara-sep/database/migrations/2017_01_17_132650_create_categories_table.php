<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoriesTable extends Migration {
  public function up() {
    Schema::create('categories', function (Blueprint $table) {
      $table->increments('id');
      $table->string('name', 30)->unique();
      $table->string('slug', 30)->unique();
      $table->tinyInteger('order')->default(0)->unsigned()->index();
      $table->timestamps();
    });
  }

  public function down() {
    Schema::dropIfExists('categories');
  }
}
