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

import com.persenkultra.times.model.User;
import com.persenkultra.times.service.Services;
import com.persenkultra.times.service.UserService;

@Path("users")
public class UserRest {
	private final UserService userService;

	public UserRest() {
		userService = Services.getUserService();
	}

	@GET
	@Path("/")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<User> getUser() {
		return userService.getUsers();
	}

	@GET
	@Path("/{userId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public User getUser(@PathParam("userId") long userId) {
		return userService.getUser(userId);
	}

	@POST
	@Path("/")
	@Produces({ MediaType.APPLICATION_JSON })
	public User createUser(User user) {
		return userService.createUser(user);
	}

	@PUT
	@Path("/{userId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public User deleteUser(@PathParam("userId") long userId, User user) {
		return userService.updateUser(userId, user);
	}

	@DELETE
	@Path("/{stationId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public void deleteUser(@PathParam("userId") long userId) {
		userService.deleteUser(userId);
	}

}