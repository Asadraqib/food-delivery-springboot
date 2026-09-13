package com.fooddelivery.restaurant_service;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

    private final RestaurantRepository restaurantRepository;

    public RestaurantController(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @GetMapping
    public List<Restaurant> getAll() {
        return restaurantRepository.findAll();
    }

    @GetMapping("/{id}")
    public Restaurant getOne(@PathVariable Long id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Restaurant create(@RequestBody Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    @PutMapping("/{id}")
    public Restaurant update(@PathVariable Long id, @RequestBody Restaurant updated) {
        updated.setId(id);
        return restaurantRepository.save(updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        restaurantRepository.deleteById(id);
    }
}