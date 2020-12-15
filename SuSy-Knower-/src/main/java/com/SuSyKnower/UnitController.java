package com.SuSyKnower;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
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


import java.util.ArrayList;
import java.util.Optional;

//@SpringBootApplication
@RestController
@RequestMapping(path = "/test")
public class UnitController {
    // @Autowired
    // UnitRepository unitRepository;

    private UnitService unitService;

    @PostMapping(path = "/add")//map the post request
    public @ResponseBody String addProgramme (@RequestParam String name,
        @RequestParam String programme) {
            
            Unit n = new Unit();
            unitService.addUnit(n);
            return "Saved";
        } 

    @GetMapping(path = "/display")
    public @ResponseBody Iterable<Unit> displayAllUsers() {
        return unitService.getAllUnits();

    }
}
