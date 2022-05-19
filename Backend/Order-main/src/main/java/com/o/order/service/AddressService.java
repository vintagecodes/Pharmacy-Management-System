package com.o.order.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.drugs.exception.CustomException;
import com.o.order.entity.Address;
import com.o.order.entity.MessageResponse;
import com.o.order.repository.AddressRepository;

@Service
public class AddressService {
	
	@Autowired
	private AddressRepository addressRepository;
	
	private static final Logger LOGGER=LoggerFactory.getLogger(AddressService.class);
	
	public Address saveAddressDetails(Address address) {
		return addressRepository.save(address);
	}
	
	
	public List<Address> getAllDetails() {
		return addressRepository.findAll();
	}
	
	public List<Address> getByUserName(String username){
		return addressRepository.findByUsername(username);
	}
}
