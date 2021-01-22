<?php

class CreditCard {

    const MASTERCARD = 'mastercard';
    const VISA = 'visa';
    const AMERICAN_EXPRESS = 'american_express';
    const DINERS_CLUB = 'diners_club';
    const DISCOVER = 'discover';
    const JCB = 'jcb';
    const HIPERCARD = 'hipercard';
    const AURA = 'aura';
    const ELO = 'elo';
    const HIPER_ITAU = 'hiper_itau';

    private $bins = [
        self::MASTERCARD => '/^(5[0-9]|2[2-7])/',
        self::VISA => '/^4/',
        self::AMERICAN_EXPRESS => '/^3[47][0-9]/',
        self::DINERS_CLUB => '/^3(?:0[0-5]|[68]\d)\d/',
        self::DISCOVER => '/^6([045]|22)/',
        self::JCB => '/^35/',
        self::HIPERCARD => '/^(606282)|(3841)/',
        self::AURA => '/^50[0-9]/',
        self::ELO => '/(4011|431274|438935|451416|457393|4576|457631|457632|504175|627780|636297|636368|636369|(6503[1-3])|(6500(3[5-9]|4[0-9]|5[0-1]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(650(48[5-9]|49[0-9]|50[0-9]|51[1-9]|52[0-9]|53[0-7]))|(6505(4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(6507(2[0-7]))|(650(90[1-9]|91[0-9]|920))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[1-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8]))|(506(699|77[0-8]|7[1-6][0-9))|(509([0-9][0-9][0-9])))/'
    ];

    public static function getBrand($cardNumber) {
        return (new CreditCard)->verifyBrand($cardNumber);
    }

    private function verifyBrand($cardNumber) {
        switch ($cardNumber) {
            case $this->getBrandPattern($this::AMERICAN_EXPRESS, $cardNumber):
                return $this::AMERICAN_EXPRESS;
                break;
            case $this->getBrandPattern($this::VISA, $cardNumber):
                return $this::VISA;
                break;
            case $this->getBrandPattern($this::MASTERCARD, $cardNumber):
                return $this::MASTERCARD;
                break;
            case $this->getBrandPattern($this::DISCOVER, $cardNumber):
                return $this::DISCOVER;
                break;
            case $this->getBrandPattern($this::ELO, $cardNumber):
                return $this::ELO;
                break;
            case $this->getBrandPattern($this::AURA, $cardNumber):
                return $this::AURA;
                break;
            case $this->getBrandPattern($this::JCB, $cardNumber):
                return $this::JCB;
                break;
            case $this->getBrandPattern($this::HIPERCARD, $cardNumber):
                return $this::HIPERCARD;
                break;
            case $this->getBrandPattern($this::HIPER_ITAU, $cardNumber):
                return $this::HIPER_ITAU;
                break;
            case $this->getBrandPattern($this::DINERS_CLUB, $cardNumber):
                return $this::DINERS_CLUB;
                break;
            default:
                return 'brand not found';
                break;
        }
    }

    private function getBrandPattern($pattern, $cardNumber) 
    {
        return preg_match($this->bins[$pattern], $cardNumber) > 0;
    }
}
