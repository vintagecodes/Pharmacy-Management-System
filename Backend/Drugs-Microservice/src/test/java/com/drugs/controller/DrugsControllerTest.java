package com.drugs.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.drugs.models.Drugs;
import com.drugs.repository.DrugsRepository;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class DrugsControllerTest {
	
	private static Drugs drugs;
	
	@Autowired
	DrugsRepository drugsRepository;


	@Test
	@Order(1)
	void testSaveDrugsDetails() {
		Drugs drugs = new Drugs();
		drugs.setDrugsId("10");
		drugs.setDrugsName("CSMN DPI");
		drugs.setDrugsCost(600);
		drugs.setDrugsDescription("Good medicine");
		drugs.setSupplierName("Sun Pharma");
		drugsRepository.save(drugs);
		assertNotNull(drugsRepository.findById("1"));
	}
	
	@Test
	@Order(2)
	void testGetDetails() {
		List<Drugs> list = drugsRepository.findAll();
		assertThat(list).size().isGreaterThan(0);
	}
	
	@Test
	@Order(3)
	void testGetDrugsById() {
		Drugs drugs = drugsRepository.findById("10").get();
		assertEquals("CSMN DPI", drugs.getDrugsName());
	}
	
	
	@Test
	@Order(4)
	void testUpdateSupplierDetails() {
		Drugs drugs = drugsRepository.findById("10").get();
		drugs.setDrugsCost(800);
		drugsRepository.save(drugs);
		assertNotEquals(600, drugsRepository.findById("10").get().getDrugsCost());
	}
	
	@Test
	@Order(5)
	void testDelete() {
		drugsRepository.deleteById("10");
		assertThat(drugsRepository.existsByDrugsId("10")).isFalse();
		
	}
}
