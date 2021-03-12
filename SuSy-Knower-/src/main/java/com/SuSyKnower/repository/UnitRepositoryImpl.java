package com.SuSyKnower.repository;

import com.SuSyKnower.model.Unit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UnitRepositoryImpl implements UnitRepository{

    @Autowired
    @Qualifier("jdbcTemplateUnit")
    private JdbcTemplate jdbcTemplateUnit;

    @Override
    public List<Unit> getAllUnits() {
        String sql = "SELECT * FROM t_units";
        List<Unit> unitList = jdbcTemplateUnit.query(sql, new BeanPropertyRowMapper<Unit>(Unit.class));
        return unitList;
    }

    @Override
    public void addUnit(Unit unit) {
        String sql = "INSERT INTO t_units VALUES (?,?,?)";
        Object[] args = {unit.getUnitID(), unit.getUnitname(), unit.getUnitprogramme()};
        jdbcTemplateUnit.update(sql, args);
    }

    @Override
    public void deletebyID(int id) {
        String sql = "DELETE FROM t_units WHERE unitID=?";
        jdbcTemplateUnit.update(sql, id);
    }

    @Override
    public void updateUnit(Unit unit) {
        String sql = "UPDATE t_units SET unitname=?,unitprogramme=? WHERE unitID=?";
        Object[] args = {unit.getUnitname(), unit.getUnitprogramme(), unit.getUnitID()};
        jdbcTemplateUnit.update(sql, args);
    }

    @Override
    public Optional<Unit> findByID(int id) {
        String sql = "SELECT * FROM t_units WHERE unitID=?";
        Optional<Unit> unit = Optional.of(jdbcTemplateUnit.queryForObject(sql, new BeanPropertyRowMapper<Unit>(Unit.class), id));
        return unit;
    }
}
