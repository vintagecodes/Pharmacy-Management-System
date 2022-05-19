package com.o.order.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.o.order.entity.Address;
import com.o.order.entity.Drugs;
import com.o.order.entity.Order;
import com.o.order.repository.OrderRepository;

@Service
public class OrderService {
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private EmailSenderService emailSenderService;
	
	private static final Logger LOGGER=LoggerFactory.getLogger(OrderService.class);
	
	//getting all books record by using the method findaAll() of CrudRepository  
	public List<Order> getAllBooks()   
	{  
	List<Order> books = new ArrayList<Order>();  
	orderRepository.findAll().forEach(books1 -> books.add(books1));  
	return books;  
	}  
	
	//getting a specific record by using the method findById() of CrudRepository  
	public List<Order> getBooksById(String userId)   
	{  
		List<Order> books = new ArrayList<Order>();  
	return  orderRepository.findByUserId(userId);
	
	}  
	
	//saving a specific record by using the method save() of MongoRepository  
	public Order saveOrUpdate(Order books)   
	{  
		return orderRepository.save(books); 
		
	} 
	
	//deleting a specific record by using the method deleteById() of CrudRepository  
	public void delete(String userId)   
	{  
		orderRepository.deleteById(userId);  
	}  
	
	//updating a record  
	public void update(Order books, String userId)   
	{  
		orderRepository.save(books);  
	} 
	
	public List<Order> getOrderByStatus(boolean orderStatus){
		return orderRepository.findByOrderStatus(orderStatus);
	}
	
	
	public Order updateOrderDetails(Order order) {
		Address add = new Address();
		add.getEmail();
		
//		LOGGER.info(address.getEmail());
//		String html = add.getUsername()+"Your Order has been verified and shipped";
//		emailSenderService.sendEmail(add.getEmail(), "Verified Order", html);
		return orderRepository.save(order);
	}
	

}
