package com.fooddelivery.restaurant_service;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "menu")
public class Menu {
    @Id
    private String id;
    private String restaurantId;
    private String name;
    private double price;
    private String description;

    public Menu() {}

    public Menu(String restaurantId, String name, double price, String description) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.price = price;
        this.description = description;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getRestaurantId() { return restaurantId; }
    public void setRestaurantId(String restaurantId) { this.restaurantId = restaurantId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
