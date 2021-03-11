package com.SuSyKnower.repository;

import com.SuSyKnower.model.Requisite;

import java.util.List;
import java.util.Optional;

public interface RequisiteRepository {

    public List<Requisite> getAllRequisites();

    public void addRequisite(Requisite requisite);

    public void deleteByID(int id);

    public void updateRequisite(Requisite requisite);

    public Optional<Requisite> findByID(int id);
}
