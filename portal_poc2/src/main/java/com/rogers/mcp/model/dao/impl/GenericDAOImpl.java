package com.rogers.mcp.model.dao.impl;

import com.rogers.mcp.model.dao.GenericDAO;
import com.rogers.mcp.model.entity.Base;
import org.springframework.core.GenericTypeResolver;
import org.springframework.stereotype.Repository;
import sun.net.www.content.text.Generic;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

/**
 * Created by suresh on 1/13/17.
 */
@Repository
public abstract class GenericDAOImpl<T extends Base, ID extends Serializable> implements GenericDAO<T, ID> {

    @PersistenceContext
    EntityManager entityManager;

    private Class<T> entityType;

    public GenericDAOImpl(){
       this.entityType = ((Class<T>)(GenericTypeResolver.resolveTypeArguments(getClass(), GenericDAOImpl.class))[0]);
    }

    public T getById(ID id) {
        return entityManager.find(entityType, id);
    }

    public List<T> getAll() {
        return entityManager.createQuery("select t from " + entityType.getSimpleName() + " t").getResultList();
    }

    public void save(T entity) {
        entityManager.persist(entity);
    }

    public void save(List<T> entities) {
        for(T entity : entities){
            entityManager.persist(entity);
        }
    }

    public void delete(ID id) {
        entityManager.detach(entityManager.find(entityType, id));
    }

    public void delete(T entity) {
        entityManager.detach(entity);
    }

    public void delete(List<T> entities) {
        for(T entity : entities){
            entityManager.detach(entity);
        }
    }
}
