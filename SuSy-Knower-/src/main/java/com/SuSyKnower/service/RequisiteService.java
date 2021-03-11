package com.SuSyKnower.service;

import com.SuSyKnower.model.Requisite;
import com.SuSyKnower.repository.RequisiteRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequisiteService {

    @Autowired
    private RequisiteRepositoryImpl requisiteRepository;

    public List<Requisite> getAllRequisite() {
        return requisiteRepository.getAllRequisites();
    }

    public void addRequisite(Requisite requisite) {requisiteRepository.addRequisite(requisite);}

    public void deleteRequisite(int id) {requisiteRepository.deleteByID(id);}

    public void updateRequisite(Requisite requisite) {requisiteRepository.updateRequisite(requisite);}

    public Optional<Requisite> findRequisite(int id) {return requisiteRepository.findByID(id);}
}
