package com.o.order.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.drugs.exception.CustomException;
import com.o.order.entity.Address;
import com.o.order.service.AddressService;

@RestController
@RequestMapping("/address")
@CrossOrigin(origins = "http://localhost:4200/")
public class AddressController {
	
	@Autowired
	private AddressService addressService;
	
	@PostMapping("/")
	public Address postAddress(@RequestBody Address address) throws CustomException, Exception{
		return addressService.saveAddressDetails(address);
	}
	
	@GetMapping("/list")
	public List<Address> getAllDetails(){
		return addressService.getAllDetails();
	}
	
	@GetMapping("/{username}")
	public List<Address> getByUsername(@PathVariable("username") String username){
		return addressService.getByUserName(username);
	}

}
