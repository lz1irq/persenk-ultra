package com.persenkultra.times.model;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity(name = "Runner")
public class Runner {

	public List<TimeEntry> getTimes() {
		return times;
	}

	public void setTimes(List<TimeEntry> times) {
		this.times = times;
	}

	@Id
	@GeneratedValue
	private long id;

	@Column(nullable = false, length = 50)
	private String name;


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

}
