var limz_HoverConnection = draw2d.Connection.extend({

    NAME: "limz_HoverConnection",

    init: function ( sourcePort, targetPort) {
        var self = this;
        this._super({
//            router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
//            router: new draw2d.layout.connection.MazeConnectionRouter(),
//            router: new draw2d.layout.connection.ManhattanConnectionRouter(),
            router: new draw2d.layout.connection.SplineConnectionRouter(),
            targetDecorator: new draw2d.decoration.connection.ArrowDecorator(),
            radius: 5,
            source: sourcePort,
            target: targetPort,
//            stroke: 1.35,
            stroke: 2
        });

        this.on("dragEnter", function (emitter, event) {
            self.attr({
                outlineColor: "#303030",
                outlineStroke: 2,
                color: "#00a8f0"
            });
        });
        this.on("dragLeave", function (emitter, event) {
            self.attr({
                outlineColor: "#303030",
                outlineStroke: 0,
                color: "#000000"
            });
        });
    },

    setSource: function(port) {
        this._super(port);

        if (port.getParent().isQuestion===undefined) {
            port.getParent().isQuestion = false;
        }

        if (port.getParent().isQuestion) {
            this.setSourceDecorator(new limz_QuestionDecorator());
        } else {
            this.setSourceDecorator(null);
        }
    },
    
    setSourceDecorator: function(decorator) {
        this._super(decorator);
        
        //Update Hooks Label Color
        if (this.getSource().getParent() instanceof limz_EntityShape) {
        	
            if (decorator==null) {
            	
                this.getSource().getParent().hooksLabel.attr({ bgColor: "#4286F4" });        	
                
            } else {
            	
            	this.getSource().getParent().hooksLabel.attr({ bgColor: "#D0021B" });
                
            }
        	
        }
            	
    },    

    /**
     * required to receive dragEnter/dragLeave request.
     * This figure ignores drag/drop events if it is not a valid target
     * for the draggedFigure
     *
     * @param draggedFigure
     * @returns {HoverConnection}
     */
    delegateTarget: function(draggedFigure)
    {
        return this;
    }
});
