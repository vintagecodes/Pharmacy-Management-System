package com.o.order.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
	
	private String username;
	private String drugsId;
	private String drugsName;
	private double drugsCost;
	private int drugsQty;
	private int stockQty;
	private String drugsDescription;

}
