package com.docspace.persistence.repo;
import com.docspace.persistence.model.LiveQuestion;
import com.docspace.persistence.model.Video;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface LiveQuestionRepository extends CrudRepository<LiveQuestion, Long> {
	List<LiveQuestion> findByVideo(Video video);
}
