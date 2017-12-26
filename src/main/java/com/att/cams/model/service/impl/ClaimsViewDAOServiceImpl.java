
package com.att.cams.model.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.att.cams.model.dao.ClaimsTableViewDAO;
import com.att.cams.model.entity.ClaimsTableView;
import com.att.cams.model.service.ClaimsViewDAOService;



/**
 * Created by lc5015 on 7/23/2017.
 */
@Service
public class ClaimsViewDAOServiceImpl extends GenericDAOServiceImpl<ClaimsTableView, String> implements ClaimsViewDAOService {

	@Autowired
	public ClaimsViewDAOServiceImpl(ClaimsTableViewDAO claimsViewDAO) {
		super(claimsViewDAO);
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void updateView(ClaimsTableView view){
		((ClaimsTableViewDAO) genericDAO).updateView(view);
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteView(int viewId){
		((ClaimsTableViewDAO) genericDAO).deleteView(viewId);
	} 
}

