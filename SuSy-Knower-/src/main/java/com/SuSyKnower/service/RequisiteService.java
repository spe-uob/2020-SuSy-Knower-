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

    public void addRequisite(String preReq, String postReq) {requisiteRepository.addRequisite(preReq, postReq);}

    public void deleteRequisite(String preReq, String postReq) {requisiteRepository.deleteRequisite(preReq, postReq);}

    public List<Requisite> findRequisiteByPost(String postReq) {return requisiteRepository.findRequisiteByPost(postReq);}

    public List<Requisite> findRequisiteByPre(String preReq) {return requisiteRepository.findRequisiteByPre(preReq);}
}
