package com.persenkultra.times.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;

import com.persenkultra.times.model.TimeEntry;

public class TimeEntryService {
	private final EntityManagerFactory emf;
	
	public TimeEntryService() {
		emf = Services.getEntityManagerFactory();
	}

	public List<TimeEntry> getTimeEntries() {
		final EntityManager em = emf.createEntityManager();
		try {
			return em.createNamedQuery("allTimeEntries", TimeEntry.class).getResultList();
		} finally {
			em.close();
		}
	}

	public TimeEntry getTimeEntry(long timeEntryId) {
		final EntityManager em = emf.createEntityManager();
		try {
			return em.find(TimeEntry.class, timeEntryId);
		} finally {
			em.close();
		}
	}

	public synchronized TimeEntry createTimeEntry(TimeEntry timeEntry) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			em.persist(timeEntry);
			tx.commit();
			return timeEntry;
		} finally {
			if (tx.isActive()) {
				tx.rollback();
			}
			em.close();
		}
	}
	
	public TimeEntry updateTimeEntry(long timeEntryId, TimeEntry timeEntry) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			final TimeEntry fromDb = em.find(TimeEntry.class, timeEntryId);
			if (fromDb != null) {
				fromDb.setTime(timeEntry.getTime());
				em.merge(fromDb);
			}
			tx.commit();
			return fromDb;
		} finally {
			if (tx.isActive()) {
				tx.rollback();
			}
			em.close();
		}
	}
	
	public void deleteTimeEntry(long timeEntryId) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			final TimeEntry fromDb = em.find(TimeEntry.class, timeEntryId);
			if (fromDb != null) {
				em.remove(fromDb);
			}
			tx.commit();
		} finally {
			if (tx.isActive()) {
				tx.rollback();
			}
			em.close();
		}
	}

}
