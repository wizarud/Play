
limz_EndEntityShape = limz_EventShape.extend({

    NAME: "limz_EndEntityShape",

    init: function (attr) {        
        this._super(attr);
        this.hooksLabel = new draw2d.shape.basic.Label({
            text: "ClassName",
            stroke: 1,
            fontColor: "#ffffff",
            bgColor: "#ffa64d",
            radius: this.getRadius(),
            padding: 10,
            resizeable: true});

        this.add(this.hooksLabel);
    },

});
