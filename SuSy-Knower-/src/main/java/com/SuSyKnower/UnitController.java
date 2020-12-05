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
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Optional;

//@SpringBootApplication
@RestController
//@RequestMapping("Courses")
public class UnitController {
   @Autowired
   UnitRepository unitrepository;

    /*public static void main(String[] args) {
        SpringApplication.run(UnitController.class, args);
    }*/

    @GetMapping("/")
    public String display() {
        return "whatever";

    }
}
