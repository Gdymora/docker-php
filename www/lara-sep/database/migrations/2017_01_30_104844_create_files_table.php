<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilesTable extends Migration {
  public function up() {
    Schema::create('files', function (Blueprint $table) {
      $table->increments('id');
      $table->tinyInteger('type')->unsigned()->index();
      $table->string('extension', 10);
      $table->string('description', 100);
      $table->integer('user')->unsigned();
      $table->foreign('user')->references('id')->on('users')
      ->onDelete('cascade')->onUpdate('cascade');
      $table->timestamps();
    });
  }

  public function down() {
    Schema::dropIfExists('files');
  }
}
