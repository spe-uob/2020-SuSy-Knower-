package com.SuSyKnower.controller;

import com.SuSyKnower.model.Requisite;
import com.SuSyKnower.model.Unit;
import com.SuSyKnower.service.RequisiteService;
import com.SuSyKnower.service.UnitService;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class UnitController {

    @Autowired
    private UnitService unitService;

    @Autowired
    private RequisiteService requisiteService;

//    @ResponseBody
//    @PostMapping(path = "/add")//map the post request
//    public String addProgramme (@RequestParam String name,
//        @RequestParam String programme) {//requires updates, without responseBody
//
//            Unit n = new Unit();
//            n.setName(name);
//            n.setProgramme(programme);
//            unitService.addUnit(n);
//            return "Saved";
//        }

    @RequestMapping(path = "/index1")
    public String displayAllUsers(Model model) {
//        List<Unit> unitList = new ArrayList<Unit>();
//        List<Requisite> requisiteList = new ArrayList<Requisite>();
        var unitList = unitService.getAllUnits();
        var requisiteList = requisiteService.getAllRequisite();
        model.addAttribute("unitList", unitList);
        model.addAttribute("requisiteList", requisiteList);
        return "index";
    }

//    @ResponseBody
//    @GetMapping(path="/index2")
//    public List<Unit> displayAllUnits() {
//        return unitService.getAllUnits();
//    }
}
