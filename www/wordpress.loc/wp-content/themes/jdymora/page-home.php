<?php /** 
  * Template Name: Full Width Page * * 
  */

get_header();
?>
<div id="form-up" class="form-up">
  <div class="div-block-17"></div>
  <div class="div-block-16">
    <div class="div-block-14 dasdf" onclick="closeModal()">
      <div class="div-block-15"></div>
      <div class="div-block-15 _4564"></div>
      <div class="div-block-15 sgdf"></div>
      <div class="div-block-15 eyerty"></div>
    </div>
    <div class="text-block-334"><strong>Залиште свій номер телефону і ми перетелефонуємо Вам</strong>
      <br>
    </div>
    <div class="w-form">
      <?php echo do_shortcode('[my_order_form]'); ?>
    </div>
  </div>
</div>
<!--  -->
<div class="section-head wf-section">
  <div class="div-head">
    <div class="div-head-content-1">
      <h3 class="title-main">Потрібен електрик?</h3>
      <h3 class="title-main-copy">Професійні Електрики в Києві</h3>
      <div class="div-block-20">
        <img
          src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/6285f43529b4ea328f9cb173_3668652-848x477.png"
          sizes="(max-width: 479px) 96vw, (max-width: 767px) 78vw, 100vw" srcset="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/6285f43529b4ea328f9cb173_3668652-848x477-p-500.png 500w, 
      <?php echo get_stylesheet_directory_uri(); ?>/assets/images/6285f43529b4ea328f9cb173_3668652-848x477.png 778w"
          alt class="image-copy">
        <div class="div-list-main">
          <div class="div-block"></div>
          <div class="subtitle-main">Прибудем в зручний для вас час</div>
        </div>
        <div class="div-list-main">
          <div class="div-block"></div>
          <div class="subtitle-main">Гарантії на всі роботи</div>
        </div>
        <div class="div-list-main">
          <div class="div-block"></div>
          <div class="subtitle-main">Досвід роботи 15 років</div>
        </div>
        <div class="div-list-main">
          <div class="div-block"></div>
          <div class="subtitle-main">Виконуєм роботу будь-якої складності</div>
        </div>
        <div class="text-header-2">Зателефонуйте нам
          <br>Ми обов'язково вам допоможемо!
          <br>
        </div>
        <div class="text-header-2-copy-copy">
          <?php
          $phone_number = get_option('phone_number');
          if ($phone_number) {
            $phone_number_formatted = str_replace(['(', ')', ' '], '', $phone_number);
            $phone_number_href = 'tel:+' . $phone_number_formatted;
            ?>
            <a onclick="return gtag_report_conversion('<?php echo esc_attr($phone_number_href); ?>');"
              href="<?php echo esc_attr($phone_number_href); ?>" class="link-3">
              <span class="text-span">
                <?php echo esc_html($phone_number); ?>
              </span>
            </a>
            <?php
          }
          ?>
          <br>
        </div>
        <div class="button-main-copy" onclick="openModal()">ЗАМОВИТИ ДЗВІНОК</div>
      </div>
      <div class="div-block-21">
        <img
          src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/6285f43529b4ea328f9cb173_3668652-848x477.png"
          loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 54vw, 100vw" srcset="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/6285f43529b4ea328f9cb173_3668652-848x477-p-500.png 500w, 
       <?php echo get_stylesheet_directory_uri(); ?>/assets/images/6285f43529b4ea328f9cb173_3668652-848x477.png 778w"
          alt class="image-5">
      </div>
    </div>
    <div class="div-head-content-2"><img
        src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/6285f43529b4ea328f9cb173_3668652-848x477.png"
        loading="lazy" sizes="(max-width: 991px) 100vw, 53vw" srcset="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/6285f43529b4ea328f9cb173_3668652-848x477-p-500.png 500w, 
    <?php echo get_stylesheet_directory_uri(); ?>/assets/images/6285f43529b4ea328f9cb173_3668652-848x477.png 778w" alt
        class="image"></div>
  </div>
</div>

<!--  -->
<div class="section-1 wf-section">
  <div class="div-1">
    <div class="div-block-4">
      <div class="div-block-2">
        <div class="text-block-2 _511"><strong class="bold-text-5">Чому варто працювати з нами?</strong></div>
        <div class="div-block-3"></div>
      </div>
    </div>
    <div class="div-block-5">
      <div class="div-block-6 p1"></div>
      <div class="text-block-3">Оперативно виїжджаєм</div>
      <div class="text-block-4">Виїжджаємо в обумовлений час. Потрібно зараз? вже виїжджаємо</div>
    </div>
    <div class="div-block-5">
      <div class="div-block-6 p2"></div>
      <div class="text-block-3"><strong>Гарантія 1 рік</strong></div>
      <div class="text-block-4">На виконані роботи ми надаємо гарантію 1 рік</div>
    </div>
    <div class="div-block-5">
      <div class="div-block-6 p3"></div>
      <div class="text-block-3">Розрахунок після роботи</div>
      <div class="text-block-4">Оплата за послуги відбувається після виконаної роботи</div>
    </div>
    <div class="div-block-5">
      <div class="div-block-6 p4"></div>
      <div class="text-block-3">Досвідчені спеціалісти</div>
      <div class="text-block-4">У нас тільки досвідчені майстри, які пройшли суворий відбір</div>
    </div>
  </div>
</div>
<div class="section-1 sr3 wf-section">
  <div class="div-1 sr">
    <div class="div-block-4">
      <div class="div-block-2">
        <div class="text-block-2">Ціни на послуги</div>
        <div class="div-block-3 srbl"></div>
      </div>
    </div>

    <div class="div-block-8">
      <?php for ($i = 1; $i <= 6; $i++): ?>
        <div class="div-block-7">
          <div class="div-block-8-80-20 d80">
            <div class="text-block-5"><strong class="bold-text-3">
                <?php echo esc_html(get_option('table_row_' . $i . '_description')); ?>
              </strong></div>
          </div>
          <div class="div-block-8-80-20 d20">
            <div class="text-block-5"><strong class="bold-text-3">
                <?php echo esc_html(get_option('table_row_' . $i . '_price')); ?>
              </strong></div>
          </div>
        </div>
      <?php endfor; ?>
    </div>

    <div class="div-block-8">
      <?php for ($i = 7; $i <= 12; $i++): ?>
        <div class="div-block-7">
          <div class="div-block-8-80-20 d80">
            <div class="text-block-5"><strong class="bold-text-3">
                <?php echo esc_html(get_option('table_row_' . $i . '_description')); ?>
              </strong></div>
          </div>
          <div class="div-block-8-80-20 d20">
            <div class="text-block-5"><strong class="bold-text-3">
                <?php echo esc_html(get_option('table_row_' . $i . '_price')); ?>
              </strong></div>
          </div>
        </div>
      <?php endfor; ?>
    </div>

    <div class="div-block-9">
      <div class="text-block-6">Всі ціни вказані в умовному розрахунку без урахування вартості матеріалів та надалі
        можуть бути змінені після проведення попереднього огляду об'єкта.
        <br>
        <br>Мінімальне замовлення 400 грн, залежно від району та завантаження майстрів.
      </div>
    </div>
  </div>
</div>
<div class="section-1 wf-section">
  <div class="div-1">
    <div class="div-head-content-2-copy"><img
        src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/6285f43529b4ea328f9cb173_3668652-848x477.png"
        loading="lazy" srcset="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/6285f43529b4ea328f9cb173_3668652-848x477-p-500.png 500w, 
    <?php echo get_stylesheet_directory_uri(); ?>/assets/images/6285f43529b4ea328f9cb173_3668652-848x477.png 778w"
        sizes="(max-width: 767px) 92vw, (max-width: 991px) 52vw, 53vw" alt class="image _453"></div>
    <div class="div-block-12">
      <div class="div-block-4">
        <div class="div-block-2">
          <div class="text-block-2"><strong class="bold-text-7">Замовити електрик</strong></div>
          <div class="div-block-3"></div>
        </div>
      </div>
      <div class="text-block-11">Залиште, будь ласка, свої дані - наш спеціаліст зателефонує Вам для уточнення деталей.
        <br>
      </div>
      <div class="w-form">
        <div onclick="openModal()" class="button-main-copy">ЗАМОВИТИ ДЗВІНОК</div>
      </div>
    </div>
  </div>
</div>
<div class="section-1 wf-section">
  <div class="div-1">
    <div class="div-block-4-copy">
      <div class="div-block-2">
        <div class="text-block-2"><strong class="bold-text-9">Етапи роботи</strong></div>
        <div class="div-block-3"></div>
      </div>
    </div>
    <div class="div-block-5-copy">
      <div class="div-block-6-copy">1</div>
      <div class="text-block-3-copy">Ви залишаєте заявку на сайті</div>
      <div class="text-block-4">Зателефонуйте нам або залиште заявку на сайті в будь який час</div>
    </div>
    <div class="div-block-5-copy">
      <div class="div-block-6-copy">2</div>
      <div class="text-block-3-copy">Ми зв'язуємось </div>
      <div class="text-block-4">З вами зв'яжеться наш оператор, та надасть першочергову консультацію</div>
    </div>
    <div class="div-block-5-copy">
      <div class="div-block-6-copy">3</div>
      <div class="text-block-3-copy">Наш майстер виїждає до вас</div>
      <div class="text-block-4">В обумовлений час майстер виїжджає на виконання ремонтних робіт</div>
    </div>
    <div class="div-block-5-copy">
      <div class="div-block-6-copy">4</div>
      <div class="text-block-3-copy">Майстер виконує роботу</div>
      <div class="text-block-4">Кваліфікований майстер виконує ваше замовлення.</div>
    </div>
    <div class="div-block-5-copy">
      <div class="div-block-6-copy">5</div>
      <div class="text-block-3-copy">Ви перевіряєте якість виконаних робіт</div>
      <div class="text-block-4">Ви оглядаєте виконану роботу майстром. На виконані роботи надаються гарантії</div>
    </div>
    <div class="div-block-5-copy">
      <div class="div-block-6-copy">6</div>
      <div class="text-block-3-copy">Оплата послуг</div>
      <div class="text-block-4">Оплата здійснюється тільки після виконання робіт майстром</div>
    </div>
  </div>
</div>
<div class="section-1 sr3 wf-section">
  <div class="div-1">
    <div class="div-block-4">
      <div class="div-block-2">
        <div class="text-block-2"><strong class="bold-text-10">Відгуки наших клієнтів</strong></div>
        <div class="div-block-3 srbl"></div>
      </div>
    </div>
    <div class="div-block-10">
      <div class="text-block-7">На сайті <strong>852 </strong>відгуки
        <br>Средняя оценка <span class="text-span-2">4.8</span>
      </div>
      <div class="div-block-11">
        <div class="text-block-8">
          <div class="text-block-8-copy">
            <div class="text-block-9"><strong>Виталий</strong></div><img
              src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/628a216ba920a9652bb4f121_45345.png"
              loading="lazy" width="150" alt class="image-3">
          </div>
          <div class="text-block-8-y-copy">
            <div class="text-block-10">19/01/2022
              <br>
            </div>
          </div>
        </div>
        <div><em class="italic-text">Спасибо огромное компании за быстрый приезд и качественно выполненную работу !Потек
            кран в день вылета в другую страну!мастер приехал за 20 минут и спас меня!спасибо большое
            !)<br></em><strong><br></strong></div>
      </div>
      <div class="div-block-11">
        <div class="text-block-8">
          <div class="text-block-8-copy">
            <div class="text-block-9"><strong>Андрій</strong></div><img
              src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/628a216ba920a9652bb4f121_45345.png"
              loading="lazy" width="150" alt class="image-3">
          </div>
          <div class="text-block-8-y-copy">
            <div class="text-block-10">15/11/2021
              <br>
            </div>
          </div>
        </div>
        <div><em class="italic-text">Рекомендую, дуже хороші фахівці своєї справи, а також відповідальні майстри, і
            співвідношення ціни та якості дуже радують. Дякую!</em><strong><br></strong></div>
      </div>
      <div class="div-block-11">
        <div class="text-block-8">
          <div class="text-block-8-copy">
            <div class="text-block-9"><strong>Сергей</strong></div><img src="images/628a216ba920a9652bb4f121_45345.png"
              loading="lazy" width="150" alt class="image-3">
          </div>
          <div class="text-block-8-y-copy">
            <div class="text-block-10">05/09/2021
              <br>
            </div>
          </div>
        </div>
        <div><em class="italic-text">Даже в праздничный день електрик приехал в течение часа и оперативно выполнили
            ремонт. Електрик который приехал на дом очень вежливый и грамотный специалист!</em><strong><br></strong>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="section-1 wf-section">
  <div class="div-1">
    <div class="div-block-4">
      <div class="div-block-2">
        <div class="text-block-2">Запитання та відповіді</div>
        <div class="div-block-3"></div>
      </div>
    </div>
    <div class="div-block-13">
      <div class="text-block-13">На коли можна викликати майстра?</div>
      <div class="div-block-14">
        <div class="div-block-15"></div>
        <div class="div-block-15 _4564"></div>
        <div class="div-block-15 sgdf"></div>
        <div class="div-block-15 eyerty"></div>
      </div>
      <div class="text-block-14">Майстер може приїхати через 1-2 години або сьогодні до кінця дня (доплата за
        терміновість +100/200 грн).
        <br>Не терміново? Оформіть попередній заказ на зручний Вам час - майстер на 100% приїде вчасно.
      </div>
    </div>
    <div class="div-block-13">
      <div class="text-block-13">Майстер може привезти матеріали з собою?</div>
      <div class="div-block-14">
        <div class="div-block-15"></div>
        <div class="div-block-15 _4564"></div>
        <div class="div-block-15 sgdf"></div>
        <div class="div-block-15 eyerty"></div>
      </div>
      <div class="text-block-14">Так, у мастера є базовий набір комплектуючих. Якщо потрібних матеріалів не виявиться -
        майстер купує все необхідне і доставить замовнику.</div>
    </div>
    <div class="div-block-13">
      <div class="text-block-13">Можна вислати фото на Viber - для попередньої консультації?</div>
      <div class="div-block-14">
        <div class="div-block-15"></div>
        <div class="div-block-15 _4564"></div>
        <div class="div-block-15 sgdf"></div>
        <div class="div-block-15 eyerty"></div>
      </div>
      <div class="text-block-14">Так, Ви можете прислати фото на Viber, E-mail, у Telegram - для попередньої оцінки
        обсягу та вартості робіт.</div>
    </div>
    <div class="div-block-13">
      <div class="text-block-13">Скільки коштує виклик майстра?</div>
      <div class="div-block-14">
        <div class="div-block-15"></div>
        <div class="div-block-15 _4564"></div>
        <div class="div-block-15 sgdf"></div>
        <div class="div-block-15 eyerty"></div>
      </div>
      <div class="text-block-14">Виклик майстра - безкоштовний (при умові, що робота виконуються в день виїзду). Якщо
        робота переносятся або клієнт відмовляється від послуг - вартість консультації 200 грн.</div>
    </div>
  </div>
</div>

<!--  -->

<?php
get_footer();
?>