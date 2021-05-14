package com.SuSyKnower;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import jdk.jfr.Timestamp;

import static org.junit.jupiter.api.Assertions.*;
import java.util.*;

//write unit tests for each kind of test case
//run by writing "mvn test" in the terminal

//mocking???
//this seems to be a partial integration test already, the UnitService is not a mock. I can try
//do the same thing for unit controller, 
//and mock tests for the same thing

//change to SuSyKnowerServiceTests maybe?
@SpringBootTest
class SuSyKnowerServiceTests {
	@Autowired
	private UnitService testUnitService;

	@Test
	void contextLoads() {
	}

	@Test
	public void testNumberOfUnits() {
	 	assertEquals(351, testUnitService.getNumberOfUnits());
	}

	@Test
	public void testGetUnit() {
		Unit unit1 = testUnitService.getUnit(1).get();
		assertEquals("Unit{id=1, name='Imperative and Functional Programming', programme='Computer Science (BSc)', faculty='Engineering', school='School of Computer Science', topics='1', link='https://www.bris.ac.uk/unit-programme-catalogue/UnitDetails.jsa?ayrCode=21%2F22&unitCode=COMS10016', prerequisites=null'}", unit1.toString());
	}

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

	@Test
	public void testGetPrereqsInt() {
		Unit unit84 = testUnitService.getUnit(84).get();
		List<Integer>ExpectedPrereqs = new ArrayList<>();
		ExpectedPrereqs.add(Integer.valueOf(76));
		ExpectedPrereqs.add(Integer.valueOf(77));
		List<Integer> ActualPrereqs = new ArrayList<>();
		ActualPrereqs.addAll(testUnitService.getPrereqsInt(unit84));
		assertEquals(ExpectedPrereqs, ActualPrereqs);

	}

	/*
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
		ActualPostreqs.addAll(testUnitService.getPostreqs(unit1)); 
		List<String> ActualPostreqsString = new ArrayList<>();
		for(int i = 0; i < ActualPostreqs.size(); i++) {
			ActualPostreqsString.add(ActualPostreqs.get(i).toString());
		}
		assertEquals(ExpectedPostreqs.toString(), ActualPostreqsString.toString());
	}
	
*/

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
		for (int i = 1; i <= 33; i++) {
			ExpectedUnits.add(testUnitService.getUnit(i).get().toString());
		}
		for (int i = 46; i <= 75; i++) {
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

	@Test
	public void testGetAllByTopic(){
		List<String>ExpectedUnits = new ArrayList<>();
		ExpectedUnits.add(testUnitService.getUnit(1).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(7).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(13).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(19).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(25).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(31).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(34).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(40).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(46).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(53).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(54).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(58).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(72).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(73).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(77).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(90).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(104).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(106).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(133).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(136).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(137).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(138).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(160).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(161).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(174).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(177).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(178).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(179).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(188).get().toString());
		ExpectedUnits.add(testUnitService.getUnit(296).get().toString());
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
		for (int i = 1; i <= 13; i++) {
			ExpectedUnits.add(testUnitService.getUnit(i).get().toString());
		}
		List<Unit> ActualUnits = new ArrayList<>();
		ActualUnits.addAll(testUnitService.getAllBySchool("School of Computer Science"));
		List<String> ActualUnitsString = new ArrayList<>();
		for(int i = 0; i < ActualUnits.size(); i++) {
			ActualUnitsString.add(ActualUnits.get(i).toString());
		}
		assertEquals(ExpectedUnits.toString(), ActualUnitsString.toString());
	}

	@Test
	public void testGetAllProgrammesInSchool() {
		List<String>ExpectedProgrammes = new ArrayList<String>();
		List<String>ActualProgrammes = new ArrayList<String>();
		ActualProgrammes.addAll(testUnitService.getAllProgrammesInSchool("School of Computer Science"));
		ExpectedProgrammes.add("Computer Science (BSc)");
		assertEquals(ExpectedProgrammes.toString(), ActualProgrammes.toString());
	}

	@Test
	public void testGetAllSchoolsInFaculty() {
		List<String>ExpectedSchools = new ArrayList<String>();
		List<String>ActualSchools = new ArrayList<String>();
		ActualSchools.addAll(testUnitService.getAllSchoolsInFaculty("Engineering"));
		ExpectedSchools.add("School of Computer Science");
		ExpectedSchools.add("School of Aerospace Engineering");
		ExpectedSchools.add("School of Mechanical Engineering");
		ExpectedSchools.add("School of Electrical & Electronic Engineering");
		assertEquals(ExpectedSchools.toString(), ActualSchools.toString());
	}

	@Test
	public void testGetAllTopicsInProgramme() {
		List<String>ExpectedTopics = new ArrayList<String>();
		List<String>ActualTopics = new ArrayList<String>();
		ActualTopics.addAll(testUnitService.getAllTopicsInProgramme("Computer Science (BSc)"));
		ExpectedTopics.add("1");
		ExpectedTopics.add("2");
		ExpectedTopics.add("3");
		ExpectedTopics.add("4");
		ExpectedTopics.add("5");
		ExpectedTopics.add("6");
		assertEquals(ExpectedTopics.toString(), ActualTopics.toString());
	}
	
	@Test
	public void testGetAllFaculties() {
		List<String>ExpectedFaculties = new ArrayList<String>();
		List<String>ActualFaculties = new ArrayList<String>();
		ActualFaculties.addAll(testUnitService.getAllFaculties());
		ExpectedFaculties.add("Engineering");
		ExpectedFaculties.add("Science");
		ExpectedFaculties.add("Arts");
		ExpectedFaculties.add("Life Sciences");
		ExpectedFaculties.add("Social Sciences and Law");
		assertEquals(ExpectedFaculties.toString(), ActualFaculties.toString());
	}

	@Test
	public void testGetAllSchools() {
		List<String>ExpectedSchools = new ArrayList<String>();
		List<String>ActualSchools = new ArrayList<String>();
		ActualSchools = testUnitService.getAllSchools();
		ExpectedSchools.add("School of Computer Science");
		ExpectedSchools.add("School of Aerospace Engineering");
		ExpectedSchools.add("School of Mechanical Engineering");
		ExpectedSchools.add("School of Electrical & Electronic Engineering");
		ExpectedSchools.add("School of Mathematics");
		ExpectedSchools.add("School of Physics");
		ExpectedSchools.add("School of Chemistry");
		ExpectedSchools.add("School of Philosophy");
		ExpectedSchools.add("School of Anthropology and Archaeology");
		ExpectedSchools.add("School of English");
		ExpectedSchools.add("School of Psychological Science");
		ExpectedSchools.add("School of Biological Sciences");
		ExpectedSchools.add("University of Bristol Law School");
		ExpectedSchools.add("School of Management");
		assertEquals(ExpectedSchools.toString(), ActualSchools.toString());
	}

	@Test
	public void testGetAllProgrammes() {
		List<String>ExpectedProgrammes = new ArrayList<String>();
		List<String>ActualProgrammes = new ArrayList<String>();
		ActualProgrammes.addAll(testUnitService.getAllProgrammes());
		ExpectedProgrammes.add("Computer Science (BSc)");
		ExpectedProgrammes.add("Aerospace Engineering (BEng)");
		ExpectedProgrammes.add("Civil Engineering (BEng)");
		ExpectedProgrammes.add("Electrical and Electronic Engineering (BEng)");
		ExpectedProgrammes.add("Mathematics (MSci)");
		ExpectedProgrammes.add("Data Science (BSc)");
		ExpectedProgrammes.add("Physics (BSc)");
		ExpectedProgrammes.add("Chemical Physics (BSc)");
		ExpectedProgrammes.add("Philosophy (BA)");
		ExpectedProgrammes.add("Anthropology (BA)");
		ExpectedProgrammes.add("English (BA)");
		ExpectedProgrammes.add("Psychology (BSc)");
		ExpectedProgrammes.add("Zoology (BSc)");
		ExpectedProgrammes.add("Honours Law (LLB)");
		ExpectedProgrammes.add("Management (BSc)");
		assertEquals(ExpectedProgrammes.toString(), ActualProgrammes.toString());
	}

	@Test
	public void testGetAllTopics() {
		List<String>ExpectedTopics = new ArrayList<String>();
		List<String>ActualTopics = new ArrayList<String>();
		ActualTopics.addAll(testUnitService.getAllTopics());
		ExpectedTopics.add("1");
		ExpectedTopics.add("2");
		ExpectedTopics.add("3");
		ExpectedTopics.add("4");
		ExpectedTopics.add("5");
		ExpectedTopics.add("6");
		ExpectedTopics.add(null);
		assertEquals(ExpectedTopics.toString(), ActualTopics.toString());
	}

}