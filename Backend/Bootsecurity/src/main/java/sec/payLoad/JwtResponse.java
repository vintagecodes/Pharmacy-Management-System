package sec.payLoad;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private String userId;
	private String username;
	private String email;
	private List<String> roles;
	
	public JwtResponse(String accessToken, String userId, String username, String email, List<String> roles) {
		this.token = accessToken;
		this.userId = userId;
		this.username = username;
		this.email = email;
		this.roles = roles;
	}

}