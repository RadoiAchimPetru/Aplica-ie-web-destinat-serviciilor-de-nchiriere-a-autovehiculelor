package com.achim.carrentalspring.services.admin;

import com.achim.carrentalspring.dto.BookACarDto;
import com.achim.carrentalspring.dto.CarDto;
import com.achim.carrentalspring.dto.CarDtoListDto;
import com.achim.carrentalspring.dto.SearchCarDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {
    boolean postCar(CarDto carDto) throws IOException;

    List<CarDto> getAllCars();

    void deleteCar(Long id);

    CarDto getCarById(Long id);

    boolean updateCar(Long id, CarDto carDto) throws IOException;

    List<BookACarDto> getBookings();


    boolean changeBookingStatus(Long id, String status);

    CarDtoListDto searchCar(SearchCarDto searchCarDto);
}
