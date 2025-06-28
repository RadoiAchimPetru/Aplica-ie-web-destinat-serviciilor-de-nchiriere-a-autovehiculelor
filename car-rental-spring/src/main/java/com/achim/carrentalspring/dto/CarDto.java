package com.achim.carrentalspring.dto;

import com.achim.carrentalspring.entity.Car;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CarDto {
    private Long id;
    private String brand;
    private String color;
    private String name;
    private String type;
    private String transmission;
    private String description;
    private Long price;
    private Integer year;
    private MultipartFile image;      // ⬅ rămâne util la upload
    private byte[] returnedImage;     // ⬅ trimitem spre front

    /* ─────────  metoda utilitară  ───────── */
    public static CarDto from(Car c) {
        CarDto dto = new CarDto();
        dto.setId(c.getId());
        dto.setBrand(c.getBrand());
        dto.setColor(c.getColor());
        dto.setName(c.getName());
        dto.setType(c.getType());
        dto.setTransmission(c.getTransmission());
        dto.setDescription(c.getDescription());
        dto.setPrice(c.getPrice());
        dto.setYear(c.getYear());
        dto.setReturnedImage(c.getImage());      // ← deja byte[]
        return dto;
    }
}