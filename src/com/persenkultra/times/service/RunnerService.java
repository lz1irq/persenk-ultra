package com.persenkultra.times.service;

import java.util.ArrayList;
import java.util.List;

import com.persenkultra.times.model.Runner;

public class RunnerService {
	private final List<Runner> runners = new ArrayList<Runner>();
	private long lastRunnerId = 0;

	public List<Runner> getRunners() {
		return runners;
	}

	public Runner getRunner(long runnerId) {
		for (Runner runner : runners) {
			if (runner.getId() == runnerId) {
				return runner;
			}
		}
		return null;
	}

	public synchronized Runner createRunner(Runner runner) {
		lastRunnerId++;
		runner.setId(lastRunnerId);
		runners.add(runner);
		return runner;
	}
	
	public Runner updateRunner(long runnerId, Runner runner) {
		Runner toChange = getRunner(runnerId);
		toChange.setCategory(runner.getCategory());
		toChange.setName(runner.getName());
		return toChange;
	}
	
	public void deleteRunner(long runnerId) {
		final Runner toDelete = getRunner(runnerId);
		runners.remove(toDelete);
	}

}
