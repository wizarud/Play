limz_ResponseLabel = draw2d.shape.basic.Label.extend({

    NAME: "limz_ResponseLabel",

    init: function (_entity, responseType, txt, canDelete, userData) {
    	
        this._entity = _entity;
        
        this._super({
            text: txt,
            stroke: 0,
            radius: 0,
            bgColor: null,
            padding: { left: 10, top: 3, right: 10, bottom: 5 },
            fontColor: "#4a4a4a",
            resizeable: true
        });
        
        var menuItems;
        
        if (_entity instanceof limz_PropertiesEntityShape) {
        	
            menuItems = {
                    "set": { name: "Set Property" }
            };        	
        	
        } else {
        	
            menuItems = {
            		"edit": { name: "Edit" },
                    "sep0": "---------",
                    "text": { name: "Text Parameter" },
                    "var": { name: "Var Parameter" },
                    "set": { name: "Set Variable" }
            };
                    
            if (app!=null && app.packageType==='E') {
            	menuItems["sep1"] = "---------";
            	menuItems["text"] = { name: "Text Parameter" };
            	menuItems["var"] = { name: "Var Parameter" };
            	menuItems["set"] = { name: "Set Variable" };        	
                menuItems["get"] = { name: "Http Get" };
                menuItems["post"] = { name: "Http Post" };
                menuItems["put"] = { name: "Http Put" };
                menuItems["delete"] = { name: "Http Delete" };
                menuItems["json"] = { name: "Json Path" };
                menuItems["jsoup"] = { name: "Jsoup Path" };
                menuItems["cmd"] = { name: "Command" };
            }
                    	
        }
        
        if (canDelete) {
            menuItems["sep2"] = "---------";
            menuItems["remove"] = { name: "Remove" };
        }
        
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
                        case "text":
                            setTimeout(function () {
                                _entity.addResponse("Text", true);
                            }, 10);
                            break;
                        case "var":
                            setTimeout(function () {
                                _entity.addResponse("##", true).onDoubleClick();
                            }, 10);
                            break;
                        case "set":
                            setTimeout(function () {
                                _entity.addResponse("SET", true, [{ parameterName: 'name', value: '' }, { parameterName: 'value', value: '' }]);
                            }, 10);
                            break;
                        case "get":
                            setTimeout(function () {
                                _entity.addResponse("GET", true, [{ parameterName: 'headers', value: '' }, { parameterName: 'url', value: '' }]);
                            }, 10);
                            break;
                        case "post":
                            setTimeout(function () {
                                _entity.addResponse("POST", true, [{ parameterName: 'headers', value: '' }, { parameterName: 'body', value: '' }, { parameterName: 'url', value: '' }]);
                            }, 10);
                            break;
                        case "put":
                            setTimeout(function () {
                                _entity.addResponse("PUT", true, [{ parameterName: 'headers', value: '' }, { parameterName: 'body', value: '' }, { parameterName: 'url', value: '' }]);
                            }, 10);
                            break;
                        case "delete":
                            setTimeout(function () {
                                _entity.addResponse("DELETE", true, [{ parameterName: 'headers', value: '' }, { parameterName: 'body', value: '' }, { parameterName: 'url', value: '' }]);
                            }, 10);
                            break;
                        case "json":
                            setTimeout(function () {
                                _entity.addResponse("JSON", true, [{ parameterName: 'object', value: '' }, { parameterName: 'path', value: '' }]);
                            }, 10);
                            break;
                        case "jsoup":
                            setTimeout(function () {
                                _entity.addResponse("JSOUP", true, [{ parameterName: 'dom', value: '' }, { parameterName: 'path', value: '' }]);
                            }, 10);
                            break;
                        case "cmd":
                            setTimeout(function () {
                                _entity.addResponse("CMD", true, [{ parameterName: 'hook', value: '' }, { parameterName: 'params', value: '' }]);
                            }, 10);
                            break;
                        case "remove":
                            // with undo/redo support
                            const isSelectedEntity = app.getView().getSelection().contains(_entity);
                            var cmd = new draw2d.command.CommandDelete(emitter);
                            emitter.getCanvas().getCommandStack().execute(cmd);

                            if (isSelectedEntity) {
                                app.getView().setCurrentSelection(_entity);
                            }
                        default:
                            break;
                    }

                }, this),
                x: event.x,
                y: event.y,
                items: menuItems
            });
        });        

        if (userData) {
        	
        	//Clone
        	const parameters = JSON.parse(JSON.stringify(userData));        	
            this.setUserData(parameters);
        } else {
            //this.installEditor(new draw2d.ui.LabelEditor());
            this.installEditor(new limz_LabelEditor());   
            this.attr('bgColor', '#FFFFFF');

            if (responseType==='PARAM') {
            	
                this.attr('fontColor', '#4286f4');
                
            } else {
            	
                this.attr('fontColor', '#000000');        	
            }
        }
        
        
        this.responseType = responseType;
    },
    
    getResponseType: function() {
    	
    	return this.responseType;
    },

	setText: function (txt) {
		
    	//Protect from grave wayobot expression
		txt = txt.replaceAll("`", "");    			
		this._super(txt);
		
		const _entity = this._entity;
		
		//Reset Thumbnail Children
		_entity.children.each(function (i, e) {

            if (e.figure instanceof draw2d.shape.basic.Image) { 
            	_entity.remove(e.figure);
            }
        });
		
		if (app!=null && !app.view.showImages) return;
		
    	if (txt.indexOf(" ")!==-1) {
    		txt = txt.substring(0, txt.indexOf(" "));
    	}
		
        //Append Thumbnail if txt is the resource from WAYOBOT or external link
        if (txt.startsWith("https://") || txt.startsWith("http://")) {
        	
        	var checkTxt = txt.toLowerCase();
        	        	
        	var path;
        	
        	if (checkTxt.endsWith("jpg") || checkTxt.endsWith("jpeg") || checkTxt.endsWith("png") || checkTxt.endsWith("gif")) {
        		            	
        		path = txt;
        		
        	} else if (txt.startsWith("https://youtu.be/")) {
        		
        		path = "https://i3.ytimg.com/vi/" + txt.replace("https://youtu.be/", "") + "/maxresdefault.jpg"
        		
        	} else if (txt.startsWith("https://www.youtube.com/watch?v=")) {
        		
        		path = "https://i3.ytimg.com/vi/" + txt.replace("https://www.youtube.com/watch?v=", "") + "/maxresdefault.jpg"
        		
        	} else {
        		
            	const icon_registry = {
                   	"txt": "https://upload.wikimedia.org/wikipedia/en/2/2a/Notepad.png",
                	"pdf": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/800px-PDF_file_icon.svg.png",
                	"ppt": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Microsoft_Office_PowerPoint_%282018–present%29.svg",
                	"pptx": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Microsoft_Office_PowerPoint_%282018–present%29.svg",
                	"mp3": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sound_mp3.png/90px-Sound_mp3.png",
                	"m4a": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sound_mp3.png/90px-Sound_mp3.png",
                	"mp4": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sound_mp3.png/90px-Sound_mp3.png",
                	"doc": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/.docx_icon.svg/800px-.docx_icon.svg.png",
                	"docx": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/.docx_icon.svg/800px-.docx_icon.svg.png",
                };
            	
        		for (var key in icon_registry) {
        			if (checkTxt.endsWith("." + key)) {
        				path = icon_registry[key];
        				break;
        			}
        		}
        		
        	}
        	
        	if (path) {
        		
        		const image = new Image();
        		image.onload = function () {
        			    		    			    		    			
    	    		const imageFigure = new draw2d.shape.basic.Image();
    	    		imageFigure.attr('cursor', 'pointer');
    	    		imageFigure.setPath(path);
    	    		
    	    		imageFigure.onClick = function () {
    	    			
    	    			window.open(txt, '_blank');
    	    			
    	    		};
    	    		    		    			
        			const newHeight = (image.height / image.width) * _entity.getWidth();        			
    	    		imageFigure.setMinHeight(newHeight);
    	    		
    	    		_entity.add(imageFigure, new draw2d.layout.locator.BottomLocator());
    	    		    		    			
        		}
        		image.onerror = function () {
        			
        		}
        		image.src = path;	    		
        	}
        	        	
        }			
		
	}
	
});
