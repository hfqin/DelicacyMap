package com.delicacyMap.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.delicacyMap.bean.Comment;
import com.delicacyMap.bean.Store;
import com.delicacyMap.bean.User;
import com.delicacyMap.controller.model.CommentAddModel;
import com.delicacyMap.controller.model.GetByIdModel;
import com.delicacyMap.dto.BaseResult;
import com.delicacyMap.enums.ResultEnum;
import com.delicacyMap.service.ICommentService;
import com.delicacyMap.service.IStoreService;


@Controller
@RequestMapping("comment")
public class CommentController {

	
	@Autowired
	ICommentService commentService;
	
	@Autowired
	IStoreService storeService;
	@RequestMapping(value="/add", method=RequestMethod.POST, produces={"application/json;charset=UTF-8"})
	@ResponseBody
	public BaseResult<Object> add(@RequestBody @Valid CommentAddModel model, BindingResult result, HttpSession session) {
		User user = (User)session.getAttribute("user");
		if (user == null) {
			return new BaseResult<>(ResultEnum.NOT_LOGIN);
		}
		Comment comment = new Comment();
		comment.setContent(model.getContent());
		comment.setCreateTime(new Date());
		comment.setScore(model.getScore());
		comment.setUser(user);
		Store store = storeService.getById(model.getStoreId());
		comment.setStore(store);
		
		commentService.add(comment);
		
		store.setCommentNum(store.getCommentNum() + 1);
		storeService.update(store);
		return new BaseResult<Object>(true, comment);
	}
	
	@RequestMapping(value="/get", method=RequestMethod.POST, produces={"application/json;charset=UTF-8"})
	@ResponseBody
	public BaseResult<Object> get(@RequestBody @Valid GetByIdModel model) {
		List<Comment> comments = commentService.getByStoreId(model.getId(), model.getStart(), model.getLimit());
		return new BaseResult<Object>(true, comments);
	}
}
