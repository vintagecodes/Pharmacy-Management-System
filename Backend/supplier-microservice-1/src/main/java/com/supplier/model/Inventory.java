package com.supplier.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Inventory {
	
	private Supplier supplier;
	private Drugs drugs;
	

}
