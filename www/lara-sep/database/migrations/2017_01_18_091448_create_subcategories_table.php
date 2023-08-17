<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubcategoriesTable extends Migration {
  public function up() {
    Schema::create('subcategories', function (Blueprint $table) {
      $table->increments('id');
      $table->string('name', 30)->unique();
      $table->string('slug', 30)->unique();
      $table->integer('category')->unsigned();
      $table->tinyInteger('order')->default(0)->unsigned()->index();
      $table->timestamps();
      $table->foreign('category')->references('id')->on('categories')
      ->onDelete('restrict')->onUpdate('restrict');
    });
  }

  public function down() {
    Schema::dropIfExists('subcategories');
  }
}
