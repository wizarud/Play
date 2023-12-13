<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="java.util.*, org.json.JSONObject, com.wayos.*,com.wayos.Application, com.wayos.connector.SessionPool" %>
<%@ page isELIgnored="true" %>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<%@ include file="i18n.jspf"%>
<html class="no-js" lang="">
<!--<![endif]-->
<head>
<title>wayOS</title>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3401953410218555"
     crossorigin="anonymous"></script>
<% 

	String contextRoot = application.getContextPath();
	String accountId = (String) request.getAttribute("accountId");
	String botId = (String) request.getAttribute("botId");	
	JSONObject properties = (JSONObject) request.getAttribute("props");
		
	String message = request.getParameter("message");
	if (message==null || message.trim().isEmpty()) {
		message = "";
	}
	String scheme = Configuration.domain.startsWith("localhost") ? "http" : "https";
	String contextRootURL = scheme + "://" + Configuration.domain + contextRoot;
	String playURL = contextRootURL + "/x/" + accountId + "/" + botId;
	
%>

<%@ include file="css.jspf" %>

<style>
body, div, section, iframe {
	touch-action: none;
}
.context {
	margin: 0;
	padding: 10px 0;
	width: 100%;
}
.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   text-align: center;
}
</style>

<meta property="fb:app_id" content="<%= System.getenv("facebook_appId") %>" />

<meta property="og:type" content="website" />
<meta property="og:title" content="<%= properties.optString("title") %>" />
<meta property="og:description" content="<%= properties.optString("description") %>" />
<meta property="og:url" content="<%= "https://" + Configuration.domain + contextRoot %>/x/<%= accountId %>/<%= botId %>" />
<meta property="og:image" content="<%= "https://" + Configuration.domain + contextRoot %>/public/<%= accountId %>/<%= botId %>.PNG" />
<meta property="og:image:alt" content="<%=  "https://" + Configuration.domain + contextRoot %>/images/gigi.png" />

</head>
<body>

<!--[if lt IE 8]>
	<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->

	<div class='preloader'>
		<div class='loaded'>&nbsp;</div>
	</div>
	<%@ include file="nav-bar.jspf"%>
	<%@ include file="overlay.jspf" %>
	<%@ include file="javascript.jspf" %>	
	<%@ include file="fbSDK.jspf" %>

	<script src="<%= contextRootURL %>/wayosapp.js"></script>
	
	<script>
	
		var applyTheme = function (props) {
			
			document.addEventListener('touchstart', function(e) {e.preventDefault()}, false);
			document.addEventListener('touchmove', function(e) {e.preventDefault()}, false);
			
			let titleHeader = document.getElementById("title");
	   		titleHeader.innerHTML = props.title ? props.title : "wayOS";
	   		
			let titleLink = document.getElementById("title_link");
			let titleURI = "<%= contextRoot + "/x/" + accountId + "/" + botId %>";
			titleLink.setAttribute("href", titleURI);
	   		
		  	let socialSection = document.getElementById("social");
	 	  	socialSection.style.background = props.borderColor;			
				 	  	
			document.body.style.backgroundColor = props.borderColor;
			
		  	let footerSection = document.getElementById("footer");
		  	footerSection.style.background = props.borderColor;			
		}
		
		window.onorientationchange = (event) => {
			
			location.reload();
			
		};
			
	</script>

	<section id="footer" class="context">
		<div class="col-md-12" style="text-align: center; padding: 0; touch-action: none; background-color: darkGray">
			<wayos-let data-url="<%= playURL %>" data-message="<%= message %>" data-chat="yes" data-speak="yes" data-onload="applyTheme" style="height: 59vh"></wayos-let>				
		</div>
	</section>
			
</html>