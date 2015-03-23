package com.persenkultra.times.rest;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.persenkultra.times.model.AidStation;
import com.persenkultra.times.service.AidStationService;
import com.persenkultra.times.service.Services;

@Path("stations")
public class AidStationRest {
	private final AidStationService stationService;

	public AidStationRest() {
		stationService = Services.getAidStationService();
	}

	@GET
	@Path("/")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<AidStation> getAidStations() {
		return stationService.getAidStations();
	}

	@GET
	@Path("/{stationId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public AidStation getAidStation(@PathParam("stationId") long stationId) {
		return stationService.getAidStation(stationId);
	}

	@POST
	@Path("/")
	@Produces({ MediaType.APPLICATION_JSON })
	public AidStation createAidStation(AidStation station) {
		return stationService.createAidStation(station);
	}

	@PUT
	@Path("/{stationId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public AidStation updateAidStation(@PathParam("stationId") long stationId, AidStation station) {
		return stationService.updateAidStation(stationId, station);
	}

	@DELETE
	@Path("/{stationId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public void deleteAidStation(@PathParam("stationId") long stationId) {
		stationService.deleteAidStation(stationId);
	}

}
