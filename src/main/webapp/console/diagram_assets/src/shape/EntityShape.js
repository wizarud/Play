
limz_EntityShape = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "limz_EntityShape",

    init: function (attr) {
        
        this._super($.extend({ bgColor: "#dbddde", color: "#d7d7d7", stroke: 1, radius: 3 }, attr));

        this.hooksLabel = new limz_HooksLabel(this, "ClassName");

        var input = this.createPort("input");
        var output = this.createPort("output");

        input.setName("input");
        output.setName("output");

        this.add(this.hooksLabel);

    },

    addResponse: function (txt, canDelete, userData) {
    	
    	var type;
    	
    	if (txt === 'SET' || txt === 'GET' || txt === 'POST' || txt === 'PUT' || txt === 'DELETE' || txt ==='JSON' || txt === 'JSOUP' || txt === 'CMD') {
    		
    		type = txt;
    		
    	} else if (this.children.getSize() > 1) {
    		
    		type = "PARAM";
    	}
    	
        const label = new limz_ResponseLabel(this, type, txt, canDelete, userData);

        if (this.getCanvas()) {
            this.getCanvas().getCommandStack().execute(new limz_CommandAddResponse(this, label));
        } else {
            this.add(label);
        }

        return label;
    },

    removeResponse: function (index) {
        this.remove(this.children.get(index + 1).figure);
    },

    getResponse: function (index) {
        return this.children.get(index + 1).figure;
    },

    setHooks: function (hooks) {
        this.hooksLabel.setText(hooks);
        return this;
    }, 

    getHooks: function () {
        return this.hooksLabel.getText();
    },

    getPersistentAttributes: function () {
        var memento = this._super();

        memento.name = this.getHooks();
        memento.weights = this.hooksLabel.getUserData();
        
        const input = this.getPort("input");

        if (input!==null) {
        	
            const connections = input.getConnections().asArray().slice();
            memento.parents = [];
            connections.forEach((connection)=>{
                memento.parents.push(connection.getSource().getParent().getId());
            });
        	
        }

        memento.responses = [];
        let hasParam = false;
        this.children.each(function (i, e) {

        	// skip the header of the figure
            if (i > 0 && e.figure instanceof limz_ResponseLabel) { 
				
				//console.log (e.figure.getText() + ":" + e.figure.getResponseType());
				
                memento.responses.push({
                    pos: i,
                    type: e.figure.getResponseType(),
                    text: e.figure.getText(),
                    id: e.figure.id,
                    parameters: e.figure.getUserData()
                });
                if (e.figure.getResponseType()==='PARAM') {
					hasParam = true;
				}
            }
        });
        memento.isQuestion = this.isQuestion;
        
	    if (memento.isQuestion === undefined) {

	        if (hasParam) {
				
		        memento.hasParam = hasParam;			
			}
			
		}
        
        /*
        console.log("Packing [");
        console.log(memento.name);
        console.log("isQuestion: " + memento.isQuestion);
        console.log("hasParam: " + memento.hasParam);
        console.log("]");
        */

        return memento;
    },

    setPersistentAttributes: function (memento) {
        this._super(memento);

        this.setHooks(memento.name);

        if (memento.weights) {
            this.hooksLabel.setUserData(memento.weights.slice());
        }

        var pos = 0;
        if (typeof memento.responses !== "undefined") {
            $.each(memento.responses, $.proxy(function (i, response) {
				
				//console.log(response.type + ":" + response.text);
				
                var label;
                label = new limz_ResponseLabel(this, response.type, response.text, pos !== 0, response.parameters);
                this.add(label);
                pos ++;
            }, this));
        }
        
        this.isQuestion = memento.isQuestion;
        this.hasParam = memento.hasParam;
        
        return this;
    },
    
    getTextWeights: function() {

        let textWeights = "";
        
        const weights = this.hooksLabel.getUserData();
        
        for (let i in weights) {
        
        	textWeights += weights[i].weight + " ";
        }

        return textWeights.trim();
    },
    
    createWeights: function(textWeights) {
    
        let weights = textWeights.split(" ");
                
        const hooks = this.hooksLabel.getText();
        const hookArray = hooks.split(" ");
        
        return hookArray.map((hook, i)=>{
        
        	let weight = weights[i];
        	
        	if (!weight || isNaN(parseFloat(weight))) {
        		weight = 1;
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
    },
    
    setTextWeights: function(textWeights) {
    
        this.hooksLabel.setUserData(this.createWeights(textWeights));    
    
    },
    
    getSourceDecorator: function () {
        return null;
    },

    validate: function () {

    },

    getSelectedResponseId: function () {
        return this.selectedResponseId;
    },

    setSelectedResponseId: function (selectedResponseId) {
        this.selectedResponseId = selectedResponseId;
    },
    
});
