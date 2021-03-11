package com.SuSyKnower.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.SuSyKnower.repository.UnitRepository;
import com.SuSyKnower.model.Unit;
import com.SuSyKnower.repository.UnitRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnitService {
    
    @Autowired
    private UnitRepositoryImpl unitRepository;

    public List<Unit> getAllUnits() {
        System.out.println("UnitList:" + unitRepository.getAllUnits());
        return unitRepository.getAllUnits();
    }

    public Optional<Unit> getUnit(int id) {return unitRepository.findByID(id);}

    public void addUnit(Unit unit) {
        unitRepository.addUnit(unit);
    }

    public void updateUnit(Unit unit) {
        unitRepository.updateUnit(unit);
    }

    public void deleteUnit(int id) {
        unitRepository.deletebyID(id);
    }

}
