
/**
 * 
 * @extends draw2d.command.Command
 */
limz_CommandSetSelectedResponse= draw2d.command.Command.extend({
    
    /**
     * @constructor
     * Create a add command for the given figure.
     * 
     * @param {draw2d.Figure} figure the figure to add
     */
    init: function(figure, newSelectedResponseId)
    {
       this._super("Change selected response");
       
       this.figure = figure;
       this.oldSelectedResponseId = figure.getSelectedResponseId();
       this.newSelectedResponseId = newSelectedResponseId;
    },
    
    /**
     * @method
     * Execute the command the first time
     * 
     **/
    execute:function()
    {
        this.figure.setSelectedResponseId(this.newSelectedResponseId);
    },
    
    /** 
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo:function()
    {
        this.figure.setSelectedResponseId(this.newSelectedResponseId);
    },
    
    /**
     * @method
     * Undo the command
     *
     **/
    undo:function()
    {
        this.figure.setSelectedResponseId(this.oldSelectedResponseId);
    }
    
});