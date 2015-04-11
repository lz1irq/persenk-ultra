package com.persenkultra.times.service;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Services {
	private static RunnerService runnerService;
	private static AidStationService aidStationService;
	private static TimeEntryService timeEntryService;
	private static CategoryService categoryService;
	
	private static EntityManagerFactory entityManagerFactory;
	
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
	
	public synchronized static CategoryService getCategoryService() {
		if(categoryService == null) {
			categoryService = new CategoryService();
		}
		return categoryService;
	}

	
	public synchronized static EntityManagerFactory getEntityManagerFactory() {
		// lazy loading
		if (entityManagerFactory == null) {
			try {
				Class.forName("org.apache.derby.jdbc.ClientDriver");
			} catch (ClassNotFoundException e) {
				throw new IllegalStateException("No driver", e);
			}
			entityManagerFactory = Persistence
					.createEntityManagerFactory("persenk-ultra");
		}
		return entityManagerFactory;
	}
}
