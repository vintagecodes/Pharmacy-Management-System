package com.drugs.models;

import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "photos")
public class Photo {
	
	@Transient
	public static final String SEQUENCE_NAME = "photo_sequence";
	 @Id
	 private String id;
	    
	    private String title;
	    
	    private String type;
	       
	    private byte[] picByte;

		public Photo() {
			super();
			// TODO Auto-generated constructor stub
		}

		public Photo(String title, String type, byte[] picByte) {
			super();
			this.title = title;
			this.type = type;
			this.picByte = picByte;
		}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public byte[] getPicByte() {
			return picByte;
		}

		public void setPicByte(byte[] picByte) {
			this.picByte = picByte;
		}

		public static String getSequenceName() {
			return SEQUENCE_NAME;
		}
	    
	    



		
}
