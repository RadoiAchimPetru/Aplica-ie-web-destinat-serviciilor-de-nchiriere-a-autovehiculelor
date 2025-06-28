package com.achim.carrentalspring.services.customer;

import com.achim.carrentalspring.dto.BookACarDto;
import com.achim.carrentalspring.dto.CarDto;
import com.achim.carrentalspring.entity.BookACar;
import com.achim.carrentalspring.entity.Car;
import com.achim.carrentalspring.entity.User;
import com.achim.carrentalspring.enums.BookCarStatus;
import com.achim.carrentalspring.repository.BookACarRepository;
import com.achim.carrentalspring.repository.CarRepository;
import com.achim.carrentalspring.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomerServiceImpl implements CustomerService {
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final BookACarRepository bookACarRepository;

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }

    @Override
    public Long bookACar(BookACarDto dto) {

        Car car   = carRepository.findById(dto.getCarId())
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        BookACar booking = new BookACar();
        booking.setUser(user);
        booking.setCar(car);
        booking.setBookCarStatus(BookCarStatus.PENDING);

        booking.setFromDate(dto.getFromDate());
        booking.setToDate(dto.getToDate());

        long days = ChronoUnit.DAYS.between(
                dto.getFromDate().toInstant(),
                dto.getToDate().toInstant()) + 1;

        booking.setDays(days);

        double price = days * car.getPrice();     // preț în $
        booking.setPrice((long) price);

        int priceCents = (int) (price * 100);
        booking.setPriceCents(priceCents);

        booking.setPaid(false);

        bookACarRepository.save(booking);
        return booking.getId();
    }

    @Override
    public CarDto getCarById(Long id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        return optionalCar.map(Car::getCarDto).orElse(null);
    }

    @Override
    public List<BookACarDto> getBookingsByUserId(Long userId) {
        return bookACarRepository.findAllByUserId(userId).stream().map(BookACar::getBookACarDto).collect(Collectors.toList());
    }
}
