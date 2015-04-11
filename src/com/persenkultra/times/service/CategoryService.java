package com.persenkultra.times.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;

import com.persenkultra.times.model.Category;

public class CategoryService {
	private final EntityManagerFactory emf;
	
	public CategoryService() {
		emf = Services.getEntityManagerFactory();
	}
	
	public List<Category> getCategories() {
		final EntityManager em = emf.createEntityManager();
		try {
			return em.createNamedQuery("allCategories", Category.class).getResultList();
		} finally {
			em.close();
		}
	}
	
	public Category getCategory(long categoryId) {
		final EntityManager em = emf.createEntityManager();
		try {
			return em.find(Category.class, categoryId);
		} finally {
			em.close();
		}
	}
	
	public synchronized Category createCategory(Category category) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			em.persist(category);
			tx.commit();
			return category;
		} finally {
			if (tx.isActive()) {
				tx.rollback();
			}
			em.close();
		}
	}
	
	public Category updateCategory(long categoryId, Category category) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			final Category fromDb = em.find(Category.class, categoryId);
			if (fromDb != null) {
				fromDb.setName(category.getName());
				fromDb.setShortName(category.getShortName());
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
	
	public void deleteCategory(long categoryId) {
		EntityManager em = emf.createEntityManager();
		final EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			final Category fromDb = em.find(Category.class, categoryId);
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
