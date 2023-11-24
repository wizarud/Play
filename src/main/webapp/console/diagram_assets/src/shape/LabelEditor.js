/**
 * 
 * @author EOSS-TH
 */

limz_LabelEditor = Class.extend({

    NAME : "limz_LabelEditor",

    init: function(listener)
    {
        // register some default listener and override this with the handover one 
        this.configuration = $.extend({onCommit: function(){}, onCancel: function(){}, text:"Value"},listener);
     },
    
    start: function( label)
    {
        var newText = prompt(this.configuration.text, label.getText());
        if (newText!==null) {
            var cmd =new limz_CommandUpdateResponse(label, newText);
            label.getCanvas().getCommandStack().execute(cmd);

            this.configuration.onCommit(label.getText());
        }
        else{
           this.configuration.onCancel();
        }
    }
    
});