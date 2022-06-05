package com.supplier.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="supplier")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Supplier {
	
	@Transient
	public static final String SEQUENCE_NAME = "supplier_sequence";
	
	@Id
	private int supplierId;
	private String supplierName;
	private String email;
	private String availableDrugs;	
	
	
}
