
limz_EventShape = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "limz_EventShape",

    init: function (attr) {
        
        this._super($.extend({ bgColor: "#dbddde", color: "#d7d7d7", stroke: 1, radius: 3 }, attr));

        var output = this.createPort("output");
        output.setName("output");

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
    
    getTextWeights: function() {

        let textWeights = "";
        
        const weights = this.hooksLabel.getUserData();
        
        for (let i in weights) {
        
        	textWeights += weights[i].weight + " ";
        }

        return textWeights.trim();
    },
    
    getPersistentAttributes: function () {
        var memento = this._super();

        memento.name = this.getHooks();
        memento.responses = [];
        this.children.each(function (i, e) {

            if (i > 0) { // skip the header of the figure
                memento.responses.push({
                    pos: i,
                    text: e.figure.getText(),
                    id: e.figure.id,
                    parameters: e.figure.getUserData()
                });
            }
        });
        memento.isQuestion = this.isQuestion;

        return memento;
    },

    setPersistentAttributes: function (memento) {
        this._super(memento);
        this.setHooks(memento.name);

        var pos = 0;
        if (typeof memento.responses !== "undefined") {
            $.each(memento.responses, $.proxy(function (i, response) {
                var label = new draw2d.shape.basic.Label({
                    text: response.text,
                    stroke: 0,
                    radius: 0,
                    bgColor: null,
                    padding: { left: 10, top: 3, right: 10, bottom: 5 },
                    fontColor: "#4a4a4a",
                    resizeable: true,
                    editor: new limz_LabelEditor()
                });
                this.add(label);
                pos ++;
            }, this));
        }
        this.isQuestion = memento.isQuestion;
        
        return this;
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
    }

});
