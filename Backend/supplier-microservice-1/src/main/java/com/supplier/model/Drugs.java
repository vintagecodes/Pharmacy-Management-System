package com.supplier.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Drugs {
	private String drugsId;
	private String drugsName;
	private double drugsCost;
	private int drugsQty;
	private String drugsDescription;
	private String supplierName;
	
	

}
