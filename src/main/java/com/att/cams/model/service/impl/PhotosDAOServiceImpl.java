package com.att.cams.model.service.impl;

import com.att.cams.model.dao.PhotosDAO;
import com.att.cams.model.entity.NonSubmittedClaimPhoto;
import com.att.cams.model.service.PhotosDAOService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by SaiRaj on 2/15/17.
 */
@Service
public class PhotosDAOServiceImpl extends GenericDAOServiceImpl<NonSubmittedClaimPhoto, String> implements PhotosDAOService {

	@Autowired
	public PhotosDAOServiceImpl(PhotosDAO photosDAO) {
		super(photosDAO);
	}
	
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public List<String> getPhotos(String claimId){

		return ((PhotosDAO) genericDAO).getPhotos(claimId);
	}
	
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deletePhotos(String claimId){

		((PhotosDAO) genericDAO).deletePhotos(claimId);
	}
	
	
	
}
