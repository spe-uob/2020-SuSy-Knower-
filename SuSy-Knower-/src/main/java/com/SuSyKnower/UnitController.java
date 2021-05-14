package com.SuSyKnower;

import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;
import com.SuSyKnower.CustomizedException.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/unit")
public class UnitController {

    @Autowired
    private final UnitService unitService;

    public  UnitController(UnitService unitService){
      this.unitService =unitService;
    }


    @ResponseBody
    @PostMapping(path = "/add")
    public String addProgramme (@RequestParam String name,
        @RequestParam String programme,
        @RequestParam String school,
        @RequestParam String faculty,
        @RequestParam String topic,
        @RequestParam String prereqs,
        @RequestParam int id,
        @RequestParam int tb,
        @RequestParam String url) {

            Unit n = new Unit();
            n.setName(name);
            n.setProgramme(programme);
            n.setSchool(school);
            n.setFaculty(faculty);
            n.setTopic(topic);
            n.setPrerequisites(prereqs);
            n.setId(id);
            n.setTb(tb);
            n.setUrl(url);
            unitService.addUnit(n);
            return "Saved";
        }


    @GetMapping(path = "/all")
    public ResponseEntity<List<Unit>> getAllUnits (){
      List<Unit> units = unitService.findAllUnits();
      return new ResponseEntity<>(units, HttpStatus.OK);
    }

    @GetMapping(path="/prereqs")
    public ResponseEntity<List<Unit>> displayAllPrereqs(@RequestParam(required = true) int id) {
        List<Unit> prerequisites = new ArrayList<Unit>();
        if(unitService.getUnit(id).isPresent()) {
            prerequisites = unitService.getPrereqs(unitService.getUnit(id).get());
        }
        return new ResponseEntity<>(prerequisites, HttpStatus.OK);
    }

    @GetMapping(path="/prereqs_int")
    public ResponseEntity<List<Integer>> displayAllPrereqsInt(@RequestParam(required = true) int id) {
        List<Integer> prerequisitesIds = new ArrayList<Integer>();
        if(unitService.getUnit(id).isPresent()) {
            prerequisitesIds = unitService.getPrereqsInt(unitService.getUnit(id).get());
        }
        return new ResponseEntity<>(prerequisitesIds, HttpStatus.OK);
    }

    @GetMapping(path="/by_topic")
    public ResponseEntity<List<Unit>> displayUnitsByTopic(@RequestParam(required = false) String topic) {
        List<Unit> unitsByTopic = new ArrayList<Unit>();
        if(topic == null || topic.trim().isEmpty()) {
            unitsByTopic = unitService.findAllUnits();
        }
        else {
            unitsByTopic = unitService.getAllByTopic(topic);
        }
        return new ResponseEntity<>(unitsByTopic, HttpStatus.OK);
    }
    
    @GetMapping(path="/by_programme")
    public ResponseEntity<List<Unit>> displayUnitsByProgramme(@RequestParam(required = false) String programme) {
        List<Unit> unitsByProgramme = new ArrayList<Unit>();
        if(programme == null || programme.trim().isEmpty()) {
            unitsByProgramme = unitService.findAllUnits();
        }
        else {
            unitsByProgramme = unitService.getAllByProgramme(programme);
        }
        return new ResponseEntity<>(unitsByProgramme, HttpStatus.OK);
    }

    @GetMapping(path="/by_school")
    public ResponseEntity<List<Unit>> displayUnitsBySchool(@RequestParam(required = false) String school) {
        List<Unit> unitsBySchool = new ArrayList<Unit>();
        if(school == null || school.trim().isEmpty()) {
            unitsBySchool = unitService.findAllUnits();
        }
        else {
            unitsBySchool = unitService.getAllBySchool(school);
        }
        return new ResponseEntity<>(unitsBySchool, HttpStatus.OK);
    }

    @GetMapping(path="/by_faculty")
    public ResponseEntity<List<Unit>> displayUnitsByFaculty(@RequestParam(required = false) String faculty) {
        List<Unit> unitsByFaculty = new ArrayList<Unit>();
        if(faculty == null || faculty.trim().isEmpty()) {
            unitsByFaculty = unitService.findAllUnits();
        }
        else {
            unitsByFaculty = unitService.getAllByFaculty(faculty);
        }
        return new ResponseEntity<>(unitsByFaculty, HttpStatus.OK);
    }

    @GetMapping(path="/faculties")
    public ResponseEntity<List<String>> displayAllFaculties() {
        List<String> faculties = new ArrayList<String>();
        faculties = unitService.getAllFaculties();
        return new ResponseEntity<>(faculties, HttpStatus.OK);
    }

    @GetMapping(path="/programmes")
    public ResponseEntity<List<String>>  displayProgrammesBySchool(@RequestParam(required = false) String school) {
        List<String> programmes = new ArrayList<String>();
        if(school == null || school.trim().isEmpty()) {
            programmes = unitService.getAllProgrammes();
        }
        else {
            programmes = unitService.getAllProgrammesInSchool(school);
        }
        return new ResponseEntity<>(programmes, HttpStatus.OK);
    }

    @GetMapping(path="/schools")
    public ResponseEntity<List<String>> displaySchoolsByFaculty(@RequestParam(required = false) String faculty) {
        List<String> schools = new ArrayList<String>();
        if(faculty == null || faculty.trim().isEmpty()) {
            schools = unitService.getAllSchools();
        }
        else {
            schools = unitService.getAllSchoolsInFaculty(faculty);
        }
        return new ResponseEntity<>(schools, HttpStatus.OK);
    }

    @GetMapping(path="/topics")
    public ResponseEntity<List<String>> displayTopicsByProgramme(@RequestParam(required = false) String programme) {
        List<String> topics = new ArrayList<String>();
        if(programme == null || programme.trim().isEmpty()) {
            topics = unitService.getAllTopics();
        }
        else {
            topics = unitService.getAllTopicsInProgramme(programme);
        }
        return new ResponseEntity<>(topics, HttpStatus.OK);
    }

    @GetMapping(path="/schoolByProgramme")
    public ResponseEntity<String> displayTheSchool(@RequestParam(required = false) String programme) {
        String schoolByProgramme = new String();
        if(programme == null) {
            schoolByProgramme = "no argument";
            throw new NoArgumentException();
        }
        else {
            Unit unit = new Unit();
            try{
                unit = unitService.getAllByProgramme(programme).get(0);
                schoolByProgramme = unit.getSchool();
            }
            catch(IndexOutOfBoundsException i) {
                schoolByProgramme = "incorrect argument";
                throw new IncorrectArgumentException();
            }
        }
        return new ResponseEntity<>(schoolByProgramme, HttpStatus.OK);
    }

    @GetMapping(path="/facultyBySchool")
    public ResponseEntity<String> displayTheFaculty(@RequestParam(required = false) String school) {
        String facultyBySchool = new String();
        if(school == null) {
            facultyBySchool = "no argument";
            throw new NoArgumentException();
        }
        else {
            Unit unit = new Unit();
            try {
                unit = unitService.getAllBySchool(school).get(0);
                facultyBySchool = unit.getFaculty();
            }
            catch(IndexOutOfBoundsException i) {
                facultyBySchool = "incorrect argument";
                throw new IncorrectArgumentException();
            }
        }
        return new ResponseEntity<>(facultyBySchool, HttpStatus.OK);
    }

}
