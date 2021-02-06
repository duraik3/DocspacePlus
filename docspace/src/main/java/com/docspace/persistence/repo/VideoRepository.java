package com.docspace.persistence.repo;

import com.docspace.persistence.model.Video;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface VideoRepository extends CrudRepository<Video, Long> {
	List<Video> findByStatus(String status);
}
