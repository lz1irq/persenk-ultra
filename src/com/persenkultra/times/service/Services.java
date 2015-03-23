package com.persenkultra.times.service;

public class Services {
	private static RunnerService runnerService;
	private static AidStationService stationService;
	
	public synchronized static RunnerService getRunnerService() {
		if(runnerService == null) {
			runnerService = new RunnerService();
		}
		return runnerService;
	}
	
	public synchronized static AidStationService getAidStationService() {
		if(stationService == null) {
			stationService = new AidStationService();
		}
		return stationService;
	}
}
