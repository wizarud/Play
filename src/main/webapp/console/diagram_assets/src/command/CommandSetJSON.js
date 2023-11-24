
/**
 * @class limz_CommandSetJSON
 * 
 * Command to add a figure with CommandStack support.
 * 
 * @extends draw2d.command.Command
 */
limz_CommandSetJSON = draw2d.command.Command.extend({
    
    /**
     * @constructor
     * Create a add command for the given figure.
     * 
     * @param {draw2d.Canvas} canvas the canvas to use
     * @param {draw2d.Figure} figure the figure to add
     */
    init: function(figure, responseDef, currentData, newData)
    {
       this._super("Change regular expression");
       this.figure = figure;
       this.responseDef = responseDef;
       this.data = currentData;
       this.oldData = $.extend({},currentData);
       this.newData = newData;
       
    },
    
    updateLabel: function(data) {
    	
    	const responseType = this.responseDef.figure.getResponseType();
    	
        if (this.data.parameterName==='url' /*|| this.data.parameterName==='path'*/) {
        	
            this.responseDef.figure.setText(responseType + " " + data.value);
            
        } else if (this.data.parameterName==='name' || this.data.parameterName==='value') {
        	
        	const name =  this.responseDef.figure.getUserData()[0].value;
        	const value =  this.responseDef.figure.getUserData()[1].value;
        	
            this.responseDef.figure.setText(responseType + " " + name + " to " + value);
            
        } else if (
			this.data.parameterName==='object' || 
        	this.data.parameterName==='dom' || 
        	this.data.parameterName==='path' || 
        	this.data.parameterName==='hook' || 
        	this.data.parameterName==='params') {
			
        	const v1 =  this.responseDef.figure.getUserData()[0].value;
        	const v2 =  this.responseDef.figure.getUserData()[1].value;
        	
            this.responseDef.figure.setText(responseType + " " + v1 + " " + v2);			
			
		}
    	
    },
    
    /**
     * @method
     * Execute the command the first time
     * 
     **/
    execute:function()
    {
        $.extend(this.data, this.newData);
        
        this.updateLabel(this.newData);
        
        this.figure.validate();
    },
    
    /** 
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo:function()
    {
        $.extend(this.data, this.newData);
        
        this.updateLabel(this.newData);
        
        this.figure.validate();
    },
    
    /**
     * @method
     * Undo the command
     *
     **/
    undo:function()
    {
        $.extend(this.data, this.oldData);
        
        this.updateLabel(this.oldData);
        
        this.figure.validate();
    }
    
});