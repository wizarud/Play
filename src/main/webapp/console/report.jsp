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
									<label class="title"><fmt:message key="date.start" /> : </label>
									<input type="text" id="startDate" class="form-control">
									
									<label class="title"><fmt:message key="date.end" /> : </label>
									<input type="text" id="endDate" class="form-control">
								</div>

								<div class="botlist content table-responsive table-full-width"
									style="width: 100%; display: inline-block; margin-left: 0px;">
									<table class="table table-hover table-striped">
										<thead>
											<tr>
												<th class="mobile">Date</th>
												<th></th>
											</tr>
										</thead>

										<tbody id="report">

										</tbody>
									</table>
								</div>								
							</div>

                        <div class="card col-md-8" style="padding: 10px;">
                        	<div id="service-content" class="content" >
								<div>
									<label><fmt:message key="push.bot.target" /> : </label>
									<label id="target" style="text-transform: none;"></label>
									<br>
									<label><fmt:message key="push.bot.name" /> : </label>
									<label id="botName" style="text-transform: none;"></label>
									<br>
									<label><fmt:message key="push.Keywords" /> : </label>
									<select id="keyword"></select>
								</div>
						        <div id="chat_widget_input_container">
						            <form method="post" id="chat_widget_form">
						            	<input type="file" id="chat_widget_file"><br>
						                <textarea class="form-control" id="chat_widget_input" ondrop="textAreaDropHandler(event);" ondragover="textAreaDragOverHandler(event);"	rows="4" cols="50"></textarea>
						                <br>
						                <div class="col-md-2" style="padding: 0;float: none;">
						                	<input type="button" class="btn btn-default btn-block" value="<fmt:message key="btt.notification" />!" id="chat_widget_button"/>
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
<style>
.timestamp {
	margin-left: 5px; 
	padding:5px 10px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border: 1px solid #1DC7EA;
}
</style>
<script src="js/lib/jquery-ui.min.js"></script>
<script src="js/push-service.js"></script>
<script type="text/javascript">

var lastSelectedRow;

function loadReport() {
	    
	overlayPopup('loader');
	
	const start = $("#startDate").val();
	const end = $("#endDate").val();
	
    $.get(contextRoot + "/console/vars/" + contextName(botId) + "?start=" + start + "&end=" + end, function(dates, status) {
    	
    	$("#report").empty();
    	
    	var rows = [];
    	
    	dates.forEach(function(date) {
    		
    		const row = $("<tr style='cursor: pointer; background-color: #f9f9f9'><td>" + date + "</td></tr>");
    		
    		row.click(function() {
    			
    			if (lastSelectedRow) {
	
    				lastSelectedRow.css('background-color', '#f9f9f9');
    			}
    			
    			row.css('background-color', '#FFFFFF');
    			
    			lastSelectedRow = row;    			
				lastSelectedRow.data("date", date);
				
    			overlayPopup('loader');
    			
		    	const reportPane = $('<div></div>');
	    		
    			overlayPopup('loader');
    		    $.get(contextRoot + "/console/vars/" + contextName(botId) + "?date=" + date, function(unordered_vars, status) {
    		    
    		    	reportPane.empty();
    		    	
    		    	/**
    		    	* ASC Key (Time) Sorting 
    		    	*/
    		    	const vars = Object.keys(unordered_vars).sort().reduce(
    		    		(obj, key) => { 
    		    		obj[key] = unordered_vars[key]; 
    		    		return obj;
    		    		}, 
    		    		{}
    		    	);	
    		    	
    		    	console.log(JSON.stringify(vars));
    		    	
    		    	const table = $("<table></table>");
    		    	
    		    	let tr, td;
    		    	for (let row in vars) {
    		    		
    		    		tr = $("<tr></tr>");
    		    		td = $("<td valign='top'>" + row + "</td>");
    		    		tr.append(td);
    		    		
		    			const tokens = vars[row].split("|");
		    			let line = '';
		    			let t;
		    			for (let i in tokens) {
		    				if (i<2) continue; //skip channel and sessionId
		    				t = tokens[i].trim();
		    				t = t.replaceAll(/\[br\]/g,"<br>");
		    				if (t.startsWith("https://") || t.startsWith("http://")) {
		    					t = "<a href='" + t + "' target='_blank'>View</a>";
		    				}
		    				line += t + "\t";
		    			}
		    			
    		    		//td = $("<td>" + vars[row] + "</td>");
    		    		td = $("<td>[" + tokens[0] + "] - " + tokens[1] + "<br><br>" + line + "<br>&nbsp;</td>");    		    		
    		    		
    		    		tr.append(td);
    		    		
    		    		tr.click(function() {
    		    			
    		    			$("#target").text(tokens[0] + "/" + tokens[1]);
    		    			
    		    		});
    		    		
    		    		table.append(tr);
    		    	}
    		    	
    		    	reportPane.append(table);
    		    	
        			overlayPopup('loader');
        			
    		    }, "json");
		    	
		    	const col = $('<td colspan="1"></td>');
		    	col.append(reportPane);
		    	
		    	//Insert to last row
	    		const lastRow = rows[rows.length-1];
	    		
	    		if (lastRow.vars) {
	    			lastRow.vars.remove();
	    		}
	    		
	    		lastRow.vars = $('<tr></tr>');
	    		lastRow.vars.append(col);    	    		
	    		lastRow.after(lastRow.vars);
		    	        		    	
    			overlayPopup('loader');
    			    			
    		});
    		
    		$("#report").append(row);
    		
    		rows.push(row);
    	});
    	    	
    	overlayPopup('loader');
    	
    	if (rows.length>0) {
    		const firstRow = rows[0];
    		firstRow.trigger("click");    		
    	}
    	
    }, "json");

}

function onBotListLoaded() {
	
	let nowDate = new Date();
	$("#endDate").datepicker({dateFormat: 'yy-mm-dd'});
	$("#endDate").datepicker("setDate", nowDate);
	$('#endDate').on('change', function() {
		loadReport();
	});	
	
	nowDate.setDate(nowDate.getDate() - 7);
	$("#startDate").datepicker({dateFormat: 'yy-mm-dd'});
	$("#startDate").datepicker("setDate", nowDate);	
	$('#startDate').on('change', function() {
		loadReport();
	});

	loadReport();
	
	//Push to target sessionId service
	$("#botName").text(botId);
	$("#chat_widget_file").change(function() {
		sendFiles(document.getElementById("chat_widget_file").files);
	});
	$("#chat_widget_button").show();
	loadKeywords();
}
</script>
</html>
