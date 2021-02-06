package com.docspace.controller;

import com.docspace.controller.dto.ChannelDto;
import com.docspace.exception.BadRequestException;
import com.docspace.persistence.model.Channel;
import com.docspace.persistence.repo.ChannelRepository;
import com.docspace.persistence.repo.UserRepository;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/channel")
public class ChannelController {

    @Autowired
    private ChannelRepository channelRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public List<Channel> getAll() {
        List<Channel> result = new ArrayList<>();
        channelRepository.findAll().forEach(result::add);
        return result;
    }

    @GetMapping("/{id}")
    public Channel findById(@PathVariable Long id) {
        return channelRepository.findById(id).get();
    }

    @GetMapping("/title/{title}")
    public Channel findByTitle(@PathVariable String title) {
        return channelRepository.findByTitle(title);
    }

    @GetMapping("/category/{category}")
    public List<Channel> getByCategory(@PathVariable String category) {
        return channelRepository.findByCategory(category);
    }

    @PostMapping
    public Channel addChannel(@RequestBody ChannelDto dto) {
        if (dto.getId() == null) {
            Channel toSave = new Channel();
            if (findByTitle(dto.getTitle()) != null) {
                throw new BadRequestException("There is already a channel with same title");
            }
            toSave.setTitle(dto.getTitle());
            toSave.setDescription(dto.getDescription());
            toSave.setCategory(dto.getCategory());
            toSave.setSponsor(userRepository.findById(dto.getSponsorId()));
            if (dto.getBanner() != null && !dto.getBanner().isEmpty()) {
                toSave.setBanner(dto.getBanner());
            }
            if (dto.getSmallBanner() != null && !dto.getSmallBanner().isEmpty()) {
                toSave.setSmallBanner(dto.getSmallBanner());
            }
            DateTime date = new DateTime();

            toSave.setCreated(date.toString());
            toSave.setUpdated(date.toString());

            return channelRepository.save(toSave);
        } else {

            Channel toEdit = channelRepository.findById(dto.getId()).get();
            toEdit.setTitle(dto.getTitle());
            if(dto.getDescription() !=null && dto.getDescription().length() > 400){
                throw new BadRequestException("Channel description should not exceed 400 character");
            }
            toEdit.setDescription(dto.getDescription());
            toEdit.setCategory(dto.getCategory());
            toEdit.setSponsor(userRepository.findById(dto.getSponsorId()));
            if (dto.getBanner() != null && !dto.getBanner().isEmpty()) {
                toEdit.setBanner(dto.getBanner());
            }
            if (dto.getSmallBanner() != null && !dto.getSmallBanner().isEmpty()) {
                toEdit.setSmallBanner(dto.getSmallBanner());
            }
            DateTime date = new DateTime();
            toEdit.setUpdated(date.toString());
            return channelRepository.save(toEdit);
        }

    }

    @DeleteMapping("/{id}")
    public void deleteChannel(@PathVariable Long id) {
        if (findById(id) == null) {
            throw new BadRequestException("Channel with id : " + id + " does not exit");
        }
        channelRepository.deleteById(id);
    }
}
