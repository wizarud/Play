function getFaceBookPageList() {
	
	overlayPopup("loader");
	
	let url = contextRoot + "/console/facebook/" + contextName(botId);
	
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onload = function() {
		
		if (xhr.status === 200) {
			
			let json = JSON.parse(xhr.responseText);
			
			$("#page").empty();
			$("#page").append($("<option value=\"\">-</option>"));
			
			json.pages.forEach((page)=>{
				$("#page").append($("<option value=\"" + page.pageId + "\">" + page.name + "</option>"));
			});
			
			if (json.pageId) {
				
				$("#page").val(json.pageId);				
			}
		}
		
		overlayPopup("loader");
	}
	
	xhr.send();
}

$("#update").click(function () {

	overlayPopup("loader");
	
	$("#errorMessage").hide();
	
	let url = contextRoot + "/console/facebook/" + contextName(botId);	
	let params = "pageId=" + $("#page").val();
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function() {

		if (xhr.status === 200) {
			
			var data = xhr.responseText;
			
 			if (data === "success") {
	
 				location.reload();	
 				
 			} else if (data.startsWith("success")) {
	
 				alert(data);
 				location.reload();
 				
 			} else {
	
 				$("#errorMessage").show();
 				
 			}
 			
 			overlayPopup("loader");
 			
		}
	}
	
	xhr.send(params);			
	
});