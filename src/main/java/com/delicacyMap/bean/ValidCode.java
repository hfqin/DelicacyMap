package com.delicacyMap.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="valid_code")
public class ValidCode {

	@Id
	@Column(name="id")
	private Integer id;
	
	@Column(name="valid_code")
	private String validCode;
	
}
