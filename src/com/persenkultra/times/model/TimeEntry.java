package com.persenkultra.times.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity(name = "TimeEntries")
@NamedQueries({@NamedQuery(name = "allTimeEntries", query = "SELECT te from TimeEntries te")})
public class TimeEntry {

	@Id
	@GeneratedValue
	private long id;

	@Column(nullable = false)
	private Date time;
		
	@ManyToOne
	private Runner runner;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}
	
	public Runner getRunner() {
		return runner;
	}

	public void setRunner(Runner runner) {
		this.runner = runner;
	}

}
