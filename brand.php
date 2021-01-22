<?php
require 'credit.php';
header('Content-Type: application/json');
try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if($data['cardNumber']) {
        echo json_encode(Array('status' => 'success', 'brand' => CreditCard::getBrand(str_replace(' ', '', $data['cardNumber']))));
    }else {
        echo json_encode(Array('status' => 'error', 'error_message' => 'cardNumber not found on JSON'));
    }
} catch (\Exception $ex) {
    echo json_encode(Array('status' => 'error', 'error_message' => $ex->getMessage()));
}
