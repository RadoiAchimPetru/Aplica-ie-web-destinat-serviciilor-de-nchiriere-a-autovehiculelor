package com.achim.carrentalspring.controller;

import com.achim.carrentalspring.dto.BookACarDto;
import com.achim.carrentalspring.dto.CarDto;
import com.achim.carrentalspring.services.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;


    @GetMapping("/cars")
    public ResponseEntity<List<CarDto>> getAllCars() {
        return ResponseEntity.ok(customerService.getAllCars());
    }

    public record BookingIdDto(Long id) {}
    @PostMapping("/car/book")
    public ResponseEntity<BookingIdDto> bookACar(@RequestBody BookACarDto dto) {
        Long id = customerService.bookACar(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BookingIdDto(id));
    }

    @GetMapping("/car/{carId}")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long carId) {
        CarDto carDto = customerService.getCarById(carId);

        if (carDto != null) {
            return ResponseEntity.ok(carDto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/car/bookings/{userId}")
    public ResponseEntity<List<BookACarDto>> getBookingsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(customerService.getBookingsByUserId(userId));
    }
}
