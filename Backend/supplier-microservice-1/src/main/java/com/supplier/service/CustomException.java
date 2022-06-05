package com.supplier.service;

@SuppressWarnings("serial")
class CustomException extends Exception{
	int message;
	CustomException(int supplierId) {
		message = supplierId;
	}
	
	public String toString() {
		return ("An Exception Occured : "+message);
	}
}
