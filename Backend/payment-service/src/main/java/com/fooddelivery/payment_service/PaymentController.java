package com.fooddelivery.payment_service;

import com.razorpay.RazorpayClient;
import com.razorpay.Order;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import com.razorpay.Utils;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @PostMapping("/create")
    public String createOrder(@RequestBody PaymentRequest request) throws Exception {
        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject options = new JSONObject();
        options.put("amount", request.getAmount() * 100); // Razorpay uses paise, not rupees
        options.put("currency", "INR");
        options.put("receipt", "order_rcpt_" + System.currentTimeMillis());

        Order order = client.orders.create(options);
        return order.toString();
    }
}

@PostMapping("/verify")
public String verifyPayment(@RequestBody VerifyRequest request) {
    try {
        JSONObject options = new JSONObject();
        options.put("razorpay_order_id", request.getOrderId());
        options.put("razorpay_payment_id", request.getPaymentId());
        options.put("razorpay_signature", request.getSignature());

        boolean isValid = Utils.verifyPaymentSignature(options, keySecret);
        return isValid ? "Payment verified successfully" : "Payment verification failed";
    } catch (Exception e) {
        return "Verification error: " + e.getMessage();
    }
}