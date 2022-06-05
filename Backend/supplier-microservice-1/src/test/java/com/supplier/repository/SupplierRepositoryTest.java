/**
 * 
 */
package com.supplier.repository;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * @author Lenovo
 *
 */
@SpringBootTest
class SupplierRepositoryTest {

	/**
	 * Test method for {@link com.supplier.repository.SupplierRepository#existsBySupplierId(java.lang.String)}.
	 */
	
	@Autowired
	private SupplierRepository repository;
	
	@Test
	void testExistsBySupplierId() {
		
//		List<String> drugs = new ArrayList<>();
//		drugs.add("Afrezza");
//		drugs.add("Tyvaso DPI");
//		
//		Supplier supplier = new Supplier();
//		supplier.SupplierId("8");
//		supplier.setSupplierName("MannKind Corporation");
//		supplier.setEmail("mankind@gmail.com");
//		supplier.setAvailableDrugs(drugs);
//		
//		repository.save(supplier);
		
		Boolean actualResult = repository.existsBySupplierId(11);
		
		assertThat(actualResult).isTrue();
		
	}

}
