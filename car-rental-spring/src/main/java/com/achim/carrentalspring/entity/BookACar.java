package com.achim.carrentalspring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.achim.carrentalspring.dto.BookACarDto;
import com.achim.carrentalspring.enums.BookCarStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Data
public class BookACar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date fromDate;
    private Date toDate;
    private Long days;
    private Long price;
    private BookCarStatus bookCarStatus;

    @Column(nullable = false)
    private Boolean paid = false;

    @Column(nullable = false)
    private Integer priceCents;

    @Column(name = "return_lat")
    private Double returnLat;

    @Column(name = "return_lng")
    private Double returnLng;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore // @JsonIgnore is used to ignore the user field when serializing the object to JSON.
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "car_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)

    @JsonIgnore
    private Car car;

    public BookACarDto getBookACarDto() {
        BookACarDto bookACarDto = new BookACarDto();
        bookACarDto.setId(this.id);
        bookACarDto.setDays(this.days);
        bookACarDto.setBookCarStatus(this.bookCarStatus);
        bookACarDto.setPrice(this.price);
        bookACarDto.setToDate(this.toDate);
        bookACarDto.setFromDate(this.fromDate);
        bookACarDto.setEmail(this.user.getEmail());
        bookACarDto.setUsername(this.user.getName());
        bookACarDto.setUserId(this.user.getId());
        bookACarDto.setCarId(this.car.getId());


        return bookACarDto;
    }
    public boolean isPaid() {        // IDE nu o mai marchează ca missing
        return Boolean.TRUE.equals(paid);
    }
    public void markAsPaid() {
        this.paid = true;
    }
    public int getPriceCents() {
        return priceCents;
    }

}
