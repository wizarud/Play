/**
 * @inheritable
 * @author EOSS-TH
 * 
 * @extends draw2d.command.Command
 */
limz_CommandMarkAsForward = draw2d.command.Command.extend({
    NAME : "limz_CommandMarkAsForward",
  
    init: function(figure)
    {
        this._super('Mark As Forward');

        this.figure = figure;
        this.canvas = figure.getCanvas();
        this.connections = [];
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
        const connections = this.figure.getPort("output").getConnections().asArray().slice();
        connections.forEach(connection => {
            connection.setSourceDecorator(null);
            this.connections.push(connection);
        });

        this.figure.isQuestion = false;
    },
    
    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo: function()
    {
        this.connections.forEach(connection => {
            connection.setSourceDecorator(new limz_QuestionDecorator());
        });

        this.figure.isQuestion = true;
    },
    
    /**
     * @method
     * 
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function()
    {
        this.connections.forEach(connection => {
            connection.setSourceDecorator(null);
        });

        this.figure.isQuestion = false;
    }
});