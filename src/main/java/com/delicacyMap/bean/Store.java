package com.delicacyMap.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.tools.corba.se.idl.constExpr.And;

@Entity
@Table(name="store")
public class Store {

	@Id
	@Column(name="id")
	private Integer id;
	
	@Column(name="lat")
	private Double lat;
	
	@Column(name="lng")
	private Double lng;
	
	@Column(name="text")
	private String text;
	
	@Column(name="name")
	private String name;

	@Column(name="star")
	private Integer star;
	
	@Column(name="description")
	private String description;
	
	@Column(name="img")
	private String img;
	
	@Column(name="tel")
	private String tel;
	
	@Column(name="wait")
	private Integer wait;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getStar() {
		return star;
	}

	public void setStar(Integer star) {
		this.star = star;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Integer getWait() {
		return wait;
	}

	public void setWait(Integer wait) {
		this.wait = wait;
	}
	
	
}
