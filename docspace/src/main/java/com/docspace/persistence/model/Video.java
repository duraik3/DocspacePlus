package com.docspace.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="video")
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column
    private String type;

    @Column
    private String thumbnail;

    @Column
    private String url;//link to s3 for the video

    @Column
    private String topic;

    @Column(length=10000)
    private String description;

    @Column
    private String status;

    @ManyToOne
    @JoinColumn(name = "speaker_id")
    @JsonIgnoreProperties({"video"})
    private Speaker speaker;

    @ManyToOne
    @JoinColumn(name = "moderator_id", foreignKey=@ForeignKey(name="Video_Moderator_FK"))
    private User moderator;

    @Column
    private String eventDate;

    @Column
    private String uploadDate;

    @Column
    private String created;

    @Column
    private String updated;
    
    @Column
    private int episode;
    
    @ManyToMany(mappedBy = "videos")
    @JsonIgnoreProperties("videos")
    private Set<Channel> channels;

    @Transient
    private int countReviews;
    
    @Transient
    private float averageRating;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Set<Channel> getChannels() {
        return channels;
    }

    public void setChannels(Set<Channel> channels) {
        this.channels = channels;
    }
    
    public int getCountReviews() {
		return countReviews;
	}

	public void setCountReviews(int countReviews) {
		this.countReviews = countReviews;
	}

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(String uploadDate) {
        this.uploadDate = uploadDate;
    }

    public Speaker getSpeaker() {
        return speaker;
    }

    public void setSpeaker(Speaker speaker) {
        this.speaker = speaker;
    }
    
    public int getEpisode() {
		return episode;
	}

	public void setEpisode(int episode) {
		this.episode = episode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public float getAverageRating() {
		return averageRating;
	}

	public void setAverageRating(float averageRating) {
		this.averageRating = averageRating;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public User getModerator() {
        return moderator;
    }

    public void setModerator(User moderator) {
        this.moderator = moderator;
    }
}
