package sec;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class BootsecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(BootsecurityApplication.class, args);
	}

}
