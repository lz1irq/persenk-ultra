package com.persenkultra.times.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity(name = "TimeEntry")
public class TimeEntry {

	@Id
	@GeneratedValue
	private long id;

	@ManyToOne
	@Column(nullable = false)
	private Runner runner;

	@Column(nullable = false)
	private AidStation aidStation;

	@Column(nullable = false)
	private Date time;

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

	public AidStation getAidStation() {
		return aidStation;
	}

	public void setAidStation(AidStation aidStation) {
		this.aidStation = aidStation;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

}
