package com.o.order.repository;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.o.order.entity.Order;


@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
  List <Order> findByUserId(String userId);
  
  Order findByOrderId(String orderId);

List<Order> findByOrderStatus(boolean orderStatus);
}
