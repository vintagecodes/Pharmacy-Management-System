package com.drugs.controller;

import static org.mockito.Mockito.doReturn;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.drugs.exception.CustomException;
import com.drugs.models.Drugs;
import com.drugs.service.DrugsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;
import com.google.common.collect.Lists;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class DrugsControllerTest{
	
	
	@MockBean
    private DrugsService service;

    @Autowired
    private MockMvc mockMvc;

    @Test
//    @DisplayName("GET /Drugs success")
    public void testGetDetails() throws Exception {
    	Drugs drugs = new Drugs("12","abcs", 15.0, 5, "Bia", "healyt","JK", null);
    	Drugs drugs1 = new Drugs("13","abcs2", 15.0, 5, "Bias", "healyts","JK", null);
    	doReturn(Lists.newArrayList(drugs, drugs1)).when(service).getAllDetails();
    	mockMvc.perform(
    			get("/drugs/list")).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON))
    	.andExpect(jsonPath("$", hasSize(2)));
    }
    
    @Test
    public void testSaveDrugsDetails() throws Exception {
    	Drugs drugs1 = new Drugs("13","abcs2", 15.0, 5, "Bias", "healyts","JK", null);
    	 doReturn(drugs1).when(service).saveDrugsDetails(any());
    	 
    	 mockMvc.perform(post("/drugs/") .contentType(MediaType.APPLICATION_JSON)
                 .content(asJsonString(drugs1))).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON))
    	 .andExpect(jsonPath("$.drugsId", is("13")));
    }
    
    
    @Test
    public void testGetDrugsById() throws Exception{
    	
    	Drugs drugs1 = new Drugs("13","abcs2", 15.0, 5, "Bias", "healyts","JK", null);
    	doReturn(Optional.of(drugs1)).when(service).getDrugsByID("13");
    	
    	mockMvc.perform(get("/drugs/{id}","13")).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON))
    	.andExpect(jsonPath("$.drugsId", is("13")));
    }
    
    
    @Test
    public void testUpdateDrugsDetails() throws Exception {
    	Drugs drugs1 = new Drugs("13","abcs2", 15.0, 5, "Bias", "healyts","JK", null);
    	Drugs updated = new Drugs("13","abcs2", 16.0, 5, "Bias", "healyts","JK", null);
    	doReturn(Optional.of(drugs1)).when(service).getDrugsByID("13");
    	doReturn(updated).when(service).updateDrugsDetails(updated, "13");
    	
    	mockMvc.perform(put("/drugs/{id}","13")
    			.contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(updated))).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON)).andExpect(jsonPath("$.drugsId", is("13"))).andExpect(jsonPath("$.drugsCost", is(16.0)));
    }
    
    
    
    
    
    
    
    
    
    static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

	
	
}