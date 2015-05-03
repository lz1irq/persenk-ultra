package com.persenkultra.times.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;

import com.persenkultra.times.model.Category;
import com.persenkultra.times.model.Runner;

public class RunnerService {
	private final EntityManagerFactory emf;

	public RunnerService() {
		emf = Services.getEntityManagerFactory();
	}
	
	public List<Runner> getRunners() {
		final EntityManager em = emf.createEntityManager();
		try {
			return em.createNamedQuery("allRunners", Runner.class).getResultList();
		} finally {
			em.close();
		}
	}

	public Runner getRunner(long runnerId) {
		final EntityManager em = emf.createEntityManager();
		try {
			return em.find(Runner.class, runnerId);
		} finally {
			em.close();
		}
	}

	public synchronized Runner createRunner(Runner runner) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			em.persist(runner);
			tx.commit();
			return runner;
		} finally {
			if (tx.isActive()) {
				tx.rollback();
			}
			em.close();
		}
	}

	public Runner updateRunner(long runnerId, Runner runner) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			final Runner fromDb = em.find(Runner.class, runnerId);
			if (fromDb != null) {
				if(runner.getName() != null) fromDb.setName(runner.getName());
				if(runner.getCategory() != null) fromDb.setCategory(runner.getCategory());
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

	public void deleteRunner(long runnerId) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			final Runner fromDb = em.find(Runner.class, runnerId);
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
