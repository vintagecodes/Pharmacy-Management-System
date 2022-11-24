package com.drugs.service;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.drugs.exception.CustomException;
import com.drugs.models.Cart;
import com.drugs.models.Drugs;
import com.drugs.models.Inventory;
import com.drugs.models.MessageResponse;
import com.drugs.models.Photo;
import com.drugs.models.Supplier;
import com.drugs.repository.DrugsRepository;

@Service
public class DrugsService {
	
	@Autowired
	private DrugsRepository drugsRepository;
	
	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;
	
	@Autowired
	private RestTemplate restTemplate;
	
	private static final Logger LOGGER=LoggerFactory.getLogger(DrugsService.class);

	public Drugs saveDrugsDetails(Drugs drugs, MultipartFile[] file) throws CustomException, Exception{
		 Set<Photo> images = uploadImage(file);
			drugs.setProductImages(images);
			LOGGER.info("Sucessfully Registered new Drug");
		drugs.setDrugsId(String.valueOf(sequenceGeneratorService.generateSequence(drugs.SEQUENCE_NAME)));
		Drugs save = this.drugsRepository.save(drugs);
		
		return save;
		
	}
	
	public Set<Photo> uploadImage(MultipartFile[] multipartFiles) throws IOException{
		Set<Photo> imageModels = new HashSet<>();
		
		for(MultipartFile file: multipartFiles) {
			Photo imageModels1 = new Photo(
					file.getOriginalFilename(),
					file.getContentType(),
					file.getBytes()
					);
			imageModels.add(imageModels1);
		}
		return imageModels;
	}

	public List<Drugs> getAllDetails() {
		return drugsRepository.findAll();
	}

	public Optional<Drugs> getDrugsByID(String drugsId) throws CustomException, Exception{
		Optional<Drugs> drugs = Optional.empty();
		try {
			if(drugsRepository.existsByDrugsId(drugsId)) {
				drugs = drugsRepository.findById(drugsId);
			}else {
				throw new CustomException("The mentioned ID is not listed");
			}
		} catch(CustomException e) {
			LOGGER.error("The mentioned ID is not listed"+e);
		}
		return drugs;
	}
	
	public List<Drugs> getDrugsBySupplierName(String supplierName){
		return drugsRepository.findBySupplierName(supplierName);
	}
	
	public List<Drugs> getDrugsByName(String drugsName){
		return drugsRepository.findByDrugsName(drugsName);
	}
	
	public List<Drugs> getDrugsByCategory(String categories){
		return drugsRepository.findBycategories(categories);
	}
	
	
	public Inventory getDrugsWithSupplierDetails(String supplierName) throws CustomException, Exception {
		String name = null;
		Inventory response = new Inventory();
		try {
			if(drugsRepository.existsBySupplierName(supplierName)) {
				List<Drugs> drugs = drugsRepository.findBySupplierName(supplierName);
				for(Drugs var : drugs) {
					 name = var.getSupplierName();
				}
				
			
				
				Supplier supplier = restTemplate.getForObject("http://SUPPLIER-SERVICE/supplier/details/"+ name, Supplier.class);
				response.setDrugs(drugs);
				response.setSupplier(supplier);
			}else {
				LOGGER.error("The result could not be fetched");
				throw new CustomException("The supplierName couldn't be fetched");
			}
		} catch(CustomException e) {
			LOGGER.error("The supplierName couldn't be fetched"+e);
		}
		
		return response;
				
		
	}
	
	
	public Drugs updateDrugsByCart(String username, String drugsId, Drugs drugs) {
		
		Cart cart = restTemplate.getForObject("http://DRUGS-MICROSERVICE/drugs/cart/username/"+drugsId+"/"+username, Cart.class);
		int x = cart.getDrugsQty();
		
		Drugs drugs1 = restTemplate.getForObject("http://DRUGS-MICROSERVICE/drugs/"+drugsId,Drugs.class);
		int y = drugs1.getStockQty();
		
		int z = y - x;
		
		drugs.setStockQty(z);
		
		drugsRepository.save(drugs);
		
		return drugs;
		
		
	}
	
	
	public Drugs updateDrugsDetails(Drugs drugs, String drugsId) throws CustomException, Exception{
		Drugs storingVar = new Drugs();
			storingVar = drugsRepository.save(drugs);
		
		return storingVar;
	}
	

	public String deleteDrugs(String drugsId) {
		drugsRepository.deleteById(drugsId);
		return "Deleted Successfully";
	}
	

}
