class WayOS {

	constructor (playURL, sessionId) {
		
		//For mockup widget
		if (!playURL && !sessionId) {
			this.props = {};
			this.props.language = 'en';
			return;
		}
		
		this.playURL = playURL;
		this.webhookURL = this.playURL.replace('/x/', '/webhooks/');
		this.propsURL = this.webhookURL.replace('webhooks', 'props');
		this.websocketURL = this.webhookURL.replace('webhooks', 'websocket');
		if (this.websocketURL.startsWith("https:")) {
			this.websocketURL = this.websocketURL.replace('https', 'wss');
		} else if (this.websocketURL.startsWith("http:")) {
			this.websocketURL = this.websocketURL.replace('http', 'ws');			
		}
		this.coverImageURL = this.webhookURL.replace('webhooks', 'public') + '.PNG';
		this.defaultMenuImageURL = this.webhookURL.substring(0, this.webhookURL.indexOf('/webhooks')) + '/images/gigi.png';

		this.sessionId = sessionId;
		//Default callbacks, For debugging purpose!
		
		this.onload = function(props) {
			console.log("DEBUG: LOAD..");
			console.log(JSON.stringify(props));
			console.log("\n");
		}
		
		this.onparse = function(message) {
			console.log("DEBUG: PARSING..");
			console.log(message);
			console.log("\n");
		}
		
		this.onmessages = function(messages) {
			console.log("DEBUG: GOT..");
			console.log(JSON.stringify(messages));
			console.log("\n");
		}
		
	}

	load(initMessage) {
		
 		let url = this.propsURL;
 		
	 	var xhr = new XMLHttpRequest();
	 	xhr.open("GET", url, true);
	 	
	 	xhr.onload = function() {
	 		
	 	  	if (xhr.status === 200) {
	 	  		
				this.props = JSON.parse(xhr.responseText);
				
				if (this.sessionId) {//For hard code sessionId
					this.props.sessionId = this.sessionId;
				} else {//For regenerate local sessionId
					this.sessionId = this.props.sessionId;
				}
								
				//console.log("INIT " + url + " with sessionId:" + this.sessionId);
				
				//Designer can override cover image in properties pane
				if (!this.props.coverImageURL) {
					this.props.coverImageURL = this.coverImageURL;
				}
				
				if (!this.props.defaultMenuImageURL) {
					this.props.defaultMenuImageURL = this.defaultMenuImageURL;
				}				
				
				this.onload(this.props);
	 	  		
				this.initWebSocket();
				
	 	  		this.parse(initMessage);

	 		}

	 	}.bind(this);
	 	
	 	xhr.send();
	 	
    }
	
	parse(message) {
		
		this.onparse(message);
		
		let xhr = new XMLHttpRequest();
 		let url = this.webhookURL;
 		
 		let params = "message=" + encodeURIComponent(message) + "&sessionId=" + this.sessionId;
 		
 		xhr.open("POST", url, true);
 		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

 		xhr.onload = function() {
 			
 		    if (xhr.status === 200) {
 		    	
 		    	this.onmessages(JSON.parse(xhr.responseText));
 		    	
 		    }
 		    
 		}.bind(this);
 		
 		xhr.send(params);
	}
	
	dropFile(file, message) {
		
		this.onparse('Dropping ' + file.name);
		
        let formData = new FormData();
        
		if (message) {
			
			formData.append('message', message);
			
		}
		
		if (file && file.length) {
		
	        for (let i in file) {
				
	    		formData.append('file', file[i], file[i].name);
	    		
	        }
    		
		} else {
			
    		formData.append('file', file, file.name);
    		
	    }
		        
 		let xhr = new XMLHttpRequest();
 		
 		let url = this.webhookURL + "/" + this.sessionId;
 		
 		xhr.open("POST", url); 
 		
 		xhr.onload = function() {
			 
			 console.log("Dropping.." + xhr.status);
 			
 		    if (xhr.status === 200) {
 		    	
 		    	this.onmessages(JSON.parse(xhr.responseText));
 		    	
 		    }
 			
 		}.bind(this);
 		
 		xhr.send(formData);	
 	}
 		
	initWebSocket() {
		
 		let url = this.websocketURL + "/" + this.sessionId;
	 	
	 	console.log('Connecting..' + url);
	 	
		let websocket = new WebSocket(url);
		
		websocket.onopen = function () {
			
	        console.log('Info: WebSocket connection opened.');
	        
	    };

	    websocket.onclose = function () {
	    	
	    	console.log('Info: WebSocket closed.');
	    	
	    };

	    websocket.onmessage = function (message) {
	    	
 		    this.onmessages(JSON.parse(message.data));
 		    
 		}.bind(this);
	}
	
	speak(text, onFinish) {
		
		if (this.speaking) return;
		
 		if ("speechSynthesis" in window) {
 			
 			const synth = window.speechSynthesis;
 			const voices = synth.getVoices();
 			const lang = this.props.language.toLowerCase();
 			
	 		console.log ("Finding voice.." + lang);
 			
 			const msg = new SpeechSynthesisUtterance();
			msg.text = text.replace(/([\s.'ๆ,])\1+/, 'ๆ'); //Replace repeting ๆ to single one
			msg.voice = voices.find(
				(voice) => voice.lang.startsWith(lang)
			);
			
			if (onFinish) {
				msg.onend = function(e) {
					onFinish();
				}
			}
 	
			if (msg.voice) {
 				
 				console.log("Start Using voice.." + msg.voice.name);
 	 			
				this.speaking = true;
				
				synth.cancel();
				
 				synth.speak(msg);
 				
 				setTimeout(function() {
					 
					this.speaking = false;
					
				}.bind(this), 3000);
 
			} else {
 			
				console.log('speechSynthesis not support!');
 				console.log(text);
 				console.log('\n');
 			
 			}
		
		}
	}
}

class FrameUX {

	constructor(parentElement) {		
		this.parentElement = parentElement;	
	}
	
	init (props) {
		
		//To prevent duplicate from from ringing
		if (this.frame) {
			this.parentElement.removeChild(this.frame);		
		}

		this.frame = document.createElement("iframe");
		this.frame.scrolling = "no";
		this.frame.allowfullscreen = "true";
		this.frame.style.width = "100%";
		this.frame.style.height = "100%";
		this.frame.style.borderWidth = "0px";
		
		//Id for widget query
		this.frame.dataset.parentElementId = this.parentElement.id;
		
		this.parentElement.appendChild(this.frame);
		/*
 	  	if (props.loadingGif) {

 	  		loading.classList.remove("wayos-loader");
 	  		loading.classList.add("gifLoader"); 	  		
 	  		loading.style.backgroundImage = "url('" + props.loadingGif + "')";
 	  		
 	  	} else {
 	  		
 	  		loading.classList.remove("gifLoader");
 	  		loading.classList.add("wayos-loader");
 	  		loading.style.backgroundImage = "";
 	  		
 	  	}
		*/
		
		this.props = props;
		
	}
	
	/**
	 * Override here to display content
	 */
	play (messages) {}

	/**
	 * Show background image as a content of single menu or center it.
	 * @returns 
	 */
	verticalPosition () {
				
		return document.body.style.backgroundImage ? "vertical-bottom" : "vertical-center";
	}
	
	locateTo (url) {
		
		const src = this.frame.src;			
		let that = this;
		
		this.frame.onload = function () {
			
			this.style.height = this.parentElement.offsetHeight + 'px';
			
			//this.onload = null;
		}
		this.frame.onerror = function (e) {
			console.log("Error: " + e);
			this.src = src;
		}
		this.frame.src = url;
	}
	
	load (innerHTML, onload) {
		
		let src = this.frame.src;
		let that = this;
		
		this.frame.onload = function() {
			
			//Reset Frame Height;
			this.style.height = '0px';
			
			//Apply Theme and Embeded Utility Vars
			that.onLoadFrame(this, innerHTML);
			
			if (onload)
				onload(this);
			
		};
		
		this.frame.onerror = function () {
			this.src = src;
		}
		
		this.frame.src = "about:blank";		
	}
	
	/**
	 * Utility Script for wayOS UI
	 */
	embededScript (frame) {
		let script = frame.contentDocument.createElement('script');
		script.textContent = `var wayOS = parent.document.getElementById("${this.parentElement.id}").wayOS;`;
		frame.contentDocument.head.appendChild(script);
	}
	
	onLoadFrame (frame, innerHTML) {
				
		this.embededScript(frame);	
		//Insert content
		frame.contentDocument.body.innerHTML = innerHTML;
				
		/**
		* Apply Background color or image when load or ring pressed
		*/
		frame.contentDocument.body.style.backgroundColor = this.props.borderColor;
		
		if (this.props.publish && this.props.publish==='true') {
			frame.contentDocument.body.style.backgroundImage = "url('" + this.props.coverImageURL + "')";
			frame.contentDocument.body.style.backgroundRepeat = "no-repeat";
			frame.contentDocument.body.style.backgroundSize = "cover"; // or contain
			frame.contentDocument.body.style.backgroundPosition = "center";			
		}
		
		//Apply new height
		//console.log("scrollHeight:" + frame.contentDocument.body.scrollHeight);
		//console.log("offsetHeight:" + frame.contentDocument.body.offsetHeight);
		
		let frameHeight = (frame.contentDocument.body.scrollHeight > this.parentElement.offsetHeight) ? frame.contentDocument.body.scrollHeight : this.parentElement.offsetHeight;
		//frame.style.height = frameHeight + 'px';
		frame.style.height = this.parentElement.offsetHeight + 'px';
		
		let style = frame.contentDocument.createElement('style');
		style.textContent = 
		`div.vertical-center, p {
			touch-action: none;
		}
		img {
		  width: auto;
		  height: 100%;
		}
		.vertical {
			width: 100%;
		}
		.vertical-center {
			margin: 0;
			position: absolute;
			width: 100%;
			top: 50%;
			-ms-transform: translateY(-50%);
			transform: translateY(-50%);
		}
		.vertical-bottom {
			margin: 0;
			position: absolute;
			width: 100%;
			bottom: 0;
		}
		.wayos-image-head {
			cursor: pointer;
		    width: 90%;
		    height: ${(frameHeight * 0.4)}px;
			margin: 0px auto;
		    border-radius: 15px;
		    -moz-border-radius: 15px;
		    -webkit-border-radius: 15px;
		    background-position: center; 
		    background-repeat: no-repeat;
		    background-size: contain;
		}
		.wayos-label { 
			cursor: pointer; 
			width: 80%; 
			border-radius: 15px; 
			-moz-border-radius: 15px; 
			-webkit-border-radius: 15px; 
			padding: 2px 10px; 
			color: white; 
			background: ${this.props.borderColor}
		} 
		.wayos-menu-item { 
			cursor: pointer; 
			width: 80%; 
			margin: 5px; 
			padding: 5px 10px; 
			border-radius: 5px; 
			-moz-border-radius: 5px; 
			-webkit-border-radius: 5px; 
			background: #FFFFFF; 
			text-align: center; 
			color: ${this.props.borderColor}; 
			border: 1px solid ${this.props.borderColor} 
		}`;
		
		frame.contentDocument.head.appendChild(style);		
		
	}
	
	br () {
		return "<br>";
	}
	
	div (innerHTML, position) {
		
		if (position)
			return "<div align=\"center\" class=\"" + position + "\">" + innerHTML + "</div>";
			
		return "<div align=\"center\" class=\"vertical\">" + innerHTML + "</div>";
	}

	p (innerHTML) {
		return "<p>" + innerHTML + "</p>";
	}

	img (src) {
		return "<img src=\"" + src + "\"></img>";
	}

	h1 (innerHTML) {
		return "<h1 class=\"wayos-label\">" + innerHTML + "</h1>";
	}

	a (href, innerHTML) {
		return "<a href=\"" + href + "\" target=\"_blank\">" + innerHTML + "</a>";
	}
	
	image (imageURL, linkTo) {
		return "<div class=\"wayos-image-head\" onclick=\"" + linkTo + "\" style=\"background-image: url('" + imageURL + "');\"></div>";
	}
	
	audio (audioURL) {
		return "<audio controls style=\"width:95%\"><source src=\"" + audioURL +"\" type=\"audio/mp4\"></audio>";
	}
	
	video (videoURL) {
		return "<video controls style=\"width:95%\"><source src=\"" + videoURL +"\" type=\"video/mp4\"></video>";
	}
	
	menus (menusObject, direction) {
								
		let menuArray = menusObject.menus;
		let html = '';
		
		let isSlideMenu = false;
		
		if (menuArray.length>1) {
			
			html += "<div style=\"overflow: auto; white-space: nowrap;\">";
			isSlideMenu = true;
    		
		}
				
		let menuObject;
		
	    for (let i in menuArray) {
	        			        		
	        if (menuArray.length>1) {
	       
	        	html += "<div align=\"center\" style=\"" + direction + "\">";
	    		
	        }
	        
	        menuObject = menuArray[i];
	        
	        html += this.menu(menuObject, isSlideMenu);
    			    			
	        if (menuArray.length>1) {
				
	        	html += "</div>";
	    		
	        } 
	     
	    }
	    	
	    if (menuArray.length>1) {
			
	    	html += "</div>";
    		
		}
		
		return html;
	}
	
	widget (linkURL) {
		
		//let html = '';
		
		//return html;
		
		return this.frame(linkURL);
	}
	
	//Todo: Reset For widget
	iframe (src) {
		return "<iframe src=\"" + src + "\" scrolling=\"no\" frameborder=\"0\" allowfullscreen></iframe>";
	}	
	
	menu (menuObject, isSlideMenu) {
		
		let html = '';
		let choice;
		let defaultChoice;
		let clickEvent;
		
        if (menuObject.choices.length>0) {
			
	        defaultChoice = menuObject.choices[0];//Default Choice for image and label touch
	        		
    		if (defaultChoice.linkURL || defaultChoice.imageURL) {
    					
    			clickEvent = "window.open('" + defaultChoice.linkURL + "', '_blank')";
    							
    		} else {
	        		
    			clickEvent = "wayOS.parse('" + this.escapeHtml(defaultChoice.parent + " " + defaultChoice.label) + "')";
    			
    		}
        			
        } else {
        			
        	clickEvent = "";
        	
        }	
				
        if (menuObject.imageURL) {
        			
        	html += this.image(menuObject.imageURL, clickEvent);
    				
        } else if (isSlideMenu) {
        			
        	/**
             * Default Image for Slide Menu Only
             */
             html += this.image(this.props.defaultMenuImageURL, clickEvent);
    		 
        }
        		
        html += "<div align=\"center\" onclick=\"" + clickEvent + "\"><h1 class=\"wayos-label\">" + menuObject.label + "</h1></div>";

        if (menuObject.choices.length>0) {
    				
        	html += "<div align=\"center\">";
    				
        	for (let j in menuObject.choices) {
        				
        		choice = menuObject.choices[j];
        		
        		if (choice.linkURL || choice.imageURL) {
        					
        			html += "<a href=\"" + choice.linkURL + "\" target=\"_blank\"><div class=\"wayos-menu-item\">" + choice.label + "</div></a>";
        					
        		} else {
        			
        			clickEvent = "wayOS.parse('" + this.escapeHtml(choice.parent + " " + choice.label) + "')";
        					
        			html += "<div class=\"wayos-menu-item\" onclick=\"" + clickEvent + "\">" + choice.label + "</div>";
        		}
        	}
        	
        	html += "</div>";
        	
    	}
        
        return html;
	}
	
	escapeHtml (unsafe) {
		
		return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
	}

}

class AnimateFrameUX extends FrameUX {

	constructor(parentElement, wayOS) {
		super(parentElement, wayOS);
	}

	/**
	* Display Simple Animation on wayos-frame
	*/
	play(messages) {

		let step = function() {
				
			function next() { setTimeout(step, 500); }
				
			let message = messages.shift();
			
			if (!message) return;

			if (message.type==='menus') {
					
				let innerHTML;
				if (message.menus.length > 1) {
					
					//For Slide Menus
					innerHTML = this.div(this.p(this.menus(message, 'display: inline-block; width: 70%')), this.position());
					
				} else if (message.menus[0].type!=='widget') {
					
					//For Single Menu
					innerHTML = this.div(this.p(this.menus(message, 'display: inline-block; width: 100%')), this.position());
					
				} else {
					
					//For Widget
					this.locateTo(message.menus[0].linkURL);
					return;
					
				}
				
				this.load(innerHTML, (frame)=>{if (next) next()});						
			}
			
			//For Widget
			if (message.type==='widget' || message.type==='audio' || message.type==='video') {
			
				this.locateTo(message.src);
				return;
			}

			if (message.type==='link') {
									
				let innerHTML = this.div(this.a(message.src, this.h1(message.src)), this.position());
				
				this.load(innerHTML, (frame)=>{if (next) next()});	

			}

			if (message.type==='image') {
					
				let innerHTML = this.div(this.img(message.src), this.position());
				
				this.load(innerHTML, (frame)=>{if (next) next()});	

			}

			if (message.type==='text') {
					
				let innerHTML = "<div align=\"center\" class=\"" + this.position() + "\"><h1 class=\"wayos-label\"></h1></div>";
				let text = message.text;
			    this.load(innerHTML, function (frame) {
					
					if (this.parentElement.speak) {
						this.parentElement.wayOS.speak(text);						
					}
					
					const typingText = frame.contentWindow.document.getElementsByTagName("h1")[0];
					const textArray = text.split("");
					textArray.push("\r");
					let i = 0;
					
					function type(c) {
						
						if (c==="\r") {
							frame.onload = null;
							if (next) {
								next();							
							}
							return;
						} 
						
						if (c==="\n") {
							c = "<br>";
						}
											
						typingText.innerHTML = typingText.innerHTML + c;
						
						//Vibrate
						if (c==='ๆ' && Navigator.vibrate) {
							
							Navigator.vibrate(200);						
							
						}
						
						setTimeout(function() {
							type(textArray[i++]);
						}, 200);
						
					};
					
					type(textArray[i++]);
					
				}.bind(this));	

			}
				
		}.bind(this);
		
		setTimeout(step, 0);//no delay for first scene
	}
	
	/**
	* Show background image as a content of single menu or center it.
	*/
	position () {
	
		return document.body.style.backgroundImage ? "vertical-bottom" : "vertical-center";
	}	

}

/**
 * For default ring and riches menu
 */
class NavBar {
	
	constructor(parentElement) {
		
		this.parentElement = parentElement;
		
		//To prevent duplicated from from ringing
		if (this.bar) {
			this.parentElement.removeChild(this.bar);		
		}
				
		this.bar = document.createElement("span");
		
		this.title = document.createElement("button");
		this.title.className = "wayos-nav wayos-title-menu";
		this.title.innerHTML = "wayOS";
 		this.title.addEventListener('click', function(event) {
 			
 			this.onTitleButtonClick();
 			
	    }.bind(this));
 		this.title.style.color = "WHITE";
 		this.title.style.display = "none";
 		this.bar.appendChild(this.title);
		
		this.chatButton = document.createElement("button");
		this.chatButton.className = "wayos-nav wayos-rich-menu";
		this.chatButton.innerHTML = "💬";
		this.chatButton.disabled = true;
 		this.chatButton.style.display = "none";
 		this.chatButton.addEventListener('click', function(event) {
 			
 			this.onChatButtonClick();
			
	    }.bind(this));
 		this.bar.appendChild(this.chatButton); 		
		
		this.ringButton = document.createElement("button");
		this.ringButton.className = "wayos-nav wayos-rich-menu";
		this.ringButton.innerHTML = "🔔";
		this.ringButton.disabled = true;
 		this.ringButton.style.display = "none";
 		this.ringButton.addEventListener('click', function(event) {
 			
 			this.onRingButtonClick();
			
	    }.bind(this));
 		this.bar.appendChild(this.ringButton);
 		
		this.richArea = document.createElement("span");
 		this.bar.appendChild(this.richArea);
 		 		
		this.parentElement.appendChild(this.bar);
		
		this.onTitleButtonClick = function() {
			console.log("DEBUG: Title click..");
			console.log("\n");
		}
		
		this.onRingButtonClick = function() {
			console.log("DEBUG: RINGING..");
			console.log("\n");
		}
		
		this.onChatButtonClick = function() {
			console.log("DEBUG: Toggling chat bar..");
			console.log("\n");
		}
		
		this.onCreateRichMenus = function(props, richMenus) {
			
			console.log("DEBUG: onCreateRichMenus.." + JSON.stringify(richMenus));
			console.log("\n");
			
		};
	}
	
	init(props) {
		
		//this.bar.style.width = '100%';
		
		this.title.innerHTML = props.title ? props.title : "wayOS";
 		this.title.style.backgroundColor = props.borderColor;
				
 		this.chatButton.disabled = false;
 		this.chatButton.style.color = "WHITE";
 		this.chatButton.style.backgroundColor = props.borderColor;
 		
 		this.ringButton.disabled = false;
 		this.ringButton.style.color = "WHITE";
 		this.ringButton.style.backgroundColor = props.borderColor;
 		 		
   		if (props.richMenus) {
   			
   			let richMenus = [];
   			let items = props.richMenus.split(',');
   			
   			for (let i in items) {
   				let item = items[i].trim(); 
   				richMenus.push(item);
   			}
   		
   			this.onCreateRichMenus(props, richMenus);
   		}
		
	}
	
	show(menus) {
		if (menus && menus.length) {
			for (let i in menus) {
				if (menus[i]==='title') {
			 		this.title.style.display = "block";	
			 		continue;	
				}
				if (menus[i]==='ring') {
			 		this.ringButton.style.display = "block";					
			 		continue;	
				}
				if (menus[i]==='chat') {
			 		this.chatButton.style.display = "block";					
			 		continue;	
				}
			}
		}
	}
}

/**
 * For contact
 */
class ChatBar {
	
	constructor(parentElement) {
		
		this.parentElement = parentElement;
		
		//To prevent duplicated from from ringing
		if (this.bar) {
			this.parentElement.removeChild(this.bar);		
		}
		
		this.inputTextArea = document.createElement("textarea");		
		this.inputTextArea.className = "wayos-textarea";	
		this.inputTextArea.rows = "3";
		this.inputTextArea.cols = "55";
		this.inputTextArea.disabled = true;
				
		this.fileDialog = document.createElement("input");
		this.fileDialog.type = "file";		
		this.fileDialog.style.display = "none";
  		this.fileDialog.onchange = function () {
  			
 	  		this.onFileDialogSubmit(Array.from(this.fileDialog.files));
 	  		
  		}.bind(this);		
				
		this.fileButton = document.createElement("button");
		this.fileButton.className = "wayos-file-button";
		this.fileButton.innerHTML = "🖼";
 		this.fileButton.addEventListener('click', function() {
 			 	  		
 	  		this.fileDialog.click();
 	  		
 	  	}.bind(this));		
		this.fileButton.disabled = true;
				
		this.ringButton = document.createElement("button");
		this.ringButton.className = "wayos-button";
		this.ringButton.innerHTML = "🔔";
 		this.ringButton.addEventListener('click', function(event) {
 			
 			this.onRingButtonClick();
			
	    }.bind(this));
		this.ringButton.disabled = true;
				
		this.sendButton = document.createElement("Button");
		this.sendButton.className = "wayos-button";		
		this.sendButton.innerHTML = "SEND";
 		this.sendButton.addEventListener('click', function(event) {
 			
            let text = this.inputTextArea.value.trim();
			if (text != '') {
				
	 			this.onSendButtonClick(text);
	 			this.inputTextArea.value = "";				
			}
			
	    }.bind(this));		
		this.sendButton.disabled = true;
		
		//Overrrides these callback.		
		this.onFileDialogSubmit = function(files) {			
			console.log("DEBUG: DROPPING..");
	        for (let i in files) {
				console.log(files[i].name);				
	        }			
			console.log("\n");
		}
		
		this.onRingButtonClick = function() {
			console.log("DEBUG: RINGING..");
			console.log("\n");
		}
		
		this.onSendButtonClick = function(text) {
			console.log("DEBUG: SENDING..");
			console.log(text);
			console.log("\n");
		}
		
		this.bar = document.createElement("span");		
		this.bar.appendChild(this.inputTextArea);
		this.bar.appendChild(document.createElement("br"));
		this.bar.appendChild(this.fileDialog);
		this.bar.appendChild(this.fileButton);
		this.bar.appendChild(this.ringButton);
		this.bar.appendChild(this.sendButton);
		this.bar.appendChild(document.createElement("br"));
		
	}
		
	init(props) {
		
 		console.log("Apply Console style.." + JSON.stringify(props));
 	  	
 		this.inputTextArea.disabled = false;
 		this.inputTextArea.autofocus = true;
 		
 		this.fileButton.disabled = false;
 		this.fileButton.style.color = "WHITE";
 		this.fileButton.style.backgroundColor = props.borderColor;
 	  	
 		this.ringButton.disabled = false;
 		this.ringButton.style.color = "WHITE";
 		this.ringButton.style.backgroundColor = props.borderColor;
 	  	
 		this.sendButton.disabled = false;
 		this.sendButton.style.color = "WHITE";
 		this.sendButton.style.backgroundColor = props.borderColor;  	 		
 		
		this.parentElement.appendChild(this.bar);
	}
	
	show() {
		this.bar.style.display = 'block';
		this.parentElement.style.marginBottom = '180px';
	}
	
	hide() {
		this.bar.style.display = 'none';
		this.parentElement.style.marginBottom = '50px';		
	}
	
	isShowing() {
		return this.bar.style.display === 'block';
	}
	
}

class Wayoslet extends HTMLElement {
	
	constructor() {
		super();
		
		this.initMessage = "greeting";
		
		let style = document.getElementById('wayos-style');
		
		if (!style) {
			
			let style = document.createElement('style');
			style.id = 'wayos-style';
			style.textContent = 
			`
			.wayos-nav { 
				cursor: pointer; 
				height: 40px; 
				border-radius: 15px; 
				-moz-border-radius: 15px; 
				-webkit-border-radius: 15px; 
				font-size: large;
				padding: 2px 10px; 
				margin-bottom: 5px;
			}
			.wayos-title-menu { 
				float: left;
			}
			.wayos-rich-menu { 
				float: right;
			}
			.wayos-textarea {
				width: 98%;
				border: 1px solid #DDDDDD;
				-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
				-moz-box-sizing: border-box; /* Firefox, other Gecko */
				box-sizing: border-box;  
				font-size: 16px;
				background-color: lightGray;
			}
			.wayos-file-button {
			    width: 8%;
				border: 0;
		   		background: #3498db;
		    	color: white;
		   		line-height: 40px;
		    	margin-bottom: 10px;
		    	margin-right: 5px;
				cursor: pointer;
			}
			.wayos-button {
			    width: 42%;
				border: 1px solid #DDDDDD;
				border-radius: 10px;
		   		background: #3498db;
		    	color: white;
		   		line-height: 40px;
		    	margin-bottom: 10px;
		    	margin-right: 5px;
				cursor: pointer;
			}
			.wayos-loader {
				background-color: rgba(0, 0, 0, 0.3); 
				width: 100%;			
			}
			@keyframes spin {
			    0% { transform: rotate(0deg); }
			    100% { transform: rotate(360deg); }
			}
			.wayos-spinner {
	    		border: 8px solid #f3f3f3; /* Light grey */
			    border-top: 8px solid #555; /* Blue */
	    		border-radius: 50%;
	    		width: 70px;
	    		height: 70px;
			    animation: spin 2s linear infinite;
	    		position: fixed;
			    top: 50%;
	    		left: 50%;
			    margin-top: -35px;
			    margin-left: -35px;
			}`;
			
			document.head.appendChild(style);						
		}
		
	}
	
	connectedCallback() {
		
		if (!this.id) {
			
			this.id = Wayoslet.generateId();
			
		}
		
		Wayoslet.register(this);
		
		//console.log("ID:" + this.id);
		
		let parentElement = this;
				
		this.navBar = new NavBar(parentElement);
		
		this.frameUX = new AnimateFrameUX(parentElement);
		
		this.chatBar = new ChatBar(parentElement);
				
		this.navBar.onTitleButtonClick = function(message) {
			
			window.open(parentElement.wayOS.playURL, '_blank');
			
		}
		
		this.navBar.onRingButtonClick = function() {
						
			//Recreate instance of wayOS and reinitialize ui
			parentElement.init();
			
		}
		
		this.navBar.onChatButtonClick = function() {
			
			//Toggle chatBar
			if (parentElement.chatBar.isShowing()) {
				parentElement.chatBar.hide();
			} else {
				parentElement.chatBar.show();				
			}
			
		}		
		
		this.navBar.onCreateRichMenus = function(props, richMenus) {
			
			parentElement.navBar.richArea.innerHTML = "";
			
			let richMenu;
			for (let i in richMenus) {
				
				richMenu = richMenus[i];
				
				let button = document.createElement("button");
				button.className = "wayos-nav wayos-rich-menu";
				button.innerHTML = richMenu;
				button.style.color = "WHITE";
				button.style.backgroundColor = props.borderColor;
				
				button.addEventListener('click', function(event) {
		 			
					parentElement.wayOS.parse(this.innerHTML + "!");
					
			    });
				
				parentElement.navBar.richArea.appendChild(button);
			}
			
		};
		
		this.chatBar.onRingButtonClick = function() {
			
			//Recreate instance of wayOS and reinitialize ui
			parentElement.init();
			
		}
			
		this.chatBar.onSendButtonClick = function(message) {
			
			parentElement.wayOS.parse(message);
			
		}
		
		this.chatBar.onFileDialogSubmit = function(files) {
			
			parentElement.wayOS.dropFile(files);
			
		}
		
		this.style.display = "block";
				
		if (this.dataset.chat && this.dataset.chat === 'yes') {
			this.chatBar.show();
		} else {
			this.chatBar.hide();
		}
		
		if (this.dataset.message && this.dataset.message.trim()!=='') {
			this.initMessage = this.dataset.message.trim();
		}
		
		if (this.dataset.speak && this.dataset.speak === 'yes') {
			this.speak = true;
		}
		
		this.init();
		
	}
	
	init() {
		this.wayOS = this.createWayOS();
		this.wayOS.load(this.initMessage);
	}
	
	createWayOS() {
		
		let parentElement = this;
		
		let sessionId = parentElement.sessionId();
		
		let wayOS = new WayOS(parentElement.dataset.url, sessionId);
		
		wayOS.onload = function(props) {
			
			parentElement.frameUX.init(props);
			
			parentElement.navBar.init(props);
			
			if (parentElement.dataset.top) {			
				parentElement.navBar.show(parentElement.dataset.top.split("|"));
			} 
			
			parentElement.chatBar.init(props);
			
			if (parentElement.dataset.onload) {
				
				window[parentElement.dataset.onload].call(parentElement, props);
				
			}
			
			//Store sessionId to local for reuse on next time if not present
			localStorage.setItem("sessionIdOf" + parentElement.id, props.sessionId);
		};
		
		wayOS.onparse = function(message) {
			
			parentElement.addLoader();
			
		};	
		
		wayOS.onmessages = function(messages) {
			
			console.log(JSON.stringify(messages));
			
			parentElement.removeLoader();
			
			parentElement.frameUX.play(messages);
				
		};	
				
		wayOS.parentElement = parentElement;
		
		return wayOS;
	}
	
	sessionId () {
		
		if (this.dataset.sessionid) return this.dataset.sessionid;
		
		let localSessionId = localStorage.getItem("sessionIdOf" + this.id);
		
		return localSessionId;
	}
			
	addLoader () {
		
		this.removeLoader();
				
		let loader = document.createElement("div");
		loader.className = "wayos-loader";
		loader.style = "display: block";
		/*
		loader.innerHTML = 
		`<div style="position: absolute; width: 100%; height: 100%;">
			<div class="wayos-spinner"></div> 
		</div>`;
		*/
		loader.innerHTML = 
		`<div class="wayos-spinner"></div>`;
		
		this.appendChild(loader);
		this.loaderElement = loader;
	}
	
	removeLoader() {
		
		try {
			this.removeChild(this.loaderElement);
		} catch (e) {
		}
		
	}	
	
	showNotification(title, body, url) {
		
		let notification = new Notification(title, {body});
		
		/*
		notification.onclick = (e) => {
			window.location.href = url;
		};
		*/
		setTimeout(() => {
			
		    notification.close()
		    
		}, 4000);		
	}
}

Wayoslet.Id = 0;

Wayoslet.parentElements = [];

Wayoslet.generateId = function () {
	
	return 'wayos-let-' + (++Wayoslet.Id);	
}

Wayoslet.register = function (parentElement) {
		
	Wayoslet.parentElements.push(parentElement);
	
	parentElement.Wayoslet = this;
}

customElements.define('wayos-let', Wayoslet/*, { extends: 'div' }*/);