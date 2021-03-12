package com.SuSyKnower.repository;

import com.SuSyKnower.model.Requisite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RequisiteRepositoryImpl implements RequisiteRepository{

    @Autowired
    @Qualifier("jdbcTemplateUnit")
    private JdbcTemplate jdbcTemplateUnit;

    @Override
    public List<Requisite> getAllRequisites() {
        String sql = "SELECT * FROM t_relations";
        List<Requisite> requisiteList = jdbcTemplateUnit.query(sql, new BeanPropertyRowMapper<Requisite>(Requisite.class));
        return requisiteList;
    }

    @Override
    public void addRequisite(String preReq, String postReq) {

    }

    @Override
    public void deleteRequisite(String preReq, String postReq) {

    }

    @Override
    public List<Requisite> findRequisiteByPost(String postReq) {
        return null;
    }

    @Override
    public List<Requisite> findRequisiteByPre(String preReq) {
        return null;
    }


}
