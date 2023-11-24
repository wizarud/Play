/**
 * @inheritable
 * @author EOSS-TH
 * 
 * @extends draw2d.command.Command
 */
limz_CommandDropClone = draw2d.command.Command.extend({
    NAME : "limz_CommandDropClone",
  
    init: function(canvas, figure)
    {
        this._super('Drop Clone Entity');
        this.canvas = canvas;
        this.figure = figure;
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
        this.connections = this.figure.getConnections().asArray();
    },
    
    /**
     * @method
     *
     *
     **/
    undo: function()
    {
        this.connections.forEach((connection)=>{
            this.canvas.remove(connection);
        });
        this.canvas.remove(this.figure);
    },
    
    /**
     * @method
     * 
     *
     **/
    redo: function()
    {
        this.canvas.add(this.figure);
        this.connections.forEach((connection)=>{
            this.canvas.add(connection);
            connection.reconnect();
        });
    }
});