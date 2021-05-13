package com.SuSyKnower;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnitService {

    @Autowired
    private UnitRepository unitRepository;

    public List<Unit> findAllUnits() {
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

    public int getNumberOfUnits() {
        return findAllUnits().size();
    }

    public List<Unit> getPrereqs(Unit unit) {
        List<Unit> prerequisites = new ArrayList<Unit>();
        String prereqStr = unit.getPrerequisites();
//exception
        try {
            String[] elements = prereqStr.split(",");
            for (int i = 0; i < elements.length; i++) {
                prerequisites.add(getUnit(Integer.parseInt(elements[i])).get());
            }
        }
        catch (NullPointerException n) {
            return Collections.emptyList(); 
        }
        return prerequisites;
    }

    public List<Integer> getPrereqsInt(Unit unit) {
        List<Integer> prerequisites = new ArrayList<Integer>();
        String prereqStr = unit.getPrerequisites();
        try {
            String[] elements = prereqStr.split(",");
            for (int i = 0; i < elements.length; i++) {
                prerequisites.add(Integer.parseInt(elements[i]));
            }
        }
        catch (NullPointerException n) {
            return Collections.emptyList(); 
        }
        return prerequisites;
    }

    //NumberFormat For input string:...
    //slow
    public List<Unit> getPostreqs(Unit unit) {
        List<Unit> tempUnits = new ArrayList<Unit>();
        tempUnits = findAllUnits();
        List<Unit> postrequisites = new ArrayList<Unit>();
        for(int i = 0; i < getNumberOfUnits(); i++) {
            List<Unit> currentPrereqs = new ArrayList<Unit>();
            //currentPrereqs.addAll(getPrereqs(getUnit(i).get()));
            try {
                currentPrereqs.addAll(getPrereqs(tempUnits.get(i)));
                if (currentPrereqs.contains(unit)) postrequisites.add(tempUnits.get(i));
            }
            catch(NumberFormatException f) {
                
            }
            /*if(getUnit(i).isPresent()) {
                try {
                    List<Unit> tryPrereqs = getPrereqs(getUnit(i).get());
                    currentPrereqs.addAll(getPrereqs(getUnit(i).get()));
                    if (currentPrereqs.contains(unit)) postrequisites.add(getUnit(i).get());
                }
                catch(NullPointerException n) {
                    // i++;
                }
            }*/
        }
        return postrequisites;
    }

    public List<Unit> getAllByProgramme(String theProgramme) {
        List<Unit> unitsInProgramme = new ArrayList<Unit>();
        unitsInProgramme = unitRepository.findUnitByProgramme(theProgramme);
        return unitsInProgramme;
    }

    public List<Unit> getAllByFaculty(String theFaculty) {
        List<Unit> unitsInFaculty = new ArrayList<Unit>();
        unitsInFaculty = unitRepository.findUnitByFaculty(theFaculty);
        return unitsInFaculty;
    }

    public List<Unit> getAllByTopic(String theTopic) {
        List<Unit> unitsWithTopic = new ArrayList<Unit>();
        unitsWithTopic = unitRepository.findUnitByTopic(theTopic);
        return unitsWithTopic;
    }
    
    public List<Unit> getAllBySchool(String theSchool) {
        List<Unit> unitsWithSchool = new ArrayList<Unit>();
        unitsWithSchool = unitRepository.findUnitBySchool(theSchool);
        return unitsWithSchool;
    }


    public List<String> getAllProgrammesInSchool(String theSchool) {
        List<String> programmesInSchool = new ArrayList<String>();
        programmesInSchool = unitRepository.findDistinctProgrammes(theSchool);
        return programmesInSchool;
    }

    public List<String> getAllSchoolsInFaculty(String theFaculty) {
        List<String> schoolsInFaculty = new ArrayList<String>();
        schoolsInFaculty = unitRepository.findDistinctSchools(theFaculty);
        return schoolsInFaculty;
    }

    public List<String> getAllFaculties() {
        List<String> allFaculties = new ArrayList<String>();
        allFaculties = unitRepository.findDistinctFaculties();
        return allFaculties;
    }
    
    public List<String> getAllTopicsInProgramme(String theProgramme) {
        List<String> topicsInProgramme = new ArrayList<String>();
        topicsInProgramme = unitRepository.findDistinctTopics(theProgramme);
        return topicsInProgramme;
    }


    public List<String> getAllSchools() {
        List<String> allFaculties = new ArrayList<String>();
        List<String> allSchools = new ArrayList<String>();
        allFaculties = getAllFaculties();
        for(int i = 0; i < allFaculties.size(); i ++) {
            allSchools.addAll(getAllSchoolsInFaculty(allFaculties.get(i)));
        }
        return allSchools;
    }

    public List<String> getAllProgrammes() {
        List<String> allProgrammes = new ArrayList<String>();
        List<String> allFaculties = new ArrayList<String>();
        List<String> allSchools = new ArrayList<String>();
        allSchools = getAllSchools();
        for(int i = 0; i < allSchools.size(); i ++) {
            allProgrammes.addAll(getAllProgrammesInSchool(allSchools.get(i)));
        }
        return allProgrammes;
    }

    public List<String> getAllTopics() {
        List<String> allProgrammes = new ArrayList<String>();
        List<String> allTopics = new ArrayList<String>();
        allProgrammes = getAllProgrammes();
        for(int i = 0; i < allProgrammes.size(); i ++) {
            allTopics.addAll(getAllTopicsInProgramme(allProgrammes.get(i)));
        }
        Set<String> set = new LinkedHashSet<>(allTopics);
        allTopics.clear();
        allTopics.addAll(set);

        return allTopics;
    }

}
