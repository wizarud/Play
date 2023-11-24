package com.wayos.tomcat.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.wayos.Configuration;
import com.wayos.Context;
import com.wayos.MessageObject;
import com.wayos.Session;
import com.wayos.command.talk.Choice;
import com.wayos.command.talk.Question;
import com.wayos.connector.RequestObject;
import com.wayos.connector.ResponseObject;
import com.wayos.connector.SessionPool;
import com.wayos.servlet.console.ConsoleServlet;
import com.wayos.util.URItoContextResolver;

/**
 * Query Service, call from CHAI Designer, response as plain text
 * @author apple
 *
 */
@SuppressWarnings("serial")
@WebServlet("/q/*")
public class QueryServlet extends ConsoleServlet {

	static class Entry {
		String owner;
		ResponseObject responseObject;

		Entry(String owner, ResponseObject responseObject) {
			this.owner = owner;
			this.responseObject = responseObject;
		}
		
		public String toString() {
			return responseObject.toString();
		}
	}
	
	private List<String> contextList(String accountId) {
		
		List<String> contextList = new ArrayList<String>();
		
		String resourcePath = Configuration.LIB_PATH + accountId + "/";
		
		List<String> objectList = storage().listObjectsWithPrefix(resourcePath);
				
		String contextName;
		
		for (String object:objectList) {
			
			if (!object.endsWith(".context")) continue;
			
			contextName = accountId + "/" + object.substring(0, object.lastIndexOf(".context"));
			
			contextList.add(contextName);
			
		}	
		
		return contextList;
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		req.setCharacterEncoding("UTF-8");
		
		URItoContextResolver uriToContextResolver = new URItoContextResolver(req);
		
		String accountId = uriToContextResolver.accountId;
		
		String fallbackContextName = accountId + "/" + uriToContextResolver.botId;
		
		String prefixContextName = accountId + "/" + uriToContextResolver.sessionId;
		
		String sessionId = req.getParameter("sessionId");
		
		String message = req.getParameter("message");
		
		String filterContextName = null;
		
		/**
		 * Filter context from menu in pattern <id> #<botId> <message>
		 */
		if (message.split(" ").length>=2) {
			
			String [] tokens = message.split(" ", 2);
			
			if (tokens[1].startsWith("#")) {
								
				tokens = tokens[1].substring(1).split(" ", 2);
				
				//System.out.println("Filter context from:" + accountId + "/" + tokens[0]);
				
				filterContextName = accountId + "/" + tokens[0];
				
				message = tokens[1];
			}
			
		}
		
		/**
		 * Debug
		 * 
		System.out.println("Do Query..");
		System.out.println("Fallback: " + fallbackContextName);
		System.out.println("prefixContextName: " + prefixContextName);
		System.out.println("filterContextName: " + filterContextName);
		System.out.println("message: " + message);
		System.out.println("sessionId: " + sessionId);		
		 */
						
		String responseText = "";
		
		if (message != null && !message.trim().isEmpty()) {
			
			List<String> contextList = contextList(accountId);
			
			SessionPool sessionPool = sessionPool();
			
			Map<String, ResponseObject> contextResponseMap = new HashMap<>();
			
			Map<String, Context> contextObjectMap = new HashMap<>();

			Session session;
			
			Context context;
			
			for (String contextName : contextList) {
				
				if (contextName.equals(fallbackContextName)) continue;
				
				if (filterContextName!=null && !filterContextName.equals(contextName)) continue;
				
				if (contextName.startsWith(prefixContextName)) {
					
					//System.out.println("=>" + contextName);
					
					session = sessionPool.get(RequestObject.create(sessionId, contextName));
					
					context = session.context();
					
					responseText = session.parse(MessageObject.build(message));
					
					//System.out.println("<=" + responseText);
					
					if (!responseText.isEmpty()) {
						
						contextResponseMap.put(contextName, new ResponseObject(responseText));
						
						contextObjectMap.put(contextName, context);
						
					} 
					
				}
	
			}
			
			//Lets go to fallback context
			if (contextResponseMap.isEmpty()) {
				
				session = sessionPool.get(RequestObject.create(sessionId, fallbackContextName));

				responseText = session.parse(MessageObject.build(message));				
				
			} 
			//Found Result in a context, Pick that.
			else if (contextResponseMap.keySet().size()==1) {
				
				ResponseObject [] responseObjects = new ResponseObject[1];
				responseObjects = contextResponseMap.values().toArray(responseObjects);
				
				responseText = responseObjects[0].responseText;
				
			} 
			//Found Results in many contexts, Insert Slide Menus
			else {
				
				Set<String> contextNameSet = contextResponseMap.keySet();
				
				ResponseObject responseObject;
				
				List<Question> questionList = new ArrayList<>();
				
				Question question;
				Choice choice;
				List<Choice> choiceList;
				String id, label, imageURL;
				
				for (String contextName:contextNameSet) {
					
					responseObject = contextResponseMap.get(contextName);
					
					context = contextObjectMap.get(contextName);
					
					id = UUID.randomUUID().toString();
					
					label = context.prop("title") + " " + label(responseObject);
					
					imageURL = "";//TODO: Get from imageCover URL
					
					choice = Choice.build(id, "#" + contextName.replace(accountId + "/", "") + " " + message);
					
					choiceList = new ArrayList<>();
					choiceList.add(choice);
					
					question = new Question(id, label, imageURL, choiceList);
					questionList.add(question);
					
				}
				
				responseText = "";
								
				for (Question q:questionList) {
					responseText += q.toString() + "\n\n\n";
				}
				
				responseText = responseText.trim();
				
			}
	        
		}
		
		//System.out.println(responseText);
		
		resp.setContentType("text/plain");
		
		resp.setCharacterEncoding("UTF-8");		

		resp.getWriter().print(responseText);
	}

	private String label(ResponseObject responseObject) {
		
		Object messageObject = responseObject.messageList.get(0);
		
		if (messageObject instanceof ResponseObject.Text) {
			
			String text = messageObject.toString();
			
			if (text.length() > 20) 
				return messageObject.toString().substring(0, 20) + "..";
			
			return text;
		}
		
		
		if (messageObject instanceof List<?>) {
			
			List<Question> questionList = (List<Question>) messageObject;
			
			if (questionList.size()==1) {
				
				String text = questionList.get(0).label;
				
				if (text.length() > 20) 
					return text.substring(0, 20) + "..";
				
				return text;
				
			}
		}
		
		return "...";
	}
}
