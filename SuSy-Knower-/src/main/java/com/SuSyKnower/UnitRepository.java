package com.SuSyKnower;
import java.util.*;
import com.SuSyKnower.Unit;
import org.springframework.data.repository.CrudRepository;
public interface UnitRepository extends CrudRepository<Unit, Integer> {
    List<Unit> findUnitByProgramme(String programme);
    List<Unit> findUnitBySchool(String school);
    List<Unit> findUnitByTopic(String topic);
    List<Unit> findUnitByFaculty(String faculty);

}
