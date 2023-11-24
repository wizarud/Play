<%@ page contentType="text/html; charset=UTF-8"%>
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
			<div class="content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-12">
                        	<div class="card col-md-8" style="padding: 10px;">
                        		<div id="service-content" class="content">
						        	<div id="chat_widget_input_container">
						            	<form method="post" id="chat_widget_form">
						                	<textarea class="form-control" id="chat_widget_input" rows="100" cols="88"></textarea>
						                	<br>
						                	<div class="col-md-2" style="padding: 0; float: none;">
						                		<input type="button" class="btn btn-default btn-block" value="<fmt:message key="spreadSheet.save" />!" id="chat_widget_button"/>
							                </div>
							            </form>
							        </div>
						        </div>					
                	        </div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<%@ include file="fragment/overlay-addbot.jspf"%>
	<%@ include file="fragment/overlay-loader.jspf"%>
</body>
<%@ include file="fragment/env-js.jspf"%>
<link href="js/lib/jquery-ui.min.css" rel="stylesheet" />
<script src="js/lib/jquery-ui.min.js"></script>
<script type="text/javascript">

function loadQuiz() {
	
	overlayPopup("loader");
	
	let url = contextRoot + "/console/csv/" + contextName(botId) + "?type=qa.tsv";
	
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onload = function() {
		
		if (xhr.status == 200) {
			
			$("#chat_widget_input").val(xhr.responseText);
			
		}
		
		overlayPopup("loader");
	}
	
	xhr.send();	

}

$("#chat_widget_button").click(function () {
	
	let content = $("#chat_widget_input").val();
	
	let file = new File([content], contextName(botId) + "/qa.tsv", {
		  type: "text/plain",
	});	
	
    let formData = new FormData();
	formData.append("file[]", file, file.name);
	
	console.log("(^o^)ๆ Saving.." + content);
    
    overlayPopup("loader");
    
    $.ajax({
    	url: contextRoot + "/console/factory",
        type: "POST",
        data: formData,
        enctype: "multipart/form-data",
        processData: false,
        contentType: false
      }).done(function(data) {
    	  
    	  alert(data);
    	  
    	  overlayPopup("loader");
    	  
    }).fail(function(jqXHR, textStatus) {
    	  
          alert("File upload failed ..." + textStatus);
          
          overlayPopup("loader");
          
    });

});

function onBotListLoaded() {

	loadQuiz();
	$("#chat_widget_button").show();
		
}
</script>
</html>
