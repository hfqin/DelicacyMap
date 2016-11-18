package com.delicacyMap.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.delicacyMap.bean.User;
import com.delicacyMap.dao.EntityDAO;
import com.delicacyMap.service.IUserService;

@Service
public class UserServiceImpl implements IUserService{

	@Autowired
	EntityDAO entityDAO;
	
	@Override
	public User getById(int id) {
		// TODO Auto-generated method stub
		return (User)entityDAO.get(User.class, id);
	}

	@Override
	public void add(User user) {
		// TODO Auto-generated method stub
		entityDAO.save(user);
		System.out.println(user.getId());
	}

	@Override
	public User login(String phonenum, String password) {
		// TODO Auto-generated method stub
		String hql = "";
		List<Object> params = new ArrayList<Object>();

		hql = "from User where phonenum=? and password=?";
		params.add(phonenum);
		params.add(password);
		
		User u = (User) entityDAO.findUniqueByHql(hql, params);
		return u;
	}

	@Override
	public void update(User user) {
		// TODO Auto-generated method stub
		entityDAO.update(user);
	}

	@Override
	public User getByPhonenum(String phonenum) {
		// TODO Auto-generated method stub
		return (User)entityDAO.findUniqueByProperty(User.class, "phonenum", phonenum);
	}

}
