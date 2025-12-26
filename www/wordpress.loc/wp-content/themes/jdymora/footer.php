<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package jdymora
 */

?>
</div><!-- #page -->

<?php wp_footer(); ?>
<div class="section-1 _44 wf-section">
  <div class="div-1-copy">
    <div class="div-block-4 vv">
      <div class="div-block-2">
        <div class="text-block-2"><strong class="bold-text-11">Години роботи<br></strong></div>
        <div class="div-block-3 srbl"></div>
      </div>
    </div>
    <div class="div-block-18"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/fonts/phone-contact_1.svg"
        loading="lazy" alt class="image-4">
      <div class="div-block-19">
        <div class="text-block-333"><strong>Телефон:</strong></div>
        <?php
        $phone_number = get_option('phone_number');
        if ($phone_number) {
          $phone_number_formatted = str_replace(['(', ')', ' '], '', $phone_number);
          $phone_number_href = 'tel:+' . $phone_number_formatted;
          ?>
          <div class="text-block-4-45">
            <a onclick="return gtag_report_conversion('<?php echo esc_attr($phone_number_href); ?>');"
              href="<?php echo esc_attr($phone_number_href); ?>" class="link">
              <span class="text-span">
                <?php echo esc_html($phone_number); ?>
              </span>
            </a>
          </div>
          <?php
        }
        ?>
      </div>
    </div>
    <div class="div-block-18"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/fonts/calendar_2_1.svg"
        loading="lazy" alt class="image-4">
      <div class="div-block-19">
        <div class="text-block-333"><strong>Для дзвінків:</strong></div>
        <div class="text-block-4-45">8:00 - 22:00<span class="text-span"><br></span></div>
      </div>
    </div>
    <div class="div-block-18"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/fonts/24-hours_1_1.svg"
        loading="lazy" alt class="image-4">
      <div class="div-block-19">
        <div class="text-block-333"><strong class="bold-text-8">Для "Відправити заявку"</strong></div>
        <div class="text-block-4-45">ЦІЛОДОБОВО
          <br>
        </div>
      </div>
    </div>
  </div>
</div>
</body>

</html>