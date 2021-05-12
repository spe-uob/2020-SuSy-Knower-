package com.SuSyKnower;
import java.util.*;
import com.SuSyKnower.Unit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

public interface UnitRepository extends CrudRepository<Unit, Integer> {
    List<Unit> findUnitByProgramme(String programme);
    List<Unit> findUnitBySchool(String school);
    List<Unit> findUnitByTopic(String topic);
    List<Unit> findUnitByFaculty(String faculty);

    @Query(value="SELECT DISTINCT faculty FROM units", nativeQuery=true)
    List<String> findDistinctFaculties();

    @Query(value="SELECT DISTINCT school FROM units WHERE faculty = (:faculty)", nativeQuery=true)
    List<String> findDistinctSchools(String faculty);

    @Query(value="SELECT DISTINCT programme FROM units WHERE school = (:school)", nativeQuery=true)
    List<String> findDistinctProgrammes(String school);

    @Query(value="SELECT DISTINCT topic FROM units WHERE programme = (:programme)", nativeQuery=true)
    List<String> findDistinctTopics(String programme);
    

}
