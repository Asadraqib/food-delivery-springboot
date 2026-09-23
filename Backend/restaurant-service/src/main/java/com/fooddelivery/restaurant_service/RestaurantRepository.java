package com.fooddelivery.restaurant_service;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {

    Optional<Restaurant> findByOwnerEmail(String email);
}
