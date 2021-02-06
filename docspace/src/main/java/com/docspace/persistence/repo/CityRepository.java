package com.docspace.persistence.repo;

import com.docspace.persistence.model.City;
import com.docspace.persistence.model.State;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository<City, Long> {
    List<City> findByState(State state);
}
