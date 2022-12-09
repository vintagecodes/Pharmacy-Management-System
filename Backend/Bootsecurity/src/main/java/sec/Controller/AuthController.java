package sec.Controller;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.security.auth.message.AuthException;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import exception.CustomException;
import sec.payLoad.LoginRequest;
import sec.payLoad.SignupRequest;
import sec.payLoad.JwtResponse;
import sec.payLoad.MessageResponse;

import sec.model.ERole;
import sec.model.Role;
import sec.model.User;
import sec.model.service.AuthService;
import sec.model.service.EmailSenderService;
import sec.repository.RoleRepository;
import sec.repository.UserRepository;
import sec.security.AuthEntryPointJwt;
import sec.security.JwtUtils;
import sec.security.UserDetailsImpl;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	
	
	@Autowired
	private AuthService authService;
	
	
	
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		
		return authService.authenticateUser(loginRequest);
		
		
	}
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) throws CustomException, Exception {
		
		return authService.registerUser(signUpRequest);
	}
	
	@GetMapping("/users")
	public List<User> getUsers(){
		return authService.getAllUsers();
	}
	
	@DeleteMapping("/delete/{username}")
	public String deleteUsers(@PathVariable("username") String username) {
		return authService.deleteUsers(username);
	}
}