package com.att.cams.model.dao.impl;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.att.cams.model.dao.ClaimsTableViewDAO;
import com.att.cams.model.entity.ClaimsTableView;

/**
 * Created by lc5015 on 7/23/2017.
 */
@Repository
public class ClaimsTableViewDAOImpl extends GenericDOAImpl<ClaimsTableView, String> implements ClaimsTableViewDAO {

	public void updateView(ClaimsTableView view){
		Query query = entityManager.createNativeQuery("UPDATE CLAIMS_TABLE_VIEW SET FIELDS_TO_DISPLAY='"+view.getFieldsToDisplay()+"',VISIBILITY ='"+view.getVisibility()+"',VIEW_NAME = '"+view.getName()+"' WHERE VIEW_ID="+view.getId());
		query.executeUpdate();
	}
	
	public void deleteView(int viewId){
		Query query = entityManager.createNativeQuery("DELETE FROM CLAIMS_TABLE_VIEW WHERE VIEW_ID="+viewId);
		query.executeUpdate();
	} 

}
