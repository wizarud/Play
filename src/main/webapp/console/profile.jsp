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
							<div class="card">
								<div class="header">
									<h4 class="title"><fmt:message key="profile.title" /></h4>
								</div>
								<div class="content">
									<div class="row">
										<div class="col-md-7">
											<div class="form-group">
												<label><fmt:message key="profile.name" /></label> 
												<input id="name" type="text" class="form-control" placeholder="<fmt:message key="profile.name" />"
													value="">
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-7">
											<div class="form-group">
												<label><fmt:message key="profile.email" /></label> 
												<input id="email" type="text" class="form-control" placeholder="<fmt:message key="profile.email" />"
													value="">
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-7">
											<div class="form-group">
												<label><fmt:message key="profile.businessInfo" /></label> 
												<textarea id="businessInfo" class="form-control" placeholder="<fmt:message key="profile.businessInfo" />" rows="5" cols="30"></textarea>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-7">						
											<button id="updateProfileButton" class="btn btn-info btn-fill pull-right">
												<fmt:message key="btt.updateProfile" />
											</button>
										</div>
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
<script type="text/javascript">
function getProfile() {
	
	overlayPopup("loader");
	
	let url = contextRoot + "/console/account/" + accountId;
	
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onload = function() {
		
		if (xhr.status === 200) {
			
			let props = JSON.parse(xhr.responseText);
			
			$("#name").val(props.Name);
			$("#email").val(props.Email);
			$("#businessInfo").val(props.businessInfo);
		
		}
		
		overlayPopup("loader");
	}
	
	xhr.send();	
}

function updateProfile(props) {
	
	overlayPopup("loader");
	
	let url = contextRoot + "/console/account/" + accountId;
	
	let params = "";
		
	for (let key in props) {
		params += key + "=" + props[key] + "&";
	}
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function() {
		
		if (xhr.status === 200) {
			
			getProfile();
		
		}
		
		overlayPopup("loader");
	}
	
	xhr.send(params);	
}

function onBotListLoaded() {
	
	getProfile();
	
	$("#updateProfileButton").click(function() {
		updateProfile({
			Name: $("#name").val(),
			Email: $("#email").val(),
			businessInfo: $("#businessInfo").val()
		});
	});
}

</script>

</html>
