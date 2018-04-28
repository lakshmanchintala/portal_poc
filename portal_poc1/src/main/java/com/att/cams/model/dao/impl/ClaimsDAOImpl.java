package com.att.cams.model.dao.impl;

import com.att.cams.model.dao.ClaimsDAO;

import com.att.cams.model.entity.NonSubmittedClaim;

import org.springframework.stereotype.Repository;

import javax.persistence.Query;

/**
 * Created by SaiRaj on 2/15/17.
 */
@Repository
public class ClaimsDAOImpl extends GenericDOAImpl<NonSubmittedClaim, String> implements ClaimsDAO {

	/*public String getNextID() {
		Query query = entityManager.createNativeQuery("SELECT Max(CLAIM_ID) from NON_SUBMITTED_CLAIMS");
		String claimId = (String) query.getSingleResult();
		if(null == claimId){
			claimId = "0";
		}
		int val = Integer.parseInt(claimId)+1;
		return Integer.toString(val);
	}*/
	
	public void updateClaim(NonSubmittedClaim claim){
		Query query = entityManager.createNativeQuery("Update NON_SUBMITTED_CLAIMS SET Claim_Json='"+claim.getValue()+"' where Claim_ID='"+claim.getId()+"'");
		query.executeUpdate();
	}
	
	public void deleteClaim(String claimId){
		Query query = entityManager.createNativeQuery("Delete from NON_SUBMITTED_CLAIMS where Claim_ID='"+claimId+"'");
		query.executeUpdate();
	} 

}
