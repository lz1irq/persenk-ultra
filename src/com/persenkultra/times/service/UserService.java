package com.persenkultra.times.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;

import com.persenkultra.times.model.AidStation;
import com.persenkultra.times.model.User;

public class UserService {
	private final EntityManagerFactory emf;

	public UserService() {
		emf = Services.getEntityManagerFactory();
	}

	public List<User> getUsers() {
		final EntityManager em = emf.createEntityManager();
		try {
			return em.createNamedQuery("allUsers", User.class).getResultList();
		} finally {
			em.close();
		}
	}

	public User getUser(long userId) {
		final EntityManager em = emf.createEntityManager();
		try {
			return em.find(User.class, userId);
		} finally {
			em.close();
		}
	}

	public synchronized User createAidStation(User user) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			em.persist(user);
			tx.commit();
			return user;
		} finally {
			if (tx.isActive()) {
				tx.rollback();
			}
			em.close();
		}
	}

	public User updateUser(long userId, User user) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			final User fromDb = em.find(User.class, userId);
			if (fromDb != null) {
				fromDb.setUsername(user.getUsername());
				fromDb.setPassword(user.getPassword());
				fromDb.setRole(user.getRole());
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

	public void deleteUser(long userId) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			final User fromDb = em.find(User.class, userId);
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
