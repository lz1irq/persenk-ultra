package com.persenkultra.times.model;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

@Entity(name = "Categories")
@NamedQueries({@NamedQuery(name = "allCategories", query = "SELECT c from Categories c")})
public class Category {

	@Id
	@GeneratedValue
	private long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String shortName;
	
	@OneToMany(mappedBy="category")
	private List<Runner> runners = new LinkedList<Runner>();	

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
