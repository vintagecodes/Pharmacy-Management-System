/**
 * 
 */
package com.supplier.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * @author Lenovo
 *
 */
@SpringBootTest
class ExistByEmailId {
	
	@Autowired
	private SupplierRepository repository;
	

	/**
	 * Test method for {@link com.supplier.repository.SupplierRepository#existsByEmail(java.lang.String)}.
	 */
	@Test
	void testExistsByEmail() {
		Boolean actualResult = repository.existsByEmail("Jharu@gmail.com");
		
		assertThat(actualResult).isTrue();
	}

}
