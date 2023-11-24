limz_View = draw2d.Canvas.extend({
	
	init:function(id){
		this._super(id);
		
		this.setScrollArea("#"+id);
        this.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());
        this.installEditPolicy(new CopyInterceptorPolicy());
        this.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: function() {
                return new limz_HoverConnection();
            }
          }));
        this.installEditPolicy(new limz_KeyboardPolicy());
		this.currentDropConnection = null;
		
		// override the defualt keyUp method to avoid "delete" of elements via ENTF key
		this.onKeyDown= function(){};
		
		this.showImages = true;
	},

    /**
     * @method
     * Called if the DragDrop object is moving around.<br>
     * <br>
     * Graphiti use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     * 
     * @param {HTMLElement} droppedDomNode The dragged DOM element.
     * @param {Number} x the x coordinate of the drag
     * @param {Number} y the y coordinate of the drag
     * 
     * @template
     **/
    onDrag:function(droppedDomNode, x, y )
    {
    },
    
    /**
     * @method
     * Called if the user drop the droppedDomNode onto the canvas.<br>
     * <br>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     * 
     * @param {HTMLElement} droppedDomNode The dropped DOM element.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onDrop : function(droppedDomNode, x, y, shiftKey, ctrlKey)
    {
        if (!app.canAddEntity()) {
            alert('You have reached your limit quota for adding new entity, Please contact contact@eoss-th.com to upgrade your package!');
            return;
        }
        var type = $(droppedDomNode).data("shape");
        var figure = eval("new "+type+"();");
        
        if (figure instanceof limz_EntityShape) {
        	
            figure.setHooks("Keywords");
            figure.addResponse("Answer", false);        	
            // create a command for the undo/redo support
            var command = new draw2d.command.CommandAdd(this, figure, x, y);
            this.getCommandStack().execute(command);
            
            return;
        } 
        
        if (figure instanceof limz_QuestionEntityShape) {
        	
            var command = new limz_CommandDropQuestion(this, figure, x, y);
            this.getCommandStack().execute(command);
            
            return;
        }
        
    },
    
    repaintResponseLabel: function() {
    	
        this.figures.each(function(i, figure) {
        	
        	if (figure instanceof limz_EntityShape) {
        		
        		figure.children.each(function(i, e) {
        			
        			if (e.figure instanceof limz_ResponseLabel) {
        				
        				const text = e.figure.getText();
        				
        				if (text.startsWith("https://") || text.startsWith("http://")) {
        					
                    		e.figure.setText(text);
        				}
        			}
                });
        		
        	}
        });
    }
});

