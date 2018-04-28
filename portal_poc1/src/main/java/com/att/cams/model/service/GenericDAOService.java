package com.att.cams.model.service;

import com.att.cams.model.entity.Base;

import java.io.Serializable;
import java.util.List;

/**
 * Created by SaiRaj on 2/15/17.
 */
public interface GenericDAOService<T extends Base, ID extends Serializable> {

	public void delete(ID id);

	public void delete(List<T> entities);

	public void delete(T entity);

	public List<T> getAll();

	public T getById(ID id);

	public void save(List<T> entities);

	public void save(T entity);
	
	public void update(T entity);

}
