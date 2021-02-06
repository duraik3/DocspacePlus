package com.docspace.persistence.repo;

import com.docspace.persistence.model.Country;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends CrudRepository<Country, Long> {
	Country findByName(String name);
    List<Country> findAll();
}
