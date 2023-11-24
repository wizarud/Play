function getChatbox() {
	
	overlayPopup("loader");
	
	let url = contextRoot + "/console/props/" + contextName(botId);
	
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onload = function() {
		
		if (xhr.status === 200) {
			
			let props = JSON.parse(xhr.responseText);
			
			$("#title").val(props.title);
			$("#borderColor").val(!props.borderColor?"#64c583":props.borderColor);
			$("#loadingGif").val(props.loadingGif);
			$("#countryLangContext").val(props.language.toUpperCase());
			
			$("#borderColor").spectrum({
				preferredFormat: "hex",
			    showInput: true,
				change: function(color) {
					$("#borderColor").val(color);
				}
			});				
		}
		
		overlayPopup("loader");
	}
	
	xhr.send();	
}

$("#update").click(function() {
	
	if ($("#title").val()) {
		
		overlayPopup("loader");
		
		$("#errorMessage").hide();
		
 		let url = contextRoot + "/console/props/" + contextName(botId);
 		let params = "title=" + $("#title").val() + "&borderColor=" + $("#borderColor").val() + "&loadingGif=" + $("#loadingGif").val() + "&language=" + $("#countryLangContext").val();
 		
 		let xhr = new XMLHttpRequest();
 		xhr.open("POST", url, true);
 		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

 		xhr.onload = function() {
	
 		    if (xhr.status === 200) {

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