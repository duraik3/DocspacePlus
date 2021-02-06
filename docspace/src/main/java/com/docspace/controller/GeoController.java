package com.docspace.controller;

import com.docspace.persistence.model.City;
import com.docspace.persistence.model.Country;
import com.docspace.persistence.model.State;
import com.docspace.persistence.repo.CityRepository;
import com.docspace.persistence.repo.CountryRepository;
import com.docspace.persistence.repo.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/geo")
public class GeoController {

    @Autowired
    private StateRepository stateRepository;
    @Autowired
    private CityRepository cityRepository;
    @Autowired
    private CountryRepository countryRepository;

    @GetMapping("/city/{state_id}")
    public List<City> listCities(@PathVariable Long state_id) {
        Optional<State> state = stateRepository.findById(state_id);
        if (!state.isPresent()) return new ArrayList<City>();
        return cityRepository.findByState(state.get());
    }

    @GetMapping("/state/{country_id}")
    public List<State> listCountry(@PathVariable Long country_id) {
        Optional<Country> country = countryRepository.findById(country_id);
        if (!country.isPresent()) return new ArrayList<State>();
        return stateRepository.findByCountry(country.get());
    }

    @GetMapping("/countries")
    public List<Country> listCountries() {
        return countryRepository.findAll();
    }
}
