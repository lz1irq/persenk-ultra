package com.persenkultra.times.service;

import java.util.ArrayList;
import java.util.List;

import com.persenkultra.times.model.Category;

public class CategoryService {
	private List<Category> categories = new ArrayList<Category>();
	private long lastCategoryId = 0;
	
	public List<Category> getCategories() {
		return categories;
	}
	
	public Category getCategory(long categoryId) {
		for(Category category: categories) {
			if(category.getId() == categoryId) {
				return category;
			}
		}
		return null;
	}
	
	public synchronized Category createCategory(Category category) {
		lastCategoryId++;
		category.setId(lastCategoryId);
		categories.add(category);
		return category;
	}
	
	public Category updateCategory(long categoryId, Category category) {
		Category toChange = getCategory(categoryId);
		toChange.setName(category.getName());
		toChange.setShortName(category.getShortName());
		return category;
	}
	
	public void deleteCategory(long categoryId) {
		final Category toDelete = getCategory(categoryId);
		categories.remove(toDelete);
	}
}
