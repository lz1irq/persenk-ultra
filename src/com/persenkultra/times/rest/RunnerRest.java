package com.persenkultra.times.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.persenkultra.times.model.Runner;
import com.persenkultra.times.service.RunnerService;
import com.persenkultra.times.service.Services;

@Path("runners")
public class RunnerRest {
	private final RunnerService runnerService;

	public RunnerRest() {
		runnerService = Services.getRunnerService();
	}

	@GET
	@Path("/")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<Runner> getRunners() {
		return runnerService.getRunners();
	}

	@GET
	@Path("/{runnerId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Runner getRunner(@PathParam("runnerId") long runnerId) {
		return runnerService.getRunner(runnerId);
	}
	
	@POST
	@Path("/")
	@Produces({ MediaType.APPLICATION_JSON })
	public Runner createRunner(Runner runner) {
		return runnerService.createRunner(runner);
	}
	
	

}
