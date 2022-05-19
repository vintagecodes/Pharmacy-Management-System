package com.drugs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.drugs.models.Drugs;

@Repository
public interface DrugsRepository extends MongoRepository<Drugs, String>{
	
	
	//Custom method for finding the drugs with respective to the provided supplier Name
	
	List<Drugs> findByDrugsName(String drugsName);
	
	
	List<Drugs> findBySupplierName(String supplierName);
	
	Boolean existsBySupplierName(String supplierName);
	Boolean existsByDrugsId(String drugsId);


	List<Drugs> findBycategories(String categories);

}
