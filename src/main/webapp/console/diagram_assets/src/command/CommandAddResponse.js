/**
 * @inheritable
 * @author EOSS-TH
 * 
 * @extends draw2d.command.Command
 */
limz_CommandAddResponse = draw2d.command.Command.extend({
    NAME : "limz_CommandAddResponse",
  
    init: function(figure, newResponseLabel)
    {
        this._super('Add Response Label');
        this.figure = figure;
        this.newResponseLabel = newResponseLabel;
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
        this.redo();
    },
    
    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo: function()
    {
        this.figure.remove(this.newResponseLabel);
    },
    
    /**
     * @method
     * 
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function()
    {
        this.figure.add(this.newResponseLabel);
    }
});