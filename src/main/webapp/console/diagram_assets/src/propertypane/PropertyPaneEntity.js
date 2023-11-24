function responseReadOnlyRenderer(instance, td, row, col, prop, value, cellProperties) {

	if (typeof value !== "undefined" && value !== null && value !== "") {
		td.innerHTML = value;
		td.className = "htDimmed";
	}
	else {
		td.innerHTML = "";
	}
	return td;
}

limz_PropertyPaneEntity = Class.extend({

	init: function (entity) {
		// selected entity
		this.entity = entity;
	},

	injectPropertyView: function (domId) {
		this.responses = this.entity.getPersistentAttributes().responses;

		var templ = "<form class='form-horizontal'>" +
			'<div>' +
			"    <div class='span6'>" +
			"       <div class='control-group'>" +
			"          <label class='control-label' for='stateNameProperty'>Keywords </label>" +
			"          <div class='controls'>" +
			"             <input id='hooksProperty' class='span4' type='text' value='{{hooks}}'/>" +
			"          </div>" +
			"          <label class='control-label' for='stateNameProperty'>Weights </label>" +
			"          <div class='controls'>" +
			"             <input id='weightsProperty' class='span4' type='text' value='{{weights}}'/>" +
			"          </div>" +
			"          <label class='control-label' for='stateNameProperty'>? </label>" +
			"          <div class='controls'>" +
			"				<input id='questionProperty' class='span4' type='checkbox' {{questionChecked}}/>" +	
			"          </div>" +
			"       </div>" +
			"       <div class='control-group'>" +
			"          <label class='control-label' for='stateNameProperty'>Response </label>" +
			"          <div class='controls'>" +
			'             <select id="responseActionSelect" multiple="multiple" class="span4">' +
			'               {{#responses}}' +
			'                <option value="{{id}}">{{text}}</option>' +
			'               {{/responses}}' +
			'             </select>' +
			"			<button id='deleteResponseBtn' class='btn'>Remove</button>" +
			"          </div>" +
			'       </div>' +
			"    </div>" +
			"    <div class='span6'>" +
			"       <div class='control-group'>" +
			"       	<textarea id='responseProperty' class='span4' rows='9'></textarea>" +
			"          	<div id='responseParameterMapping' style='min-height:200px'>" +
			"          	</div>" +
			"       </div>" +
			"    </div>" +
			"</div>" +
			"</form>";

		var compiled = Hogan.compile(templ);
		var view = $(compiled.render({ hooks: this.entity.getHooks(), weights: this.entity.getTextWeights(), questionChecked: this.entity.isQuestion===true?"checked":"", responses: this.responses }));
		view.submit(function (e) {
			return false;
		});

		// The "Label"
		// install Events for the label of the entity for
		//
		var input = view.find("#hooksProperty");
		if (this.entity.NAME==='limz_EntityShape') {
			var handler = $.proxy(function (e) {
				// provide undo/redo for the label field
				app.executeCommand(new limz_CommandUpdateHooks(this.entity.hooksLabel, input.val()));
			}, this);
			input.change(handler);	
		} else {
			input.attr("disabled", true);
		}
		
		var inputW = view.find("#weightsProperty");
		if (this.entity.NAME==='limz_EntityShape') {
			var handler = $.proxy(function (e) {
				// provide undo/redo for the label field
				app.executeCommand(new limz_CommandUpdateWeights(this.entity, inputW.val()));
			}, this);
			inputW.change(handler);	
		} else {
			inputW.attr("disabled", true);
		}

		var questionMarker = view.find("#questionProperty");
		if (this.entity.isQuestion===undefined || this.entity.NAME !== 'limz_EntityShape') {
			questionMarker.attr("disabled", true);
		} 

		questionMarker.change($.proxy(function (e) {
			if (e.target.checked) {
				app.executeCommand(new limz_CommandMarkAsQuestion(this.entity));
			} else {
				app.executeCommand(new limz_CommandMarkAsForward(this.entity));
			}
		}, this));

		this.responseSelect = view.find("#responseActionSelect");
		this.responseSelect.change($.proxy(function () {
			this._onResponseSelect(this.responseSelect.val()[0]);
		}, this));
		domId.append(view);

		var responseProperty = view.find("#responseProperty");
		var responseHandler = $.proxy(function (e) {
			// provide undo/redo for the label field
			if (this.responseDef.pos === 1) {
				app.executeCommand(new limz_CommandUpdateResponse(this.responseDef.figure, responseProperty.val()));
			} else {
				app.executeCommand(new draw2d.command.CommandAttr(this.responseDef.figure, { text: responseProperty.val() }));
			}
		}, this);
		responseProperty.change(responseHandler);

		$("#responseParameterMapping").handsontable({
			data: [],
			minRows: 0,
			manualColumnResize: true,
			rowHeaders: false,
			minSpareRows: 0,
			stretchH: 'last',
			colHeaders: ["Parameter Name", "Value"],
			afterSelectionEnd: $.proxy(function (row, column) {
				if (column === 1) {
					(new limz_EntityParameterEditorDialog('Edit ' + this.responseDef.text + ' - ' + this.responseDef.parameters[row].parameterName, this.entity, this.responseDef, this.responseDef.parameters[row])).show();
				}
			}, this),
			columns: [
				{ data: "parameterName", type: { renderer: responseReadOnlyRenderer }, readOnly: true },
				{ data: "value", type: { renderer: responseReadOnlyRenderer }, readOnly: true }
			]

		});

		view.find('#deleteResponseBtn').on('click', $.proxy(function (e) {
			this._onResponseDelete(this.entity.getSelectedResponseId());
		}, this));

		this._onResponseSelect(this.entity.getSelectedResponseId(), true);

	},

	_onResponseSelect: function (responseId, initialCall) {

		this.responseDef = $.grep(this.responses, function (e) { return e.id === responseId; })[0];

		if (typeof this.responseDef === "undefined") {
			document.getElementById("deleteResponseBtn").disabled = true;
			$('#responseProperty').hide();
			$('#responseParameterMapping').hide();
			return;
		}

		this.responseDef.figure = this.entity.getChildren().get(this.responseDef.pos);

		if (initialCall) {
			this.responseSelect.val(responseId);
		} else {
			app.executeCommand(new limz_CommandSetSelectedResponse(this.entity, responseId));
		}

		if (this.responseDef.parameters && this.responseDef.parameters.length != 0) {

			$('#responseProperty').val('');
			$('#responseProperty').hide();

			$('#responseParameterMapping').show();
			$('#responseParameterMapping').handsontable('loadData', this.responseDef.parameters);

		} else {

			$('#responseParameterMapping').handsontable('loadData', []);
			$('#responseParameterMapping').hide();

			$('#responseProperty').show();
			$('#responseProperty').val(this.responseDef.text);

		}

		document.getElementById("deleteResponseBtn").disabled = this.responses[0].id === responseId;

	},

	_onResponseDelete: function(responseId) {
		const responseDef = $.grep(this.responses, function (e) { return e.id === responseId; })[0];
		app.executeCommand(new draw2d.command.CommandDelete(responseDef.figure));
		app.getView().setCurrentSelection(this.entity);
	},

    /**
     * @method
     * called by the framework if the pane has been resized. This is a good moment to adjust the layout if
     * required.
     * 
     */
	onResize: function () {
	},

    /**
     * @method
     * called by the framework before the pane will be removed from the DOM tree
     * 
     */
	onHide: function () {
	}

});

