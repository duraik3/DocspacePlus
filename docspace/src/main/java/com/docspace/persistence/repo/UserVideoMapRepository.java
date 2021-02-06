package com.docspace.persistence.repo;

import com.docspace.persistence.model.UserVideoMap;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserVideoMapRepository extends CrudRepository<UserVideoMap, UserVideoID> {
	@Query(value = "SELECT count(*) FROM user_video_map WHERE videoid = ?1 AND content_rating > -1", nativeQuery = true)
	public int countRatings(Long id);
    @Query(value = "SELECT sum(content_rating + usefullness_rating + speaker_rating) FROM user_video_map WHERE videoid = ?1 AND content_rating > -1", nativeQuery = true)
	public int sumByVideoID(Long id);
}
