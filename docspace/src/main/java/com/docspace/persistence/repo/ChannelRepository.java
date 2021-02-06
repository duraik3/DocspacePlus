package com.docspace.persistence.repo;

import com.docspace.persistence.model.Channel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChannelRepository extends CrudRepository<Channel, Long> {
    Channel findByTitle(String title);
    List<Channel> findByCategory(String category);
}
