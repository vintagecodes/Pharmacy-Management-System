package com.drugs.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="drugs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Drugs {
	@Id
	private String drugsId;
	private String drugsName;
	private double drugsCost;
	private int stockQty;
	private String categories;
	private String drugsDescription;
	private String supplierName;
	
	

}
