package com.docspace.persistence.repo;

import com.docspace.persistence.model.PlayEvent;
import org.springframework.data.repository.CrudRepository;

public interface PlayEventRepository extends CrudRepository<PlayEvent, UserVideoID> {
}
