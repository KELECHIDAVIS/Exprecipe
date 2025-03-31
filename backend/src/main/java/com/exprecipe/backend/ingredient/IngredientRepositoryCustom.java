package com.exprecipe.backend.ingredient;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class IngredientRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @PostConstruct
    @Transactional
    public void initDatabase() {
        entityManager.createNativeQuery("CREATE EXTENSION IF NOT EXISTS pg_trgm;").executeUpdate();
        entityManager.createNativeQuery("CREATE INDEX IF NOT EXISTS ingredient_name_trgm_idx ON ingredient USING gin (name gin_trgm_ops);").executeUpdate();
    }
}