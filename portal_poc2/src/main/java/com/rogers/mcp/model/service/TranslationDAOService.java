package com.rogers.mcp.model.service;

import com.rogers.mcp.model.entity.Translation;

import java.util.List;

/**
 * Created by suresh on 1/13/17.
 */
public interface TranslationDAOService extends GenericDAOService<Translation, Integer> {

    public List<Translation> getAllByLocale(String locale);
}
