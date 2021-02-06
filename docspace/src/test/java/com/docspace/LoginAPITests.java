package com.docspace;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.net.URI;

import org.json.JSONObject;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.LinkedMultiValueMap;

import com.docspace.controller.UserController;
import com.docspace.persistence.model.User;
import com.docspace.persistence.repo.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class LoginAPITests {
	@LocalServerPort
	private int port;
	@Autowired
	private TestRestTemplate restTemplate;
	@Autowired
	private UserController controller;
	@Autowired
	private UserRepository userRepository;
	@MockBean
	private JavaMailSender javaMailSender;
	
	private String password = "Brapassw";
	private String email = "email@brahim.com";
	private String firstName = "Brahim";
	private String lastName = "BrahimLastName";
	private String aboutUs = "Facebook";

	@BeforeEach
	public void setup() {
		try {
			JSONObject userJson = new JSONObject();
			userJson.put("password", password);
			userJson.put("salutation", "Mr.");
			userJson.put("firstName", firstName);
			userJson.put("lastName", lastName);
			userJson.put("email", email);
			userJson.put("speciality", "nutrition");
			userJson.put("mobileNumber", "+33000000000");
			userJson.put("city", "BrahimCity");
			userJson.put("aboutUs", aboutUs);
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			restTemplate.postForObject(new URI("http://localhost:" + port + "/api/user/register"),
					new HttpEntity<>(userJson.toString(), headers), String.class);
			User user = userRepository.findByEmail(email);
			user.setEnabled(true);
			userRepository.save(user);
		} catch (Exception e) {
		}
	}

	@AfterEach
	public void tearDown() {
		userRepository.deleteAll();
	}

	@Test
	void contextLoads() {
		assertNotNull(controller);
		assertNotNull(userRepository);
		assertNotNull(restTemplate);
		assertNotEquals(0, userRepository.count());
	}

	ResponseEntity<String> postLogin(String email, String password) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.MULTIPART_FORM_DATA);
		LinkedMultiValueMap<String, Object> parameters = new LinkedMultiValueMap<String, Object>();
		parameters.add("email", email);
		parameters.add("password", password);
		HttpEntity<LinkedMultiValueMap<String, Object>> entity = new HttpEntity<LinkedMultiValueMap<String, Object>>(
				parameters, headers);
		return restTemplate.exchange("http://localhost:" + port + "/api/user/login",
				HttpMethod.POST, entity, String.class, "");
	}
	
	@Test
	public void login_after_register_accepted() throws Exception {
		// Given
		ResponseEntity<String> response = postLogin(email, password);

		// Then
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals("Authentication successful !", response.getBody());
	}

	@Test
	public void login_fails_if_password_wrong() throws Exception {
		// Given
		ResponseEntity<String> response = postLogin(email, "Wrong password");

		// Then
		assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
		assertEquals("Authentication failed !", response.getBody());
	}

	@Test
	public void login_fails_if_email_wrong() throws Exception {
		// Given
		ResponseEntity<String> response = postLogin("Wrong email", password);

		// Then
		assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
		assertEquals("Authentication failed !", response.getBody());
	}

	@Test
	public void current_user_is_returned_with_correct_email_after_login() throws Exception {
		// Given
		ResponseEntity<String> responseLogin = postLogin(email, password);
		String cookie = responseLogin.getHeaders().getFirst(HttpHeaders.SET_COOKIE).split(";")[0];
		
		// When
		HttpHeaders headers = new HttpHeaders();
		headers.add("Cookie", cookie);
		HttpEntity<LinkedMultiValueMap<String, Object>> entity = new HttpEntity<LinkedMultiValueMap<String, Object>>(
				null, headers);

		ResponseEntity<String> response = restTemplate.exchange("http://localhost:" + port + "/api/user/current",
				HttpMethod.GET, entity, String.class);

		// Then
		assertEquals(HttpStatus.OK, response.getStatusCode());
		JsonNode root = new ObjectMapper().readTree(response.getBody());
		assertNotNull(root);
		assertNotNull(root.path("email"));
		assertEquals(email, root.path("email").asText());
	}
	
	@Test
	public void current_user_is_returned_with_correct_first_name_after_login() throws Exception {
		// Given
		ResponseEntity<String> responseLogin = postLogin(email, password);
		String cookie = responseLogin.getHeaders().getFirst(HttpHeaders.SET_COOKIE).split(";")[0];
		
		// When
		HttpHeaders headers = new HttpHeaders();
		headers.add("Cookie", cookie);
		HttpEntity<LinkedMultiValueMap<String, Object>> entity = new HttpEntity<LinkedMultiValueMap<String, Object>>(
				null, headers);

		ResponseEntity<String> response = restTemplate.exchange("http://localhost:" + port + "/api/user/current",
				HttpMethod.GET, entity, String.class);

		// Then
		assertEquals(HttpStatus.OK, response.getStatusCode());
		JsonNode root = new ObjectMapper().readTree(response.getBody());
		assertNotNull(root);
		assertNotNull(root.path("firstName"));
		assertEquals(firstName, root.path("firstName").asText());
	}
	
	@Test
	public void current_user_is_returned_with_correct_last_name_after_login() throws Exception {
		// Given
		ResponseEntity<String> responseLogin = postLogin(email, password);
		String cookie = responseLogin.getHeaders().getFirst(HttpHeaders.SET_COOKIE).split(";")[0];
		
		// When
		HttpHeaders headers = new HttpHeaders();
		headers.add("Cookie", cookie);
		HttpEntity<LinkedMultiValueMap<String, Object>> entity = new HttpEntity<LinkedMultiValueMap<String, Object>>(
				null, headers);

		ResponseEntity<String> response = restTemplate.exchange("http://localhost:" + port + "/api/user/current",
				HttpMethod.GET, entity, String.class);

		// Then
		assertEquals(HttpStatus.OK, response.getStatusCode());
		JsonNode root = new ObjectMapper().readTree(response.getBody());
		assertNotNull(root);
		assertNotNull(root.path("lastName"));
		assertEquals(lastName, root.path("lastName").asText());
	}
	
}