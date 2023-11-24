var CopyInterceptorPolicy = draw2d.policy.canvas.SingleSelectionPolicy.extend({
    NAME: "CopyInterceptorPolicy",

    init: function () {
        this._super();

        this.cloneOnDrag = false;
    },

    /**
     * @method
     * 
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     */
    onMouseDown: function (canvas, x, y, shiftKey, ctrlKey) {
        this.cloneOnDrag = shiftKey && app.canAddEntity();
        this._super(canvas, x, y, shiftKey, ctrlKey);
    },

    /**
     * Copy the selected figure if the user start dragging the selection.
     * 
     */
    onMouseDrag: function (canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey) {
//       if (!((this.mouseDraggingElement instanceof draw2d.ResizeHandle) || (this.mouseDraggingElement instanceof draw2d.Port))) {
         if (this.mouseDraggingElement instanceof limz_EntityShape) {
                if (this.cloneOnDrag === true && this.mouseDraggingElement !== null) {

                // get the current position of the selected shape
                var pos = this.mouseDraggingElement.getPosition();
                // cancel the current drag&drop operation
                this.mouseDraggingElement.onDragEnd(pos.x, pos.y, false, false);

                this.originalFigure = this.mouseDraggingElement;
                // clone the selection
                const clone = eval("new " + this.originalFigure.NAME + "();");

                const originalProperty = this.originalFigure.getPersistentAttributes();                
                originalProperty.id = clone.id;

                clone.setPersistentAttributes(originalProperty);

                this.mouseDraggingElement = clone;

                // add the clone to the canvas and start dragging of the clone
                canvas.add(this.mouseDraggingElement, pos);

                // select the cloned shape
                this.select(canvas, this.mouseDraggingElement);

                // start dragging if the clone accept this operation
                this.mouseDraggingElement.onDragStart(pos.x, pos.y, false, false);

            }
        }

        this.cloneOnDrag = false;
        
        this._super(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey);

    },

    onMouseUp: function (canvas, x, y, shiftKey, ctrlKey) {

        if (this.originalFigure && this.mouseDraggingElement !== null) {
            const sourcePort = this.originalFigure.getPort("input");
            const sourceConnections = sourcePort.getConnections().asArray().slice();
            sourceConnections.forEach((connection) => {
                const newConnection = new limz_HoverConnection();
                newConnection.setSource(connection.getSource());
                newConnection.setTarget(this.mouseDraggingElement.getPort("input"));
                canvas.add(newConnection);
            });

            const targetPort = this.originalFigure.getPort("output");
            const targetConnections = targetPort.getConnections().asArray().slice();
            targetConnections.forEach((connection) => {
                const newConnection = new limz_HoverConnection();
                newConnection.setSource(this.mouseDraggingElement.getPort("output"));
                newConnection.setTarget(connection.getTarget());
                canvas.add(newConnection);
            });

            app.executeCommand(new limz_CommandDropClone(canvas, this.mouseDraggingElement));
            
            this.originalFigure = undefined;
        }

        this._super(canvas, x, y, shiftKey, ctrlKey);
    }
});

