limz_Backend = Class.extend({
	
    variableMap : {
        method: ["GET", "POST"]
    },

	init:function() {
	},
	
	getBotList: function(app) {
		
		const backend = this;
		
        $.when(getBotList(contextRoot + "/console/context/" + accountId + "/", "#selectbotlist")).done(function() {
            const botId = $('#selectbotlist').val();
            const contextName = accountId + "/" + botId;
            console.log("Load from botlist " + contextName);
            app.load(contextName);
            backend.updateSelectedBotId(botId);
        });
        
        $('#selectbotlist').on('change', function() {
        	
	    	if (app.view.getCommandStack().canUndo()) {
	    		if (!confirm("Are you sure you want to discard the changes you made?")) {
	    			return;
	    		}
	    	}
        	
            const botId = $(this).val();
            const contextName = accountId + "/" + botId;
            
            app.load(contextName);            
            backend.updateSelectedBotId(botId);
        });
    },
    
    updateSelectedBotId: function(botId) {
    	localStorage.botId = botId;
    },
	
    getPrerequisitVariables: function(parameterName, successCallback){
        const variables = this.variableMap[parameterName];
        if (variables)
            successCallback(variables);
        else
            successCallback([]);
    },
    
    save: function(contextId, content, successCallback, errorCallback){
    	
        const jsonString = JSON.stringify(content);
        
        //console.log("Saving.." + jsonString);
        
        //console.log("To.." + contextRoot + "/console/context/" + contextId);
        
        $.ajax({
        	url: contextRoot + "/console/context/" + contextId,
            type: "POST",
            data: jsonString,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false
          }).done(function(data) {
        	  
        	  console.log("Done!");
              successCallback();
        	  
         }).fail(function(jqXHR, textStatus) {
        	  console.log("(T.T)ๆ fail");
          });
    },
    
    load:  function(contextId, successCallback, errorCallback){

		//console.log("Loading.." + contextRoot + "/console/context/" + contextId);
		
        $.get(contextRoot + "/console/context/" + contextId, function(data, status) {
			console.log("Loading.." + status);
            successCallback(data);
        }, "json");
    },

    cutWord: function(sentence, lang, successCallback, errorCallback) {
        console.log("(-.-)ๆ cutting.." + sentence);
        /*
        $.get(`/cutter?sentence=${sentence}&lang=${lang}`, function(data, status) {
            successCallback(data);
        }, "text");
        */
    },
    
    getPackage: function(contextId, successCallback, errorCallback) {
    	
    	/**
    	 * TODO: Bypass server for test, REMOVE LATER!!!
    	 */
        successCallback();
    	/*
    	const botId = contextId.split("/")[1];
        $.get(`/package?botId=${botId}`, function(data, status) {
            successCallback(data);
        }, "json");
        */
    },
    
});