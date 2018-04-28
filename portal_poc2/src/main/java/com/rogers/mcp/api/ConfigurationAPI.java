package com.rogers.mcp.api;

import com.rogers.mcp.model.service.TranslationDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

/**
 * Created by suresh on 1/13/17.
 */

@Component
@Path("/configuration")
public class ConfigurationAPI {

    @Autowired
    TranslationDAOService translationDAOService;

    @GET
    @Path("/translations")
    @Produces("application/json")
    public Response getLocaleTranslations(){
        return Response.status(Response.Status.OK).entity(translationDAOService.getAll()).build();
    }

}
