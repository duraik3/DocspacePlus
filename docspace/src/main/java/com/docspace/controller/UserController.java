package com.docspace.controller;

import com.docspace.exception.BadRequestException;
import com.docspace.persistence.model.User;
import com.docspace.persistence.repo.UserRepository;

import sendinblue.ApiClient;
import sendinblue.ApiException;
import sendinblue.Configuration;
import sendinblue.auth.ApiKeyAuth;
import sibApi.TransactionalEmailsApi;
import sibModel.CreateSmtpEmail;
import sibModel.SendSmtpEmail;
import sibModel.SendSmtpEmailSender;
import sibModel.SendSmtpEmailTo;

import org.joda.time.DateTime;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {

    Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${docspace.domain}")
    private String domain;

    public UserController() {

	}
    @GetMapping("/{email}")
    public User findByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email);
    }

    @GetMapping("/role/{role}")
    public List<User> findByRole(@PathVariable String role) {
        return userRepository.findByRole(role);
    }

    @GetMapping("/all")
    public List<User> findAll() {
        List<User> result = new ArrayList<>();
        userRepository.findAll().forEach(result::add);
        return result;
    }


    @GetMapping("/current")
    public User getConnectedUser(Authentication authentication) {
        UserDetails user = (UserDetails) authentication.getPrincipal();
        return userRepository.findByEmail(user.getUsername());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {
        User saved = userRepository.save(user);
        return saved;
    }

    @PutMapping("/update/role")
    @ResponseStatus(HttpStatus.OK)
    public User updateUserRole(@RequestBody User user) {

        if(user.getEmail()==null || user.getEmail().isEmpty()) {
            throw new BadRequestException("A valid user Email is required ! ");
        }
        User toUpdate = userRepository.findByEmail(user.getEmail());
        if(toUpdate ==null){
            throw new BadRequestException("A valid user Email is required ! ");
        }
        if(user.getRole()==null || user.getRole().isEmpty()) {
            throw new BadRequestException("A valid user Role is required ! ");
        }
        toUpdate.setRole(user.getRole());

        User saved = userRepository.save(toUpdate);
        return saved;
    }

    @PostMapping("/forgotpassword")
    public ResponseEntity<?> forgotPassword(@RequestBody String emailJson) {
        try {
            final JSONObject json = new JSONObject(emailJson);
            String email = json.getString("email");
            User user = userRepository.findByEmail(email);
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            String generatedString = new Random().ints((int) 'a', (int) 'z' + 1).limit(8) // Target string length
                    .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();
            if (System.getenv("SENDINBLUE_API_KEY") != null) {
            	ApiClient defaultClient = Configuration.getDefaultApiClient();
            	ApiKeyAuth apiKey = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
            	apiKey.setApiKey(System.getenv("SENDINBLUE_API_KEY"));
                TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();
    	        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
    	        sendSmtpEmail.setSubject("Docspace password recovery");
    	        sendSmtpEmail.setTextContent("New password: " + generatedString);
    	        SendSmtpEmailSender sender = new SendSmtpEmailSender();
    	        sender.setEmail("noreply@docspaceplus.com");
    	        sender.setName("DocspacePlus");
    	        sendSmtpEmail.setSender(sender);
    	        SendSmtpEmailTo receiver = new SendSmtpEmailTo();
    	        receiver.setEmail(user.getEmail());
    	        receiver.setName(user.getFirstName() + " " + user.getLastName());
    	        List<SendSmtpEmailTo> receivers = new ArrayList<SendSmtpEmailTo>();
    	        receivers.add(receiver);
    	        sendSmtpEmail.setTo(receivers);
    	        CreateSmtpEmail result = apiInstance.sendTransacEmail(sendSmtpEmail);
    	        logger.info(result.toString());
            } else {
            	logger.error("Cannot connect to sendingblue");
            }
            user.setPassword(passwordEncoder.encode(generatedString));
            userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        userRepository.findById(id);
        userRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@RequestBody User user, @PathVariable Long id) {
        return userRepository.save(user);
    }

    @GetMapping("/confirmation/{id}/{hash}")
    public ModelAndView confirmRegistration(@PathVariable Long id, @PathVariable String hash) {
        User user = userRepository.findById(id);
        user.setEnabled(true);
        userRepository.save(user);
        return new ModelAndView("redirect:https://" + domain);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User registerUser(@RequestBody User userDto, HttpServletRequest request) throws ApiException {
        User toSave = new User();

        if (userDto.getSalutation() != null && !userDto.getSalutation().isEmpty()) {
            toSave.setSalutation(userDto.getSalutation());
        } else {
            throw new BadRequestException("Salutation is required ! ");
        }

        if (userDto.getFirstName() != null && !userDto.getFirstName().isEmpty()) {
            toSave.setFirstName(userDto.getFirstName());
        } else {
            throw new BadRequestException("First Name is required ! ");
        }

        if (userDto.getLastName() != null && !userDto.getLastName().isEmpty()) {
            toSave.setLastName(userDto.getLastName());
        } else {
            throw new BadRequestException("Last Name is required ! ");
        }

        if (userDto.getEmail() != null && !userDto.getEmail().isEmpty()) {
            if (userRepository.findByEmail(userDto.getEmail()) != null) {
                throw new BadRequestException("Email already exists in DB ! ");
            }
            toSave.setEmail(userDto.getEmail());
        } else {
            throw new BadRequestException("Email is required ! ");
        }

        if (userDto.getPassword() != null && !userDto.getPassword().equals("")) {
            toSave.setPassword(passwordEncoder.encode(userDto.getPassword()));
        } else {
            throw new BadRequestException("Password not provided ! ");
        }

        if (userDto.getSpeciality() != null && !userDto.getSpeciality().isEmpty()) {
            toSave.setSpeciality(userDto.getSpeciality());
        } else {
            throw new BadRequestException("Speciality is required ! ");
        }

        if (userDto.getMobileNumber() != null && !userDto.getMobileNumber().isEmpty()) {
            toSave.setMobileNumber(userDto.getMobileNumber());
        } else {
            throw new BadRequestException("Mobile Number is required ! ");
        }

        if (userDto.getCity() != null && !userDto.getCity().isEmpty()) {
            toSave.setCity(userDto.getCity());
        } else {
            throw new BadRequestException("City is required ! ");
        }

        if (userDto.getAboutUs() != null && !userDto.getAboutUs().isEmpty()) {
            toSave.setAboutUs(userDto.getAboutUs());
        } else {
            throw new BadRequestException("Where did you hear about us is required ! ");
        }

        if (userDto.getCountry() != null && !userDto.getCountry().isEmpty()) {
            toSave.setCountry(userDto.getCountry());
        }
        if (userDto.getState() != null && !userDto.getState().isEmpty()) {
            toSave.setState(userDto.getState());
        }

        toSave.setRole("USER");
        DateTime date = new DateTime();
        toSave.setCreated(date.toString());
        toSave.setUpdated(date.toString());
        toSave.setEnabled(false);
        toSave.setRegistrationId(UUID.randomUUID().toString());
        toSave.setId(new Random().nextLong());

        User addedUser = userRepository.save(toSave);
        if (System.getenv("SENDINBLUE_API_KEY") != null) {
        	ApiClient defaultClient = Configuration.getDefaultApiClient();
        	ApiKeyAuth apiKey = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        	apiKey.setApiKey(System.getenv("SENDINBLUE_API_KEY"));
            TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();
	        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
	        sendSmtpEmail.setSubject("Docspace registration confirmation");
	        sendSmtpEmail.setTextContent("Confirmation link: https://" + domain + "/api/user/confirmation/" + addedUser.getId() + '/'
	                + toSave.getRegistrationId());
	        SendSmtpEmailSender sender = new SendSmtpEmailSender();
	        sender.setEmail("noreply@docspaceplus.com");
	        sender.setName("DocspacePlus");
	        sendSmtpEmail.setSender(sender);
	        SendSmtpEmailTo receiver = new SendSmtpEmailTo();
	        receiver.setEmail(userDto.getEmail());
	        receiver.setName(userDto.getFirstName() + " " + userDto.getLastName());
	        List<SendSmtpEmailTo> receivers = new ArrayList<SendSmtpEmailTo>();
	        receivers.add(receiver);
	        sendSmtpEmail.setTo(receivers);
	        CreateSmtpEmail result = apiInstance.sendTransacEmail(sendSmtpEmail);
	        logger.info(result.toString());
        } else {
        	logger.error("Cannot connect to sendingblue");
        }
        return addedUser;
    }
}
