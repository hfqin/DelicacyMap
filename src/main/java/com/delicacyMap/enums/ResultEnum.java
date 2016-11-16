package com.delicacyMap.enums;

/**
 * 业务异常基类，所有业务异常都必须继承于此异常 定义异常时，需要先确定异常所属模块。 例如：无效用户可以定义为 [10010001]
 * 前四位数为系统模块编号，后4位为错误代码 ,唯一。
 * 
 * @author yingjun
 *
 */
public enum ResultEnum {

	// 数据库想操作异常
	// 系统异常
	// 用户相关异常
	
	INVALID_PARAMS(100, "参数不正确"),

	INSERT_FAIL(201, "数据库插入失败"),
	UPDATE_FAIL(202, "数据库更新失败"),
	
	LOGIN_FAIL(301, "登录失败"),
	NO_PERMISSION(302, "无该操作权限"),
	PASSWORD_ERROR(303,"密码错误"),
	NOT_LOGIN(304, "未登录"),
	
	OPERATION_FREQUENTLY(401, "操作过于频繁"),
	ALREADY_EXSITS(402, "已存在"),
	PIN_ERROR(403, "pin错误"),
	NOT_EXSITS(404, "数据不存在"),
	DELETE_FAIL(405, "无法删除"),
	
	SERVER_ERROR(500, "服务器内部错误"),
	HHH(03102301023,"hhh");

	private int state;

	private String msg;

	ResultEnum(int state, String msg) {
		this.state = state;
		this.msg = msg;
	}

	public int getState() {
		return state;
	}

	public String getMsg() {
		return msg;
	}

	public static ResultEnum stateOf(int index) {
		for (ResultEnum state : values()) {
			if (state.getState() == index) {
				return state;
			}
		}
		return null;
	}
	
	@Override
	public String toString() {
		return "errcode: " + this.state + ", errmsg: " + this.msg + "";
	}

}
