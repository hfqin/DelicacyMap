package com.delicacyMap.service;

import com.delicacyMap.bean.ValidCode;

public interface IValidCodeService {

	ValidCode get(String validCode);

	void delete(ValidCode code);

}
