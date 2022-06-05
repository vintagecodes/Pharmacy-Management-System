package com.supplier.controller;

import java.io.IOException;
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

import com.supplier.model.Supplier;

import com.supplier.service.SupplierService;


@RestController
@RequestMapping("/supplier")
@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600)
public class SupplierController {
	
	@Autowired
	private SupplierService supplierService;

	
	
	@PostMapping("/")
	public ResponseEntity<?> saveSupplierInfo(@RequestBody Supplier supplier) {
		ResponseEntity<?> save = supplierService.saveSupplierInfo(supplier);
		return ResponseEntity.ok(save);
		
	}
	
	@GetMapping("/list")
	public List<Supplier> getDetails(){
		return supplierService.getAllDetails();
	}
	
	@GetMapping("/{id}")
	public Supplier getDepartmentById(@PathVariable("id") int supplierId) throws CustomException, Exception{
		return supplierService.getSupplierByID(supplierId);
	}
	
	@GetMapping("/details/{id}")
	public Supplier getSupplierDetailsByName(@PathVariable("id") String supplierName){
		return supplierService.getSupplierByName(supplierName);
	}
	
//	@GetMapping("/inventory/{id}")
//	public Inventory getSupplierWithDrugsDetails(@PathVariable("id") String supplierName) throws CustomException, Exception {
//		return supplierService.getSupplierWithDrugsDetails(supplierName);
//	}
	

	@PutMapping("/{id}")
	public Supplier updateSupplierDeytails(@RequestBody Supplier supplier, @PathVariable("id") int supplierId) {
		return supplierService.updateSupplierDetails(supplier);
	}
	
	@DeleteMapping("/{id}")
	public String deleteSupplier(@PathVariable("id") int supplierId) {
		
		return supplierService.deleteSupplier(supplierId);
		
		
	}



}
