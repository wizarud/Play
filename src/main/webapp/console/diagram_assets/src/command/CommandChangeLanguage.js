
/**
 * @class limz_CommandSetActivityDef
 * 
 * 
 * @extends draw2d.command.Command
 */
limz_CommandChangeLanguage = draw2d.command.Command.extend({
    
    /**
     * @constructor
     * Create a add command for the given figure.
     * 
     * @param {draw2d.Figure} figure the figure to add
     */
    init: function(newLanguage)
    {
       this._super("Change language");
       
       this.oldLanguage = app.lang.toUpperCase();
       this.newLanguage = newLanguage;
    },
    
    /**
     * @method
     * Execute the command the first time
     * 
     **/
    execute:function()
    {
        this.redo();
    },
    
    /** 
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo:function()
    {
        app.lang = this.newLanguage;
    },
    
    /**
     * @method
     * Undo the command
     *
     **/
    undo:function()
    {
        $("#languageProperty").val(this.oldLanguage);
        app.lang = this.oldLanguage.toLowerCase();
    }
    
});