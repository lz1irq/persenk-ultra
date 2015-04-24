package com.persenkultra.times.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.persenkultra.times.model.Category;
import com.persenkultra.times.model.Runner;
import com.persenkultra.times.service.CategoryService;
import com.persenkultra.times.service.RunnerService;
import com.persenkultra.times.service.Services;

@Path("runners")
public class RunnerRest {
	private final RunnerService runnerService;
	private final CategoryService categoryService;

	public RunnerRest() {
		runnerService = Services.getRunnerService();
		categoryService = Services.getCategoryService();
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
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Runner createRunner(Runner runner) {
		long categoryId = runner.getCategory().getId();
		Category newCategory = categoryService.getCategory(categoryId);
		runner.setCategory(newCategory);
		return runnerService.createRunner(runner);
	}

	@PUT
	@Path("/{runnerId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Runner updateRunner(@PathParam("runnerId") long runnerId, Runner runner) {
		return runnerService.updateRunner(runnerId, runner);
	}

	@DELETE
	@Path("/{runnerId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public void deleteRunner(@PathParam("runnerId") long runnerId) {
		runnerService.deleteRunner(runnerId);
	}

}
