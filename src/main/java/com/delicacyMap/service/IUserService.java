package com.delicacyMap.service;

import com.delicacyMap.bean.User;
import com.delicacyMap.dto.BaseResult;

public interface IUserService {

	User getById(int id);

	void add(User user);
	
	User login(String username, String password);

	void update(User user);

	User getByPhonenum(String phonenum);
}
