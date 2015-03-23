package com.persenkultra.times.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class Runner {
	
	@Id
	@GeneratedValue
	private long id;
	
	@Column(nullable=false, length=50)
	private String name;
	
	@Column(nullable=false)
	private int categoryId;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int category) {
		this.categoryId = category;
	}
}
