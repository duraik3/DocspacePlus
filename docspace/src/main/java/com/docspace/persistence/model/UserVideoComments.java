package com.docspace.persistence.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserVideoComments {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

	@Column
    private Long userID;

	@Column
    private Long videoID;

    @Column
    private String comment = "";
    
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
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
}
