package com.att.cams.model.dao.impl;

import com.att.cams.model.dao.PhotosDAO;
import com.att.cams.model.entity.NonSubmittedClaimPhoto;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;


/**
 * Created by SaiRaj on 2/15/17.
 */
@Repository
public class PhotosDAOImpl extends GenericDOAImpl<NonSubmittedClaimPhoto, String> implements PhotosDAO {
	
	@SuppressWarnings("unchecked")
	public List<String> getPhotos(String claimId){
		Query query = entityManager.createNativeQuery("SELECT photo_Name from non_submitted_claims_photos where claim_id='"+claimId+"'");
		List<String> names =  query.getResultList();

		return names;
	}
	
	
	@SuppressWarnings("unchecked")
	public void deletePhotos(String claimId){
		
		Query query = entityManager.createNativeQuery("Delete from NON_SUBMITTED_CLAIMS_photos where Claim_ID='"+claimId+"'");
		query.executeUpdate();

	}
	
}
