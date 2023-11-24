package com.wayos.tomcat.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wayos.Configuration;
import com.wayos.servlet.console.ConsoleServlet;

@WebServlet("/health")
public class HealthServlet extends ConsoleServlet {
	
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		StringBuilder sb = new StringBuilder();
		
		List<String> userList = userList();
		
		for (String user:userList) {
			sb.append(user);
			sb.append(System.lineSeparator());
		}
		
		resp.setContentType("text/plain");
		
		resp.setCharacterEncoding("UTF-8");		
		
		resp.getWriter().print(sb.toString());
		
	}
	
	private List<String> userList() {
		
		List<String> userList = new ArrayList<String>();
		
		String resourcePath = Configuration.USER_PATH + "/";
		
		List<String> objectList = storage().listObjectsWithPrefix(resourcePath);
				
		String userName;
		
		for (String object:objectList) {
			
			if (!object.endsWith(".json")) continue;
			
			userName = object.substring(0, object.lastIndexOf(".json"));
			
			userList.add(userName);
			
		}	
		
		return userList;
	}
}
