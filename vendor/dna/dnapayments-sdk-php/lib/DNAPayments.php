<?php

namespace DNAPayments;

use DNAPayments\Util\Scope;
use DNAPayments\Util\HTTPRequester;
use DNAPayments\Util\LZCompressor\LZString;
use mysql_xdevapi\Exception;

class DNAPayments {
    public function __construct($config = null) {
        self::configure($config);
    }

    private static $config = [
        'isTestMode' => false,
        'scopes' => []
    ];
    private static $fields = [
        'authUrl' => 'https://oauth.dnapayments.com/oauth2/token',
        'testAuthUrl' => 'https://test-oauth.dnapayments.com/oauth2/token',
        'testPaymentUrl' => 'https://test-pay.dnapayments.com',
        'paymentUrl' => 'https://pay.dnapayments.com',
        'testApiUrl' => 'https://test-api.dnapayments.com',
        'apiUrl' => 'https://api.dnapayments.com'
    ];


    private static function configure($config) {
        if(empty($config)) return;
        if(array_key_exists('isTestMode', $config)) {
            self::$config['isTestMode'] = $config['isTestMode'];
        }
        if(array_key_exists('scopes', $config)) {
            self::$config['scopes'] = $config['scopes'];
        }
    }

    private static function encodeToUrl($data)
    {
        return base64_encode(LZString::compressToEncodedURIComponent(json_encode($data)));
    }

    private static function getPath()
    {
        if (self::$config['isTestMode']) {
            return (object) [
                'authUrl' => self::$fields['testAuthUrl'],
                'paymentUrl' => self::$fields['testPaymentUrl'],
                'apiUrl' => self::$fields['testApiUrl'],
            ];
        }
        return (object) [
            'authUrl' => self::$fields['authUrl'],
            'paymentUrl' => self::$fields['paymentUrl'],
            'apiUrl' => self::$fields['apiUrl']
        ];
    }

    private function authApi($data) {
        try {
            $authData = [
                'grant_type' => 'client_credentials',
                'scope' => 'webapi',
                'client_id' => $data['client_id'],
                'client_secret' => $data['client_secret'],
                'terminal' => $data['terminal'],
                'invoiceId' => strval($data['invoiceId']),
                'amount' => floatval($data['amount']),
                'currency' => strval($data['currency'])
            ];

            $response = HTTPRequester::HTTPPost(self::getPath()->authUrl, [], $authData);
            if ($response != null && $response['status'] >= 200 && $response['status'] < 400) {
                return $response['response'];
            }

            throw new \Exception('Error: No auth service');
        } catch (Exception $e) {
            throw $e;
        }
    }

    private function refundRequest($token, $transaction_id, $amount) {
        try {
            $refundData = [
                'id' => $transaction_id,
                'amount' => floatval($amount)
            ];
            $response = HTTPRequester::HTTPPost(self::getPath()->apiUrl . '/transaction/operation/refund', array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json'
            ), json_encode($refundData));

            if ($response != null && $response['status'] >= 200 && $response['status'] < 400) {
                return $response['response'];
            }
            throw new \Exception('Error: Refund request error');
        } catch (Exception $e) {
            throw $e;
        }
    }


    public function refund($data) {
        $auth = self::authApi($data);
        return self::refundRequest($auth['access_token'], $data['transaction_id'], $data['amount']);
    }

    private function cancelRequest($token, $transaction_id) {
        try {
            $response = HTTPRequester::HTTPPost(self::getPath()->apiUrl . '/transaction/operation/cancel', array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json'
            ), json_encode([
                'id' => $transaction_id
            ]));

            if ($response != null && $response['status'] >= 200 && $response['status'] < 400) {
                return $response['response'];
            }
            throw new \Exception('Error: Cancel request error');
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function cancel($data) {
        $auth = self::authApi($data);
        return self::cancelRequest($auth['access_token'], $data['transaction_id']);
    }

    private function chargeRequest($token, $transaction_id, $amount) {
        try {
            $chargeData = [
                'id' => $transaction_id,
                'amount' => floatval($amount)
            ];
            $response = HTTPRequester::HTTPPost(self::getPath()->apiUrl . '/transaction/operation/charge', array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json'
            ), json_encode($chargeData));

            if ($response != null && $response['status'] >= 200 && $response['status'] < 400) {
                return $response['response'];
            }
            throw new \Exception('Error: Charge request error');
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function charge($data) {
        $auth = self::authApi($data);
        return self::chargeRequest($auth['access_token'], $data['transaction_id'], $data['amount']);
    }

    public static function auth($data) {
        try {
            $authData = [
                'grant_type' => 'client_credentials',
                'scope' => Scope::getScopes(self::$config['scopes']),
                'client_id' => $data['client_id'],
                'client_secret' => $data['client_secret'],
                'terminal' => $data['terminal'],
                'invoiceId' => strval($data['invoiceId']),
                'amount' => floatval($data['amount']),
                'currency' => strval($data['currency'])
            ];

            $response = HTTPRequester::HTTPPost(self::getPath()->authUrl, [], $authData);
            if ($response != null && $response['status'] >= 200 && $response['status'] < 400) {
                return $response['response'];
            }
            throw new \Exception('Error: No auth service');

        } catch (Exception $e) {
            throw $e;
        }
    }

    public static function getBaseUrl() {
        return sprintf(
            "%s://%s%s",
            isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
            $_SERVER['SERVER_NAME'],
            $_SERVER['REQUEST_URI']
        );
    }

    public static function generateUrl($order, $authToken)
    {
        return self::getPath()->paymentUrl . '/checkout/?params=' . self::encodeToUrl((object) [
                'auth' => $authToken,
                'invoiceId' => strval($order['invoiceId']),
                'terminal' => $order['terminal'],
                'amount' => floatval($order['amount']),
                'currency' => strval($order['currency']),
                'postLink' => strval($order['postLink']),
                'failurePostLink' => strval($order['failurePostLink']),
                'backLink' => strval($order['backLink']),
                'failureBackLink' => strval($order['failureBackLink']),
                'language' => array_key_exists('language', $order) ? strval($order['language']) : 'eng',
                'description' => strval($order['description']),
                'accountId' => $order['accountId'],
                'accountCountry' => $order['accountCountry'],
                'accountCity' => $order['accountCity'],
                'accountStreet1' => $order['accountStreet1'],
                'accountEmail' => $order['accountEmail'],
                'accountFirstName' => $order['accountFirstName'],
                'accountLastName' => $order['accountLastName'],
                'accountPostalCode' => $order['accountPostalCode']
            ]) . '&data=' . self::encodeToUrl((object) [
                'isTest' => self::$config['isTestMode']
            ]);
    }

    public static function isValidSignature($result, $secret)
    {
        $string = $result['id'] . $result['amount'] . $result['currency'] . $result['invoiceId'] . $result['errorCode'] . json_encode($result['success']);
        return base64_encode(hash_hmac('sha256', $string, $secret, true)) == $result['signature'];
    }
}