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


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
//try with old mapping (test)
@RequestMapping(path = "/unit")
public class UnitController {

    @Autowired
    private final UnitService unitService;

    public  UnitController(UnitService unitService){
      this.unitService =unitService;
    }


    @ResponseBody
    @PostMapping(path = "/add")//map the post request
    public String addProgramme (@RequestParam String name,
        @RequestParam String programme) {//requires updates, without responseBody

            Unit n = new Unit();
            n.setName(name);
            n.setProgramme(programme);
            unitService.addUnit(n);
            return "Saved";
        }

    @GetMapping(path = "/index")
    public String displayAllUsers(Model model) {
        List<Unit> unitList = new ArrayList<Unit>();
        unitList = unitService.findAllUnits();
        model.addAttribute("unitList", unitList);
        return "index";
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<Unit>> getAllUnits (){
      List<Unit> units = unitService.findAllUnits();
      return new ResponseEntity<>(units, HttpStatus.OK);
    }

    //display all the prerequisites in a separate tab given the unit id
    //the path is <server ip>:8080/test/prereqs?id=<the id of a unit whose prereqs you want to see>
    @GetMapping(path="/prereqs")
    public ResponseEntity<List<Unit>> displayAllPrereqs(Model model, @RequestParam(required = true) int id) {
        List<Unit> prerequisites = new ArrayList<Unit>();
        if(unitService.getUnit(id).isPresent()) {
            prerequisites = unitService.getPrereqs(unitService.getUnit(id).get());
        }
        model.addAttribute("prerequisites", prerequisites);
        return new ResponseEntity<>(prerequisites, HttpStatus.OK);
    }

    //display all the postrequisites in a separate tab given the unit id
    //the path is <server ip>:8080/test/postreqs?id=<the id of a unit whose prereqs you want to see>
    @GetMapping(path="/postreqs")
    public String displayAllPostreqs(Model model, @RequestParam(required = true) int id) {
        List<Unit> postrequisites = new ArrayList<Unit>();
        if(unitService.getUnit(id).isPresent()) {
            postrequisites = unitService.getPostreqs(unitService.getUnit(id).get());
        }
        model.addAttribute("postrequisites", postrequisites);
        return "postreqs";
    }

    @GetMapping(path="/by_topic")
    public ResponseEntity<List<Unit>> displayUnitsByTopic(Model model, @RequestParam(required = false) String topic) {
        List<Unit> unitsByTopic = new ArrayList<Unit>();
        if(topic == null || topic.trim().isEmpty()) {
            unitsByTopic = unitService.findAllUnits();
        }
        else {
            unitsByTopic = unitService.getAllByTopic(topic);
        }
        model.addAttribute("by_topic", unitsByTopic);
        return new ResponseEntity<>(unitsByTopic, HttpStatus.OK);
    }
    //for everything add a default option: if there's no argument provided, all of the units/schools/topics etc. are returned
    @GetMapping(path="/by_programme")
    public ResponseEntity<List<Unit>> displayUnitsByProgramme(Model model, @RequestParam(required = false) String programme) {
        List<Unit> unitsByProgramme = new ArrayList<Unit>();
        if(programme == null || programme.trim().isEmpty()) {
            unitsByProgramme = unitService.findAllUnits();
        }
        else {
            unitsByProgramme = unitService.getAllByProgramme(programme);
        }
        model.addAttribute("by_programme", unitsByProgramme);
        return new ResponseEntity<>(unitsByProgramme, HttpStatus.OK);
    }

    @GetMapping(path="/by_school")
    public ResponseEntity<List<Unit>> displayUnitsBySchool(Model model, @RequestParam(required = false) String school) {
        List<Unit> unitsBySchool = new ArrayList<Unit>();
        if(school == null || school.trim().isEmpty()) {
            unitsBySchool = unitService.findAllUnits();
        }
        else {
            unitsBySchool = unitService.getAllBySchool(school);
        }
        model.addAttribute("by_school", unitsBySchool);
        return new ResponseEntity<>(unitsBySchool, HttpStatus.OK);
    }

    @GetMapping(path="/by_faculty")
    public ResponseEntity<List<Unit>> displayUnitsByFaculty(Model model, @RequestParam(required = false) String faculty) {
        List<Unit> unitsByFaculty = new ArrayList<Unit>();
        if(faculty == null || faculty.trim().isEmpty()) {
            unitsByFaculty = unitService.findAllUnits();
        }
        else {
            unitsByFaculty = unitService.getAllByFaculty(faculty);
        }
        model.addAttribute("by_faculty", unitsByFaculty);
        return new ResponseEntity<>(unitsByFaculty, HttpStatus.OK);
    }

    @GetMapping(path="/faculties")
    public ResponseEntity<List<String>> displayAllFaculties(Model model) {
        List<String> faculties = new ArrayList<String>();
        faculties = unitService.getAllFaculties();
        model.addAttribute("faculties", faculties);
        return new ResponseEntity<>(faculties, HttpStatus.OK);
    }

    @GetMapping(path="/programmes")
    public ResponseEntity<List<String>>  displayProgrammesBySchool(Model model, @RequestParam(required = false) String school) {
        List<String> programmes = new ArrayList<String>();
        //return all programmes
        if(school == null || school.trim().isEmpty()) {
            programmes = unitService.getAllProgrammes();
        }
        else {
            programmes = unitService.getAllProgrammesInSchool(school);
        }
        model.addAttribute("programmes", programmes);
        return new ResponseEntity<>(programmes, HttpStatus.OK);
        //model.addAttribute("programmes_by_school", programmes);
        //return "programmes_by_school";
    }

    @GetMapping(path="/schools")
    public ResponseEntity<List<String>> displaySchoolsByFaculty(Model model, @RequestParam(required = false) String faculty) {
        List<String> schools = new ArrayList<String>();
        if(faculty == null || faculty.trim().isEmpty()) {
            schools = unitService.getAllSchools();
        }
        else {
            schools = unitService.getAllSchoolsInFaculty(faculty);
        }
        model.addAttribute("schools", schools);
        return new ResponseEntity<>(schools, HttpStatus.OK);
    }

    @GetMapping(path="/topics")
    public ResponseEntity<List<String>> displayTopicsByProgramme(Model model, @RequestParam(required = false) String programme) {
        List<String> topics = new ArrayList<String>();
        if(programme == null || programme.trim().isEmpty()) {
            topics = unitService.getAllTopics();
        }
        else {
            topics = unitService.getAllTopicsInProgramme(programme);
        }
        model.addAttribute("topics", topics);
        return new ResponseEntity<>(topics, HttpStatus.OK);
    }

}
