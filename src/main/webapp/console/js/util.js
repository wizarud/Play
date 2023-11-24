var userBotList;

//get userbot list and append to elem
function getBotList(url, elem) {
	overlayPopup("loader");
	return $.ajax({
		url : url,
		cache : false,
		success : function(json, status, xhr) {
			
			if (xhr.responseURL) {
				window.location.href = xhr.responseURL;
				return;
			}
			
			$(elem).empty();
			userBotList = json;
			for (var i = 0; i < userBotList.length; i++) {
				var obj = userBotList[i];
				if (obj === botId) {
					$(elem).append("<option value=\"" + obj + "\" selected>" + obj + "</option>");
				} else {
					$(elem).append("<option value=\"" + obj + "\">" + obj + "</option>");
				}
			}
			overlayPopup("loader");
		}
	});
}

function contextName(botId) {
	return accountId + "/" + botId;
}

//popup overlay
function overlayPopup(elm) {
	var element = document.getElementById(elm);
	if (element.style.display === "none") {
		element.style.display = "block";
	} else {
		element.style.display = "none";
	}
}

// copy elem to clipBoard
function copyToclipBoard(elem) {
	/* Get the text field */
	var copyText = document.getElementById(elem);

	/* Select the text field */
	copyText.select();

	/* Copy the text inside the text field */
	document.execCommand("Copy");

	/* Alert the copied text */
	alert(copyText.value + " Copied");
}

//add newbot to Storage
function addNewBot() {
	
	overlayPopup("loader");
	
	if ($("#countryLang").val() 
			&& $("#addBotName").val()
			&& $("#addBotTitle").val()) {

		$(".alert_newbot").remove();
		
		let url = contextRoot + "/console/context/" + accountId + "/" + $("#addBotName").val();
		
		let params = "cmd=add&language=" + $("#countryLang").val()
		 		+ "&title=" + $("#addBotTitle").val();
		 		
		if ($("#template").val()) {
			
			const template = $("#template").val();
			
			params += "&template=" + template;
			
			$("#template").val("");
		}
		 		
		let xhr = new XMLHttpRequest();

		xhr.open("POST", url, true);

		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xhr.onload = function() {
			
			if (xhr.status == 200) {
				
				var json = JSON.parse(xhr.responseText);
				
				if (json.status == "success") {
					
					console.log("Add " + json.message + " Succeed");
					
					localStorage.botId = json.message;
				
					location.reload();
							
				} else {
					
					console.log("Internal Server Error: " + json.status);
					$(".alert_newbot").remove();
						$(".overlaybot")
							.prepend(
									"<p class=\"alert_newbot\" style=\"color:red;\">" + json.message + "</p>");
					
				}				
				
			} else {
				
				console.log("Internal Server Error: " + xhr.status);
				$(".alert_newbot").remove();
					$(".overlaybot")
							.prepend(
									"<p class=\"alert_newbot\" style=\"color:red;\">Internal Server Error!</p>");
				
			}
			
			overlayPopup("loader");
			
		}
		
		xhr.send(params);
		
	} else {
		
		$(".alert_newbot").remove();
		$(".overlaybot")
				.prepend(
						"<p class=\"alert_newbot\" style=\"color:red;\">Please input all fields</p>");
	}

}