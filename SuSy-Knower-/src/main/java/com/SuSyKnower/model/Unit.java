package com.SuSyKnower.model;

import javax.persistence.*;

public class Unit {

    private int unitID;

    private String unitname;
    private String unitprogramme;

    //setters
    public void setUnitID(int unitID) {
        this.unitID = unitID;
    }

    public void setUnitname(String unitname) {
        this.unitname = unitname;
    }

    public void setUnitprogramme(String unitprogramme) {
        this.unitprogramme = unitprogramme;
    }

    //getters
    public int getUnitID() {
        return unitID;
    }

    public String getUnitname() {
        return unitname;
    }

    public String getUnitprogramme() {
        return unitprogramme;
    }

    @Override
    public String toString() {
        return "Unit{" +
                "unitID=" + unitID +
                ", unitname='" + unitname + '\'' +
                ", unitprogramme='" + unitprogramme + '\'' +
                '}';
    }
}
