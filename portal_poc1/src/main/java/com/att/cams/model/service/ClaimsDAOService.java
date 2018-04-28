package com.att.cams.model.service;

import com.att.cams.model.entity.NonSubmittedClaim;


/**
 * Created by SaiRaj on 2/15/17.
 */
public interface ClaimsDAOService extends GenericDAOService<NonSubmittedClaim, String> {

	/*public String getNextID();*/
	public void updateClaim(NonSubmittedClaim claim);
	
	public void deleteClaim(String claimId); 

}
