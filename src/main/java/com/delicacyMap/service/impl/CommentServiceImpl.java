package com.delicacyMap.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.delicacyMap.bean.Comment;
import com.delicacyMap.dao.EntityDAO;
import com.delicacyMap.service.ICommentService;

@Service
public class CommentServiceImpl implements ICommentService{

	@Autowired
	EntityDAO entityDAO;

	@Override
	public void add(Comment comment) {
		// TODO Auto-generated method stub
		entityDAO.save(comment);
	}

	@Override
	public List<Comment> getByStoreId(Integer id, Integer start, Integer limit) {
		// TODO Auto-generated method stub
		List<Criterion> criterions = new ArrayList<Criterion>();
		criterions.add(Restrictions.eq("store.id",id));
		return entityDAO.findByCriteria(Comment.class, "createTime", false, start, limit, criterions);
	}
	
	
}
