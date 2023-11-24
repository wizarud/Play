limz_Toolbar = Class.extend({
	
	init:function(elementId, view) {
		this.html = $("#"+elementId);
		this.view = view;
		
		// register this class as event listener for the canvas
		// CommandStack. This is required to update the state of 
		// the Undo/Redo Buttons.
		//
		view.getCommandStack().addEventListener(this);

		// Register a Selection listener for the state hnadling
		// of the Delete Button
		//
        view.on("select", $.proxy(this.onSelectionChanged,this));
		
		var buttonBar = $('<div class="well well-small"></div>');
		this.html.append(buttonBar);
		
		// the branding
		//buttonBar.append($("<span id='title' class='lead'><img src='images/wayobot-icon.png' width='50' height='50'></img></span>"));
		buttonBar.append($("<img src='images/wayobot-icon.png' width='39' height='39' style='margin-right: 10px'></img>"));

        buttonGroup = $('<div class="btn-group"></div>');
		var selectBotList  = $('<select id="selectbotlist" class="btn"></select>');
		buttonGroup.append(selectBotList);
		buttonBar.append(buttonGroup);
		
        var buttonGroup = $('<div class="btn-group"></div>');
        buttonBar.append(buttonGroup);
				
        buttonGroup = $('<div class="btn-group"></div>');
		var titleProperty  = $('<span id="titleProperty" class="btn"></span>');
		titleProperty.attr("disabled", true );
		buttonGroup.append(titleProperty);
		buttonBar.append(buttonGroup);
		
        var buttonGroup = $('<div class="btn-group"></div>');
        this.playButton  = $("<button class='btn'>▶️</button>");
        buttonGroup.append(this.playButton);
        this.playButton.click($.proxy(function(){
        	window.open(contextRoot + '/x/' + app.contextId, '_blank');
        },this));
		buttonBar.append(buttonGroup);
		
        var buttonGroup = $('<div class="btn-group"></div>');
        buttonBar.append(buttonGroup);
        selectButton  = $("<button class='btn'>🔳️</button>");
        buttonGroup.append(selectButton);
        selectButton.click($.proxy(function(){
        	
        	if (!selectButton.isMultipleSelection) {
        		        		
        		view.uninstallEditPolicy(new CopyInterceptorPolicy());
        		view.installEditPolicy(new draw2d.policy.canvas.BoundingboxSelectionPolicy());
        		selectButton.isMultipleSelection = true;
        		selectButton.text('◻️');
        		
        		view.showImages = false;
        		view.repaintResponseLabel();
        		
        	} else {
        		
        		view.uninstallEditPolicy(new draw2d.policy.canvas.BoundingboxSelectionPolicy());
            	view.installEditPolicy(new CopyInterceptorPolicy());
        		selectButton.isMultipleSelection = undefined; 
        		selectButton.text('🔳️');
        		
        		view.showImages = true;
        		view.repaintResponseLabel();        		
        		
        	}       	
        	
        }, this));		
		
        var buttonGroup = $('<div class="btn-group"></div>');
        buttonBar.append(buttonGroup);		
        this.saveButton  = $("<button class='btn'>Save</button>");
        buttonGroup.append(this.saveButton);
        this.saveButton.click($.proxy(function(){
        	this.saveButton.attr("disabled",true);
            app.save();
        },this)).attr("disabled",true);
        
        buttonGroup = $('<div class="btn-group"></div>');
        buttonBar.append(buttonGroup);
		 
		// Inject the UNDO Button and the callbacks
		//
		this.undoButton  = $("<button class='btn'>Undo</button>");
		buttonGroup.append(this.undoButton);
		this.undoButton.click($.proxy(function(){
		       this.view.getCommandStack().undo();
		},this)).attr("disabled",true);

		// Inject the REDO Button and the callback
		//
		this.redoButton  = $("<button class='btn'>Redo</button>");
		buttonGroup.append(this.redoButton);
		this.redoButton.click($.proxy(function(){
		    this.view.getCommandStack().redo();
		},this)).attr( "disabled", true );
		
		var buttonGroup = $('<div class="btn-group"></div>');
		buttonBar.append(buttonGroup);

		// Inject the DELETE Button
		//
		this.deleteButton  = $("<button class='btn'>Delete</button>");
		buttonGroup.append(this.deleteButton);

        this.deleteButton.click($.proxy(function(){
            var self = this,
                selectedFigures = this.view.getSelection();
			this.view.getCommandStack().startTransaction(draw2d.Configuration.i18n.command.deleteShape);
            if (selectedFigures && selectedFigures.getSize()) {
                selectedFigures.each(function (index, figure) {
					self.view.getCommandStack().execute(new limz_CommandDelete(figure));
				});
            }
			this.view.getCommandStack().commitTransaction();			
		},this)).attr("disabled", true );
                		
        buttonGroup = $('<div class="btn-group"></div>');
		var languageList = $(`<select id="languageProperty" class="btn">
		<option value="AF">Afrikanns</option>
		<option value="SQ">Albanian</option>
		<option value="AR">Arabic</option>
		<option value="HY">Armenian</option>
		<option value="EU">Basque</option>
		<option value="BN">Bengali</option>
		<option value="BG">Bulgarian</option>
		<option value="CA">Catalan</option>
		<option value="KM">Cambodian</option>
		<option value="ZH">Chinese (Mandarin)</option>
		<option value="HR">Croation</option>
		<option value="CS">Czech</option>
		<option value="DA">Danish</option>
		<option value="NL">Dutch</option>
		<option value="EN">English</option>
		<option value="ET">Estonian</option>
		<option value="FJ">Fiji</option>
		<option value="FI">Finnish</option>
		<option value="FR">French</option>
		<option value="KA">Georgian</option>
		<option value="DE">German</option>
		<option value="EL">Greek</option>
		<option value="GU">Gujarati</option>
		<option value="HE">Hebrew</option>
		<option value="HI">Hindi</option>
		<option value="HU">Hungarian</option>
		<option value="IS">Icelandic</option>
		<option value="ID">Indonesian</option>
		<option value="GA">Irish</option>
		<option value="IT">Italian</option>
		<option value="JA">Japanese</option>
		<option value="JW">Javanese</option>
		<option value="KO">Korean</option>
		<option value="LA">Latin</option>
		<option value="LV">Latvian</option>
		<option value="LT">Lithuanian</option>
		<option value="MK">Macedonian</option>
		<option value="MS">Malay</option>
		<option value="ML">Malayalam</option>
		<option value="MT">Maltese</option>
		<option value="MI">Maori</option>
		<option value="MR">Marathi</option>
		<option value="MN">Mongolian</option>
		<option value="NE">Nepali</option>
		<option value="NO">Norwegian</option>
		<option value="FA">Persian</option>
		<option value="PL">Polish</option>
		<option value="PT">Portuguese</option>
		<option value="PA">Punjabi</option>
		<option value="QU">Quechua</option>
		<option value="RO">Romanian</option>
		<option value="RU">Russian</option>
		<option value="SM">Samoan</option>
		<option value="SR">Serbian</option>
		<option value="SK">Slovak</option>
		<option value="SL">Slovenian</option>
		<option value="ES">Spanish</option>
		<option value="SW">Swahili</option>
		<option value="SV">Swedish</option>
		<option value="TA">Tamil</option>
		<option value="TT">Tatar</option>
		<option value="TE">Telugu</option>
		<option value="TH">Thai</option>
		<option value="BO">Tibetan</option>
		<option value="TO">Tonga</option>
		<option value="TR">Turkish</option>
		<option value="UK">Ukranian</option>
		<option value="UR">Urdu</option>
		<option value="UZ">Uzbek</option>
		<option value="VI">Vietnamese</option>
		<option value="CY">Welsh</option>
		<option value="XH">Xhosa</option>
		</select>`);
		buttonGroup.append(languageList);
		buttonBar.append(buttonGroup); 

		/*
		buttonBar.append($('<div class="btn-group"><span class="btn">Split Keywords</span></div>'));

		var autoCutHooks  = $('<div class="btn-group"><input type="checkbox" id="isAutoCutHooks"></input></div>');
		autoCutHooks.change($.proxy(function(e){
			app.isAutoCutHooks = e.target.checked;
		},this));		
		buttonBar.append(autoCutHooks);		
		*/
		
        var buttonGroup = $('<div class="btn-group"></div>');
        this.exportButton  = $("<button class='btn'>Export</button>");
        buttonGroup.append(this.exportButton);
        this.exportButton.click($.proxy(function() {
        	window.open(contextRoot + '/console/csv/' + app.contextId, '_blank');
        },this));
		buttonBar.append(buttonGroup);
		
	},

	/**
	 * @method
	 * Called if the selection in the cnavas has been changed. You must register this
	 * class on the canvas to receive this event.
	 * 
	 * @param {draw2d.Figure} figure
	 */
	onSelectionChanged : function(emitter, selection) {
		this.deleteButton.attr( "disabled", selection===null || 
		(selection.figure!==null && (selection.figure.NAME === 'limz_StartEntityShape' || selection.figure.NAME === 'limz_EndEntityShape' || selection.figure.NAME === 'limz_SilentEntityShape' || selection.figure.NAME === 'limz_PropertiesEntityShape')));
	},
	
	/**
	 * @method
	 * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail() 
	 * can be used to identify the type of event which has occurred.
	 * 
	 * @template
	 * 
	 * @param {draw2d.command.CommandStackEvent} event
	 **/
	stackChanged:function(event)
	{
		this.undoButton.attr("disabled", !event.getStack().canUndo() );
		this.redoButton.attr("disabled", !event.getStack().canRedo() );
		
	    this.saveButton.attr("disabled",   !event.getStack().canUndo() && !event.getStack().canRedo()  );
	}
});