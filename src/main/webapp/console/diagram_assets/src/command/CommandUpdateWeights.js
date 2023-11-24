/**
 * @inheritable
 * @author EOSS-TH
 * 
 * @extends draw2d.command.Command
 */
limz_CommandUpdateWeights = draw2d.command.Command.extend({
    NAME : "limz_CommandUpdateWeights",
  
    init: function(entity, newWeights)
    {
        this._super('Update Weights');

        this.entity = entity;
        this.newWeights = newWeights;
    },
      
    canExecute: function()
    {
      // return false if we doesn't modify the model => NOP Command
      return true;
    },
    
    /**
     * @method
     * Execute the command the first time
     * 
     **/
    execute: function()
    {
        this.executeUpdate();
    },
    
    executeUpdate: function() {
    	
        this.oldWeights = this.entity.getTextWeights();

		this.entity.setTextWeights(this.newWeights);

    },
    
    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo: function()
    {
    
		this.entity.setTextWeights(this.oldWeights);
    },
    
    /**
     * @method
     * 
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function()
    {
		this.entity.setTextWeights(this.newWeights);
    }
});