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
										<label><fmt:message key="chatbox.title.words" /> : </label>
										<span class="col-md-8" style="display: inline-block;float: none;">
											<input id="title" type="text" class="form-control" value="<fmt:message key="chatbox.loading" />">
										</span>
										<br>
										<label style="margin-top: 10px;">Border Color : </label>
										<span class="col-md-8" style="display: inline-block;float: none;">
											<input id="borderColor" type="text" class="form-control" value="<fmt:message key="chatbox.loading" />">
										</span>	
										<br>
										<label style="margin-top: 10px;">Loading Gif : </label>
										<span class="col-md-8" style="display: inline-block;float: none;">
											<input id="loadingGif" type="text" class="form-control" value="<fmt:message key="chatbox.loading" />">
										</span>	
										<br>																						
										<label style="margin-top: 10px;"><fmt:message key="chatbox.language" /> : </label>
										<span class="col-md-8" style="display: inline-block;float: none;">
											<select id ="countryLangContext" style="height: 30px;" required="required" data-placeholder="<fmt:message key="chatbox.select.language" />">
												<option value="AF">Afrikanns</option>
												<option value="SQ">Albanian</option>
												<option value="AR">Arabic</option>
												<option value="HY">Armenian</option>
												<option value="EU">Basque</option>
												<option value="BN">Bengali</option>
												<option value="BG">Bulgarian</option>
												<option value="CA">Catalan</option>
												<option value="KM">Cambodian</option>
												<option value="ZH">Chinese (Mandarin)</option>
												<option value="HR">Croation</option>
												<option value="CS">Czech</option>
												<option value="DA">Danish</option>
												<option value="NL">Dutch</option>
												<option value="EN">English</option>
												<option value="ET">Estonian</option>
												<option value="FJ">Fiji</option>
												<option value="FI">Finnish</option>
												<option value="FR">French</option>
												<option value="KA">Georgian</option>
												<option value="DE">German</option>
												<option value="EL">Greek</option>
												<option value="GU">Gujarati</option>
												<option value="HE">Hebrew</option>
												<option value="HI">Hindi</option>
												<option value="HU">Hungarian</option>
												<option value="IS">Icelandic</option>
												<option value="ID">Indonesian</option>
												<option value="GA">Irish</option>
												<option value="IT">Italian</option>
												<option value="JA">Japanese</option>
												<option value="JW">Javanese</option>
												<option value="KO">Korean</option>
												<option value="LA">Latin</option>
												<option value="LV">Latvian</option>
												<option value="LT">Lithuanian</option>
												<option value="MK">Macedonian</option>
												<option value="MS">Malay</option>
												<option value="ML">Malayalam</option>
												<option value="MT">Maltese</option>
												<option value="MI">Maori</option>
												<option value="MR">Marathi</option>
												<option value="MN">Mongolian</option>
												<option value="NE">Nepali</option>
												<option value="NO">Norwegian</option>
												<option value="FA">Persian</option>
												<option value="PL">Polish</option>
												<option value="PT">Portuguese</option>
												<option value="PA">Punjabi</option>
												<option value="QU">Quechua</option>
												<option value="RO">Romanian</option>
												<option value="RU">Russian</option>
												<option value="SM">Samoan</option>
												<option value="SR">Serbian</option>
												<option value="SK">Slovak</option>
												<option value="SL">Slovenian</option>
												<option value="ES">Spanish</option>
												<option value="SW">Swahili</option>
												<option value="SV">Swedish</option>
												<option value="TA">Tamil</option>
												<option value="TT">Tatar</option>
												<option value="TE">Telugu</option>
												<option value="TH">Thai</option>
												<option value="BO">Tibetan</option>
												<option value="TO">Tonga</option>
												<option value="TR">Turkish</option>
												<option value="UK">Ukranian</option>
												<option value="UR">Urdu</option>
												<option value="UZ">Uzbek</option>
												<option value="VI">Vietnamese</option>
												<option value="CY">Welsh</option>
												<option value="XH">Xhosa</option>
											</select>
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
<script src="js/chatbox.js"></script> 
<script type="text/javascript">
function onBotListLoaded() {
	getChatbox();
}
</script>
</html>
