package com.delicacyMap.controller;

import java.io.File;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.druid.util.StringUtils;
import com.delicacyMap.bean.User;
import com.delicacyMap.controller.model.Model;
import com.delicacyMap.controller.model.UserLoginModel;
import com.delicacyMap.controller.model.UserRegisterModel;
import com.delicacyMap.controller.model.UserUpdateModel;
import com.delicacyMap.dto.BaseResult;
import com.delicacyMap.enums.ResultEnum;
import com.delicacyMap.exception.BizException;
import com.delicacyMap.service.IUserService;
import com.delicacyMap.util.RandomUtil;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	IUserService userService;
	
	@RequestMapping(value="/get", method=RequestMethod.GET)
	@ResponseBody
	public BaseResult<Object> get(HttpSession session) {
		User user = userService.getById(1);
		session.setAttribute("user", user);
		return new BaseResult<Object>(true, user);
	}
	
	@RequestMapping(value="/get/{id}", method=RequestMethod.POST, produces={"application/json;charset=UTF-8"})
	@ResponseBody
	public BaseResult<Object> get(@PathVariable("id") Integer id) {
		System.out.println(id);
		return null;
	}
	
	@RequestMapping(value="/register", method=RequestMethod.POST, produces={"application/json;charset=UTF-8"})
	@ResponseBody
	public BaseResult<Object> register(@RequestBody @Valid UserRegisterModel model, BindingResult result, HttpSession session) {
		User user = userService.getByPhonenum(model.getPhonenum());
		if (user != null) {
			return new BaseResult<>(ResultEnum.ALREADY_EXSITS);
		}
		user = new User();
		user.setUsername(model.getUsername());
		user.setPassword(model.getPassword());
		user.setPhonenum(model.getPhonenum());
		userService.add(user);
		return new BaseResult<Object>(true, user);
	}
	
	@RequestMapping(value="/login", method=RequestMethod.POST, produces={"application/json;charset=UTF-8"})
	@ResponseBody
	public BaseResult<Object> login(@RequestBody @Valid UserLoginModel model, BindingResult result, HttpSession session) {
		User user = userService.login(model.getPhonenum(), model.getPassword());
		if (user == null) {
			new BaseResult<>(ResultEnum.LOGIN_FAIL);
		}
		
		session.setAttribute("user", user);
		return new BaseResult<Object>(true, user);
	}
	
	@RequestMapping(value="/update", method=RequestMethod.POST, produces={"application/json;charset=UTF-8"})
	@ResponseBody
	public BaseResult<Object> update(@RequestBody @Valid UserUpdateModel model, BindingResult result, HttpSession session) {
		User user = (User)session.getAttribute("user");
		user.setUsername(model.getUsername());
		if (!StringUtils.isEmpty(model.getNewPassword()) && !StringUtils.isEmpty(model.getOldPassword())) {
			if (!user.getPassword().equals(model.getOldPassword())) {
				return new BaseResult<>(ResultEnum.UPDATE_FAIL);
			}
			user.setPassword(model.getNewPassword());
		}
		
		userService.update(user);
		return new BaseResult<Object>();
	}
	
	@RequestMapping(value = "/uploadImg", method=RequestMethod.POST, produces={"application/json;charset=UTF-8"})  
	@ResponseBody
    public BaseResult<Object> upload(@RequestParam(value = "file", required = true) MultipartFile file, HttpSession session) {  
		User user = (User)session.getAttribute("user");
        String path = session.getServletContext().getRealPath("upload");  
        String fileName = RandomUtil.generateUUID();
        File targetFile = new File(path, fileName);  
        if(!targetFile.exists()){  
            targetFile.mkdirs();  
        }  
 
        //保存  
        try {
            file.transferTo(targetFile);  
        } catch (Exception e) {  
        	throw new BizException(ResultEnum.UPDATE_FAIL);
        }  
  
        user.setHeadImg("upload/" + fileName);
        userService.update(user);
        System.out.println(user.getHeadImg());
        return new BaseResult<Object>();  
    }  
	
	@RequestMapping(value="status", method=RequestMethod.GET, produces={"application/json;charset=UTF-8"})
	@ResponseBody
	public BaseResult<Object> statusGet(HttpSession session) {
		User user = (User)session.getAttribute("user");
		if (user == null) {
			return new BaseResult<>(ResultEnum.NOT_LOGIN);
		}
		return new BaseResult<Object>(true, user);
	}
	
	@RequestMapping(value="logout", method=RequestMethod.GET, produces={"application/json;charset=UTF-8"})
	@ResponseBody
	public BaseResult<Object> logout(HttpSession session) {
		if (session.getAttribute("user") == null) {
			return new BaseResult<>();
		}
		session.removeAttribute("user");
		return new BaseResult<>();	
	}
}
