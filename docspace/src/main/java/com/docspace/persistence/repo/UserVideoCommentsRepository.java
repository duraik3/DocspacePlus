package com.docspace.persistence.repo;

import com.docspace.persistence.model.UserVideoComments;
import org.springframework.data.repository.CrudRepository;

public interface UserVideoCommentsRepository extends CrudRepository<UserVideoComments, Long> {
}
