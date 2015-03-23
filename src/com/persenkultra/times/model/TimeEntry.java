package com.persenkultra.times.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class TimeEntry {

	@Id
	@GeneratedValue
	private long id;

	@Column(nullable = false)
	private long runnerId;

	@Column(nullable = false)
	private long stationId;

	@Column(nullable = false)
	private Date time;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getRunnerId() {
		return runnerId;
	}

	public void setRunnerId(long runnerId) {
		this.runnerId = runnerId;
	}

	public long getStationId() {
		return stationId;
	}

	public void setStationId(long stationId) {
		this.stationId = stationId;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

}
