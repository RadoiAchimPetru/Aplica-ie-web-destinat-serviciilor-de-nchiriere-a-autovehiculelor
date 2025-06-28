package com.achim.carrentalspring.controller;

import com.achim.carrentalspring.dto.CarDto;
import com.achim.carrentalspring.dto.CarFilterDto;
import com.achim.carrentalspring.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer/cars/search")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class CarSearchController {

    private final CarRepository repo;
    private static String blankToNull(String s) {
        return (s == null || s.isBlank()) ? null : s.trim();
    }

    @PostMapping
    public List<CarDto> filter(@RequestBody CarFilterDto dto) {

        return repo.findByFilters(
                        blankToNull(dto.brand()),
                        blankToNull(dto.type()),
                        blankToNull(dto.transmission()),
                        blankToNull(dto.color())
                ).stream()
                .map(CarDto::from)
                .toList();
    }

    @GetMapping("/keyword")
    public List<CarDto> keyword(@RequestParam("q") String q) {
        return repo.fullText(q)
                .stream()
                .map(CarDto::from)
                .toList();
    }
}


