package com.att.cams.model.dao;

import com.att.cams.model.entity.NonSubmittedClaim;

/**
 * Created by SaiRaj on 2/15/17.
 */
public interface ClaimsDAO extends GenericDAO<NonSubmittedClaim, String> {

	//public String getNextID();
	
	public void updateClaim(NonSubmittedClaim claim);
	
	public void deleteClaim(String claimId); 

}
