package com.att.cams.model.dao;

import com.att.cams.model.entity.ClaimsTableView;

/**
 * Created by lc5015 on 7/23/2017.
 */
public interface ClaimsTableViewDAO extends GenericDAO<ClaimsTableView, String> {

	public void updateView(ClaimsTableView view);
	
	public void deleteView(int claimId); 

}
