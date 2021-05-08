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


    @ResponseBody
    @GetMapping(path="/index2")
    public List<Unit> displayAllUnits() {
        return unitService.findAllUnits();
    }

    //display all the prerequisites in a separate tab given the unit id
    //the path is <server ip>:8080/test/prereqs?id=<the id of a unit whose prereqs you want to see>
    @GetMapping(path="/prereqs")
    public String displayAllPrereqs(Model model, @RequestParam(required = true) int id) {
        List<Unit> prerequisites = new ArrayList<Unit>();
        if(unitService.getUnit(id).isPresent()) {
            prerequisites = unitService.getPrereqs(unitService.getUnit(id).get());
        }
        model.addAttribute("prerequisites", prerequisites);
        return "prereqs";
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
    public String displayAllByTopic(Model model, @RequestParam(required = true) String topic) {
        List<Unit> units = new ArrayList<Unit>();
        units = unitService.getAllByTopic(topic);
        model.addAttribute("topic", units);
        return "topic";
    }
    //for everything add a default option: if there's no argument provided, all of the units/schools/topics etc. are returned
    @GetMapping(path="/by_programme")
    public String displayAllByProgramme(Model model, @RequestParam(required = true) String programme) {
        List<Unit> units = new ArrayList<Unit>();
        units = unitService.getAllByProgramme(programme);
        model.addAttribute("by_programme", units);
        return "by_programme";
    }


    @GetMapping(path="/programmes_by_school")
    public String displayAllBySchool(Model model, @RequestParam(required = true) String school) {
        List<String> programmes = new ArrayList<String>();
        programmes = unitService.getAllProgrammesInSchool(school);
        model.addAttribute("by_school", programmes);
        return "by_school";
    }

    @GetMapping(path="/schools_by_faculty")
    public String displayAllByFaculty(Model model, @RequestParam(required = true) String faculty) {
        List<String> schools = new ArrayList<String>();
        schools = unitService.getAllSchoolsInFaculty(faculty);
        model.addAttribute("by_faculty", schools);
        return "by_faculty";
    }
//programmes, schools, faculties, topics,

    @GetMapping(path="/topics_by_programme")
    public String displayAllTopicsByProgramme(Model model, @RequestParam(required = true) String programme) {
        List<String> topics = new ArrayList<String>();
        topics = unitService.getAllTopicsInPrograme(programme);
        model.addAttribute("topics_by_programme", topics);
        return "topics_by_programme";
    }

}
