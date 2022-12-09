package sec.model.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.security.auth.message.AuthException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import exception.CustomException;
import sec.Controller.AuthController;
import sec.model.ERole;
import sec.model.Role;
import sec.model.User;
import sec.payLoad.JwtResponse;
import sec.payLoad.LoginRequest;
import sec.payLoad.MessageResponse;
import sec.payLoad.SignupRequest;
import sec.repository.RoleRepository;
import sec.repository.UserRepository;
import sec.security.JwtUtils;
import sec.security.UserDetailsImpl;

@Service
public class AuthService {
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	private EmailSenderService emailSenderService;
	
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	
//	usage: for authenticate the user by login and in response it will give the JWT token 
	
	public ResponseEntity<?> authenticateUser(LoginRequest loginRequest){
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		if(userRepository.existsByUsername(loginRequest.getUsername()) == false) {
			AuthException authException = new AuthException();
			logger.info(authException.getMessage());
			return ResponseEntity.badRequest().body(new MessageResponse("UserName not found!"));
		}
			
		List<String> roles = userDetails.getAuthorities().stream()
					.map(item -> item.getAuthority())
					.collect(Collectors.toList());
			return ResponseEntity.ok(new JwtResponse(jwt, 
					 userDetails.getUserId(), 
					 userDetails.getUsername(), 
					 userDetails.getEmail(), 
					 roles));
	}
	
	
	public ResponseEntity<?> registerUser(SignupRequest signUpRequest) throws CustomException, Exception{
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}
		// Create new user's account
		User user = new User(signUpRequest.getUserId(),
							signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword())
							 
				);
		
		
		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();
		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}
		user.setRoles(roles);
		userRepository.save(user);
		
//		for sending the email to the signup user
		
		String html = "Welcome to The GET MEDS MR."+user.getUsername();
		emailSenderService.sendEmail(user.getEmail(), "This is Test Subject", html);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	public String deleteUsers(String username) {
		userRepository.deleteByUsername(username);
		return "Deleted SuccessFull";
	}

}
