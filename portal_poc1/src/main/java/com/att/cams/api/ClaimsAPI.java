package com.att.cams.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlRootElement;

/*import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;*/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.att.cams.model.entity.ClaimsTableView;
import com.att.cams.model.entity.NonSubmittedClaim;
import com.att.cams.model.service.ClaimsDAOService;
import com.att.cams.model.service.ClaimsViewDAOService;
import com.att.cams.model.service.PhotosDAOService;
import com.google.gson.Gson;

/**
 * Created by SaiRaj on 2/15/17.
 */

@Component
@Path("/claims")
public class ClaimsAPI {

	@Autowired
	ClaimsDAOService claimsDAOService;
	
	@Autowired
	PhotosDAOService photosDAOService;
	
	@Autowired
	ClaimsViewDAOService claimsViewDAOService;
	
	private static final String SUCCESS_RESULT="<result>success</result>";
	private static final String FAILURE_RESULT="<result>failure</result>";
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllClaims() throws IOException {

		List<NonSubmittedClaim> cl = claimsDAOService.getAll();
		List<String> s = new ArrayList<String>();
		for (NonSubmittedClaim c : cl) {
			s.add(c.getValue());
		}
		
		Gson gson = new Gson();

		String jsonString = gson.toJson(s);
		
		CacheControl cc = new CacheControl();
	    cc.setNoCache(true);

		return Response.status(Response.Status.OK).cacheControl(cc).entity(jsonString).build();
	}

	@GET
	@Path("/{claimId}")
	@Consumes({ MediaType.APPLICATION_JSON })
	public Response getClaim(@PathParam("claimId") String claimId) throws IOException {
		
		NonSubmittedClaimDTO cl=new NonSubmittedClaimDTO(claimsDAOService.getById(claimId));;
		
		CacheControl cc = new CacheControl();
	    cc.setNoCache(true);

		return Response.status(Response.Status.OK).cacheControl(cc).entity(cl.getValue()).build();
	}
	
	@DELETE
	@Path("/{claimId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteClaim(@PathParam("claimId") String claimId) throws IOException {
		
		//claimsDAOService.delete(claimId);
		photosDAOService.deletePhotos(claimId);
		claimsDAOService.deleteClaim(claimId); 

		return Response.status(Response.Status.OK).build();
	} 

	@GET
	@Path("/test")
	@Produces("application/json")
	public Response getLocaleTranslations() {
		System.out.println("Test");
		return Response.status(Response.Status.OK).entity("Test Success").build();// .entity(translationDAOService.getAll()).build();
	}

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	public Response submit(NonSubmittedClaimDTO claim) throws IOException {
		NonSubmittedClaim claimEntity = convertDTOtoEntity(claim);
		
		claimsDAOService.save(claimEntity);

		return Response.status(Response.Status.OK).build();
	}
	//==========START Claims Table Views ===========
	@GET
	@Path("/views")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<ClaimsTableView> getClaimViews() {
		
		List<ClaimsTableView> claimViews = claimsViewDAOService.getAll();
		//return Response.status(Response.Status.OK).build();
		claimViews = (claimViews == null? new ArrayList<ClaimsTableView>():claimViews);
		return claimViews;
	}

	@GET
	@Path("/views/{viewId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public ClaimsTableView getClaimViewById(@PathParam("viewId") String viewId) {
		
		ClaimsTableView claimView = claimsViewDAOService.getById(viewId);
		//return Response.status(Response.Status.OK).build();
		return claimView;
	}
	
	@POST
	@Path("/views")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_XML })
	public Response createUpdateClaim(ClaimsTableView claimView) throws IOException {
		
		if(claimView.getId() != null){
			ClaimsTableView claimViewTobeUpdated = claimsViewDAOService.getById(claimView.getId());
			claimViewTobeUpdated.setFieldsToDisplay(claimView.getFieldsToDisplay());
			claimViewTobeUpdated.setName(claimView.getName());
			claimViewTobeUpdated.setVisibility(claimView.getVisibility());
			claimViewTobeUpdated.setModifiedDate(new Date());
			claimsViewDAOService.update(claimViewTobeUpdated);
		}else{
			claimsViewDAOService.save(claimView);
		}
		
		return Response.status(201).entity(SUCCESS_RESULT).build();
	}
	//==========END Claims Table Views ===========
	
	@PUT
	@Consumes({ MediaType.APPLICATION_JSON })
	public Response update(NonSubmittedClaimDTO claim) throws IOException {
		
		NonSubmittedClaim claimEntity=convertDTOtoEntity(claim);
		
		claimsDAOService.updateClaim(claimEntity);

		return Response.status(Response.Status.OK).build();
	}
	
	// For converting DTO to Entity.
	private NonSubmittedClaim convertDTOtoEntity(NonSubmittedClaimDTO claim){
		NonSubmittedClaim claimEntity=new NonSubmittedClaim();
		claimEntity.setValue(claim.getValue());
		claimEntity.setId(claim.getId());
		claimEntity.setCreationDate(new Date());
		return claimEntity;
	}

	@XmlRootElement
	public static class NonSubmittedClaimDTO{
		
		public NonSubmittedClaimDTO(NonSubmittedClaim claim){
			this.id = claim.getId();
			this.value = claim.getValue();
			this.date = claim.getCreationDate();
		}
		public NonSubmittedClaimDTO(){
			
		}

		private String id;
		private String value;
		private Date date;
		
		public Date getDate() {
			return date;
		}
		public void setDate(Date date) {
			this.date = date;
		}
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getValue() {
			return value;
		}
		public void setValue(String value) {
			this.value = value;
		}
	}
}

