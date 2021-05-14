package com.SuSyKnower;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jdk.jfr.Timestamp;

import static org.junit.jupiter.api.Assertions.*;
import java.util.*;

import com.SuSyKnower.CustomizedException.NoArgumentException;

@SpringBootTest
class SuSyKnowerControllerTests {
	@Autowired
	private UnitController testUnitController;

    @Autowired
    private UnitService testUnitService;

    @Test
    public void testGetAllUnits() {
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.getAllUnits().getBody(), testUnitController.getAllUnits().getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.findAllUnits(), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testPrereqs() {
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayAllPrereqs(13).getBody(), testUnitController.displayAllPrereqs(13).getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.getPrereqs(testUnitService.getUnit(13).get()), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testOnePrereq() {
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayAllPrereqs(10).getBody(), testUnitController.displayAllPrereqs(10).getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.getPrereqs(testUnitService.getUnit(10).get()), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testPrereqsNull() {
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayAllPrereqs(1).getBody(), testUnitController.displayAllPrereqs(1).getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.getPrereqs(testUnitService.getUnit(1).get()), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testPrereqsInt() {
        ResponseEntity <List<Integer>> ActualResponse = new ResponseEntity<>(testUnitController.displayAllPrereqsInt(13).getBody(), testUnitController.displayAllPrereqsInt(13).getStatusCode());
        ResponseEntity <List<Integer>> ExpectedResponse = new ResponseEntity<>(testUnitService.getPrereqsInt(testUnitService.getUnit(13).get()), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testOnePrereqInt() {
        ResponseEntity <List<Integer>> ActualResponse = new ResponseEntity<>(testUnitController.displayAllPrereqsInt(10).getBody(), testUnitController.displayAllPrereqsInt(13).getStatusCode());
        ResponseEntity <List<Integer>> ExpectedResponse = new ResponseEntity<>(testUnitService.getPrereqsInt(testUnitService.getUnit(10).get()), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testPrereqsIntNull() {
        ResponseEntity <List<Integer>> ActualResponse = new ResponseEntity<>(testUnitController.displayAllPrereqsInt(1).getBody(), testUnitController.displayAllPrereqsInt(1).getStatusCode());
        ResponseEntity <List<Integer>> ExpectedResponse = new ResponseEntity<>(testUnitService.getPrereqsInt(testUnitService.getUnit(1).get()), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayUnitsByTopic() {
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayUnitsByTopic("1").getBody(), testUnitController.displayUnitsByTopic("1").getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllByTopic("1"), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayUnitsByNullTopic() {
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayUnitsByTopic(null).getBody(), testUnitController.displayUnitsByTopic(null).getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.findAllUnits(), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayUnitsByIncorrectTopic() {
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayUnitsByTopic("n").getBody(), testUnitController.displayUnitsByTopic("n").getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllByTopic("n"), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayUnitsByProgramme() {
        String programme = new String();
        programme = "Computer Science (BSc)";
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayUnitsByProgramme(programme).getBody(), testUnitController.displayUnitsByProgramme(programme).getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllByProgramme(programme), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayUnitsByIncorrectProgramme() {
        String programme = new String();
        programme = "Wrong";
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayUnitsByProgramme(programme).getBody(), testUnitController.displayUnitsByProgramme(programme).getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllByProgramme(programme), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayUnitsByNullProgramme() {;
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayUnitsByProgramme(null).getBody(), testUnitController.displayUnitsByProgramme(null).getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.findAllUnits(), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayUnitsBySchool() {
        String school = new String();
        school = "School Of Management";
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayUnitsBySchool(school).getBody(), testUnitController.displayUnitsBySchool(school).getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllBySchool(school), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayUnitsByNullSchool() {
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayUnitsBySchool(null).getBody(), testUnitController.displayUnitsBySchool(null).getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.findAllUnits(), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayUnitsByIncorrectSchool() {
        String school = new String();
        school = "Wrong";
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayUnitsBySchool(school).getBody(), testUnitController.displayUnitsBySchool(school).getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllBySchool(school), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }


    @Test
    public void testDisplayUnitsByFaculty() {
        String faculty = new String();
        faculty = "Engineering";
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayUnitsByFaculty(faculty).getBody(), testUnitController.displayUnitsByFaculty(faculty).getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllByFaculty(faculty), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayUnitsByNullFaculty() {
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayUnitsByFaculty(null).getBody(), testUnitController.displayUnitsByFaculty(null).getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.findAllUnits(), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayUnitsByIncorrectFaculty() {
        String faculty = new String();
        faculty = "Wrong";
        ResponseEntity <List<Unit>> ActualResponse = new ResponseEntity<>(testUnitController.displayUnitsByFaculty(faculty).getBody(), testUnitController.displayUnitsByFaculty(faculty).getStatusCode());
        ResponseEntity <List<Unit>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllByFaculty(faculty), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayAllFaculties() {
        ResponseEntity <List<String>> ActualResponse = new ResponseEntity<>(testUnitController.displayAllFaculties().getBody(), testUnitController.displayAllFaculties().getStatusCode());
        ResponseEntity <List<String>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllFaculties(), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayProgrammesBySchool() {
        String school = new String();
        school = "School Of Philosophy";
        ResponseEntity <List<String>> ActualResponse = new ResponseEntity<>(testUnitController.displayProgrammesBySchool(school).getBody(), testUnitController.displayProgrammesBySchool(school).getStatusCode());
        ResponseEntity <List<String>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllProgrammesInSchool(school), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayProgrammesByNullSchool() {
        ResponseEntity <List<String>> ActualResponse = new ResponseEntity<>(testUnitController.displayProgrammesBySchool(null).getBody(), testUnitController.displayProgrammesBySchool(null).getStatusCode());
        ResponseEntity <List<String>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllProgrammes(), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayProgrammesByIncorrectSchool() {
        String school = new String();
        school = "Wrong";
        ResponseEntity <List<String>> ActualResponse = new ResponseEntity<>(testUnitController.displayProgrammesBySchool(school).getBody(), testUnitController.displayProgrammesBySchool(school).getStatusCode());
        ResponseEntity <List<String>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllProgrammesInSchool(school), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplaySchoolsByFaculty() {
        String faculty = new String();
        faculty = "Science";
        ResponseEntity <List<String>> ActualResponse = new ResponseEntity<>(testUnitController.displaySchoolsByFaculty(faculty).getBody(), testUnitController.displaySchoolsByFaculty(faculty).getStatusCode());
        ResponseEntity <List<String>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllSchoolsInFaculty(faculty), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplaySchoolsByNullFaculty() {
        ResponseEntity <List<String>> ActualResponse = new ResponseEntity<>(testUnitController.displaySchoolsByFaculty(null).getBody(), testUnitController.displaySchoolsByFaculty(null).getStatusCode());
        ResponseEntity <List<String>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllSchools(), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplaySchoolsByIncorrectFaculty() {
        String faculty = new String();
        faculty = "Wrong";
        ResponseEntity <List<String>> ActualResponse = new ResponseEntity<>(testUnitController.displaySchoolsByFaculty(faculty).getBody(), testUnitController.displaySchoolsByFaculty(faculty).getStatusCode());
        ResponseEntity <List<String>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllSchoolsInFaculty(faculty), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayTopicsByProgramme() {
        String programme = new String();
        programme = "Data Science (BSc)";
        ResponseEntity <List<String>> ActualResponse = new ResponseEntity<>(testUnitController.displayTopicsByProgramme(programme).getBody(), testUnitController.displayTopicsByProgramme(programme).getStatusCode());
        ResponseEntity <List<String>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllTopicsInProgramme(programme), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayTopicsByNullProgramme() {
        ResponseEntity <List<String>> ActualResponse = new ResponseEntity<>(testUnitController.displayTopicsByProgramme(null).getBody(), testUnitController.displayTopicsByProgramme(null).getStatusCode());
        ResponseEntity <List<String>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllTopics(), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayTopicsByIncorrectProgramme() {
        String programme = new String();
        programme = "Wrong";
        ResponseEntity <List<String>> ActualResponse = new ResponseEntity<>(testUnitController.displayTopicsByProgramme(programme).getBody(), testUnitController.displayTopicsByProgramme(programme).getStatusCode());
        ResponseEntity <List<String>> ExpectedResponse = new ResponseEntity<>(testUnitService.getAllTopicsInProgramme(programme), HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    //displayTheSchool
    @Test
    public void testDisplayTheSchool() {
        String programme = new String();
        programme = "Computer Science (BSc)";
        ResponseEntity <String> ActualResponse = new ResponseEntity<>(testUnitController.displayTheSchool(programme).getBody(), testUnitController.displayTheSchool(programme).getStatusCode());
        String school = new String("School of Computer Science");
        ResponseEntity <String> ExpectedResponse = new ResponseEntity<>(school, HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

    @Test
    public void testDisplayTheFaculty() {
        String school = new String();
        school = "School of Computer Science";
        ResponseEntity <String> ActualResponse = new ResponseEntity<>(testUnitController.displayTheFaculty(school).getBody(), testUnitController.displayTheFaculty(school).getStatusCode());
        String faculty = new String("Engineering");
        ResponseEntity <String> ExpectedResponse = new ResponseEntity<>(faculty, HttpStatus.OK);
        assertEquals(ActualResponse.getBody().toString(), ExpectedResponse.getBody().toString());
        assertEquals(ActualResponse.getStatusCode(), ExpectedResponse.getStatusCode());
    }

}