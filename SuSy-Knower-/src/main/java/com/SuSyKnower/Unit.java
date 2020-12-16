package com.SuSyKnower;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "units")
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;
    private String programme;
    // private List<Unit> preRequisites = new ArrayList<Unit>();

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getProgramme() {
        return programme;
    }

    // public void removeRequisite(Unit unit) {
    //     preRequisites.remove(unit);
    // }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProgramme(String programme) {
        this.programme = programme;
    }

    // public void addRequisite(Unit unit) {
    //     preRequisites.add(unit);
    // }

    // public Unit(Integer id, String name, String programme) {
    //     this.id = id;
    //     this.name = name;
    //     this.programme = programme;
    // }

    @Override
    public String toString() {
        return "Unit{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", programme='" + programme + '\'' +
                '}';
    }
}
