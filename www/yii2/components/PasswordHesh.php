<?php
/**
 * Библиотека совместимости с API упрощенного хеширования паролей в PHP 5.5.
 *
 * @author Anthony Ferrara <ircmaxell@php.net>
 * @license http://www.opensource.org/licenses/mit-license.html MIT License
 * @copyright 2012 The Authors
 */
 
namespace app\components;
	 
use yii\base\Component;

Class PasswordHesh extends Component{

 
    /**
     * Хеширование пароля с помощью специфического алгоритма
     *
     * @param string $password хешируемый пароль
     * @param int    $algo     используемый алгоритм (определяется константами PASSWORD_*)
     * @param array  $options  параметры используемого алгоритма
     *
     * @return string|false хешируемый пароль, либо false в случае ошибки.
     */
    public function password_hash($password, $algo, array $options = array()) {
        if (!function_exists('crypt')) {
            trigger_error("Crypt должен загружаться для функции password_hash", E_USER_WARNING);
            return null;
        }
        if (!is_string($password)) {
            trigger_error("password_hash(): в качестве пароля используется строка", E_USER_WARNING);
            return null;
        }
        if (!is_int($algo)) {
            trigger_error("password_hash() ожидает параметр длины 2, " . gettype($algo) . " given", E_USER_WARNING);
            return null;
        }
        $resultLength = 0;
        switch ($algo) {
            case PASSWORD_BCRYPT:
                // обратите внимание, что это константа C, которая не представлена для PHP, определите ее здесь.
                $cost = 10;
                if (isset($options['cost'])) {
                    $cost = $options['cost'];
                    if ($cost < 4 || $cost > 31) {
                        trigger_error(sprintf("password_hash(): указан некорректный параметр оценки bcrypt: %d", $cost), E_USER_WARNING);
                        return null;
                    }
                }
                // Генерируется длина соли
                $raw_salt_len = 16;
                // Для финальной сериализации требуется значение длины
                $required_salt_len = 22;
                $hash_format = sprintf("$2y$%02d$", $cost);
                // Ожидаемая длина финального вывода crypt()
                $resultLength = 60;
                break;
            default:
                trigger_error(sprintf("password_hash(): неизвестный алгоритм хеширования пароля: %s", $algo), E_USER_WARNING);
                return null;
        }
        $salt_requires_encoding = false;
        if (isset($options['salt'])) {
            switch (gettype($options['salt'])) {
                case 'NULL':
                case 'boolean':
                case 'integer':
                case 'double':
                case 'string':
                    $salt = (string) $options['salt'];
                    break;
                case 'object':
                    if (method_exists($options['salt'], '__tostring')) {
                        $salt = (string) $options['salt'];
                        break;
                    }
                case 'array':
                case 'resource':
                default:
                    trigger_error('password_hash(): поддерживается параметр соли, отличный от строки', E_USER_WARNING);
                    return null;
            }
            if ($this->_strlen($salt) < $required_salt_len) {
                trigger_error(sprintf("password_hash(): поддерживаемая соль слишком короткая: %d expecting %d", PasswordCompat\binary\__strlen($salt), $required_salt_len), E_USER_WARNING);
                return null;
            } elseif (0 == preg_match('#^[a-zA-Z0-9./]+$#D', $salt)) {
                $salt_requires_encoding = true;
            }
        } else {
            $buffer = '';
            $buffer_valid = false;
            if (function_exists('mcrypt_create_iv') && !defined('PHALANGER')) {
                $buffer = mcrypt_create_iv($raw_salt_len, MCRYPT_DEV_URANDOM);
                if ($buffer) {
                    $buffer_valid = true;
                }
            }
            if (!$buffer_valid && function_exists('openssl_random_pseudo_bytes')) {
                $buffer = openssl_random_pseudo_bytes($raw_salt_len);
                if ($buffer) {
                    $buffer_valid = true;
                }
            }
            if (!$buffer_valid && @is_readable('/dev/urandom')) {
                $f = fopen('/dev/urandom', 'r');
                $read = $this->_strlen($buffer);
                while ($read < $raw_salt_len) {
                    $buffer .= fread($f, $raw_salt_len - $read);
                    $read = $this->_strlen($buffer);
                }
                fclose($f);
                if ($read >= $raw_salt_len) {
                    $buffer_valid = true;
                }
            }
            if (!$buffer_valid || $this->_strlen($buffer) < $raw_salt_len) {
                $bl = $this->_strlen($buffer);
                for ($i = 0; $i < $raw_salt_len; $i++) {
                    if ($i < $bl) {
                        $buffer[$i] = $buffer[$i] ^ chr(mt_rand(0, 255));
                    } else {
                        $buffer .= chr(mt_rand(0, 255));
                    }
                }
            }
            $salt = $buffer;
            $salt_requires_encoding = true;
        }
        if ($salt_requires_encoding) {
            // строка кодируется с помощью варианта Base64, используемого crypt
            $base64_digits =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            $bcrypt64_digits =
                './ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            $base64_string = base64_encode($salt);
            $salt = strtr(rtrim($base64_string, '='), $base64_digits, $bcrypt64_digits);
        }
        $salt = $this->_substr($salt, 0, $required_salt_len);

        $hash = $hash_format . $salt;

        $ret = crypt($password, $hash);

        if (!is_string($ret) || $this->_strlen($ret) != $resultLength) {
            return false;
        }

        return $ret;
    }

    /**
     * Получение информации о хеше пароля. Возвращает информационный массив, 
     * используемый для генерирования хеша пароля.
     *
     * array(
     *    'algo' => 1,
     *    'algoName' => 'bcrypt',
     *    'options' => array(
     *        'cost' => 10,
     *    ),
     * )
     *
     * @param string $hash The password hash to extract info from
     *
     * @return array The array of information about the hash.
     */
    function password_get_info($hash) {
        $return = array(
            'algo' => 0,
            'algoName' => 'unknown',
            'options' => array(),
        );
        if ($this->_substr($hash, 0, 4) == '$2y$' && $this->_strlen($hash) == 60) {
            $return['algo'] = PASSWORD_BCRYPT;
            $return['algoName'] = 'bcrypt';
            list($cost) = sscanf($hash, "$2y$%d$");
            $return['options']['cost'] = $cost;
        }
        return $return;
    }

    /**
     * Устанавливается, нужно ли повторное хеширование пароля в соответствии с заданными параметрами
     *
     * Если ответ на вопрос положителен, после проверки пароля с помощью password_verify выполняется повторное хеширование.
     *
     * @param string $hash    The hash to test
     * @param int    $algo    The algorithm used for new password hashes
     * @param array  $options The options array passed to password_hash
     *
     * @return boolean True if the password needs to be rehashed.
     */
    function password_needs_rehash($hash, $algo, array $options = array()) {
        $info = password_get_info($hash);
        if ($info['algo'] != $algo) {
            return true;
        }
        switch ($algo) {
            case PASSWORD_BCRYPT:
                $cost = isset($options['cost']) ? $options['cost'] : 10;
                if ($cost != $info['options']['cost']) {
                    return true;
                }
                break;
        }
        return false;
    }

    /**
     * Сравнение пароля с хешем с применением подхода, обеспечивающего устойчивость к временным атакам
     *
     * @param string $password The password to verify
     * @param string $hash     The hash to verify against
     *
     * @return boolean If the password matches the hash
     */
    public function password_verify($password, $hash) {
        if (!function_exists('crypt')) {
            trigger_error("Crypt must be loaded for password_verify to function", E_USER_WARNING);
          
			return false;
			
        }
        $ret = crypt($password, $hash);
		
        if (!is_string($ret) || $this->_strlen($ret) != $this->_strlen($hash) || $this->_strlen($ret) <= 13) {
	
            return false;
        }

        $status = 0;
        for ($i = 0; $i < $this->_strlen($ret); $i++) {
		
            $status |= (ord($ret[$i]) ^ ord($hash[$i]));
			
        }
 
        return $status === 0;
    }





    /**
     * Подсчет количества байтов в строке
     *
     * We cannot simply use _strlen() for this, because it might be overwritten by the mbstring extension.
     * In this case, _strlen() will count the number of *characters* based on the internal encoding. A
     * sequence of bytes might be regarded as a single multibyte character.
     *
     * @param string $binary_string The input string
     *
     * @internal
     * @return int The number of bytes
     */
  public  function _strlen($binary_string) {
           if (function_exists('mb__strlen')) {
               return mb__strlen($binary_string, '8bit');
           }
           return strlen($binary_string);
    }

    /**
     * Получение подстроки на основе байтового ограничения
     *
     * @see __strlen()
     *
     * @param string $binary_string The input string
     * @param int    $start
     * @param int    $length
     *
     * @internal
     * @return string The _substring
     */
   public function _substr($binary_string, $start, $length) {
       if (function_exists('mb_substr')) {
           return mb_substr($binary_string, $start, $length, '8bit');
       }
       return substr($binary_string, $start, $length);
   }


}