package com.docspace.persistence.repo;

import com.docspace.persistence.model.WatchLater;

import org.springframework.data.repository.CrudRepository;

public interface WatchLaterRepository extends CrudRepository<WatchLater, UserVideoID> {
}
