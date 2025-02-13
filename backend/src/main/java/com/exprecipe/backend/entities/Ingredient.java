package com.exprecipe.backend.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



/**
 * An entity class represents a table in a relational database
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "ingredients")
public class Ingredient {

    @Id
    private Integer id; // db id
    private String uuid; //user ingredient is associated with
    private Integer spID; // id from api
    private String ingrName;
    private String imageURL;



}