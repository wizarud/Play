/**
 * @inheritable
 * @author EOSS-TH
 * 
 * @extends draw2d.command.Command
 */
limz_CommandUpdateResponse = draw2d.command.Command.extend({
    NAME : "limz_CommandUpdateResponse",
  
    init: function(figure, newResponse)
    {
        this._super('Update Response');

        this.figure = figure;
        this.canvas = figure.getCanvas();
        this.newResponse = newResponse;
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
        this.oldResponse = this.figure.text;
        this.figure.setText(this.newResponse);
    },
    
    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo: function()
    {
       this.figure.setText(this.oldResponse);
    },
    
    /**
     * @method
     * 
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function()
    {
       this.figure.setText(this.newResponse);
    }
});