package com.rogers.mcp.model.service.impl;

import com.rogers.mcp.model.dao.TranslationDAO;
import com.rogers.mcp.model.entity.Translation;
import com.rogers.mcp.model.service.TranslationDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by suresh on 1/13/17.
 */
@Service
public class TranslationDAOServiceImpl extends GenericDAOServiceImpl<Translation, Integer> implements TranslationDAOService{

    @Autowired
    public TranslationDAOServiceImpl(TranslationDAO translationDAO){
        super(translationDAO);
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List<Translation> getAllByLocale(String locale) {
        return ((TranslationDAO)genericDAO).getAllByLocale(locale);
    }
}
