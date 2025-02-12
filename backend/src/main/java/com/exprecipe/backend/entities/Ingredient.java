package com.exprecipe.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "ingredients")
public class Ingredient {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id; // database id 
  
  private String uuid ; // user that this ingredient is associated with
  private String name;
  private String imageURL; 
  private Integer spID; // spoonacular api id 
  
  // Hibernate expects entities to have a no-arg constructor,
  // though it does not necessarily have to be public.
  public Ingredient() {}
  
  public Ingredient(String uuid, String name, String imageURL, Integer spID) {
    this.uuid = uuid;
    this.name = name;
    this.imageURL = imageURL;
    this.spID = spID;
  }



  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  public String getImageURL() {
    return imageURL;
  }

  public void setImageURL(String imageURL) {
    this.imageURL = imageURL;
  }

  public Integer getSpID() {
    return spID;
  }

  public void setSpID(Integer spID) {
    this.spID = spID;
  }

}