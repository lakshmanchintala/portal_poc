package com.att.cams.api;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.att.cams.model.entity.NonSubmittedClaimPhoto;
import com.att.cams.model.service.PhotosDAOService;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

@Component
@Path("/upload")
public class UploadFileService {

	
	@Context
	UriInfo uriInfo;
	@Autowired
	PhotosDAOService photosDAOService;
	
	
	@GET
	@Path("/getPhoto/{claimId}")
	@Consumes({ MediaType.APPLICATION_JSON })
	public Response getPhoto(@PathParam("claimId") String claimId) throws IOException {
		List<String> names=photosDAOService.getPhotos(claimId);
		
		CacheControl cc = new CacheControl();
	    cc.setNoCache(true);

		return Response.status(Response.Status.OK).cacheControl(cc).entity(names).build();
	}
	
	@POST
    @Path("/sendPhoto")
    @Consumes({MediaType.MULTIPART_FORM_DATA})
    public Response uploadImages( @FormDataParam("data") String fileData,
    		@FormDataParam("metadata") String fileNameMetaData,
    		@FormDataParam("file") InputStream fileInputStream,
            @FormDataParam("file") FormDataContentDisposition fileMetaData,
            @Context HttpServletRequest request) throws Exception{
		System.out.println(fileInputStream+" and file name is---"+fileNameMetaData);
		
		fileData=fileData.replaceAll("\"","");
		fileNameMetaData=fileNameMetaData.replaceAll("\"","");
		String path = request.getServletContext().getRealPath("/assets/uploadedFiles/");
		boolean fi=new File(path).mkdir();
		String UPLOAD_PATH =path+"/"+fileData;
    	
		File file = new File(UPLOAD_PATH);
        file.mkdirs();
        try
        {
            int read = 0;
            byte[] bytes = new byte[1024];

            String fileName = UPLOAD_PATH +"/"+ fileNameMetaData;//fileMetaData.getFileName();
            OutputStream out = new FileOutputStream(new File(fileName));
            ByteArrayOutputStream bout=new ByteArrayOutputStream();
            while ((read = fileInputStream.read(bytes)) != -1) 
            {
            	bout.write(bytes,0,read);
                out.write(bytes, 0, read);
            }
            
            NonSubmittedClaimPhoto photo=new NonSubmittedClaimPhoto();
            photo.setClaimid(fileData);
            photo.setName(fileNameMetaData);
            photosDAOService.save(photo);
            
            out.flush();
            out.close();
        } catch (IOException e) 
        {
        	System.out.println(e.getMessage());
        }
        return Response.ok()
        		.header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
    			.build();
    }
	
}
