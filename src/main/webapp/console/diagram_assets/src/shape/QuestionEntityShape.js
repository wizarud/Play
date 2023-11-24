
limz_QuestionEntityShape = draw2d.shape.composite.Composite.extend({

    NAME: "limz_QuestionEntityShape",

    init: function (attr) {
        this._super(attr);
                
		const question = new limz_EntityShape();
		question.setHooks("Keywords");
		question.addResponse("Edit your Question");
		question.isQuestion = true;
				
		const answer = new limz_EntityShape();
		answer.setHooks("");
		answer.addResponse("Edit your Answer");
		
        const connection = new limz_HoverConnection();
        connection.setSource(question.getPort("output"));
        connection.setTarget(answer.getPort("input"));
        
        //Export to CommandDropQuestion
		this.question = question;
        this.answer = answer;
        this.connection = connection;
    },

});
