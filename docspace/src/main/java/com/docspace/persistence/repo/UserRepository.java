package com.docspace.persistence.repo;


import com.docspace.persistence.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    User findByEmail(String email);
    User findById(Long id);

    List<User> findByRole(String role);
}
