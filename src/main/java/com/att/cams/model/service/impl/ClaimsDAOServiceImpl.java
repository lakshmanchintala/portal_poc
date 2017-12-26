
package com.att.cams.model.service.impl;

import com.att.cams.model.dao.ClaimsDAO;
import com.att.cams.model.entity.NonSubmittedClaim;
import com.att.cams.model.service.ClaimsDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;



/**
 * Created by SaiRaj on 2/15/17.
 */
@Service
public class ClaimsDAOServiceImpl extends GenericDAOServiceImpl<NonSubmittedClaim, String> implements ClaimsDAOService {

	@Autowired
	public ClaimsDAOServiceImpl(ClaimsDAO claimsDAO) {
		super(claimsDAO);
	}

	/*@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public String getNextID() {

		return ((ClaimsDAO) genericDAO).getNextID();
	}*/
	

	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void updateClaim(NonSubmittedClaim claim){
		((ClaimsDAO) genericDAO).updateClaim(claim);
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteClaim(String claimId){
		((ClaimsDAO) genericDAO).deleteClaim(claimId);
	} 
}

