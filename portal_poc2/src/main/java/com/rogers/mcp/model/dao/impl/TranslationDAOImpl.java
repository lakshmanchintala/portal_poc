package com.rogers.mcp.model.dao.impl;

import com.rogers.mcp.model.dao.TranslationDAO;
import com.rogers.mcp.model.entity.Translation;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

/**
 * Created by suresh on 1/13/17.
 */
@Repository
public class TranslationDAOImpl extends GenericDAOImpl<Translation, Integer> implements TranslationDAO {

    public List<Translation> getAllByLocale(String locale) {

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Translation> criteriaQuery = builder.createQuery(Translation.class);
        Root<Translation> entity = criteriaQuery.from(Translation.class);
        criteriaQuery.where(builder.equal(entity.get("locale"), locale));

        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}
