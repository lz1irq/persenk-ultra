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
	
	public Runner updateRunner(Runner runner) {
		Runner oldRunner = getRunner(runner.getId());
		oldRunner.setCategory(runner.getCategory());
		oldRunner.setName(runner.getName());
		return oldRunner;
	}
	
	public void deleteRunner(Runner runner) {
		final Runner toDelete = getRunner(runner.getId());
		runners.remove(toDelete);
	}

}
