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
                    <div class="col-md-12">
							<div class="card">
								<div class="header showcase-btt"
									style="width: 100%; display: inline-block;">
									<div class="col-md-2">
										<input type="file" style="display: none" id="spreadSheetFile" />
				                		<input type="button" class="btn btn-default btn-block" value="<fmt:message key="spreadSheet.open" />" id="openSpreadSheet"/>
				                	</div>
									<div class="col-md-2">
				                		<input type="button" class="btn btn-default btn-block" value="<fmt:message key="spreadSheet.save" />" id="saveSpreadSheet"/>
				                	</div>
								</div>
								<div id="spreadsheet" class="content"></div>
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

<script src="js/lib/jexcel.js" type="text/javascript"></script>
<link href="css/jexcel.css" rel="stylesheet" />
 
<script src="js/lib/jsuites.js"></script>
<link href="css/jsuites.css" rel="stylesheet" />

<script src="js/jspreadSheet_plugins.js"></script>
<script>
//Edit uploadFileName & columns to match the drawer Here!

var uploadFileName = "catalog.tsv";

var columns = [
    {
        type: 'text',
        title: 'Catalog',
        width: 50
    },
    {
        type: 'text',
        title: 'Image URL',
        width: 255,
        editor: textAttachment
    },
    {
        type: 'numeric',
        title: 'Price',
        width: 120
    },
    {
        type: 'text',
        title: 'Description',
        width: 255
    },
    {
        type: 'text',
        title: 'SKU',
        width: 50
    },
    {
        type: 'numeric',
        title: 'Discount (%)',
        width: 50
    }
];

//---------------------------------------------------------------
</script>
<script src="js/spreadSheet.js"></script> 

<script type="text/javascript">
function onBotListLoaded(changed) {
	if (changed) {
		location.reload();
		return;
	}
	tsv = loadSpreadsheet(uploadFileName);
}
</script>

</html>
