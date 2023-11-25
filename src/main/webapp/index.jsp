<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="com.wayos.*"%>

<%

/**
* Forward to showcase bot
*/

String accountId = System.getenv("showcaseAccountId");		

String botId = System.getenv("showcaseBotId");

String contextRoot = application.getContextPath();

String contextRootURL = request.getScheme() + "://" + Configuration.domain + contextRoot;

String playURL = contextRootURL + "/x/" + accountId + "/" + botId;

request.getRequestDispatcher("/x/" + accountId + "/" + botId).forward(request, response);

%>