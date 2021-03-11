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

    }

    @Override
    public void deletebyID(int id) {

    }

    @Override
    public void updateUnit(Unit unit) {

    }

    @Override
    public Optional<Unit> findByID(int id) {
        return null;
    }
}
