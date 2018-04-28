package com.att.cams.model.service;


import java.util.List;

import com.att.cams.model.entity.NonSubmittedClaimPhoto;

/**
 * Created by SaiRaj on 2/15/17.
 */
public interface PhotosDAOService extends GenericDAOService<NonSubmittedClaimPhoto, String> {

	public void deletePhotos(String claimId);
	
	public List<String> getPhotos(String claimId);
}
