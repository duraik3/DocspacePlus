package com.docspace.persistence.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class PlayEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column
    private Long userID;

	@Column
    private Long videoID;

    @Column(name = "gmt_date", columnDefinition = "timestamp")
    private LocalDateTime gmt_date;
    
    @Column
    private String eventType;

    public PlayEvent() {}
	public PlayEvent(Long userID, Long videoID, LocalDateTime date, String eventType) {
		this.userID = userID;
		this.videoID = videoID;
		this.gmt_date = date;
		this.eventType = eventType;
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
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public LocalDateTime getGmt_date() {
		return gmt_date;
	}
	public void setGmt_date(LocalDateTime gmt_date) {
		this.gmt_date = gmt_date;
	}
	public String getEventType() {
		return eventType;
	}
	public void setEventType(String eventType) {
		this.eventType = eventType;
	}
	
}
