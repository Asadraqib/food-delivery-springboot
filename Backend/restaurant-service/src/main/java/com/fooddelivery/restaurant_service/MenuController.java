package com.fooddelivery.restaurant_service;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/restaurants/{restaurantId}/menu")
public class MenuController {

    private final MenuRepository menuRepository;

    public MenuController(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    @GetMapping
    public List<Menu> getMenu(@PathVariable String restaurantId) {
        return menuRepository.findByRestaurantId(restaurantId);
    }

    @PostMapping
    public Menu addMenuItem(@PathVariable String restaurantId, @RequestBody Menu menu) {
        menu.setRestaurantId(restaurantId);
        return menuRepository.save(menu);
    }

    @PutMapping("/{menuId}")
    public Menu updateMenuItem(@PathVariable String restaurantId, @PathVariable String menuId, @RequestBody Menu updatedMenu) {
        updatedMenu.setId(menuId);
        updatedMenu.setRestaurantId(restaurantId);
        return menuRepository.save(updatedMenu);
    }

    @DeleteMapping("/{menuId}")
    public void deleteMenuItem(@PathVariable String menuId) {
        menuRepository.deleteById(menuId);
    }
}
