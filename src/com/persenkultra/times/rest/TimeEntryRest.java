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
import com.persenkultra.times.model.Runner;
import com.persenkultra.times.model.TimeEntry;
import com.persenkultra.times.service.AidStationService;
import com.persenkultra.times.service.RunnerService;
import com.persenkultra.times.service.Services;
import com.persenkultra.times.service.TimeEntryService;

@Path("time")
public class TimeEntryRest {
	private final TimeEntryService entryService;
	private final RunnerService runnerService;
	private final AidStationService stationService;

	public TimeEntryRest() {
		entryService = Services.getTimeEntryService();
		runnerService = Services.getRunnerService();
		stationService = Services.getAidStationService();
	}

	@GET
	@Path("/")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<TimeEntry> getTimeEntries() {
		return entryService.getTimeEntries();
	}

	@GET
	@Path("/{entryId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public TimeEntry getTimeEntry(@PathParam("entryId") long entryId) {
		return entryService.getTimeEntry(entryId);
	}

	@POST
	@Path("/")
	@Produces({ MediaType.APPLICATION_JSON })
	public TimeEntry createTimeEntry(TimeEntry entry) {
		
		long runnerId = entry.getRunner().getId();
		Runner runner = runnerService.getRunner(runnerId);
		entry.setRunner(runner);
		
		long aidStationId = entry.getAidStation().getId();
		AidStation station = stationService.getAidStation(aidStationId);
		entry.setAidStation(station);
		
		return entryService.createTimeEntry(entry);
	}

	@PUT
	@Path("/{entryId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public TimeEntry updateTimeEntry(@PathParam("entryId") long entryId, TimeEntry entry) {
		return entryService.updateTimeEntry(entryId, entry);
	}

	@DELETE
	@Path("/{entryId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public void deleteTimeEntry(@PathParam("entryId") long entryId) {
		entryService.deleteTimeEntry(entryId);
	}

}
