package com.SuSyKnower;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
	 	assertEquals(33, testUnitService.getNumberOfUnits());
	}

	@Test
	public void testGetUnit() {
		Unit unit1 = testUnitService.getUnit(1).get();
		assertEquals("Unit{id=1, name='Imperative and Functional Programming', programme='Computer Science (BSc)', faculty='Engineering', topics='null', link='https://www.bris.ac.uk/unit-programme-catalogue/UnitDetails.jsa?ayrCode=21%2F22&unitCode=COMS10016', prerequisites=null'}", unit1.toString());
	}

	@Test
	public void testGetPrereqs() {

	}

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
		for (int i = 1; i <= testUnitService.getNumberOfUnits(); i++) {
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

}