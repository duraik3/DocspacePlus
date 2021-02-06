package com.docspace.controller;

import com.docspace.controller.dto.SpeakerDto;
import com.docspace.exception.BadRequestException;
import com.docspace.persistence.model.Speaker;
import com.docspace.persistence.model.User;
import com.docspace.persistence.repo.SpeakerRepository;
import com.docspace.persistence.repo.UserRepository;

import sendinblue.ApiClient;
import sendinblue.Configuration;
import sendinblue.auth.ApiKeyAuth;
import sibApi.TransactionalEmailsApi;
import sibModel.CreateSmtpEmail;
import sibModel.SendSmtpEmail;
import sibModel.SendSmtpEmailSender;
import sibModel.SendSmtpEmailTo;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping("/api/speaker")
public class SpeakerController {
    Logger logger = LoggerFactory.getLogger(SpeakerController.class);

    @Autowired
    private SpeakerRepository speakerRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${docspace.domain}")
    private String domain;

    @GetMapping("/all")
    public List<Speaker> getAll() {
        List<Speaker> result = new ArrayList<>();
        speakerRepository.findAll().forEach(result::add);
        return result;
    }

    @GetMapping("/{id}")
    public Speaker findById(@PathVariable Long id) {
        return speakerRepository.findById(id).get();
    }

    @PostMapping
    public Speaker add(@RequestBody SpeakerDto dto) {
        try {
            if (dto.getId() == null) {
                if (dto.isDocspaceUser()) {
                    User user = userRepository.findByEmail(dto.getEmail());
                    Speaker speaker = new Speaker();
                    speaker.setPassword(user.getPassword());
                    speaker.setRole("SPEAKER");
                    speaker.setEnabled(user.isEnabled());
                    speaker.setRegisterDate(user.getRegisterDate());
                    speaker.setRegistrationId(user.getRegistrationId());
                    speaker.setMobileValidated(user.isMobileValidated());
                    speaker.setCreated(user.getCreated());
                    speaker = dtoToSpeaker(dto, speaker);
                    // Delete old user before converting to speaker
                    userRepository.delete(user);
                    return speakerRepository.save(speaker);
                } else {
                    //Create new speaker
                    Speaker speaker = new Speaker();
                    String password = new Random().ints((int) 'a', (int) 'z' + 1).limit(8)
                            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();
                    speaker.setPassword(passwordEncoder.encode(password));
                    speaker.setRole("SPEAKER");
                    speaker.setCreated(new DateTime().toString());
                    speaker.setEnabled(true);
                    speaker.setRegistrationId(UUID.randomUUID().toString());

                    speaker = dtoToSpeaker(dto, speaker);
                    Speaker saved = speakerRepository.save(speaker);

                    try {
                        if (System.getenv("SENDINBLUE_API_KEY") != null) {
                        	ApiClient defaultClient = Configuration.getDefaultApiClient();
                        	ApiKeyAuth apiKey = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
                        	apiKey.setApiKey(System.getenv("SENDINBLUE_API_KEY"));
                            TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();
                	        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
                	        sendSmtpEmail.setSubject("Docspace registration confirmation");
                	        sendSmtpEmail.setTextContent("Password : " + password + "/nConfirmation link: https://" + domain + "/api/user/confirmation/" + saved.getId() + '/'
                                    + speaker.getRegistrationId());
                	        SendSmtpEmailSender sender = new SendSmtpEmailSender();
                	        sender.setEmail("noreply@docspaceplus.com");
                	        sender.setName("DocspacePlus");
                	        sendSmtpEmail.setSender(sender);
                	        SendSmtpEmailTo receiver = new SendSmtpEmailTo();
                	        receiver.setEmail(speaker.getEmail());
                	        receiver.setName(speaker.getFirstName() + " " + speaker.getLastName());
                	        List<SendSmtpEmailTo> receivers = new ArrayList<SendSmtpEmailTo>();
                	        receivers.add(receiver);
                	        sendSmtpEmail.setTo(receivers);
                	        CreateSmtpEmail result = apiInstance.sendTransacEmail(sendSmtpEmail);
                	        logger.info(result.toString());
                        } else {
                        	logger.error("Cannot connect to sendingblue");
                        }

                    } catch (Throwable t) {
                        logger.warn("Error sending confirmation mail. catch : " + t.getMessage());
                    }
                    return saved;
                }
            } else {
                Speaker speaker = speakerRepository.findById(dto.getId()).get();
                speaker = dtoToSpeaker(dto, speaker);
                return speakerRepository.save(speaker);
            }
        } catch (Throwable t) {
            throw new BadRequestException("Exception when creating / updating speaker. Catch : " + t.toString());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteChannel(@PathVariable Long id) {
        if (findById(id) == null) {
            throw new BadRequestException("Speaker with id : " + id + " does not exit");
        }
        speakerRepository.deleteById(id);
    }

    private Speaker dtoToSpeaker(SpeakerDto dto, Speaker speaker) {
        speaker.setEmail(dto.getEmail());
        speaker.setFirstName(dto.getFirstName());
        speaker.setLastName(dto.getLastName());
        speaker.setSalutation(dto.getSalutation());
        speaker.setCountry(dto.getCountry());
        speaker.setState(dto.getState());
        speaker.setCity(dto.getCity());
        speaker.setMobileNumber(dto.getMobileNumber());
        speaker.setSpeciality(dto.getSpeciality());
        speaker.setAboutUs(dto.getAboutUs());
        speaker.setCredential(dto.getCredential());
        speaker.setBiography(dto.getBiography());
        if (dto.getImage() != null && !dto.getImage().isEmpty()) {
            speaker.setImage(dto.getImage());
        }
        DateTime date = new DateTime();
        speaker.setUpdated(date.toString());
        return speaker;
    }
}
