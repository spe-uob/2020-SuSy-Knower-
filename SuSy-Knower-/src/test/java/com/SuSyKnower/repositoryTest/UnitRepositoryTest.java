package com.SuSyKnower.repositoryTest;

import com.SuSyKnower.model.Unit;
import com.SuSyKnower.service.UnitService;
import org.assertj.core.api.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class UnitRepositoryTest {

    @Autowired
    private UnitService unitService;

    @Test
    public void testUnit() throws Exception {
        Unit testUnit = new Unit();
        testUnit.setUnitID(64);

        //testing adding unit
        testUnit.setUnitname("testName");
        testUnit.setUnitprogramme("Computer Science (BSc)");
        testAddUnit(testUnit);

        //testing finding unit by id
        var newUnit = unitService.getUnit(64).orElse(null);
        //should find replacement for the deprecated method
        assertThat(newUnit).isEqualToComparingFieldByField(testUnit);

        //testing updating unit
        testUnit.setUnitname("testName1");
        testUnit.setUnitprogramme("testProgramme");
        testUpdateUnit(testUnit);

        //testing deleting unit
        testDeleteUnit(64);
    }

    @Test
    public void testAddUnit(Unit testUnit) throws Exception {
        unitService.addUnit(testUnit);
    }

    @Test
    public void testUpdateUnit(Unit testUnit) throws Exception {
        unitService.updateUnit(testUnit);
    }

    @Test
    public void testDeleteUnit(int id) throws Exception {
        unitService.deleteUnit(id);
    }

}
