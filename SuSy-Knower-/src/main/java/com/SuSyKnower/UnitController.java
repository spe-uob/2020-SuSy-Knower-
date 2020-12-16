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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(path = "/test")
public class UnitController {

    @Autowired
    private UnitService unitService;

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
        unitList = unitService.getAllUnits();
        model.addAttribute("unitList", unitList);
        return "index";
    }

    @ResponseBody
    @GetMapping(path="/index2")
    public List<Unit> displayAllUnits() {
        return unitService.getAllUnits();
    }
}
