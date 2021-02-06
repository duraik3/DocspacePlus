package com.docspace.persistence.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import com.docspace.persistence.repo.UserVideoID;

@Entity
@IdClass(UserVideoID.class)
public class WatchLater {

	@Id
    private Long userID;

	@Id
    private Long videoID;

    public WatchLater() {}
	public WatchLater(Long userID, Long videoID) {
		this.userID = userID;
		this.videoID = videoID;
	}

	public Long getUser() {
		return userID;
	}

	public void setUser(Long userID) {
		this.userID = userID;
	}

	public Long getVideo() {
		return videoID;
	}

	public void setVideo(Long videoID) {
		this.videoID = videoID;
	}

	public Long getUserID() {
		return userID;
	}
	public void setUserID(Long userID) {
		this.userID = userID;
	}
	public Long getVideoID() {
		return videoID;
	}
	public void setVideoID(Long videoID) {
		this.videoID = videoID;
	}
}
