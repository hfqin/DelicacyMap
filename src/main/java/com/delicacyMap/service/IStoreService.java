package com.delicacyMap.service;

import java.util.List;

import com.delicacyMap.bean.Store;

public interface IStoreService {

	List<Store> get();

	void add(Store store);

	Store getByUid(Integer id);

	void update(Store store);

	Store getById(Integer id);

	List<Store> get(Integer start, Integer limit);

}
