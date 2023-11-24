<%@ page contentType="text/html; charset=UTF-8" import="org.json.JSONArray, org.json.JSONObject, com.wayos.Configuration" %>
<%@ include file="fragment/i18n.jspf"%>
<!doctype html>
<html lang="en">
<head>
<title>WAYOS</title>
<%@ include file="fragment/env-css.jspf"%>
</head>
<body>
	<%@ include file="fragment/env-param.jspf"%>
	<div class="wrapper">
		<%@ include file="fragment/sidebar.jspf"%>
		<div class="main-panel">
			<%@ include file="fragment/navbar.jspf"%>		
				
			<%
			
			JSONArray templateArray = new JSONArray();
			
			String templateContextNameString = System.getenv("templateContextNames");
			
			if (templateContextNameString!=null) {
				
				String [] templateContextNames = templateContextNameString.split(",");
				
				JSONObject contextNameObject;
				
				for (String templateContextName:templateContextNames) {
					
					try {
						
						contextNameObject = new JSONObject();
						contextNameObject.put("contextName", templateContextName);
						contextNameObject.put("icon", Configuration.PUBLIC_PATH + templateContextName + ".PNG");
						contextNameObject.put("title", templateContextName.split("/")[1]);
						
						templateArray.put(contextNameObject);
						
					} catch (Exception e) {
						
						continue;
					}
				}						
			}
				
			%>
			<div class="content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-12">
							<div class="card">
							
								<% for (int i=0; i<templateArray.length(); i++) { 
									
									JSONObject template = templateArray.getJSONObject(i);
								%>
								
								<div id="templates" class="content showcase-btt"
									style="width: 100%; display: inline-block;">
									
									<a href="#" class="col-md-2" style="padding: 10px 10px 0 0;">
										<button class="btn btn-default btn-block" style="background: url('/<%= template.opt("icon") %>'); background-repeat: no-repeat; background-size: cover" onclick="addNewBotFromTemplate('<%= template.opt("contextName") %>')"/> 
											<br>
											<br>
											<br>
												<span style="color: white"><%= template.opt("title") %></span>
											<br>
											<br>
										</button>
									</a>
								
								</div>
								
								<% } %>

							</div>
						</div>
					</div>

				</div>
			</div>

		</div>
	</div>
	<textarea rows="4" cols="4" id="testChatText" style="display: none;"></textarea>
	<textarea rows="4" cols="4" id="chatLogTextArea" style="display: none;"></textarea>
	<input type="checkbox" id="onOff" style="display: none;">
	<%@ include file="fragment/overlay-addbot.jspf"%>
	<%@ include file="fragment/overlay-loader.jspf"%>
</body>

<%@ include file="fragment/env-js.jspf"%>
<script type="text/javascript">

function addNewBotFromTemplate(template) {	
	$("#template").val(template);
	overlayPopup('overlay-addbot');	
}

function onBotListLoaded(changed) {
	if (changed) {
		location.reload();
		return;
	}
}
</script>
</html>
