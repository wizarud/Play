/**
 * <ul>
 *    <li>DEL    - delete selection</li>
 * </ul>
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.KeyboardPolicy
 */
limz_KeyboardPolicy = draw2d.policy.canvas.KeyboardPolicy.extend({

    NAME : "limz_KeyboardPolicy",
    
    /**
     * @constructor 
     */
    init: function()
    {
        this._super();
    },
    
    /**
     * @method
     * Callback if the user press a key.<br>
     * This implementation checks only if the <b>DEL</b> has been pressed and creates an
     * CommandDelete if this happens.
     * 
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {Number} keyCode the pressed key
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onKeyDown: function(canvas, keyCode, shiftKey, ctrlKey)
    {
        //
        if((keyCode===46 || keyCode===8) && canvas.getPrimarySelection()!==null){

            // create a single undo/redo transaction if the user delete more than one element. 
            // This happens with command stack transactions.
            //
            canvas.getCommandStack().startTransaction(draw2d.Configuration.i18n.command.deleteShape);
            var selection = canvas.getSelection();
            selection.each(function(index, figure){
               // don't delete a connection if the source or target figure is part of the selection.
               // In this case the connection is deleted by the DeleteCommand itself and it is not allowed to
               // delete a figure twice.
               //
               if(figure instanceof draw2d.Connection){
                    if(selection.contains(figure.getSource(),true)) {
                        return;
                    }
                    if(selection.contains(figure.getTarget(),true)) {
                       return;
                    }
               }
               if(figure instanceof limz_StartEntityShape || figure instanceof limz_EndEntityShape || figure instanceof limz_SilentEntityShape || figure instanceof limz_PropertiesEntityShape) {
                   return;
               }
               canvas.getCommandStack().execute(new limz_CommandDelete(figure));

           });
           // execute all single commands at once.
           canvas.getCommandStack().commitTransaction();
        }
        else{
            this._super(canvas, keyCode, shiftKey, ctrlKey);
         }
        
    }
});