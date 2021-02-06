package com.docspace.persistence.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import com.docspace.persistence.repo.UserVideoID;

@Entity
@IdClass(UserVideoID.class)
public class UserVideoMap {

	@Id
    private Long userID;

	@Id
    private Long videoID;

    @Column
    private int speaker_rating;

    @Column
    private int content_rating;
    
    @Column
    private int usefullness_rating;

    @Column
    private boolean heart;

    public UserVideoMap() {}
	public UserVideoMap(Long userID, Long videoID, int speaker_rating, int content_rating, int usefullness_rating, boolean heart) {
		this.userID = userID;
		this.videoID = videoID;
		this.speaker_rating = speaker_rating;
		this.content_rating = content_rating;
		this.usefullness_rating = usefullness_rating;
		this.heart = heart;
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

	public boolean isHeart() {
		return heart;
	}

	public void setHeart(boolean heart) {
		this.heart = heart;
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
	public int getSpeaker_rating() {
		return speaker_rating;
	}
	public void setSpeaker_rating(int speaker_rating) {
		this.speaker_rating = speaker_rating;
	}
	public int getContent_rating() {
		return content_rating;
	}
	public void setContent_rating(int content_rating) {
		this.content_rating = content_rating;
	}
	public int getUsefullness_rating() {
		return usefullness_rating;
	}
	public void setUsefullness_rating(int usefullness_rating) {
		this.usefullness_rating = usefullness_rating;
	}
}
