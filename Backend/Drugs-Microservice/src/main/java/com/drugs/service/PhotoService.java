package com.drugs.service;

import java.io.IOException;
import java.util.List;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.drugs.models.Photo;
import com.drugs.repository.PhotoRepository;

@Service
public class PhotoService {
	
	@Autowired
    private PhotoRepository photoRepo;



    public Photo getPhoto(String id) { 
        return photoRepo.findById(id).get(); 
    }
    
    public List<Photo> getListOfPhotos(){
    	return photoRepo.findAll();
    }

}
