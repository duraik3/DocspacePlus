package com.docspace.persistence.repo;

import com.docspace.persistence.model.Country;
import com.docspace.persistence.model.State;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRepository extends CrudRepository<State, Long> {
    List<State> findByCountry(Country country);
    State findByName(String name);
}
