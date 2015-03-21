package com.persenkultra.times.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class AidStation {
	
	@Id
	@GeneratedValue
	private int id;
	
	@Column(nullable=false, length=50)
	private String name;
	
	@Column(nullable=false)
	private int distance;
	
	public AidStation(String name, int distance) {
		this.name = name;
		this.distance = distance;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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
