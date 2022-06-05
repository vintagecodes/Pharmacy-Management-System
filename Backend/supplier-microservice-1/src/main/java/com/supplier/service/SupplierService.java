package com.supplier.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import com.supplier.model.MessageResponse;
import com.supplier.model.Supplier;
import com.supplier.repository.SupplierRepository;


@Service
public class SupplierService {
	@Autowired
	private SupplierRepository supplierRepository;
	
	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;

	
	private static final Logger LOGGER=LoggerFactory.getLogger(SupplierService.class);
	
	
	@Autowired
	private RestTemplate restTemplate;
	
	public ResponseEntity<?> saveSupplierInfo(Supplier supplier) {
		if(this.supplierRepository.existsBySupplierName(supplier.getSupplierName())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Supplier Name is already taken!"));
		}
		else if(this.supplierRepository.existsByEmail(supplier.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already taken!"));
		}
		supplier.setSupplierId(sequenceGeneratorService.generateSequence(Supplier.SEQUENCE_NAME));
		Supplier save = this.supplierRepository.save(supplier);
		return ResponseEntity.ok(save);
		
	}
	
	public List<Supplier> getAllDetails() {
		
		return supplierRepository.findAll();
		
	}
	
	public Supplier getSupplierByID(int supplierId) throws CustomException, Exception{
		Supplier s = null;
		try {
			if(supplierRepository.existsBySupplierId(supplierId)) {
				
				s = supplierRepository.findBySupplierId(supplierId);
			}
			throw new CustomException(supplierId);
			
		} catch(CustomException e) {
			LOGGER.error("Supplier couldn't be found: "+e);
		}
		return s;
		
	}
	
	public Supplier getSupplierByName(String supplierName){
		return supplierRepository.findBySupplierName(supplierName);
	}

	
//	public Inventory getSupplierWithDrugsDetails(String supplierName) throws CustomException, Exception {
//		
//		Inventory response = new Inventory();
//		try {
//			if(supplierRepository.existsBySupplierName(supplierName)) {
//				Supplier supplier = supplierRepository.findBySupplierName(supplierName);
//				Drugs drugs =  restTemplate.getForObject("http://DRUGS-MICROSERVICE/drugs/name/"+ supplier.getSupplierName(), Drugs.class);
//				response.setSupplier(supplier);
//				
//				response.setDrugs(drugs);
//				
//			} else {
//				LOGGER.error("The result could not be fetched");
//				throw new CustomException("The supplierName couldn't be fetched");
//			}
//		
//		} catch(CustomException e) {
//			LOGGER.error("The supplierName couldn't be fetched"+e);
//		}
//		return response;
//				
//		
//	}
	
	
	
	
	
	
	public Supplier updateSupplierDetails(Supplier supplier) {
		supplier.setSupplierId(supplier.getSupplierId());
		supplier.setSupplierName(supplier.getSupplierName());
		supplier.setEmail(supplier.getEmail());
		supplier.setAvailableDrugs(supplier.getAvailableDrugs());
		return supplierRepository.save(supplier);
	}

	public String deleteSupplier(int supplierId) {
		supplierRepository.deleteById(supplierId);
		return "Deleted Successfully";
		
	}
}
