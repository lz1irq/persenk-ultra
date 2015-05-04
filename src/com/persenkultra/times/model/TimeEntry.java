package com.persenkultra.times.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity(name = "TimeEntries")
@NamedQueries({@NamedQuery(name = "allTimeEntries", query = "SELECT te from TimeEntries te")})
public class TimeEntry {

	@Id
	@GeneratedValue
	private long id;

	@Column(nullable = false)
	private Timestamp time;
	
	@JsonIgnore
	@ManyToOne()
	private Runner runner;
	
	@ManyToOne()
	private AidStation aidStation;
		
	public AidStation getAidStation() {
		return aidStation;
	}

	public void setAidStation(AidStation aidStation) {
		this.aidStation = aidStation;
	}
		
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Timestamp getTime() {
		return time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
	}
	
	@JsonIgnore
	public Runner getRunner() {
		return runner;
	}
	
	@JsonProperty
	public void setRunner(Runner runner) {
		this.runner = runner;
	}

}
