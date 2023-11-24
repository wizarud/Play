/**
 * @inheritable
 * @author EOSS-TH
 * 
 * @extends draw2d.command.Command
 */
limz_CommandDropQuestion = draw2d.command.Command.extend({
    NAME : "limz_CommandDropQuestion",
  
    init: function(canvas, figure, x, y)
    {
        this._super('Drop Question Entity');
        this.canvas = canvas;
        
        this.question = figure.question;
        this.answer = figure.answer;
        this.connection = figure.connection;
        
        this.x = x;
        this.y = y;
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
        this.canvas.add(this.question, this.x, this.y);
        this.canvas.add(this.answer, this.x + 70, this.y + 70);             
        this.canvas.add(this.connection);
        
    },
    
    /**
     * @method
     *
     *
     **/
    undo: function()
    {
        this.canvas.remove(this.connection);
        this.canvas.remove(this.answer);
        this.canvas.remove(this.question);
    },
    
    /**
     * @method
     * 
     *
     **/
    redo: function()
    {
    	this.execute();
    }
});