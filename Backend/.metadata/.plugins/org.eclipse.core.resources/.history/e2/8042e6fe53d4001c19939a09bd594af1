package com.drugs.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.drugs.exception.CustomException;
import com.drugs.models.Drugs;
import com.drugs.models.Inventory;
import com.drugs.models.Photo;
import com.drugs.service.DrugsService;
import com.drugs.service.PhotoService;

@RestController
@RequestMapping("/drugs")
@CrossOrigin(origins = "http://localhost:4200")
public class DrugsController {
	
	@Autowired
	private DrugsService service;    //Service
	
	@Autowired
	private PhotoService photoService;
	
	@GetMapping("/getPhotos/")
	public List<Photo> getAllPhotos(){
		return photoService.getListOfPhotos();
	}
	
	
	//Post the details related to drugs
	@PostMapping("/")
	public ResponseEntity<?> saveDrugsDetails(@RequestBody Drugs drugs) throws CustomException, Exception {
		return service.saveDrugsDetails(drugs);
	}
	
	//Get all the list of drugs available 
	@GetMapping("/list")
	public List<Drugs> getDetails(){
		return service.getAllDetails();
	}
	
	@GetMapping("/category/{categories}")
	public List<Drugs> getDrugsByCategory(@PathVariable("categories") String categories){
		return service.getDrugsByCategory(categories);
	}
	
	
	//Fetch a particular drugs using the drugs id as Path Variable
	@GetMapping("/{id}")
	public Optional<Drugs> getDrugsById(@PathVariable("id") String drugsId) throws CustomException, Exception{
		return service.getDrugsByID(drugsId);
	}
	
	
	//Get the details of the drugs having supplier Name as it Path Variable 
	@GetMapping("/name/{id}")
	public List<Drugs> getDrugsBySupplierName(@PathVariable("id") String supplierName){
		return service.getDrugsBySupplierName(supplierName);
	}
	
	@GetMapping("/drugs-name/{id}")
	public List<Drugs> getDrugsByName(@PathVariable("id") String drugsName){
		return service.getDrugsByName(drugsName);
	}
	
	
	//Get the details of the drugs and supplier having supplier Name as it Path Variable
	@GetMapping("/inventory/{id}")
	public Inventory getProductInventory(@PathVariable("id") String supplierName) throws CustomException, Exception {
		return service.getDrugsWithSupplierDetails(supplierName);
	}
	
	@PutMapping("/{id}/{username}")
	public Drugs updateDrugsFromCart(@RequestBody Drugs drugs, @PathVariable("id") String drugsId, @PathVariable("username") String username) {
		
		return service.updateDrugsByCart(username, drugsId, drugs);
		
		
	}
	
	
	
	//For updating the drugs to its respective attribute
	@PutMapping("/{id}")
	public Drugs updateSupplierDetails(@RequestBody Drugs drugs, @PathVariable("id") String drugsId) throws CustomException, Exception {
		return service.updateDrugsDetails(drugs, drugsId);
	}
	
	@PutMapping("/name/{id}")
	public Drugs updateSupplierDetail(@RequestBody Drugs drugs, @PathVariable("id") String drugsName) throws CustomException, Exception {
		return service.updateDrugsDetail(drugs, drugsName);
	}
	
	
	//Deleting the drugs respective to the specified drugs id 
	@DeleteMapping("/{id}")
	public String deleteDrugs(@PathVariable("id") String drugsId) {
		
		return service.deleteDrugs(drugsId);
		
		
	}


}
