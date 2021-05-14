package com.SuSyKnower;

import javax.persistence.*;
import java.util.*;
import java.util.Arrays;


@Entity
@Table(name = "units")
public class Unit {
    @Id
    private int id;

    private String name;
    private String programme;
    private String school;
    private String faculty;
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

    public String getSchool() {
        return school;
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

    public void setSchool(String school) {
        this.school = school;
    }

    public String getPrerequisites() { return prereqs; }
    public void setPrerequisites(String prereqs) { this.prereqs = prereqs; }

    @Override
    public String toString() {
        return "Unit{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", programme='" + programme + '\'' +
                ", faculty='" + faculty + '\'' +
                ", school='" + school + '\'' +
                ", topics='" + topic + '\'' +
                ", link='" + url + '\'' +
                ", prerequisites=" + prereqs + '\'' +
                '}';
    }
}
