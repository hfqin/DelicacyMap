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
	
	
}
