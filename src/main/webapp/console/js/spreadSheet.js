class Row {
  constructor(numbers) {
	if (numbers) {
	    this.numbers = numbers;
	} else {
		this.numbers = [];
	}	
  }
  push(number) {
    this.numbers.push(number);
  }
  next() {
    this.numbers.sort(function(a, b) {
        return a - b;
    });
    let result;
    for (let i in this.numbers) {
        result = this.numbers[i] + 1;
        if (!this.numbers.includes(result)) {
            return result;
        }
    }
    
  }  
  print() {
    console.log(this.numbers);
  }  

}

var tsv;

function updateTable(instance, cell, col, row, val, label, cellName) {
	
	//Number
	if (col===0) {
		//Todo: register row number
	}
	
	//Answer
	//if (col===2) {
		
		if (val) {
		
			const test = val.toLowerCase();

			if (test.startsWith("https://") || test.startsWith("http://")) {
			
				if (test.endsWith("jpg") || test.endsWith("jpeg") || test.endsWith("png")) {
				
					cell.innerHTML = "<img src=\"" + val + "\" style=\"width:300px;\">";
				
				}
			}
	
		}		
	//}

   cell.style.overflow = "hidden";
}

function loadSpreadsheet(type) {
	
	console.log("Loading spreadsheet:" + type);
	
	$("#spreadsheet").empty();
	
	let csv = contextRoot + "/console/csv/" + contextName(botId);
		
	//For Seed Download
	if (type && type.endsWith(".tsv")) {
		csv += "?type=" + type;
	}
	
	let cols = columns.length;
	
	//Number	Keywords	Answer	Question	Next	Expressions	W	X	Y
	let table = jspreadsheet(document.getElementById("spreadsheet"), {
		csv, 
		csvDelimiter: "\t",
		csvHeaders: true,
		tableOverflow: true,
		loadingSpin: true,
		minDimensions: [cols, 240],
		tableHeight: "800px",	
		columns,
		updateTable,
		onload: function () {this.hideIndex()}
	});
	
	return table;
}

function openSpreadsheet(data) {
	
	$("#spreadsheet").empty();
	
	let cols = columns.length;
	
	//Number	Keywords	Answer	Question	Next	Expressions	X	Y
	return jspreadsheet(document.getElementById("spreadsheet"), {
		data, 
		csvDelimiter: "\t",
		csvHeaders: true,
		tableOverflow: true,
		loadingSpin: true,
		minDimensions: [cols, 240],
		tableHeight: "800px",	
		columns,
		updateTable,
		onload: function () {this.hideIndex()}
	});

}

function toData(text) {
		
	let lines = text.split("\n");
  	
	let data = [];
    	
	for (let i in lines) {
		data.push(lines[i].split("\t").map(s => s.trim()));
	}
	
	//validate Spread Sheet
	
	if (data.length < 2) {
		alert("Spread Sheet should be Tab separated file!");
		return null;
	}
	
	//Validate Header
	for (let i in data[0]) {
		if (data[0][i]!==columns[i].title) {
			
			//Hot Fix for wayobot TSV version, remove later!!!
			if (i==6) {
				
				alert("Migrate from wayobot.com from>>" + JSON.stringify(data[0]));
				
				data[0].splice(6, 0, 'W');
				
				for (let j in data) {
					if (j==0) continue;
					data[j].splice(6, 0, '');
				}
				
				alert("To>>" + JSON.stringify(data[0]));
				
				break;
			}
			
			alert("Spread Sheet should be Tab separated file! Invalid Header at position " + i + ", should be " + columns[i].title + " but " + data[0][i]);
			return null;
		}
	}
	
	//Remove Header!
	data.shift();
	
	return data;
}

$("#openSpreadSheet").click(function () {
	
    $("#spreadSheetFile").trigger("click");
});

$("#saveSpreadSheet").click(function () {
	
	let content = "";
	
	//Pack Header
	for (let i in columns) {
		content += columns[i].title + "\t";
	}
	content = content.trim() + "\n";
	
	//Pack Content
	const data = tsv.getData(false);
	
	for (let row in data) {
		for (let col in data[row]) {
			content += data[row][col] + "\t";
		}
		content = content.trim() + "\n";
	}
	content = content.replace(/&lt;/g, "<");
	content = content.replace(/&gt;/g, ">");
	content = content.trim();
		
	let file = new File([content], contextName(botId) + "/" + uploadFileName, {
		  type: "text/plain",
	});	
	
	console.log("(^o^)ๆ Saving.." + file.name);
	
    let formData = new FormData();
	formData.append("file[]", file, file.name);
    
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
    	  
		  location.reload();
    	  
      }).fail(function(jqXHR, textStatus) {
    	  
          alert("File upload failed ..." + textStatus);
          
          overlayPopup("loader");
          
		  location.reload();
		  
      });
});

$("#exportSpreadSheet").click(function () {
	
	window.location.href = contextRoot + "/console/csv/" + contextName(botId);	
});

$("#spreadSheetFile").change(function() {
	
    let input, file;

    if (!window.FileReader) {
        alert("The file API isn't supported on this browser yet.");
        return;
    }
    
    input = document.getElementById("spreadSheetFile");
    
    file = input.files[0]; 
    
    let reader = new FileReader();
    
    reader.onload = function () {
    	
    	const data = toData(reader.result);
    	
    	if (data!==null) {
    		tsv = openSpreadsheet(data);    		
    	}
    	
    };
     
    reader.readAsText(file);
});	

function spreadSheetDropHandler(ev) {
	
	  ev.stopPropagation();
	  ev.preventDefault();
	  
	  if (!ev.dataTransfer) return;
	  
	  let files = [];

	  if (ev.dataTransfer.items) {
	    // Use DataTransferItemList interface to access the file(s)
	    for (let i = 0; i < ev.dataTransfer.items.length; i++) {
	      // If dropped items aren't files, reject them
	      if (ev.dataTransfer.items[i].kind === "file") {
	    	  
	        files.push(ev.dataTransfer.items[i].getAsFile());
	        
	      } else {
	    	  
	    	  ev.dataTransfer.items[i].getAsString(function (s) {
	    		  console.log("(-.-)ๆ " + ev.dataTransfer.items[i].type + ":" +s);
	    	  });    		    	  
	      }
	    }
	  } else {
	    // Use DataTransfer interface to access the file(s)
	    for (let i = 0; i < ev.dataTransfer.files.length; i++) {
	    	
	        files.push(ev.dataTransfer.files[i]);

	    }
	  }
	  
	  //Open last file
	  let file = files[files.length-1]; 
	    
	  let reader = new FileReader();
	    
	  reader.onload = function () {
	    	
		  const data = toData(reader.result);
	    	
		  if (data!==null) {
			  openSpreadsheet(data);    		
		  }
	  	
	  };
	     
	  reader.readAsText(file);
	  
}

function spreadSheetDragOverHandler(ev) {
	  // Prevent default behavior (Prevent file from being opened)
	  ev.stopPropagation();
	  ev.preventDefault();    		  
}

document.getElementById("spreadsheet").addEventListener("drop", spreadSheetDropHandler);
document.getElementById("spreadsheet").addEventListener("dragover", spreadSheetDragOverHandler);