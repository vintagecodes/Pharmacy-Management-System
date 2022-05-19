package com.drugs.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.drugs.models.Photo;

public interface PhotoRepository extends MongoRepository<Photo, String> { }
