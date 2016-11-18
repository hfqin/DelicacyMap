package com.delicacyMap.controller;

import java.io.File;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.delicacyMap.bean.Store;
import com.delicacyMap.bean.User;
import com.delicacyMap.bean.ValidCode;
import com.delicacyMap.controller.model.GetModel;
import com.delicacyMap.controller.model.StoreAddModel;
import com.delicacyMap.dto.BaseResult;
import com.delicacyMap.enums.ResultEnum;
import com.delicacyMap.exception.BizException;
import com.delicacyMap.service.ICommentService;
import com.delicacyMap.service.IStoreService;
import com.delicacyMap.service.IUserService;
import com.delicacyMap.service.IValidCodeService;
import com.delicacyMap.util.RandomUtil;

@Controller
@RequestMapping("/store")
public class StoreController {

	@Autowired
	IStoreService storeService;
	
	@Autowired
	IValidCodeService validCodeService;
	
	@Autowired
	IUserService userService;
	
	@Autowired
	ICommentService commentService;

	
	@RequestMapping(value="get/{id}", method=RequestMethod.GET, produces={"application/json;charset=UTF-8"})
	@ResponseBody
	public BaseResult<Object> get(@PathVariable("id") Integer id) {
		Store store = storeService.getById(id);
		return new BaseResult<Object>(true, store);
	}
	
	@RequestMapping(value="get", method=RequestMethod.POST, produces={"application/json;charset=UTF-8"})
	@ResponseBody
	public BaseResult<Object> get(@RequestBody @Valid GetModel model, BindingResult result, HttpSession session) {
		List<Store> stores = storeService.get(model.getStart(), model.getLimit());
		return new BaseResult<Object>(true, stores);
	}
	
	@RequestMapping(value="add", method=RequestMethod.POST, produces={"application/json;charset=UTF-8"})
	@ResponseBody
	public BaseResult<Object> add(@RequestBody @Valid StoreAddModel model, BindingResult result, HttpSession session) {
		if (session.getAttribute("store") != null) {
			return new BaseResult<>(ResultEnum.ALREADY_EXSITS);
		}
		
		ValidCode code;
		
		if ((code = validCodeService.get(model.getValidCode())) == null) {
			return new BaseResult<>(ResultEnum.VALID_CODE_ERROR);
		}
		
		
		User user = (User)session.getAttribute("user");
		Store store = new Store();
		store.setCategory(model.getCategory());
		store.setDescription(model.getDesricption());
		store.setLat(model.getLat());
		store.setLng(model.getLng());
		store.setName(model.getName());
		store.setTel(model.getTel());
		store.setText(model.getText());
		store.setWait(0);
		store.setImg("");
		store.setCommentNum(0);
		store.setUser(user);
		user.setStore(store);
		
		storeService.add(store);
		System.out.println(store.getId());
		validCodeService.delete(code);

		session.setAttribute("store", store);
		return new BaseResult<Object>(true, store);
	}
	@RequestMapping(value = "/uploadImg", method=RequestMethod.POST, produces={"application/json;charset=UTF-8"})  
	@ResponseBody
    public BaseResult<Object> upload(@RequestParam(value = "file", required = true) MultipartFile file, HttpSession session) {  
		Store store = (Store)session.getAttribute("store");
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
        store.setImg("upload/" + fileName);
        storeService.update(store);
        return new BaseResult<Object>(true, store.getImg());  
    }  

}
