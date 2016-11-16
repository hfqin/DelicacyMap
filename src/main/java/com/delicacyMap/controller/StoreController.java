package com.delicacyMap.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.delicacyMap.bean.Store;
import com.delicacyMap.dto.BaseResult;
import com.delicacyMap.service.IStoreService;

@Controller
@RequestMapping("/store")
public class StoreController {

	@Autowired
	IStoreService storeService;
	
	@RequestMapping(value="get", method=RequestMethod.GET, produces={"application/json;charset=UTF-8"})
	@ResponseBody
	public BaseResult<Object> get() {
		List<Store> stores = storeService.get();
		return new BaseResult<Object>(true, stores);
	}
	
}
