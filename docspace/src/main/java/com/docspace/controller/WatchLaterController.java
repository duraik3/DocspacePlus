package com.docspace.controller;

import com.docspace.persistence.model.WatchLater;
import com.docspace.persistence.repo.UserRepository;
import com.docspace.persistence.repo.WatchLaterRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/watchlater")
public class WatchLaterController {
	@Autowired
	private WatchLaterRepository watchLaterRepository;
	@Autowired
	private UserRepository userRepository;

	@GetMapping("/{videoID}")
	public WatchLater add(@PathVariable Long videoID) {
		UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userID = userRepository.findByEmail(user.getUsername()).getId();
		WatchLater entity = new WatchLater(userID, videoID);
		return watchLaterRepository.save(entity);
	}
}
