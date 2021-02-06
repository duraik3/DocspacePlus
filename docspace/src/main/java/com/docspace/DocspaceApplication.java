package com.docspace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("com.docspace.persistence.repo")
@EntityScan("com.docspace.persistence.model")
@SpringBootApplication
public class DocspaceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DocspaceApplication.class, args);
	}

}
