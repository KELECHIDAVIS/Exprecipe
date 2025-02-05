package exprecipe_backend.springboot.entity; 

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "ingredient")
public class Ingredient {
    @Id
    private Integer id; // id for database 
    private String name; 
    private String imageURL; 
    private Integer spoonacularID; // id given from spoonacular api 
    private LocalDateTime createdAt; 
    private LocalDateTime updatedAt; 
    private String uuid; // a unique user id that ties this ingredient to a specific user
}
