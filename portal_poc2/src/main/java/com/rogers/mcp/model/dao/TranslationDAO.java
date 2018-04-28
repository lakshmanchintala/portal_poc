package com.rogers.mcp.model.dao;

import com.rogers.mcp.model.entity.Translation;

import java.util.List;

/**
 * Created by suresh on 1/13/17.
 */
public interface TranslationDAO extends GenericDAO<Translation, Integer> {

    public List<Translation> getAllByLocale(String locale);
}
