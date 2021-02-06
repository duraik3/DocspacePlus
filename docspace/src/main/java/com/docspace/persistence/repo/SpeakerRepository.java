package com.docspace.persistence.repo;

import com.docspace.persistence.model.Speaker;
import org.springframework.data.repository.CrudRepository;

public interface SpeakerRepository extends CrudRepository<Speaker, Long> {
}
