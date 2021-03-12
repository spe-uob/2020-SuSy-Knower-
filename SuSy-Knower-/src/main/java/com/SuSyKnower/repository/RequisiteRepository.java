package com.SuSyKnower.repository;

import com.SuSyKnower.model.Requisite;

import java.util.List;
import java.util.Optional;

public interface RequisiteRepository {

    public List<Requisite> getAllRequisites();

    void addRequisite(String preReq, String postReq);

    void deleteRequisite(String preReq, String postReq);

    List<Requisite> findRequisiteByPost(String postReq);

    List<Requisite> findRequisiteByPre(String preReq);
}
