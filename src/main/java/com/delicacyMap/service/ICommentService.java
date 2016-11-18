package com.delicacyMap.service;

import java.util.List;

import com.delicacyMap.bean.Comment;

public interface ICommentService {

	void add(Comment comment);

	List<Comment> getByStoreId(Integer id, Integer start, Integer limit);

}
