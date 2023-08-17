<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration {
  public function up() {
    Schema::create('articles', function (Blueprint $table) {
      $table->increments('id');
      $table->string('title', 100)->unique();
      $table->string('slug', 100)->unique();
      $table->string('description', 255);
      $table->text('content');
      $table->integer('subcategory')->unsigned();
      $table->integer('author')->unsigned();
      $table->timestamps();
      $table->foreign('subcategory')->references('id')->on('subcategories')
      ->onDelete('restrict')->onUpdate('restrict');
      $table->foreign('author')->references('id')->on('users')
      ->onDelete('restrict')->onUpdate('restrict');
    });
  }

  public function down() {
    Schema::dropIfExists('articles');
  }
}
