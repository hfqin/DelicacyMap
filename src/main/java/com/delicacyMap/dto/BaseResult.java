package com.delicacyMap.dto;

import com.delicacyMap.enums.ResultEnum;
import com.delicacyMap.exception.BizException;
import com.fasterxml.jackson.annotation.JsonInclude;


import java.io.Serializable;

import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 * 
 * @author yingjun
 *
 * ajax 请求的返回类型封装JSON结果
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseResult<T> implements Serializable {


	private static final long serialVersionUID = -4185151304730685014L;

	private Integer errcode = 0;
	
	private String errmsg = "success";

	private T data;

    public BaseResult(boolean success, T data) {
    	if (data == null) {
    		this.errcode = 98;
    		this.errmsg = "没有可获得的数据对象";
    	}
    	else {
    		this.data = data;
    	}
    }
    
    public BaseResult() {
    	
    }
    
    public BaseResult(ResultEnum re) {
    	this.errcode = re.getState();
    	this.errmsg = re.getMsg();
    }

    public BaseResult(BizException ex) {
    	this.errcode = ex.getErrcode();
    	this.errmsg = ex.getErrmsg();
    }
    
    public BaseResult(int f) {
    	if (f == 0) {
    		this.errcode = 99;
    		this.errmsg = "没有可操作的数据对象";
    	}
    }
    
    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

	public Integer getErrcode() {
		return errcode;
	}

	public void setErrcode(Integer errcode) {
		this.errcode = errcode;
	}

	public String getErrmsg() {
		return errmsg;
	}

	public void setErrmsg(String errmsg) {
		this.errmsg = errmsg;
	}

}
