<?php
/**
 * Plugin Name: Electrik
 * Description: First Plugin
 * Version: 1.0
 * Author: Petroff
 * License: GPLv2 or later
 * Text Domain: electrik
 */
if (!defined('ABSPATH')) {
    die;
}

class Electrik
{
    private $table_name;
    private $table_name_1;
    public function __construct()
    {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'electrik_orders';
        $this->table_name_1 = $wpdb->prefix . 'electrik_orders_1';
    }

    public function register()
    {
        add_shortcode('my_order_form', array($this, 'my_order_form_shortcode'));
        add_action('admin_menu', array($this, 'my_order_admin_menu'));
        add_action('admin_post_save_order_data', array($this, 'save_order_data'));
        add_action('admin_menu', array($this, 'register_admin_page'));
    }

    public function my_order_form_shortcode()
    {
        ob_start();
        ?>
        <form id="email-form" name="email-form" data-name="Email Form"
            action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="post" class="_3">
            <input type="hidden" name="action" value="save_order_data">
            <label for="name-2" class="field-label">Ваше ім'я</label>
            <input type="text" class="text-field w-input" maxlength="256" name="name" data-name="Name 2" placeholder
                id="name-2">
            <label for="email-2" class="field-label">Ваш телефон</label>
            <input type="text" class="text-field w-input" maxlength="256" name="phone" data-name="Email 2" placeholder
                id="email-2" required>
            <input type="hidden" name="product" value="електрик київ">
            <input type="submit" value="Замовити дзвінок" data-wait="Please wait..." class="submit-button w-button">
            <?php wp_nonce_field('save_order_data', 'order_data_nonce'); ?>
        </form>

        <div id="order-success-modal"
            style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 9999;">
            <div id="order-success-content"
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #fff; padding: 20px;">
                <h2>Дякуємо! Ваше замовлення отримано.</h2>
                <p>Ми зв'яжемося з вами найближчим часом.</p>
            </div>
        </div>

        <script>
            // Функція для відображення модального вікна
            function showOrderSuccessModal() {
                const modal = document.getElementById('order-success-modal');
                modal.style.display = 'block';
            }

            // Відправка форми за допомогою Fetch API
            document.addEventListener('DOMContentLoaded', function () {
                const form = document.getElementById('email-form');
                form.addEventListener('submit', function (e) {
                    e.preventDefault();

                    const nameInput = document.getElementById('name-2');
                    const phoneInput = document.getElementById('email-2');

                    // Перевірка регулярних виразів для валідації
                    const nameRegex = /^[a-zA-Zа-яА-ЯЁё\sґҐєЄіІїЇ]+$/;
                    const phoneRegex = /^[0-9\s()+-]+$/;

                    if (!nameRegex.test(nameInput.value)) {
                        alert('Будь ласка, введіть дійсне ім\'я.');
                        return;
                    }

                    if (!phoneRegex.test(phoneInput.value)) {
                        alert('Будь ласка, введіть дійсний номер телефону.');
                        return;
                    }

                    const formData = new FormData(form);
                    formData.append('action', 'save_order_data');

                    fetch(new URL(form.getAttribute('action'), window.location.origin).href, {
                        method: form.method,
                        body: formData
                    })
                        .then(function (response) {
                            if (response.ok) {
                                showOrderSuccessModal();
                                form.reset();
                            }
                        });
                });
            });
        </script>
        <?php
        return ob_get_clean();
    }


    public function my_order_admin_menu()
    {
        add_menu_page('Замовлення', 'Замовлення', 'manage_options', 'my_order_list', array($this, 'my_order_list_page'));
    }

    public function my_order_list_page()
    {
        global $wpdb;
        $results = $wpdb->get_results("SELECT * FROM $this->table_name", ARRAY_A);

        echo '<h2>Список замовлень</h2>';

        if ($results) {
            echo '<table class="wp-list-table widefat">';
            echo '<thead>';
            echo '<tr>';
            echo '<th>ID</th>';
            echo '<th>Ім\'я</th>';
            echo '<th>Телефон</th>';
            echo '<th>Продукт</th>';
            echo '</tr>';
            echo '</thead>';
            echo '<tbody>';

            foreach ($results as $result) {
                echo '<tr>';
                echo '<td>' . $result['id'] . '</td>';
                echo '<td>' . $result['name'] . '</td>';
                echo '<td>' . $result['phone'] . '</td>';
                echo '<td>' . $result['product'] . '</td>';
                echo '</tr>';
            }

            echo '</tbody>';
            echo '</table>';
        } else {
            echo 'Жодного замовлення не знайдено.';
        }
    }

    public function save_order_data()
    {
        if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['order_data_nonce']) && wp_verify_nonce($_POST['order_data_nonce'], 'save_order_data')) {
            global $wpdb;
            $name = sanitize_text_field($_POST['name']);
            $phone = sanitize_text_field($_POST['phone']);
            $product = sanitize_text_field($_POST['product']);

            $data = array(
                'name' => $name,
                'phone' => $phone,
                'product' => $product,
            );

            $wpdb->insert($this->table_name, $data);

            // Повернення користувача на сторінку форми після збереження
            wp_redirect(home_url());
            exit;
        }
    }

    public function create_table()
    {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "CREATE TABLE IF NOT EXISTS $this->table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        phone varchar(255) NOT NULL,
        product varchar(255) NOT NULL, 
            PRIMARY KEY  (id)
        ) $charset_collate;";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    public function create_table_1()
    {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "CREATE TABLE IF NOT EXISTS $this->table_name_1 (
             id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        phone varchar(255) NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    /* CREATE TABLE IF NOT EXISTS wp_electrik_orders (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    product varchar(255) NOT NULL,
    PRIMARY KEY  (id)
    ); */
    public function register_admin_page()
    {
        add_submenu_page(
            'my_order_list',
            'Налаштування',
            'Налаштування',
            'manage_options',
            'my_order_settings',
            array($this, 'my_order_settings_page')
        );
    }

    public function my_order_settings_page()
    {
        if (!current_user_can('manage_options')) {
            return;
        }

        // Збереження налаштувань
        if (isset($_POST['submit'])) {
            update_option('phone_number', sanitize_text_field($_POST['phone_number']));

            // Збереження рядків опису і ціни
            for ($i = 1; $i <= 13; $i++) {
                $description_key = 'table_row_' . $i . '_description';
                $price_key = 'table_row_' . $i . '_price';
                update_option($description_key, sanitize_text_field($_POST[$description_key]));
                update_option($price_key, sanitize_text_field($_POST[$price_key]));
            }

            ?>
            <div class="notice notice-success is-dismissible">
                <p>
                    <?php _e('Settings saved.', 'electrik'); ?>
                </p>
            </div>
            <?php
        }

        // Відображення форми налаштувань
        ?>
        <div class="wrap">
            <h1>
                <?php echo esc_html(get_admin_page_title()); ?>
            </h1>
            <form method="post" action="">
                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="phone_number">
                                <?php _e('Phone Number', 'electrik'); ?>
                            </label></th>
                        <td><input type="text" id="phone_number" name="phone_number"
                                value="<?php echo esc_attr(get_option('phone_number')); ?>" class="regular-text"></td>
                    </tr>
                    <?php for ($i = 1; $i <= 12; $i++): ?>
                        <tr>
                            <th scope="row">
                                <label for="table_row_<?php echo $i; ?>_description">
                                    <?php _e('Опис і Ціна', 'electrik'); ?>
                                </label>
                            </th>
                            <td>
                                <input type="text" id="table_row_<?php echo $i; ?>_description"
                                    name="table_row_<?php echo $i; ?>_description"
                                    value="<?php echo esc_attr(get_option('table_row_' . $i . '_description')); ?>"
                                    placeholder="<?php echo esc_attr(__('ВСТАНОВЛЕННЯ РОЗЕТКИ', 'electrik')); ?>"
                                    class="regular-text">
                                <input type="text" id="table_row_<?php echo $i; ?>_price" name="table_row_<?php echo $i; ?>_price"
                                    value="<?php echo esc_attr(get_option('table_row_' . $i . '_price')); ?>"
                                    placeholder="<?php echo esc_attr(__('від 300 грн', 'electrik')); ?>" class="regular-text">
                            </td>
                        </tr>
                    <?php endfor; ?>
                    <!-- Додайте рядки таблиці для інших полів -->

                </table>
                <?php submit_button(__('Save Settings', 'electrik'), 'primary', 'submit', true); ?>
            </form>
        </div>
        <?php
    }

    public function activation()
    {
        $this->create_table();
        $this->create_table_1();
        flush_rewrite_rules();
    }

    public static function deactivation()
    {
        flush_rewrite_rules();
    }
}
if (class_exists('Electrik')) {
    $electrik = new Electrik();
    $electrik->register();
}
register_activation_hook(__FILE__, array($electrik, 'activation'));
register_deactivation_hook(__FILE__, array($electrik, 'deactivation'));