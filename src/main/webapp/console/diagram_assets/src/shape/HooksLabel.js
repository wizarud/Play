limz_HooksLabel = draw2d.shape.basic.Label.extend({

    NAME: "limz_HooksLabel",

    init: function (_entity, txt) {

        this._entity = _entity;
        
        this._super({
            text: txt,
            stroke: 1,
            fontColor: "#ffffff",
            bgColor: "#4286f4",
            radius: _entity.getRadius(),
            padding: 10,
            resizeable: true,
            editor: new limz_LabelInplaceEditor()
        });

        this.callCutter = false;

        this.on("contextmenu", function (emitter, event) {
            $.contextMenu({
                selector: 'body',
                events:
                {
                    hide: function () { $.contextMenu('destroy'); }
                },
                callback: $.proxy(function (key, options) {
                    switch (key) {
                        case "edit":
                            setTimeout(function () {
                                emitter.onDoubleClick();
                            }, 10);
                            break;
                        case "downgrade":
                            // with undo/redo support
                            var cmd = new limz_CommandMarkAsForward(_entity);
                            emitter.getCanvas().getCommandStack().execute(cmd);
                            break;
                        case "upgrade":
                            // with undo/redo support
                            var cmd = new limz_CommandMarkAsQuestion(_entity);
                            emitter.getCanvas().getCommandStack().execute(cmd);
                        default:
                            break;
                    }

                }, this),
                x: event.x,
                y: event.y,
                items: _entity.getPort("output").getConnections().isEmpty() ?
                    {
                        "edit": { name: "Edit" },
                    } :
                    _entity.isQuestion ?
                        {
                            "edit": { name: "Edit" },
                            "sep1": "---------",
                            "downgrade": { name: "Mark as Forward" },
                        } :
                        {
                            "edit": { name: "Edit" },
                            "sep1": "---------",
                            "upgrade": { name: "Mark as Question" },
                        }
            });
        });
    },

    setText: function(txt) {
    	
    	//Protect from grave wayobot expression
    	txt = txt.replaceAll("`", "");
    	
        this._super(txt);
        
        //Update Weights
        this.setUserData(this.createWeights(txt));
    },

    createWeights: function(hooks) {
    
        const hookArray = hooks.split(" ");
        
        let weights = this.getUserData();
        
        //Should reset all weights to 1 or not?
        if (!weights) {
        	weights = [];
        }
        
        return hookArray.map((hook, i)=>{
        
        	let weight;
        	if (!weights[i] || !weights[i].weight) {
        	
        		weight = 1;
        		
        	} else {
        	
        		weight = weights[i].weight;
        		
        	}
        
            if (hook.startsWith("gte"))
                return { match: "GreaterEqualThan", weight};
            else if (hook.startsWith("gt"))
                return { match: "GreaterThan", weight};
            else if (hook.startsWith("lte"))
                return { match: "LowerEqualThan", weight};
            else if (hook.startsWith("lt"))
                return { match: "LowerThan", weight};
                
            return { match: "Words", weight};
        });
    }    

});
