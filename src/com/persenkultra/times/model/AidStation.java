package com.persenkultra.times.model;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Entity(name = "AidStations")
@NamedQueries({@NamedQuery(name = "allAidStations", query = "SELECT a from AidStations a")})
public class AidStation {

	@Id
	@GeneratedValue
	private long id;

	@Column(nullable = false)
	private int number;
	
	
	@Column(nullable = false, length = 50)
	private String name;

	@Column(nullable = false)
	private int distance;
	
	@OneToMany(mappedBy="aidStation", cascade = { CascadeType.ALL })
	private List<TimeEntry> timeEntries = new LinkedList<TimeEntry>();

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
	
	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

}
