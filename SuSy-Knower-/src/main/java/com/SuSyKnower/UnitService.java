package com.SuSyKnower;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//to add: getAllByProgramme, faculty and topic, probably to return a list of units each

@Service
public class UnitService {
    
    @Autowired
    private UnitRepository unitRepository;

    public List<Unit> getAllUnits() {
        List<Unit> units = new ArrayList<>();
        unitRepository.findAll().forEach(units::add);
        return units;
    }

    public Optional<Unit> getUnit(int id) {
        return unitRepository.findById(id);
    }

    public void addUnit(Unit unit) {
        unitRepository.save(unit);
    }

    public void updateUnit(Unit unit) {
        unitRepository.save(unit);
    }

    public void deleteUnit(int id) {
        unitRepository.deleteById(id);
    }

    //just for readability
    public int getNumberOfUnits() {
        return getAllUnits().size();
    }

    //get the prerequisites in a list form from the prereqs string in the Unit class
    public List<Unit> getPrereqs(Unit unit) {
        List<Unit> prerequisites = new ArrayList<Unit>();
        String[] elements = unit.prereqs.split(",");
        if (elements.length == 0) return null; //handle it better, you cant just have NullPointerException
        for (int i = 0; i < elements.length; i++) {
            prerequisites.add(getUnit(Integer.parseInt(elements[i])).get()); //will throw NullPointerElement Exception when there are no prereqs
        }
        return prerequisites;
    }

    //same but for postrequisites
    public List<Unit> getPostreqs(Unit unit) {
        List<Unit> postrequisites = new ArrayList<Unit>();
        for(int i = 1; i <= getNumberOfUnits(); i++) {
            List<Unit> currentPrereqs = new ArrayList<>();
            //handling the no prereqs exception should probably be handled in the getprereqs function, via a separate error handling function, to be researched
            if(getUnit(i).isPresent()) {
                try {
                    List<Unit> tryPrereqs = getPrereqs(getUnit(i).get());
                    currentPrereqs.addAll(getPrereqs(getUnit(i).get()));
                    if (currentPrereqs.contains(unit)) postrequisites.add(getUnit(i).get());
                }
                catch(NullPointerException n) {
                    i++;
                }
            }
        }
        return postrequisites;
    }

}
