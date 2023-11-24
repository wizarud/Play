/**
 * @inheritable
 * @author EOSS-TH
 * 
 * @extends draw2d.command.Command
 */
limz_CommandUpdateHooks = draw2d.command.Command.extend({
    NAME : "limz_CommandUpdateHooks",
  
    init: function(figure, newHooks)
    {
        this._super('Update Hooks');

        this.figure = figure;
        this.canvas = figure.getCanvas();
        this.newHooks = newHooks;
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
        if (app.isAutoCutHooks && !this.figure.callCutter) {
            app.backend.cutWord(this.newHooks, app.lang, function(result) {
                this.newHooks = result;
                this.executeUpdate();
                app.propertyPane.onSelectionChanged(app.propertyPane, {figure:this.figure.getParent()});
                this.figure.callCutter = true;
            }.bind(this));
            return;
        } 
        this.executeUpdate();
    },

    executeUpdate: function() {
    	
        this.oldHooks = this.figure.text;
        this.oldWeights = this.figure.getUserData();

        this.figure.setText(this.newHooks);

    },
    
    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo: function()
    {
       this.figure.setText(this.oldHooks);
       this.figure.setUserData(this.oldWeights);
    },
    
    /**
     * @method
     * 
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function()
    {
       this.figure.setText(this.newHooks);
    }
});