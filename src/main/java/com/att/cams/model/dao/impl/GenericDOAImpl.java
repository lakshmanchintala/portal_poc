package com.att.cams.model.dao.impl;

import com.att.cams.model.dao.GenericDAO;
import com.att.cams.model.entity.Base;
import org.springframework.core.GenericTypeResolver;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.Serializable;
import java.util.List;

/**
 * Created by SaiRaj on 2/15/17.
 */
@Repository
public abstract class GenericDOAImpl<T extends Base, ID extends Serializable> implements GenericDAO<T, ID> {

	@PersistenceContext
	EntityManager entityManager;

	private Class<T> entityType;

	@SuppressWarnings("unchecked")
	public GenericDOAImpl() {
		this.entityType = ((Class<T>) (GenericTypeResolver.resolveTypeArguments(getClass(), GenericDOAImpl.class))[0]);
	}

	public void delete(ID id) {
		entityManager.detach(entityManager.find(entityType, id));
	}

	public void delete(List<T> entities) {
		for (T entity : entities) {
			entityManager.detach(entity);
		}
	}

	public void delete(T entity) {
		entityManager.detach(entity);
	}

	@SuppressWarnings("unchecked")
	public List<T> getAll() {
		return entityManager.createQuery("select t from " + entityType.getSimpleName() + " t").getResultList();
	}

	public T getById(ID id) {
		return entityManager.find(entityType, id);
	}

	public void save(List<T> entities) {
		for (T entity : entities) {
			entityManager.persist(entity);
		}
	}

	public void save(T entity) {
		entityManager.persist(entity);
	}
	
	public void update(T entity) {
		entityManager.merge(entity);
	}
}
