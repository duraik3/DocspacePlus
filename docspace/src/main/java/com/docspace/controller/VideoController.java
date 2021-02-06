package com.docspace.controller;

import com.docspace.controller.dto.VideoDto;
import com.docspace.exception.BadRequestException;
import com.docspace.persistence.model.Channel;
import com.docspace.persistence.model.Speaker;
import com.docspace.persistence.model.User;
import com.docspace.persistence.model.Video;
import com.docspace.persistence.repo.*;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/video")
public class VideoController {

    @Autowired
    private VideoRepository videoRepository;
    @Autowired
    private ChannelRepository channelRepository;
    @Autowired
    private SpeakerRepository speakerRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserVideoMapRepository userVideoMapRepository;

    @GetMapping("/all")
    public List<Video> getAll() {
        List<Video> result = new ArrayList<>();
        videoRepository.findAll().forEach(result::add);
        return result;
    }

    @GetMapping("/{id}")
    public Video findById(@PathVariable Long id) {
        Video video = videoRepository.findById(id).get();
        int count = userVideoMapRepository.countRatings(video.getId());
        video.setCountReviews(count);
        try {
        	video.setAverageRating(userVideoMapRepository.sumByVideoID(video.getId())/(3.0f*count));
        } catch (Exception e) {
        	video.setAverageRating(-1);
		}
        return video;
    }

    @GetMapping("/events")
    public List<Video> findByUpcoming() {
        List<Video> result = videoRepository.findByStatus("Upcoming");
        result.addAll(videoRepository.findByStatus("Live"));
        return result;
    }

    @PostMapping
    public Video addVideo(@RequestBody VideoDto dto) {
        if (dto != null) {
            if (dto.getId() == null) {
                Video toAdd = new Video();

                if(dto.getType()==null || dto.getType().isEmpty()){
                    throw new BadRequestException("Event type should be selected ! ");
                }
                toAdd.setType(dto.getType());
                if("Live".equals(dto.getType())){
                    if(dto.getUrl()!=null && !dto.getUrl().isEmpty()){
                        toAdd.setStatus("Published");
                    }else {
                        toAdd.setStatus("Upcoming");
                    }
                }else{
                    toAdd.setStatus("Published");
                }
                toAdd.setThumbnail(dto.getThumbnail());
                if(dto.getUrl()!=null && !dto.getUrl().isEmpty()) {
                    toAdd.setUrl(dto.getUrl());
                }
                toAdd.setTopic(dto.getTopic());
                toAdd.setDescription(dto.getDescription());
                toAdd.setEpisode(dto.getEpisode());
                Channel channel=null;
                if (dto.getChannelId() != null) {
                    channel = channelRepository.findById(dto.getChannelId()).get();
                    if (channel != null) {
                        toAdd.setChannels(new HashSet<>(Arrays.asList(channel)));
                    }else{
                        throw new BadRequestException("Valid Channel should nbe selected ! ");
                    }
                }
                if (dto.getSpeakerId() != null && dto.getSpeakerId() > 0) {
                    Optional<Speaker> speaker = speakerRepository.findById(dto.getSpeakerId());
                    if (speaker != null && speaker.get() != null) {
                        toAdd.setSpeaker(speaker.get());
                    }else{
                        throw new BadRequestException("Valid Speaker should nbe selected ! ");
                    }
                }
                if (dto.getModeratorId() != null && dto.getModeratorId() > 0) {
                    User moderator = userRepository.findById(dto.getModeratorId());
                    if (moderator != null) {
                        toAdd.setModerator(moderator);
                    }
                }
                DateTime eventDate = new DateTime(dto.getEventDate());
                if(eventDate.isBeforeNow()){
                    throw new BadRequestException("Event date should be in the future ! ");
                }
                toAdd.setEventDate(dto.getEventDate());
                DateTime date = new DateTime();
                toAdd.setCreated(date.toString());
                toAdd.setUpdated(date.toString());
                Video added = videoRepository.save(toAdd);

                if(channel !=null) {
                    channel.getVideos().add(added);
                    channelRepository.save(channel);
                }

                return added;
            }else{
                Video toEdit = videoRepository.findById(dto.getId()).get();
                if(toEdit==null){
                    throw new BadRequestException("Video with id "+dto.getId() +" not found ! ");
                }
                if(dto.getType()==null || dto.getType().isEmpty()){
                    throw new BadRequestException("Event type should be selected ! ");
                }
                toEdit.setType(dto.getType());
                if("Live".equals(dto.getType())){
                    if(dto.getUrl()!=null && !dto.getUrl().isEmpty()){
                        toEdit.setStatus("Published");
                    }else {
                        toEdit.setStatus("Upcoming");
                    }
                }else{
                    toEdit.setStatus("Published");
                }
                if(dto.getThumbnail()!=null && !dto.getThumbnail().isEmpty()) {
                    toEdit.setThumbnail(dto.getThumbnail());
                }
                if(dto.getUrl()!=null && !dto.getUrl().isEmpty()) {
                    toEdit.setUrl(dto.getUrl());
                }
                toEdit.setTopic(dto.getTopic());
                toEdit.setDescription(dto.getDescription());
                toEdit.setEpisode(dto.getEpisode());
                Channel channel=null;
                if (dto.getChannelId() != null) {
                    channel = channelRepository.findById(dto.getChannelId()).get();
                    if (channel != null) {
                        toEdit.setChannels(new HashSet<>(Arrays.asList(channel)));
                    }else{
                        throw new BadRequestException("Valid Channel should be selected ! ");
                    }
                }
                if (dto.getSpeakerId() != null && dto.getSpeakerId() > 0) {
                    Optional<Speaker> speaker = speakerRepository.findById(dto.getSpeakerId());
                    if (speaker != null && speaker.get() != null) {
                        toEdit.setSpeaker(speaker.get());
                    }else{
                        throw new BadRequestException("Valid Speaker should be selected ! ");
                    }
                }
                if (dto.getModeratorId() != null && dto.getModeratorId() > 0) {
                    User moderator = userRepository.findById(dto.getModeratorId());
                    if (moderator != null) {
                        toEdit.setModerator(moderator);
                    }
                }

                DateTime eventDate = new DateTime(dto.getEventDate());
                if(eventDate.isBeforeNow()){
                    throw new BadRequestException("Event date should be in the future ! ");
                }
                toEdit.setEventDate(dto.getEventDate());
                DateTime date = new DateTime();
                toEdit.setCreated(date.toString());
                toEdit.setUpdated(date.toString());

                Video added = videoRepository.save(toEdit);

                if(channel !=null && channel.getVideos() !=null) {
                    if(!channel.getVideos().contains(added)) {
                        channel.getVideos().add(added);
                        channelRepository.save(channel);
                    }
                }

                return added;
            }
        }
        return null;
    }

    @PutMapping("/link")
    public Video addVideoLiveLink(@RequestBody VideoDto dto) {
        if(dto.getId() == null){
            throw new BadRequestException("Error : No event Id ");
        }

        if(dto.getUrl() == null || dto.getUrl().isEmpty()){
            throw new BadRequestException("Error : event link cannot be empty ");
        }
        Video toEdit = videoRepository.findById(dto.getId()).get();
        if(toEdit==null){
            throw new BadRequestException("Video with id "+dto.getId() +" not found ! ");
        }
        toEdit.setUrl(dto.getUrl());
        toEdit.setStatus("Live");
        return  videoRepository.save(toEdit);
    }

    @DeleteMapping("/{id}")
    public boolean deleteById(@PathVariable Long id) {
        if (videoRepository.findById(id).get() != null) {
            Video video = videoRepository.findById(id).get();
            if(video.getChannels() !=null && ! video.getChannels().isEmpty()){
                for (Channel channel : video.getChannels()){
                    channel.getVideos().remove(video);
                    channelRepository.save(channel);
                }
            }
            videoRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
