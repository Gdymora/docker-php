<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class PasswordReset extends Notification {
  use Queueable;

  public $token;
  
  public function __construct($token) {
    $this->token = $token;
  }

  public function via($notifiable) {
    return ['mail'];
  }

  public function toMail($notifiable) {
    return (new MailMessage)
    ->greeting("Уважаемый пользователь!")
    ->line("Вы получили это письмо, поскольку произвели процедуру " .
    "сброса пароля.")
    ->action("Сбросить пароль", url("password/reset", $this->token))
    ->line("Если вы не выполняли сброс пароля, ничего не " .
    "предпринимайте.")
    ->from("admin@site.ru", "Администрация");
  }

  public function toArray($notifiable) {
    return [];
  }
}
