package com.SuSyKnower;

import javax.persistence.*;
import java.util.*;
import java.util.Arrays;

//still to add: url, faculty and topic columns

@Entity
@Table(name = "units")
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;
    private String programme;
    private String school;
    private String faculty;
    //temporarily only one topic per unit allowed
    //a csv string, might be worth parsing not to separate strings but topic objects
    private String topic;
    private String url;
    private String prereqs;
    private int tb;

    public Unit() {
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getProgramme() {
        return programme;
    }

    public String getFaculty() {
        return faculty;
    }

    public String getTopic() {
        return topic;
    }

    public String getUrl() {
        return url;
    }

    public int getTb(){return tb;}

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProgramme(String programme) {
        this.programme = programme;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setTb(int tb) { this.tb = tb; }

    public String getPrereqs() { return prereqs; }
    public void setPrereqs(String prereqs) { this.prereqs = prereqs; }

    //for testing purposes, different types of toString functions might be neccessary for the frontend integration
    @Override
    public String toString() {
        return "Unit{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", programme='" + programme + '\'' +
                ", faculty='" + faculty + '\'' +
                ", topics='" + topic + '\'' +
                //make it an actual link in some layer
                ", link='" + url + '\'' +
                ", prerequisites=" + prereqs + '\'' +
                '}';
    }
}
