package com.docspace;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.net.URI;

import org.json.JSONObject;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import com.docspace.controller.UserController;
import com.docspace.persistence.repo.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class RegisterAPITests {
	@LocalServerPort
	private int port;
	@Autowired
	private TestRestTemplate restTemplate;
	@Autowired
	private UserController controller;
    @Autowired
    private UserRepository userRepository;
    
	private String password = "Brapassw";
	private String salutation = "Mr.";
	private String firstName = "Brahim";
	private String lastName = "BrahimLastName";
	private String email = "email@brahim.com";
	private String speciality = "nutrition";
	private String mobileNumber = "+33000000000";
	private String city = "BrahimCity";
	private String aboutUs = "Facebook";

	private HttpEntity<String> buildHttpEntity() {
		try {
			JSONObject userJson = new JSONObject();
			userJson.put("password", password);
			userJson.put("salutation", salutation);
			userJson.put("firstName", firstName);
			userJson.put("lastName", lastName);
			userJson.put("email", email);
			userJson.put("speciality", speciality);
			userJson.put("mobileNumber", mobileNumber);
			userJson.put("city", city);
			userJson.put("aboutUs", aboutUs);
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			return new HttpEntity<>(userJson.toString(), headers);
		} catch (Exception e) {
			return null;
		}
	}

	private URI getRegisterUri() {
		try {
			return new URI("http://localhost:" + port + "/api/user/register");
		} catch (Exception e) {
			return null;
		}
	}

	@AfterEach
	public void tearDown() {
		userRepository.deleteAll();
	}
	@Test
	void contextLoads() {
		assertNotNull(controller);
		assertNotNull(buildHttpEntity());
		assertNotNull(restTemplate);
		assertNotNull(getRegisterUri());
	}

	@Test
	public void cannot_register_twice_with_same_email() throws Exception {
		// When
		restTemplate.postForObject(getRegisterUri(), buildHttpEntity(), String.class);
		JSONObject userJson = new JSONObject();
		userJson.put("password", password + "a");
		userJson.put("salutation", salutation + "a");
		userJson.put("firstName", firstName + "a");
		userJson.put("lastName", lastName + "a");
		userJson.put("email", email);
		userJson.put("speciality", speciality + "a");
		userJson.put("mobileNumber", mobileNumber + "a");
		userJson.put("city", city + "a");
		userJson.put("aboutUs", aboutUs + "a");
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		String userResultJson = restTemplate.postForObject(getRegisterUri(),
				new HttpEntity<>(userJson.toString(), headers), String.class);

		// Then
		assertEquals("Email already exists in DB ! ", userResultJson);
	}

	@Test
	public void registered_user_role_is_user() throws Exception {
		// When
		String userResultJson = restTemplate.postForObject(getRegisterUri(), buildHttpEntity(), String.class);

		// Then
		JsonNode root = new ObjectMapper().readTree(userResultJson);
		assertNotNull(userResultJson);
		assertNotNull(root);
		assertNotNull(root.path("role"));
		assertEquals("USER", root.path("role").asText());
	}

	@Test
	public void register_returns_error_if_empty_city() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("salutation", salutation);
		userJson.put("firstName", firstName);
		userJson.put("lastName", lastName);
		userJson.put("email", email);
		userJson.put("speciality", speciality);
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("city", "");
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("City is required ! ", response);
	}

	@Test
	public void register_returns_error_if_no_city() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("salutation", salutation);
		userJson.put("firstName", firstName);
		userJson.put("lastName", lastName);
		userJson.put("email", email);
		userJson.put("speciality", speciality);
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("City is required ! ", response);
	}

	@Test
	public void register_returns_error_if_empty_mobile_number() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("salutation", salutation);
		userJson.put("firstName", firstName);
		userJson.put("lastName", lastName);
		userJson.put("email", email);
		userJson.put("speciality", speciality);
		userJson.put("mobileNumber", "");
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("Mobile Number is required ! ", response);
	}

	@Test
	public void register_returns_error_if_no_mobile_number() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("salutation", salutation);
		userJson.put("firstName", firstName);
		userJson.put("lastName", lastName);
		userJson.put("email", email);
		userJson.put("speciality", speciality);
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("Mobile Number is required ! ", response);
	}

	@Test
	public void register_returns_error_if_empty_speciality() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("salutation", salutation);
		userJson.put("firstName", firstName);
		userJson.put("lastName", lastName);
		userJson.put("email", email);
		userJson.put("speciality", "");
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("Speciality is required ! ", response);
	}

	@Test
	public void register_returns_error_if_no_speciality() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("salutation", salutation);
		userJson.put("firstName", firstName);
		userJson.put("lastName", lastName);
		userJson.put("email", email);
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("Speciality is required ! ", response);
	}

	@Test
	public void register_returns_error_if_empty_email() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("salutation", salutation);
		userJson.put("firstName", firstName);
		userJson.put("lastName", lastName);
		userJson.put("email", "");
		userJson.put("speciality", speciality);
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("Email is required ! ", response);
	}

	@Test
	public void register_returns_error_if_no_email() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("salutation", salutation);
		userJson.put("firstName", firstName);
		userJson.put("lastName", lastName);
		userJson.put("speciality", speciality);
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("Email is required ! ", response);
	}

	@Test
	public void register_returns_error_if_no_last_name() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("salutation", salutation);
		userJson.put("firstName", firstName);
		userJson.put("email", email);
		userJson.put("speciality", speciality);
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("Last Name is required ! ", response);
	}

	@Test
	public void register_returns_error_if_empty_last_name() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("salutation", salutation);
		userJson.put("firstName", firstName);
		userJson.put("lastName", "");
		userJson.put("email", email);
		userJson.put("speciality", speciality);
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("Last Name is required ! ", response);
	}

	@Test
	public void register_returns_error_if_no_first_name() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("salutation", salutation);
		userJson.put("lastName", lastName);
		userJson.put("email", email);
		userJson.put("speciality", speciality);
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("First Name is required ! ", response);
	}

	@Test
	public void register_returns_error_if_empty_first_name() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("salutation", salutation);
		userJson.put("lastName", lastName);
		userJson.put("email", email);
		userJson.put("firstName", "");
		userJson.put("speciality", speciality);
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("First Name is required ! ", response);
	}

	@Test
	public void register_returns_error_if_empty_salutation() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("salutation", "");
		userJson.put("firstName", firstName);
		userJson.put("lastName", lastName);
		userJson.put("email", email);
		userJson.put("speciality", speciality);
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("Salutation is required ! ", response);
	}

	@Test
	public void register_returns_error_if_no_salutation() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", password);
		userJson.put("firstName", firstName);
		userJson.put("lastName", lastName);
		userJson.put("email", email);
		userJson.put("speciality", speciality);
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("Salutation is required ! ", response);
	}

	@Test
	public void register_returns_error_if_empty_password() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("password", "");
		userJson.put("salutation", salutation);
		userJson.put("firstName", firstName);
		userJson.put("lastName", lastName);
		userJson.put("email", email);
		userJson.put("speciality", speciality);
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("Password not provided ! ", response);
	}

	@Test
	public void register_returns_error_if_no_password() throws Exception {
		// Given
		JSONObject userJson = new JSONObject();
		userJson.put("salutation", salutation);
		userJson.put("firstName", firstName);
		userJson.put("lastName", lastName);
		userJson.put("email", email);
		userJson.put("speciality", speciality);
		userJson.put("mobileNumber", mobileNumber);
		userJson.put("city", city);
		userJson.put("aboutUs", aboutUs);
		HttpHeaders headers = new HttpHeaders();	
		headers.setContentType(MediaType.APPLICATION_JSON);

		// When
		String response = restTemplate.postForObject(getRegisterUri(), new HttpEntity<>(userJson.toString(), headers),
				String.class);

		// Then
		assertNotNull(response);
		assertEquals("Password not provided ! ", response);
	}

	@Test
	public void register_returns_same_salutation_on_success() throws Exception {
		// When
		String userResultJson = restTemplate.postForObject(getRegisterUri(), buildHttpEntity(), String.class);

		// Then
		JsonNode root = new ObjectMapper().readTree(userResultJson);
		assertNotNull(userResultJson);
		assertNotNull(root);
		assertNotNull(root.path("salutation"));
		assertEquals(salutation, root.path("salutation").asText());
	}

	@Test
	public void register_returns_same_last_name_on_success() throws Exception {
		// When
		String userResultJson = restTemplate.postForObject(getRegisterUri(), buildHttpEntity(), String.class);

		// Then
		JsonNode root = new ObjectMapper().readTree(userResultJson);
		assertNotNull(userResultJson);
		assertNotNull(root);
		assertEquals(lastName, root.path("lastName").asText());
	}

	@Test
	public void register_returns_same_email_on_success() throws Exception {
		// When
		String userResultJson = restTemplate.postForObject(getRegisterUri(), buildHttpEntity(), String.class);

		// Then
		JsonNode root = new ObjectMapper().readTree(userResultJson);
		assertNotNull(userResultJson);
		assertNotNull(root);
		assertEquals(email, root.path("email").asText());
	}

	@Test
	public void register_returns_same_speciality_on_success() throws Exception {
		// When
		String userResultJson = restTemplate.postForObject(getRegisterUri(), buildHttpEntity(), String.class);

		// Then
		JsonNode root = new ObjectMapper().readTree(userResultJson);
		assertNotNull(userResultJson);
		assertNotNull(root);
		assertEquals(speciality, root.path("speciality").asText());
	}

	@Test
	public void register_returns_same_city_on_success() throws Exception {
		// When
		String userResultJson = restTemplate.postForObject(getRegisterUri(), buildHttpEntity(), String.class);

		// Then
		JsonNode root = new ObjectMapper().readTree(userResultJson);
		assertNotNull(userResultJson);
		assertNotNull(root);
		assertEquals(city, root.path("city").asText());
	}

	@Test
	public void register_returns_same_mobile_on_success() throws Exception {
		// When
		String userResultJson = restTemplate.postForObject(getRegisterUri(), buildHttpEntity(), String.class);

		// Then
		JsonNode root = new ObjectMapper().readTree(userResultJson);
		assertNotNull(userResultJson);
		assertNotNull(root);
		assertEquals(mobileNumber, root.path("mobileNumber").asText());
	}

	@Test
	public void register_returns_password_not_null_on_success() throws Exception {
		// When
		String userResultJson = restTemplate.postForObject(getRegisterUri(), buildHttpEntity(), String.class);

		// Then
		JsonNode root = new ObjectMapper().readTree(userResultJson);
		assertNotNull(userResultJson);
		assertNotNull(root);
		assertNotNull(root.path("password").asText());
		assertNotEquals("", root.path("password").asText());
	}
}	