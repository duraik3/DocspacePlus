package com.docspace.persistence.repo;

import java.io.Serializable;
import java.util.Objects;

public class UserVideoID implements Serializable{
    /**
	 * Used in UserVideoMapController
	 */
	private static final long serialVersionUID = -7207563067391740322L;
	private Long userID;
    private Long videoID;

    public UserVideoID() {
    	userID = -1L;
    	videoID = -1L;
    }
    public UserVideoID(Long UserID, Long VideoID) {
        this.userID = UserID;
        this.videoID = VideoID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserVideoID ID = (UserVideoID) o;
        return userID.equals(ID.userID) &&
        		videoID.equals(ID.videoID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userID, videoID);
    }
}
