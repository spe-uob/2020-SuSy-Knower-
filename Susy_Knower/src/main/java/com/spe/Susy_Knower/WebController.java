package com.spe.Susy_Knower;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WebController {
    @GetMapping(value = "/") //Spring calls the method below for all requests to the index path that use http get
    //@ResponseBody makes Spring interpret the method below as a response body itself
    //a string interpreted as html
    /*public String index() { //by default interpreted as a path to (name of) a template
        return "test";
    }*/
    public String index2(@RequestParam(name = "name", required = false) String name, Model model) {
        model.addAttribute("greeting", "Welcome " + name); //localhost:8080/?name=whatever
        return "index2";
    }
}
