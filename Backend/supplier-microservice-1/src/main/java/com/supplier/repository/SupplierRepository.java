package com.supplier.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.supplier.model.Supplier;

@Repository
public interface SupplierRepository extends MongoRepository<Supplier, String> {
	Supplier findBySupplierId(String supplierId);
	Supplier findBySupplierName(String supplierName);
	Boolean existsBySupplierId(String supplierId);
	Boolean existsByEmail(String email);
	Boolean existsBySupplierName(String supplierName);

}
