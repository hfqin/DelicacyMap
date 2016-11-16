package com.delicacyMap.exception;

import com.delicacyMap.enums.ResultEnum;

/**
 * 
 * @author yingjun
 *
 */
public class BizException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private Integer errcode;
	private String errmsg;
	
	public BizException(ResultEnum re) {
		super(re.toString());
		this.errcode = re.getState();
		this.errmsg = re.getMsg();
		System.out.println(errmsg);
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
