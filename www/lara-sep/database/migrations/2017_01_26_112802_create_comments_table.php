<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration {
  public function up() {
    Schema::create('comments', function (Blueprint $table) {
      $table->increments('id');
      $table->string('author');
      $table->string('email');
      $table->text('content');
      $table->integer('article')->unsigned();
      $table->boolean('hidden')->default(false)->index();
      $table->foreign('article')->references('id')->on('articles')
      ->onDelete('cascade')->onUpdate('cascade');
      $table->timestamps();
    });
  }

  public function down() {
    Schema::dropIfExists('comments');
  }
}
