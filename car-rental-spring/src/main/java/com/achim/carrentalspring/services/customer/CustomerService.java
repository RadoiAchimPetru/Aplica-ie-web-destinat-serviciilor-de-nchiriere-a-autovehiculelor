package com.achim.carrentalspring.services.customer;

import com.achim.carrentalspring.dto.BookACarDto;
import com.achim.carrentalspring.dto.CarDto;

import java.util.List;

public interface CustomerService {
    List<CarDto> getAllCars();



    CarDto getCarById(Long id);

    List<BookACarDto> getBookingsByUserId(Long id);

    Long bookACar(BookACarDto dto);
}
