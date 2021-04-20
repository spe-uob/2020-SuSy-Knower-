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

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProgramme(String programme) {
        this.programme = programme;
    }

    String prereqs;

    public String getPrereqs() { return prereqs; }
    public void setPrereqs(String prereqs) { this.prereqs = prereqs; }



    @Override
    public String toString() {
        return "Unit{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", programme='" + programme + '\'' +
                "prerequisites=" + prereqs + '\'' +
                '}';
    }
}
