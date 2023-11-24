/**
 * @inheritable
 * @author EOSS-TH
 * @extend draw2d.decoration.connection.Decorator
 */
limz_QuestionDecorator = draw2d.decoration.connection.Decorator.extend({

	NAME : "limz_QuestionDecorator",

	/**
	 * @constructor 
	 * 
	 * @param {Number} [width] the width of the arrow
	 * @param {Number} [height] the height of the arrow
	 */
    init: function(width, height)
    {   
        this._super( width, height);
    },

	paint: function(paper)
	{
		var st = paper.set();
		
		st.push(paper.text(12, -12, "?"));
		
	    st.attr({fill:this.backgroundColor.hash(),stroke:this.color.hash(), "font-size": 20});

	    return st;
	}
});