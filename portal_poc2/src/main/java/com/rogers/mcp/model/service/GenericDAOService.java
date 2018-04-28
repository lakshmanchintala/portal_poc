package com.rogers.mcp.model.service;

import com.rogers.mcp.model.entity.Base;

import java.io.Serializable;
import java.util.List;

/**
 * Created by suresh on 1/13/17.
 */
public interface GenericDAOService<T extends Base, ID extends Serializable> {

    public List<T> getAll();

    public T getById(ID id);

    public void save(T entity);

    public void save(List<T> entities);

    public void delete(ID id);

    public void delete(T entity);

    public void delete(List<T> entities);

}
