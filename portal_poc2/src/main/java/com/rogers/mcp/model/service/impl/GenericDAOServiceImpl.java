package com.rogers.mcp.model.service.impl;

import com.rogers.mcp.model.dao.GenericDAO;
import com.rogers.mcp.model.entity.Base;
import com.rogers.mcp.model.service.GenericDAOService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

/**
 * Created by suresh on 1/13/17.
 */
@Service
public class GenericDAOServiceImpl<T extends Base, ID extends Serializable> implements GenericDAOService<T, ID>{

    protected GenericDAO<T, ID> genericDAO;

    public GenericDAOServiceImpl(){

    }

    public GenericDAOServiceImpl(GenericDAO<T, ID> genericDAO){
        this.genericDAO = genericDAO;
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public T getById(ID id) {
        return genericDAO.getById(id);
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List<T> getAll() {
        return genericDAO.getAll();
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void save(T entity) {
        genericDAO.save(entity);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void save(List<T> entities) {
        genericDAO.save(entities);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(ID id) {
        genericDAO.delete(id);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(T entity) {
        genericDAO.delete(entity);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(List<T> entities) {
        genericDAO.delete(entities);
    }
}

