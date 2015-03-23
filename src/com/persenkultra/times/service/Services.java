package com.persenkultra.times.service;

public class Services {
	private static RunnerService runnerService;
	
	public synchronized static RunnerService getRunnerService() {
		if(runnerService == null) {
			runnerService = new RunnerService();
		}
		return runnerService;
	}
}
