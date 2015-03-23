package com.persenkultra.times.service;

public class Services {
	private static RunnerService runnerService;
	private static AidStationService aidStationService;
	private static TimeEntryService timeEntryService;
	
	public synchronized static RunnerService getRunnerService() {
		if(runnerService == null) {
			runnerService = new RunnerService();
		}
		return runnerService;
	}
	
	public synchronized static AidStationService getAidStationService() {
		if(aidStationService == null) {
			aidStationService = new AidStationService();
		}
		return aidStationService;
	}
	
	public synchronized static TimeEntryService getTimeEntryService() {
		if(timeEntryService == null) {
			timeEntryService = new TimeEntryService();
		}
		return timeEntryService;
	}
}
