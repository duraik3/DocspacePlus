package com.docspace.controller;

import com.docspace.exception.BadRequestException;
import com.docspace.persistence.model.AboutUs;
import com.docspace.persistence.repo.AboutUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/about")
public class AboutUsController {

    @Autowired
    private AboutUsRepository aboutUsRepository;

    @GetMapping("/all")
    public List<AboutUs> getAll() {
        List<AboutUs> result = new ArrayList<>();
        aboutUsRepository.findAll().forEach(result::add);
        return result;
    }

    @GetMapping("/{id}")
    public AboutUs findById(@PathVariable Long id) {
        return aboutUsRepository.findById(id).get();
    }

    @PostMapping
    public AboutUs addOption(@RequestBody AboutUs dto) {
        if (dto.getValue() == null || dto.getValue().isEmpty()) {
            throw new BadRequestException("Option Value is empty");
        }
        if(dto.getId()==null) {
            AboutUs toAdd = new AboutUs();
            toAdd.setValue(dto.getValue());
            return aboutUsRepository.save(toAdd);
        }else{
            AboutUs toEdit = aboutUsRepository.findById(dto.getId()).get();
            toEdit.setValue(dto.getValue());
            return aboutUsRepository.save(toEdit);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (findById(id) == null) {
            throw new BadRequestException("Option with id : " + id + " does not exit");
        }
        aboutUsRepository.deleteById(id);
    }
}
