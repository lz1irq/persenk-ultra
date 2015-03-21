package com.persenkultra.times.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class TimeEntry {

	@Id
	@GeneratedValue
	private long id;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Runner getRunner() {
		return runner;
	}

	public void setRunner(Runner runner) {
		this.runner = runner;
	}

	public AidStation getStation() {
		return station;
	}

	public void setStation(AidStation station) {
		this.station = station;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	@Column(nullable = false)
	private Runner runner;
	
	@Column(nullable = false)
	private AidStation station;
	
	@Column(nullable = false)
	private Date time;
	
	public TimeEntry(AidStation station, Date time) {
		this.station = station;
		this.time = time;
	}
}
