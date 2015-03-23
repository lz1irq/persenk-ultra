package com.persenkultra.times.service;

import java.util.ArrayList;
import java.util.List;

import com.persenkultra.times.model.AidStation;

public class AidStationService {
	private final List<AidStation> stations = new ArrayList<AidStation>();
	private long lastAidStationId = 0;

	public List<AidStation> getAidStations() {
		return stations;
	}

	public AidStation getAidStation(long stationId) {
		for (AidStation station : stations) {
			if (station.getId() == stationId) {
				return station;
			}
		}
		return null;
	}

	public synchronized AidStation createAidStation(AidStation station) {
		lastAidStationId++;
		station.setId(lastAidStationId);
		stations.add(station);
		return station;
	}
	
	public AidStation updateAidStation(long stationId, AidStation station) {
		AidStation toChange = getAidStation(stationId);
		toChange.setName(station.getName());
		toChange.setDistance(station.getDistance());
		return toChange;
	}
	
	public void deleteAidStation(long stationId) {
		final AidStation toDelete = getAidStation(stationId);
		stations.remove(toDelete);
	}

}
