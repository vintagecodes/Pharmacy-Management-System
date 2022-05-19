package com.o.order.entity;

	import java.util.Map;

	import org.springframework.boot.context.properties.ConfigurationProperties;
	import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
	@Component
	@ConfigurationProperties("paytm.payment.sandbox")
    
	public class PaytmDetailPojo {
		
		private String merchantId;
		
		private String merchantKey;
		
		private String channelId;
		
		private String website;
		
		private String industryTypeId;
		
		private String paytmUrl;
		
		private Map<String, String> details;
		
		
		

    }
