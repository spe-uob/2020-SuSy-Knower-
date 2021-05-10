package com.SuSyKnower;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import jdk.jfr.Timestamp;

import static org.junit.jupiter.api.Assertions.*;
import java.util.*;

//write unit tests for each kind of test case
//run by writing "mvn test" in the terminal
@SpringBootTest
class SuSyKnowerApplicationTests {
	@Autowired
	private UnitService testUnitService;

	@Test
	void contextLoads() {
	}

	@Test
	public void testNumberOfUnits() {
	 	assertEquals(179, testUnitService.getNumberOfUnits());
	}

	@Test
	public void testGetUnit() {
		Unit unit1 = testUnitService.getUnit(1).get();
		assertEquals("Unit{id=1, name='Imperative and Functional Programming', programme='Computer Science (BSc)', faculty='Engineering', topics='programming', link='https://www.bris.ac.uk/unit-programme-catalogue/UnitDetails.jsa?ayrCode=21%2F22&unitCode=COMS10016', prerequisites=null'}", unit1.toString());
	}

	//empty
	@Test
	public void testGetPrereqs() {
		Unit unit84 = testUnitService.getUnit(84).get();
		List<String>ExpectedPrereqs = new ArrayList<>();
		ExpectedPrereqs.add(testUnitService.getUnit(76).get().toString());
		ExpectedPrereqs.add(testUnitService.getUnit(77).get().toString());
		List<Unit> ActualPrereqs = new ArrayList<>();
		ActualPrereqs.addAll(testUnitService.getPrereqs(unit84));
		List<String> ActualPrereqsString = new ArrayList<>();
		for(int i = 0; i < ActualPrereqs.size(); i++) {
			ActualPrereqsString.add(ActualPrereqs.get(i).toString());
		}
		assertEquals(ExpectedPrereqs.toString(), ActualPrereqsString.toString());

	}

	@Test
	public void testGetPrereqsEmpty() {
		Unit unit1 = testUnitService.getUnit(1).get();
		List<String>ExpectedPrereqs = new ArrayList<>();
		List<Unit> ActualPrereqs = new ArrayList<>();
		ActualPrereqs.addAll(testUnitService.getPrereqs(unit1));
		List<String> ActualPrereqsString = new ArrayList<>();
		for(int i = 0; i < ActualPrereqs.size(); i++) {
			ActualPrereqsString.add(ActualPrereqs.get(i).toString());
		}
		assertEquals(ExpectedPrereqs.toString(), ActualPrereqsString.toString());

	}
	
	//empty
	//actualpostreqsstring is empty, but the getpostreqs function seems to work
	//fix test
	@Test
	public void testGetPostreqs() {
		Unit unit1 = testUnitService.getUnit(1).get();
		List<String>ExpectedPostreqs = new ArrayList<>();
		ExpectedPostreqs.add(testUnitService.getUnit(7).get().toString());
		ExpectedPostreqs.add(testUnitService.getUnit(8).get().toString());
		ExpectedPostreqs.add(testUnitService.getUnit(11).get().toString());
		ExpectedPostreqs.add(testUnitService.getUnit(13).get().toString());
		List<Unit> ActualPostreqs = new ArrayList<>();
		ActualPostreqs.addAll(testUnitService.getPostreqs(unit1)); //NumberFormat For input string:...
		List<String> ActualPostreqsString = new ArrayList<>();
		for(int i = 0; i < ActualPostreqs.size(); i++) {
			ActualPostreqsString.add(ActualPostreqs.get(i).toString());
		}
		assertEquals(ExpectedPostreqs.toString(), ActualPostreqsString.toString());
	}
	
	//TO REFACTOR
	//make a universal function testGetAllBy
	@Test
	public void testGetAllByProgramme(){
		List<String>ExpectedUnits = new ArrayList<>();
		for (int i = 1; i < 14; i++) {
			ExpectedUnits.add(testUnitService.getUnit(i).get().toString());
		}
		List<Unit> ActualUnits = new ArrayList<>();
		ActualUnits.addAll(testUnitService.getAllByProgramme("Computer Science (BSc)"));
		List<String> ActualUnitsString = new ArrayList<>();
		for(int i = 0; i < ActualUnits.size(); i++) {
			ActualUnitsString.add(ActualUnits.get(i).toString());
		}
		assertEquals(ExpectedUnits.toString(), ActualUnitsString.toString());
	}

	@Test
	public void testGetAllByFaculty(){
		List<String>ExpectedUnits = new ArrayList<>();
		for (int i = 1; i <= 75; i++) {
			ExpectedUnits.add(testUnitService.getUnit(i).get().toString());
		}
		List<Unit> ActualUnits = new ArrayList<>();
		ActualUnits.addAll(testUnitService.getAllByFaculty("Engineering"));
		List<String> ActualUnitsString = new ArrayList<>();
		for(int i = 0; i < ActualUnits.size(); i++) {
			ActualUnitsString.add(ActualUnits.get(i).toString());
		}
		assertEquals(ExpectedUnits.toString(), ActualUnitsString.toString());
	}

	//empty
	@Test
	public void testGetAllByTopic(){
		List<String>ExpectedUnits = new ArrayList<>();
		ExpectedUnits.add(testUnitService.getUnit(1).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(4).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(5).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(7).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(13).get().toString());
		List<Unit> ActualUnits = new ArrayList<>();
		ActualUnits.addAll(testUnitService.getAllByTopic("1"));
		List<String> ActualUnitsString = new ArrayList<>();
		for(int i = 0; i < ActualUnits.size(); i++) {
			ActualUnitsString.add(ActualUnits.get(i).toString());
		}
		assertEquals(ExpectedUnits.toString(), ActualUnitsString.toString());
	}

	@Test
	public void testGetAllBySchool() {
		List<String>ExpectedUnits = new ArrayList<>();
		for (int i = 1; i <= 75; i++) {
			ExpectedUnits.add(testUnitService.getUnit(i).get().toString());
		}
		List<Unit> ActualUnits = new ArrayList<>();
		ActualUnits.addAll(testUnitService.getAllBySchool("School of Computer Science, Electrical and Electronic Engineering, and Engineering Maths (SCEEM)"));
		List<String> ActualUnitsString = new ArrayList<>();
		for(int i = 0; i < ActualUnits.size(); i++) {
			ActualUnitsString.add(ActualUnits.get(i).toString());
		}
		assertEquals(ExpectedUnits.toString(), ActualUnitsString.toString());
	}

	//only unique!
	@Test
	public void testGetAllProgrammesInSchool() {
		List<String>ExpectedProgrammes = new ArrayList<String>();
		List<String>ActualProgrammes = new ArrayList<String>();
		ActualProgrammes.addAll(testUnitService.getAllProgrammesInSchool("School of Computer Science, Electrical and Electronic Engineering, and Engineering Maths (SCEEM)"));
		ExpectedProgrammes.add("Computer Science (BSc)");
		ExpectedProgrammes.add("Electrical and Electronic Engineering (BEng)");
		assertEquals(ExpectedProgrammes.toString(), ActualProgrammes.toString());
	}
	//again, unique
	@Test
	public void testGetAllSchoolsInFaculty() {
		List<String>ExpectedSchools = new ArrayList<String>();
		List<String>ActualSchools = new ArrayList<String>();
		ActualSchools.addAll(testUnitService.getAllSchoolsInFaculty("Engineering"));
		ExpectedSchools.add("School of Computer Science, Electrical and Electronic Engineering, and Engineering Maths (SCEEM)");
		ExpectedSchools.add("School of Civil, Aerospace and Mechanical Engineering (CAME)");
		assertEquals(ExpectedSchools.toString(), ActualSchools.toString());
	}

	@Test
	public void testGetAllTopicsInProgramme() {

	}

	@Test
	public void testGetAllFaculties() {

	}

	@Test
	public void testGetAllSchools() {

	}

	@Test
	public void testGetAllProgrammes() {

	}

	@Test
	public void testGetAllTopics() {

	}

}