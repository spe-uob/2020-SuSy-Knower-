package com.SuSyKnower;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "units")
@SecondaryTable(name = "relations", pkJoinColumns = @PrimaryKeyJoinColumn(name = "unit") /*, pkJoinColumns = @PrimaryKeyJoinColumn(name = "prereq")*/)
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;
    private String programme;

    public Unit() {
    }
    //private List<Unit> preRequisites = new ArrayList<Unit>();

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

    @Embedded
    Prerequisites prerequisites;

    public Prerequisites getPrerequisites(Prerequisites prerequisites) {
        return prerequisites;
    }

    public void setPrerequisites(Prerequisites prerequisites) {
        this.prerequisites = prerequisites;
    }

    @Override
    public String toString() {
        return "Unit{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", programme='" + programme + '\'' +
                '}';
    }
}

@Embeddable
class Prerequisites {
    private int unit;
    private int prereq;
}