package com.drugs.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.drugs.models.Photo;
import com.drugs.service.PhotoService;

@RequestMapping("/photos")
@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class PhotoController {
	
	@Autowired
	private PhotoService photoService;
	
	@GetMapping("/")
	public String getHome() {
		return "photos";
	}
	

//	@GetMapping("/{id}")
//	public String getPhoto(@PathVariable String id, Model model) {
//	    Photo photo = photoService.getPhoto(id);
//	    model.addAttribute("title", photo.getTitle());
//	    model.addAttribute("image", 
//	      Base64.getEncoder().encodeToString(photo.getImage().getData()));
//	    return "photoView";
//	}
	
	@GetMapping("/img/")
	public List<Photo> getListOfPhotos(){
		return photoService.getListOfPhotos();
	}

}
