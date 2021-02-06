package com.docspace.controller;

import com.docspace.persistence.model.LiveQuestion;
import com.docspace.persistence.repo.*;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/question")
public class LiveQuestionController {

    @Autowired
    private LiveQuestionRepository liveQuestionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VideoRepository videoRepository;

    @PostMapping("/{id}")
    public void findById(@PathVariable Long id, @RequestBody String questionJSON) {
    	LiveQuestion entity = new LiveQuestion();
		UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	entity.setUser(userRepository.findByEmail(user.getUsername()));
    	entity.setVideo(videoRepository.findById(id).orElse(null));
    	entity.setQuestion(new JSONObject(questionJSON).getString("question"));
    	liveQuestionRepository.save(entity);
    }
    @GetMapping("/{id}")
    public List<LiveQuestion> getQuestions(@PathVariable Long id) {
    	return liveQuestionRepository.findByVideo(videoRepository.findById(id).orElse(null));
    }
}
