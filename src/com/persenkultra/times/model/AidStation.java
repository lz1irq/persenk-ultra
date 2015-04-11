package com.persenkultra.times.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Entity(name = "AidStations")
@NamedQueries({@NamedQuery(name = "allAidStations", query = "SELECT a from AidStations a")})
public class AidStation {

	@Id
	@GeneratedValue
	private long id;

	@Column(nullable = false, length = 50)
	private String name;

	@Column(nullable = false)
	private int distance;

	public long getId() {
		return id;
	}

	public void setId(long lastAidStationId) {
		this.id = lastAidStationId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getDistance() {
		return distance;
	}

	public void setDistance(int distance) {
		this.distance = distance;
	}

}
