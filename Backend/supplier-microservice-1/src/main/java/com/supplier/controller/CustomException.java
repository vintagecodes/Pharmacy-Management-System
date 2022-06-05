package com.supplier.controller;

@SuppressWarnings("serial")
class CustomException extends Exception{
	String message;
	CustomException(String str) {
		message = str;
	}
	
	public String toString() {
		return ("An Exception Occured : "+message);
	}
}
