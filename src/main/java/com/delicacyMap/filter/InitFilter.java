package com.delicacyMap.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;







public class InitFilter implements Filter {

	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) arg0;
		HttpServletResponse response = (HttpServletResponse) arg1;
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "content-type");
		response.setHeader("Access-Control-Allow-Credentials", "true");	
		HttpSession session = request.getSession();
//		session.setMaxInactiveInterval(ApplicationConfig.SESSION_TIME_OUT);
		System.out.println(request.getMethod());
		if (request.getMethod().equals("OPTIONS")) {
			response.setStatus(200);
			return;
		}
		arg2.doFilter(request, response);
	}

	public void destroy() {
	}

	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
	}
}
