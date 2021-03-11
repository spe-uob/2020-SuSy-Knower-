package com.SuSyKnower.repository;

import com.SuSyKnower.model.Unit;

import java.util.List;
import java.util.Optional;

public interface UnitRepository {

    public List<Unit> getAllUnits();

    public void addUnit(Unit unit);

    public void deletebyID(int id);

    public void updateUnit(Unit unit);

    public Optional<Unit> findByID(int id);

}
