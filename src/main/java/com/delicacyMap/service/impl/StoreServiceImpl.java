package com.delicacyMap.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.criterion.Criterion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.delicacyMap.bean.Store;
import com.delicacyMap.dao.EntityDAO;
import com.delicacyMap.service.IStoreService;

@Service
public class StoreServiceImpl implements IStoreService {

	@Autowired
	EntityDAO entityDAO;

	@Override
	public List<Store> get() {
		// TODO Auto-generated method stub
		return entityDAO.findAll(Store.class, "id", true, new ArrayList<Criterion>());
	}

	@Override
	public void add(Store store) {
		// TODO Auto-generated method stub
		entityDAO.save(store);
	}

	@Override
	public Store getByUid(Integer id) {
		// TODO Auto-generated method stub
		return (Store)entityDAO.findUniqueByProperty(Store.class, "user.id", id);
	}

	@Override
	public void update(Store store) {
		// TODO Auto-generated method stub
		entityDAO.update(store);
	}

	@Override
	public Store getById(Integer id) {
		// TODO Auto-generated method stub
		return (Store)entityDAO.get(Store.class, id);
	}

	@Override
	public List<Store> get(Integer start, Integer limit) {
		// TODO Auto-generated method stub		
		List<Criterion> criterions = new ArrayList<Criterion>();
		return entityDAO.findByCriteria(Store.class, "id", false, start, limit, criterions);
	}
	
	
}
