package com.att.cams.model.dao;

import com.att.cams.model.entity.NonSubmittedClaimPhoto;

import java.util.List;

/**
 * Created by SaiRaj on 2/15/17.
 */
public interface PhotosDAO extends GenericDAO<NonSubmittedClaimPhoto, String> {

	public void deletePhotos(String claimId);
	public List<String> getPhotos(String claimId);
	
}
