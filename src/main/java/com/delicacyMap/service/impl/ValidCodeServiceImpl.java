package com.delicacyMap.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.delicacyMap.bean.ValidCode;
import com.delicacyMap.dao.EntityDAO;
import com.delicacyMap.service.IValidCodeService;

@Service
public class ValidCodeServiceImpl implements IValidCodeService{

	@Autowired
	EntityDAO entityDAO;

	@Override
	public ValidCode get(String validCode) {
		// TODO Auto-generated method stub
		return (ValidCode)entityDAO.findUniqueByProperty(ValidCode.class, "validCode", validCode);
	}

	@Override
	public void delete(ValidCode code) {
		// TODO Auto-generated method stub
		entityDAO.delete(code);
	}
	
	
	
}
