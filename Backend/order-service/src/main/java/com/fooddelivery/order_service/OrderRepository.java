package com.fooddelivery.order_service;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerEmail(String email);

    List<Order> findByRestaurantId(Long restaurantId);

    List<Order> findByStatusIn(List<OrderStatus> statuses);
}