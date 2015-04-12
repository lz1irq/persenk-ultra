package com.persenkultra.times.model;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

@Entity(name = "Runners")
@NamedQueries({@NamedQuery(name = "allRunners", query = "SELECT r from Runners r")})
public class Runner {

	@Id
	@GeneratedValue
	private long id;

	@Column(nullable = false, length = 50)
	private String name;

	@ManyToOne
	private Category category;
	
	@OneToMany(mappedBy="runner", fetch=FetchType.EAGER)
	private List<TimeEntry> times = new LinkedList<TimeEntry>();

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public List<TimeEntry> getTimes() {
		return times;
	}

	public void setTimes(List<TimeEntry> times) {
		this.times = times;
	}

}
