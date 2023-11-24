function nav() {
	
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
        	$('html,body').animate({
            	scrollTop: (target.offset().top - 40)
             }, 1000);
             if ($('.navbar-toggle').css('display') != 'none') {
             	$(this).parents('.container').find(".navbar-toggle").trigger("click");
             }
             return false;
        }
   }
   
}

function overlayOn(id) {
	
    document.getElementById(id).style.display = "block";
    $("#"+id).css("height:",$(window).height()+"px;");
    if(id != "loader"){
    	$('html, body').animate({
    		scrollTop : $("#"+id).offset().top
    	}, 500, function() {

    	});
    }
    
}

function overlayOff(id) {
	
	if (!id) {
		var overlayIds = ['login', 'register'];
		var overlay;
		for (var i in overlayIds) {
			overlay = document.getElementById(overlayIds[i]);
			if (overlay) 
				overlay.style.display = "none";
		}
		return;
	}
	
    document.getElementById(id).style.display = "none";
}

jQuery(document).ready(function ($) {

	$(window).load(function () {
		$(".loaded").fadeOut();
		$(".preloader").delay(1000).fadeOut("slow");
	});
    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    $('#navbar-collapse').find('a[href*=#]:not([href=#])').click(function() {
		nav();
	});

	$('#logout').click(function () {
		$("#logoutForm").click()
	});
	
	$("#signIn").submit(function(e) {
		
		overlayOn('loader');
		e.preventDefault();
		var data = $("#signIn").serialize();
		var method = "POST";
		var url = contextRoot + "/signIn";
		
	 	if (data) {
		
		 	var ajax = new XMLHttpRequest();
		 	ajax.open(method, url, true);
		 	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		 	ajax.send(data);

		 	ajax.onreadystatechange = function() {
		 	  	if (ajax.readyState == 4 && ajax.status == 200) {		 
		 			var data = ajax.responseText;
		 			var json = JSON.parse(data);
		 			if (json.status == "success") {
		 				
		 				location.reload();

		 			} else {
		 				
		 				$("#login-err").html(json.message);
		 			}
		 		}
		 	  	overlayOff('loader');
		 	}	
	 	} 	
	});
	
	$("#registerForm").submit(function(e) {
		
		$(".loaded").show();
		$(".preloader").show();
		e.preventDefault();
		
		var data = $("#registerForm").serialize();
		var method = "POST";
		var url = contextRoot + "/register";
		
	 	if (data) {
		
		 	var ajax = new XMLHttpRequest();
		 	ajax.open(method, url, true);
		 	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		 	ajax.send(data);
		 	
		 	ajax.onreadystatechange = function() {
			
		 	  	if (ajax.readyState == 4 && ajax.status == 200) {
		 			$(".loaded").fadeOut();
		 			$(".preloader").delay(1000).fadeOut("slow");		 	  		
		 			var data = ajax.responseText;
		 			var json = JSON.parse(data);
		 			
		 			if (json.status == "success") {
		 				
		 				$("#registerFormWrapper").html("");
		 				$("#registerFormWrapper").append("<div class=\single_features_right\"><h2>Success</h2></div>" +
		 						"<a onclick=\"overlayOn('login');overlayOff('register')\" class=\"btn btn-default\">Lets Go!</a>");
		 			
		 			} else if (json.status == "fail") {
		 				
		 				if (json.message == "A01") {
		 					
		 					$(".userErr").html("Please enter Email, Language, Password and Confirm your password");
		 					$(".passErr").html("");
		 					$(".emailErr").html("");
		 					$('html, body').animate({
		 						scrollTop : $(".userErr").offset().top
		 					}, 1000, function() {
		 						$("#user-form").focus();
		 					});
		 					
		 				}
		 				
		 				if (json.message == "A02") {
			
		 					$(".emailErr").html("This Email is already in use");
		 					$(".passErr").html("");
		 					$(".userErr").html("");
		 					$('html, body').animate({
		 						scrollTop : $(".emailErr").offset().top
		 					}, 1000, function() {
		 						$("#email-form").focus();
		 					});
		 					
		 				}
		 				
		 				if (json.message == "A03") {
			
		 					$(".passErr").html("Comfirm password is not correct");
		 					$(".emailErr").html("");
		 					$(".userErr").html("");
		 					$('html, body').animate({
		 						scrollTop : $(".passErr").offset().top
		 					}, 1000, function() {
		 						$("#confirm-form").focus();
		 					});
		 					
		 				}
		 				
		 				if (json.message == "A04") {
			
		 					$(".passErr").html("Password must have at least 8 characters with at least one Capital letter, at least one lower case letter and at least one number");
		 					$(".emailErr").html("");
		 					$(".userErr").html("");		 					
		 					$('html, body').animate({
		 						scrollTop : $(".passErr").offset().top
		 					}, 1000, function() {
		 						$("#pass-form").focus();
		 					});
		 					
		 				}
		 				
		 			}
		 		}
		 	}	
	 	} 	
	});	
	
});
