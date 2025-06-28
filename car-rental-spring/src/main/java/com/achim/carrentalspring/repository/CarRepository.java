package com.achim.carrentalspring.repository;

import com.achim.carrentalspring.entity.Car;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findTop5ByNameContainingIgnoreCaseOrBrandContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String kw1, String kw2, String kw3, Pageable pageable);

    @Query("""
    SELECT c FROM Car c
    WHERE lower(c.name)        LIKE lower(concat('%', :kw, '%'))
       OR lower(c.brand)       LIKE lower(concat('%', :kw, '%'))
       OR lower(c.description) LIKE lower(concat('%', :kw, '%'))
""")
    List<Car> fullText(@Param("kw") String keyword);



    @Query("""
        SELECT c FROM Car c
        WHERE (:brand        IS NULL OR lower(c.brand)        = lower(:brand))
          AND (:type         IS NULL OR lower(c.type)         = lower(:type))
          AND (:transmission IS NULL OR lower(c.transmission) = lower(:transmission))
          AND (:color        IS NULL OR lower(c.color)        = lower(:color))
    """)
    List<Car> findByFilters(@Param("brand")        String brand,
                            @Param("type")         String type,
                            @Param("transmission") String transmission,
                            @Param("color")        String color);
}

