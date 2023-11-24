/**
 * @author EOSS-TH
 * @extends draw2d.ui.LabelInplaceEditor
*/

limz_LabelInplaceEditor =  draw2d.ui.LabelInplaceEditor.extend({

    NAME: "limz_LabelInplaceEditor",

    init: function(listener)
    {
        this._super(listener);
    },
        
    commit: function()
    {
        this.html.unbind("blur",this.commitCallback);
        $("body").unbind("click",this.commitCallback);
        var label = this.html.val();
        this.executeUpdate(label);
    },

    executeUpdate: function(text) {

        var cmd =new limz_CommandUpdateHooks(this.label, text);
        this.label.getCanvas().getCommandStack().execute(cmd);    

        this.html.fadeOut($.proxy(function(){
            this.html.remove();
            this.html = null;
            this.listener.onCommit(this.label.getText());
        },this));
    }
    
});