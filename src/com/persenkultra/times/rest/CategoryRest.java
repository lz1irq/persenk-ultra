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

import com.persenkultra.times.model.Category;
import com.persenkultra.times.service.CategoryService;
import com.persenkultra.times.service.Services;

@Path("categories")
public class CategoryRest {
	private final CategoryService categoryService;

	public CategoryRest() {
		categoryService = Services.getCategoryService();
	}

	@GET
	@Path("/")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<Category> getCategories() {
		return categoryService.getCategories();
	}

	@GET
	@Path("/{categoryId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Category getCategory(@PathParam("categoryId") long categoryId) {
		return categoryService.getCategory(categoryId);
	}
	
	@POST
	@Path("/")
	@Produces({ MediaType.APPLICATION_JSON })
	public Category createCategory(Category category) {
		return categoryService.createCategory(category);
	}
	
	@PUT
	@Path("/{categoryId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Category updateCategory(@PathParam("categoryId") long categoryId, Category category) {
		return categoryService.updateCategory(categoryId, category);
	}
	
	@DELETE
	@Path("/{categoryId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public void deleteCategory(@PathParam("categoryId") long categoryId) {
		categoryService.deleteCategory(categoryId);
	}
	
	

}
