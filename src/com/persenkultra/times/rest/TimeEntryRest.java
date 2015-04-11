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

import com.persenkultra.times.model.TimeEntry;
import com.persenkultra.times.service.Services;
import com.persenkultra.times.service.TimeEntryService;

@Path("time")
public class TimeEntryRest {
	private final TimeEntryService entryService;

	public TimeEntryRest() {
		entryService = Services.getTimeEntryService();
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
