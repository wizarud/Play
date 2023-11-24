<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="fragment/i18n.jspf"%>
<!doctype html>
<html lang="en">
<head>
<title>WAYOS</title>
<%@ include file="fragment/env-css.jspf" %>	
</head>
<body>
<%@ include file="fragment/env-param.jspf" %>		
<div class="wrapper">
 	<%@ include file="fragment/sidebar.jspf" %>
    <div class="main-panel">
		<%@ include file="fragment/navbar.jspf" %>
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card generateMinHeight">
							<div id="service-content" class="content">							
								<div id="Test-Connection-content">
									<span class="form-group">
										<p id="errorMessage" style="color: red; display: none"><fmt:message key="chatbox.err" /></p>
										<label>Channel Access Token : </label>
										<span class="col-md-8" style="display: inline-block;float: none;">
											<input id="act" type="text" class="form-control" value="<fmt:message key="chatbox.loading" />">
										</span><br>									
										<label>Secret : </label>
										<span class="col-md-8" style="display: inline-block;float: none;">
											<input id="secret" type="text" class="form-control" value="<fmt:message key="chatbox.loading" />">
										</span>
										<br><br>
										<label>Web Hook URL : </label>
										<span class="col-md-8" style="display: inline-block;float: none;">
											<input id="webHookURL" type="text" class="form-control" value="<fmt:message key="chatbox.webHookURL" />">
										</span>
										<br><br>
										<span class="col-md-2" style="display: inline-block;float: right;padding: 0;">						               
						                	<input type="button" class="btn btn-default btn-block" value="<fmt:message key="btt.update" />" id="update"/>
						                </span>
									</span>	
								</div>

							</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<%@ include file="fragment/overlay-addbot.jspf" %>
<%@ include file="fragment/overlay-loader.jspf"%>
</body>
<%@ include file="fragment/env-js.jspf" %>
<script src='js/lib/spectrum.js'></script>
<link rel='stylesheet' href='css/spectrum.css' />
<script src="js/line.js"></script> 
<script type="text/javascript">
function onBotListLoaded() {
	getLine();
}
</script>
</html>
