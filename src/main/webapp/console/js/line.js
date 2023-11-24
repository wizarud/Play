function getLine() {
	
	overlayPopup("loader");
	
	let url = contextRoot + "/console/line/" + contextName(botId);
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onload = function() {
		
		if (xhr.status == 200) {
			
			let obj = JSON.parse(xhr.responseText);
			$("#act").val(obj.act);
			$("#secret").val(obj.secret);
			$("#webHookURL").val(obj.webHookURL);
			
		}
		
		overlayPopup("loader");
	}
	
	xhr.send();	
}

$("#update").click(function () {
	
	/**
	 * Both must have or Both must not have the ACT and SECRET!
	 */
	if ( ($("#act").val() && $("#secret").val()) || 
	((!$("#act").val() && !$("#secret").val()))) {
		
		overlayPopup("loader");
		
		$("#errorMessage").hide();
		
		let url = contextRoot + "/console/line/" + contextName(botId);
 		let params = "act=" + encodeURIComponent($("#act").val()) + "&secret=" + encodeURIComponent($("#secret").val()) + "&webHookURL=" + encodeURIComponent($("#webHookURL").val());
 		
 		let xhr = new XMLHttpRequest(); 		
 		xhr.open("POST", url, true);
 		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

 		xhr.onload = function() {
	
 		    if (xhr.status == 200) {
	
	 			if (xhr.responseText === "success") {
		
	 				location.reload();
	 				
	 			} else {
		
	 				$("#errorMessage").show();
	 				
	 			}
	 			
	 			overlayPopup("loader");
 		    }
 		}
 		
 		xhr.send(params);
 		
	} else {
		
		$("#errorMessage").show();
	}
			
});