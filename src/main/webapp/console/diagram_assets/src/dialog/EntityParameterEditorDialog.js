limz_EntityParameterEditorDialog = limz_TemplateParameterEditorDialog.extend({
    
    init:function(header, figure, responseDef, data){
        this._super(data);
        this.header = header
        this.figure = figure;
        this.responseDef = responseDef;
        this.data = data;
    },

    _autosuggestTrigger: function(){
        return "";
    },
    
    _wrapVariableForTemplateLanguage: function(variable){
        return variable;
    },    
 
    _onOk: function(value) {
    	
    	//Remove https:// and http:// for url param
    	if (this.data.parameterName==='url') {
        	value = value.replace("https://", "").replace("http://", "");    		
    	}
    	
    	//Protect from grave wayobot expression
    	value = value.replaceAll("`", "");
    	    	
        var cmd = new limz_CommandSetJSON(this.figure, this.responseDef, this.data, {value:value});
        app.executeCommand(cmd);

        $("#suggest").hide();
        this.container.modal('hide');
    }
    
});