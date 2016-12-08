package com.example.rudy.musicfestivalapp.Model;

/**
 * Created by rudy on 08.12.2016.
 */

public class Artist {

    private long id;
    private String name;
    private String time;
    private String details;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    @Override
    public String toString(){
        return name + " will play at " + time;
    }
}
