package com.exprecipe.backend.ingredient;

import io.github.bucket4j.Bucket;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;




class PricingPlanService {
    
    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();

    public Bucket resolveBucket(String isPremium) {
        return cache.computeIfAbsent(isPremium, this::newBucket);
    }

    private Bucket newBucket(String isPremium) {
        if(isPremium.equals("false"))
            return Bucket.builder().addLimit(limit -> limit.capacity(5).refillGreedy(5, Duration.ofDays(1))).build();
        
        return Bucket.builder().addLimit(limit -> limit.capacity(10).refillGreedy(10, Duration.ofDays(1))).build();
    }
}