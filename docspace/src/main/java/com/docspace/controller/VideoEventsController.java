package com.docspace.controller;

import com.docspace.persistence.model.PlayEvent;
import com.docspace.persistence.repo.PlayEventRepository;
import com.docspace.persistence.repo.UserRepository;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/videoevents")
public class VideoEventsController {
	@Autowired
	private PlayEventRepository plaEventRepository;
	@Autowired
	private UserRepository userRepository;

	@GetMapping("/{type}/{videoID}/{microseconds}")
	public PlayEvent add(@PathVariable String type, @PathVariable Long videoID, @PathVariable Long microseconds) {
		UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userID = userRepository.findByEmail(user.getUsername()).getId();
		PlayEvent event = new PlayEvent(userID, videoID, LocalDateTime.ofEpochSecond(microseconds/1000, 0, ZoneOffset.UTC), type);
		return plaEventRepository.save(event);
	}
}
