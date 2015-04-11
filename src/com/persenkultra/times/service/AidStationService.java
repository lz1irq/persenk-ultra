package com.persenkultra.times.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;

import com.persenkultra.times.model.AidStation;

public class AidStationService {
	private final EntityManagerFactory emf;

	public AidStationService() {
		emf = Services.getEntityManagerFactory();
	}

	public List<AidStation> getAidStations() {
		final EntityManager em = emf.createEntityManager();
		try {
			return em.createNamedQuery("allAidStations", AidStation.class).getResultList();
		} finally {
			em.close();
		}
	}

	public AidStation getAidStation(long stationId) {
		final EntityManager em = emf.createEntityManager();
		try {
			return em.find(AidStation.class, stationId);
		} finally {
			em.close();
		}
	}

	public synchronized AidStation createAidStation(AidStation station) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			em.persist(station);
			tx.commit();
			return station;
		} finally {
			if (tx.isActive()) {
				tx.rollback();
			}
			em.close();
		}
	}

	public AidStation updateAidStation(long stationId, AidStation station) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			final AidStation fromDb = em.find(AidStation.class, stationId);
			if (fromDb != null) {
				fromDb.setName(station.getName());
				fromDb.setDistance(station.getDistance());
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

	public void deleteAidStation(long stationId) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			final AidStation fromDb = em.find(AidStation.class, stationId);
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
