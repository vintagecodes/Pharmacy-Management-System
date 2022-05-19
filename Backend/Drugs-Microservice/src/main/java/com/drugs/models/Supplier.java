package com.drugs.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Supplier {
	@Id
	private String supplierId;
	private String supplierName;
	@JsonIgnore
	private String email;
	@JsonIgnore
	private List<String> availableDrugs;
	
}
