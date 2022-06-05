package exception;

@SuppressWarnings("serial")
public class CustomException extends Exception {
	String message;
	public CustomException(String str) {
		message = str;
	}
	
	public String toString() {
		return ("Sorry! Something Bad Happened: "+message);
	}

}
