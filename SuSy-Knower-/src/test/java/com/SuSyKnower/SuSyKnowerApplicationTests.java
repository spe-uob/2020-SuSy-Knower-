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
		assertEquals("Unit{id=1, name='Imperative and Functional Programming', programme='Computer Science (BSc)'prerequisites=null'}", unit1.toString());
	}

	@Test
	public void testGetPrereqs() {

	}

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

}