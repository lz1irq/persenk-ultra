package com.persenkultra.times.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class Category {
	
	@Id
	@GeneratedValue
	private long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String shortName;
	
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

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String short_name) {
		this.shortName = short_name;
	}
}
