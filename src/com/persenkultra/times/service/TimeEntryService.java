package com.persenkultra.times.service;

import java.util.ArrayList;
import java.util.List;

import com.persenkultra.times.model.TimeEntry;

public class TimeEntryService {
	private final List<TimeEntry> timeEntries = new ArrayList<TimeEntry>();
	private long lastTimeEntryId = 0;

	public List<TimeEntry> getTimeEntries() {
		return timeEntries;
	}

	public TimeEntry getTimeEntry(long timeEntryId) {
		for (TimeEntry timeEntry : timeEntries) {
			if (timeEntry.getId() == timeEntryId) {
				return timeEntry;
			}
		}
		return null;
	}

	public synchronized TimeEntry createTimeEntry(TimeEntry timeEntry) {
		lastTimeEntryId++;
		timeEntry.setId(lastTimeEntryId);
		timeEntries.add(timeEntry);
		return timeEntry;
	}
	
	public TimeEntry updateTimeEntry(long timeEntryId, TimeEntry timeEntry) {
		TimeEntry toChange = getTimeEntry(timeEntryId);
		toChange.setRunnerId(timeEntry.getRunnerId());
		toChange.setStationId(timeEntry.getStationId());
		toChange.setTime(timeEntry.getTime());
		return toChange;
	}
	
	public void deleteTimeEntry(long timeEntryId) {
		final TimeEntry toDelete = getTimeEntry(timeEntryId);
		timeEntries.remove(toDelete);
	}

}
