package com.docspace.controller.dto;

public class ChannelDto {

    private Long id;

    private String title;

    private String description;

    private String category;

    private Long sponsorId;

    private String banner;

    private String smallBanner;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Long getSponsorId() {
        return sponsorId;
    }

    public void setSponsorId(Long sponsorId) {
        this.sponsorId = sponsorId;
    }

    public String getBanner() {
        return banner;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }

    public String getSmallBanner() {
        return smallBanner;
    }

    public void setSmallBanner(String smallBanner) {
        this.smallBanner = smallBanner;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
