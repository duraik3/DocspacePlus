package com.docspace.controller;

import com.docspace.persistence.model.UserVideoComments;
import com.docspace.persistence.model.UserVideoMap;
import com.docspace.persistence.repo.UserRepository;
import com.docspace.persistence.repo.UserVideoCommentsRepository;
import com.docspace.persistence.repo.UserVideoID;
import com.docspace.persistence.repo.UserVideoMapRepository;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/uservideomap")
public class UserVideoMapController {

	@Autowired
	private UserVideoMapRepository userVideoRepository;
	@Autowired
	private UserVideoCommentsRepository userVideoCommentsRepository;
	@Autowired
	private UserRepository userRepository;

	@GetMapping("/heart/{id}/{heart}")
	public UserVideoMap findById(@PathVariable Long id, @PathVariable boolean heart) {
		UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userID = userRepository.findByEmail(user.getUsername()).getId();
		UserVideoMap mapping = userVideoRepository.findById(new UserVideoID(userID, id)).orElse(new UserVideoMap(userID, id, -1, -1, -1, false));
		mapping.setHeart(heart);
		userVideoRepository.save(mapping);
		return mapping;
	}

	@GetMapping("/{videoID}")
	public UserVideoMap findById(@PathVariable Long videoID) {
		UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userID = userRepository.findByEmail(user.getUsername()).getId();
		return userVideoRepository.findById(new UserVideoID(userID, videoID)).orElse(new UserVideoMap(userID, videoID, -1, -1, -1, false));
	}

	@PostMapping("/review/{videoID}/{speakerRating}/{contentRating}/{usefullnessRating}")
	public UserVideoMap saveReview(@PathVariable Long videoID, @PathVariable int speakerRating,
			@PathVariable int contentRating, @PathVariable int usefullnessRating, @RequestBody String commentJSON) {
        final JSONObject json = new JSONObject(commentJSON);
        String comment = json.getString("comment");
		UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userID = userRepository.findByEmail(user.getUsername()).getId();
		UserVideoMap userVideo = userVideoRepository.findById(new UserVideoID(userID, videoID))
				.orElseGet(() -> userVideoRepository.save(new UserVideoMap(userID, videoID, speakerRating, contentRating, usefullnessRating, false)));
		userVideo.setSpeaker_rating(speakerRating);
		userVideo.setContent_rating(contentRating);
		userVideo.setUsefullness_rating(usefullnessRating);
		if (!comment.isEmpty()) {
			UserVideoComments commentEntity = new UserVideoComments();
			commentEntity.setUserID(userID);
			commentEntity.setVideoID(videoID);
			commentEntity.setComment(comment);
			userVideoCommentsRepository.save(commentEntity);
		}
		return userVideoRepository.save(userVideo);
	}
}
