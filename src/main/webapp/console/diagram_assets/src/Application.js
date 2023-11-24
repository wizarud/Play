limz_Application = Class.extend(
	    {
	        NAME: "limz_Application",

	        /**
	         * @constructor
	         * 
	         * @param {String} canvasId the id of the DOM element to use as paint container
	         */
	        init: function () {
	            RegexColorizer.addStyleSheet();

	            this.backend = new limz_Backend(this);
	            this.view = new limz_View("canvas");
	            this.toolbar = new limz_Toolbar("toolbar", this.view);
	            this.propertyPane = new limz_PropertyPane("property", this.view);


	            // layout FIRST the body
	            //
	            this.contentLayout = $('#container').layout({
	                north: {
	                    resizable: false,
	                    closable: false,
	                    spacing_open: 0,
	                    spacing_closed: 0,
	                    size: 80,
	                    paneSelector: "#toolbar"
	                },
	                center: {
	                    resizable: false,
	                    closable: false,
	                    spacing_open: 0,
	                    spacing_closed: 0,
	                    paneSelector: "#content"
	                }
	            });

	            this.editorLayout = $('#content').layout({
	                center: {
	                    resizable: false,
	                    closable: false,
	                    spacing_open: 0,
	                    spacing_closed: 0,
	                    paneSelector: "#editor"
	                }
	            });

	            this.appLayout = $('#editor').layout({
	                west: {
	                    resizable: false,
	                    closable: false,
	                    spacing_open: 0,
	                    spacing_closed: 0,
	                    size: 80,
	                    paneSelector: "#palette"
	                },
	                center: {
	                    resizable: true,
	                    closable: false,
	                    spacing_open: 0,
	                    spacing_closed: 0,
	                    paneSelector: "#view"
	                }
	            });

	            this.appLayout = $('#view').layout({
	                south: {
	                    resizable: true,
	                    closable: true,
	                    spacing_open: 5,
	                    spacing_closed: 5,
	                    size: 220,
	                    paneSelector: "#property",
	                    onresize: $.proxy(function () {
	                        this.propertyPane.onResize();
	                    }, this)
	                },
	                center: {
	                    resizable: true,
	                    closable: false,
	                    spacing_open: 5,
	                    spacing_closed: 5,
	                    size: 9000,
	                    paneSelector: "#canvas"
	                }
	            });

	            this.view.getCommandStack().addEventListener(function(e) {
	                if (e.isPostChangeEvent()) {
	                    const cmd = e.getCommand().label;
	                    if (cmd) {
	                        if (cmd==="Add Shape"||cmd==="Drop Clone Entity"||cmd==="Delete Shape") {
	                            app.updateQuota();
	                        }
	                    }

	                }
	            });

	            this.lang = "en";
	            $("#languageProperty").val(this.lang.toUpperCase());

	            $("#languageProperty").change(function(e) {
	                this.executeCommand(new limz_CommandChangeLanguage(e.target.value.toLowerCase()));
	            }.bind(this));            

	            this.backend.getBotList(this);

	        },

	        executeCommand: function (cmd) {
	            this.view.getCommandStack().execute(cmd);
	        },

	        /**
	         * @method
	         * Return the view or canvas of the application. Required to access the document itself
	         * 
	         */
	        getView: function () {
	            return this.view;
	        },

	        /**
	         * @method
	         * Return the backend data storage for this application
	         * 
	         */
	        getBackend: function () {
	            return this.backend;
	        },

	        updateQuota: function(succeed) {
	            this.backend.getPackage(this.contextId, $.proxy(function(packageData) {

					/*
					console.log("Update Quota by Hardcoding: TODO Remove Later!!!" + this.contextId);
	            	this.packageType = packageData.type;
	                this.maxEntityPerMonth = packageData.maxEntityPerMonth;
	                */
	                this.packageType = "E";
	                this.maxEntityPerMonth = 100;
	                
	                if (succeed) {
	                	succeed();
	                } else {
	                    this.updateCountEntity();
	                }

	            }, this));
	        },
	        
			createShortID: function() {
	 			let segment=function() {
					return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  				};
				//return (segment()+segment()+"-"+segment()+"-"+segment()+"-"+segment()+"-"+segment()+segment()+segment());
				return segment();
			},
	        	        
	        updateCountEntity: function() {
	            const figures = this.view.getFigures();
	            var countEntity = 0;
	            for (var i=0;i<figures.getSize();i++) {
	                var figure = figures.get(i);
	                if (figure instanceof limz_EntityShape) {
	                    countEntity ++;
	                }
	            }

	            this.countEntity = countEntity;

	            if (this.countEntity < this.maxEntityPerMonth) {
	                
	                $("#entityLabel").css("color","white");
	                $("#entityLabel").css("background-color","#4286f4");
	                $("#entityLabel").css("border","1px solid gray");
	                
	                $("#questEntityLabel").css("color","white");
	                $("#questEntityLabel").css("background-color","#D0021B");
	                $("#questEntityLabel").css("border","1px solid gray");
	                
	            } else {
	                $("#entityLabel").css("color","#777777");
	                $("#entityLabel").css("background-color","#EFEFEF");
	                $("#entityLabel").css("border","1px solid #CACACA");
	                
	                $("#questEntityLabel").css("color","#777777");
	                $("#questEntityLabel").css("background-color","#EFEFEF");
	                $("#questEntityLabel").css("border","1px solid #CACACA");                
	            }        	
	            
	            $("#titleProperty").text(`${this.title} [${this.countEntity}/${this.maxEntityPerMonth}]`);
	        },

	        canAddEntity: function() {
	            if (this.countEntity!=undefined && this.maxEntityPerMonth!=undefined) {
	                return this.countEntity < this.maxEntityPerMonth;
	            }
	            return false;
	        },
	        
	        save: function () {
	            $("#titleProperty").text("(^o^)ๆ Saving...");
	            var writer = new draw2d.io.json.Writer();
	            writer.marshal(this.view, $.proxy(function (data) {
					
	                this.backend.save(this.contextId, this.createLimzContext(data), $.proxy(function () {
	                    this.view.getCommandStack().markSaveLocation();
	                    this.updateQuota();
	                }, this));
	                
	            }, this));
	        },        

	        createLimzContext: function (data) {

	            const content = { nodes: [], attr: {connections: []} };
	            const properties = {};
	            
	            data.forEach((figure) => {

	                if (figure.type === 'limz_EntityShape') {

	                    const node = {};

	                    if (figure.name.trim()) {
	                        const hookArray = figure.name.split(" ");
	                        node.hooks = figure.weights.map((hook, i) => {
	                            hook.text = hookArray[i].replaceAll("gte", "").replaceAll("gt", "").replaceAll("lte", "").replaceAll("lt", "");
	                            return hook;
	                        });                    	
	                    } else {
	                    	node.hooks = [];
	                    }

	                    figure.parents.forEach((id)=>{
	                        node.hooks.push({text: "@" + id, match: "Words", weight: 1});
	                    });

	                    node.response = this.flattenResponse(figure);
	                    
	                    node.attr = { id: figure.id, x: figure.x, y: figure.y, isQuestion: figure.isQuestion, hasParam: figure.hasParam};
	                    
	                    content.nodes.push(node);

	                } else if (figure.type === 'limz_StartEntityShape') {

	                    content.attr.start = { id: figure.id, x: figure.x, y: figure.y, isQuestion: figure.isQuestion };
	                    content.greeting = this.flattenResponse(figure);

	                } else if (figure.type === 'limz_EndEntityShape') {

	                    content.attr.end = { id: figure.id, x: figure.x, y: figure.y, isQuestion: figure.isQuestion };
	                    content.unknown = this.flattenResponse(figure);

	                } else if (figure.type === 'limz_SilentEntityShape') {

	                    content.attr.silent = { id: figure.id, x: figure.x, y: figure.y, isQuestion: figure.isQuestion };
	                    content.silent = this.flattenResponse(figure);

	                } else if (figure.type === 'limz_HoverConnection') {

	                    const connection = {};

	                    connection.id = figure.id;
	                    connection.source = figure.source.node;
	                    connection.target = figure.target.node;

	                    content.attr.connections.push(connection);
	                    
	                } else if (figure.type === 'limz_PropertiesEntityShape') {
	                	
	                	figure.responses.map((response) => {
	                		
	                        if (response.type === 'SET') {
	                        	
	                        	const propertyName = response.parameters[0].value;
	                        	const propertyValue = response.parameters[1].value;
	                        	
	                        	properties[propertyName] = propertyValue;
	                        }
	                		
	                	});
	                	
	                }

	            });
	            
	            //Merge Properties
	            
	            //Delete if not exists!
	            for (var propertyName in content) {
	            	
	            	//Skil Reserved Properties
	            	if (propertyName === 'nodes' || 
	                		propertyName === 'attr' || 
	                		propertyName === 'greeting' || 
	                		propertyName === 'unknown' || 
	                		propertyName === 'silent' ||
	                		propertyName === 'title' ||
	                		propertyName === 'borderColor' ||
	                		propertyName === 'language') {
	                		continue;
	                	}
	            	
	            	if (!properties[propertyName]) {
	            		delete content[propertyName];
	            	}
	            }
	            
	            //Add new properties
	            for (var propertyName in properties) {
	            	
	            	content[propertyName] = properties[propertyName];
	            }

	            content.title = this.title;
	            content.borderColor = this.borderColor;
	            content.language = this.lang;

	            return content;
	        },        
	        
	        flattenResponse: function (figure) {
	            var responses = figure.responses.map((response) => {
	            	
	                if (response.parameters === null) {
	                	
	                    return response.text;
	                }

	                if (response.type === 'SET') {
	                	
	                    return "`?" + response.parameters[0].value + "=" + response.parameters[1].value + "`";
	                }
	                
	                if (response.type === 'GET') {
	                	                	
	                    if (response.parameters[0].value !== '') {
	                        return "`get://" + response.parameters[0].value + "://" + response.parameters[1].value + "`";
	                    }
	                    return "`get://" + response.parameters[1].value + "`";
	                }

	                if (response.type === 'POST') {
	                	
	                    if (response.parameters[0].value !== '') {
	                        return "`post://" + response.parameters[0].value + "://" + response.parameters[1].value + "://" + response.parameters[2].value + "`";
	                    }
	                    return "`post://" + response.parameters[1].value + "://" + response.parameters[2].value + "`";
	                }
	                
	                if (response.type === 'PUT') {
	                	
	                    if (response.parameters[0].value !== '') {
	                        return "`put://" + response.parameters[0].value + "://" + response.parameters[1].value + "://" + response.parameters[2].value + "`";
	                    }
	                    return "`put://" + response.parameters[1].value + "://" + response.parameters[2].value + "`";
	                }

	                if (response.type === 'DELETE') {
	                	
	                    if (response.parameters[0].value !== '') {
	                        return "`delete://" + response.parameters[0].value + "://" + response.parameters[1].value + "://" + response.parameters[2].value + "`";
	                    }
	                    return "`delete://" + response.parameters[1].value + "://" + response.parameters[2].value + "`";
	                }
	                
	                if (response.type === 'JSON') {
	                	
	                    return "`json-path://" + response.parameters[0].value + "://" + response.parameters[1].value + "`";
	                }

	                if (response.type === 'JSOUP') {
	                	
	                    return "`jsoup://" + response.parameters[0].value + "://" + response.parameters[1].value + "`";
	                }
	                
	                if (response.type === 'CMD') {
	                	
	                    return "`cmd://" + response.parameters[0].value + "://" + response.parameters[1].value + "`";
	                }

	            });
	            
	            //Add Question/Forward Marker
	            if (figure.isQuestion !== undefined) {
	            	
					//console.log("FIGURE: " + figure.name + " ADDD FORWARD ID: @"+ figure.id);
					
	                responses[0] += ", @" + figure.id;
	                
	                const lastChar = responses[responses.length-1].charAt(responses[responses.length-1].length-1);
	            	
	                if (figure.isQuestion) {
	                	if (lastChar!=='?')
	                		responses[responses.length-1] += "?";
	                } else {
	                	if (lastChar!=='!')
	                		responses[responses.length-1] += "!";
	                }
	                
	            } else if (figure.hasParam) {
										
					//console.log("FIGURE: " + figure.name + " has param: " + figure.hasParam);
					
	                responses[0] += ",";
	                
	                const lastChar = responses[responses.length-1].charAt(responses[responses.length-1].length-1);
	                
                	if (lastChar!=='!')
                		responses[responses.length-1] += "!";
				}
	                        
	            return responses.join(" ").trim();
	        },        
	        
	        load: function (contextId) {
				
	            $("#titleProperty").text("(^o^)ๆ Loading...");
	            
	            console.log("(^o^)ๆ Loading..." + contextId);
	            
	            this.contextId = contextId;
	            this.view.clear();
	            this.updateQuota($.proxy(function() {
					
	            	//console.log("Try backend load:" + this.contextId);
	            	
	                this.backend.load(this.contextId, $.proxy(function (jsonDocument) {
	                	
	                    var data = [];
	                    
	                    //Reserved Properties
	                    this.title = jsonDocument.title;
	                    this.borderColor = jsonDocument.borderColor;
	                    if (!this.borderColor) {
	                    	this.borderColor = "#64c583";
	                    }
	                    this.lang = jsonDocument.language;
	                    if (this.lang) {
	                        $("#languageProperty").val(this.lang.toUpperCase());
	                    }
	                    
	                    //Custom Properties
	                    var properties = '';
	                    
	                    for (var i in jsonDocument) {
	                    	
	                    	//Skip reserved property
	                    	if (i === 'nodes' || 
	                    		i === 'attr' || 
	                    		i === 'greeting' || 
	                    		i === 'unknown' || 
	                    		i === 'silent' ||
	                    		i === 'title' ||
	                    		i === 'borderColor' ||
	                    		i === 'language') {
	                    		continue;
	                    	}
	                    	
	                    	properties += '`?' + i + '=' + jsonDocument[i] + '` ';
	                    }
	                    
	                    const propertiesEntity = { type: 'limz_PropertiesEntityShape', name: 'Properties' };
	                    propertiesEntity.id = draw2d.util.UUID.create();
	                    //propertiesEntity.id = this.createShortID(); TODO: Cannot use this
	                    propertiesEntity.x = 0;
	                    propertiesEntity.y = 0;
	                    propertiesEntity.responses = this.toResponseArray(properties, false, false, true);
	                    
	                    data.push(propertiesEntity);                    
	           
	                    if (jsonDocument.nodes) {
	                        const entities = jsonDocument.nodes.map((node) => {

	                            const entity = {};

	                            if (node.attr && node.attr.id) {
	                                entity.id = node.attr.id;
	                                entity.x = node.attr.x;
	                                entity.y = node.attr.y;
	                            } else {
	                                entity.id = draw2d.util.UUID.create();
	                                //entity.id = this.createShortID(); TODO: fix this
	                                entity.x = 0;
	                                entity.y = 0;
	                            }

	                            entity.type = "limz_EntityShape";

	                            const hooks = node.hooks.filter(hook => {
	                                if (hook.text.startsWith("@")) return false;
	                                return true;
	                            });

	                            entity.name = hooks.map(hook => {
	                                if (hook.match === "GreaterEqualThan") {
	                                    return "gte" + hook.text;
	                                }
	                                if (hook.match === "GreaterThan") {
	                                    return "gt" + hook.text;
	                                }
	                                if (hook.match === "LowerEqualThan") {
	                                    return "lte" + hook.text;
	                                }
	                                if (hook.match === "LowerThan") {
	                                    return "lt" + hook.text;
	                                }
	                                return hook.text;
	                            }).join(" ");

	                            entity.weights = hooks.map(hook => {
	                                if (hook.match === "GreaterEqualThan") {
	                                    return { match: "GreaterEqualThan", weight: hook.weight };
	                                }
	                                if (hook.match === "GreaterThan") {
	                                    return { match: "GreaterThan", weight: hook.weight };
	                                }
	                                if (hook.match === "LowerEqualThan") {
	                                    return { match: "LowerEqualThan", weight: hook.weight };
	                                }
	                                if (hook.match === "LowerThan") {
	                                    return { match: "LowerThan", weight: hook.weight };
	                                }
	                                return { match: "Words", weight: hook.weight };
	                            });
	                            
		                        let hasQuestion = node.attr.isQuestion !== undefined;
		                        let hasParam = node.attr.hasParam;
		                        
	                            entity.responses = this.toResponseArray(node.response, hasQuestion, hasParam);
	                            
	                            if (hasQuestion) {
	                                entity.isQuestion = node.attr.isQuestion;									
								}
		                        
	                            if (hasParam) {
	                                entity.hasParam = node.attr.hasParam;									
								}
								
	                            if (hasQuestion || hasParam) {
	                                //Remove ? or !
	                                const lastResponse = entity.responses[entity.responses.length - 1];
	                                const lastChar = lastResponse.text.charAt(lastResponse.text.length-1);
	                                if (lastChar==='?'||lastChar==='!') {
	                                    lastResponse.text = lastResponse.text.replace(/.$/,""); 
	                                }           
	                            }

	                            return entity;
	                        });

	                        data = data.concat(entities);
	                    }

	                    const start = { type: 'limz_StartEntityShape', name: 'Greeting' };
	                    if (jsonDocument.attr && jsonDocument.attr.start) {
	                        start.id = jsonDocument.attr.start.id;
	                        start.x = jsonDocument.attr.start.x;
	                        start.y = jsonDocument.attr.start.y;

	                        let hasQuestion = jsonDocument.attr.start.isQuestion !== undefined;
	                            
	                        start.responses = this.toResponseArray(jsonDocument.greeting, hasQuestion);

	                        if (hasQuestion) {
	                            start.isQuestion = jsonDocument.attr.start.isQuestion;
	                            //Remove ? or !
	                            const lastResponse = start.responses[start.responses.length - 1];
	                            const lastChar = lastResponse.text.charAt(lastResponse.text.length-1);
	                            if (lastChar==='?'||lastChar==='!') {
	                                lastResponse.text = lastResponse.text.replace(/.$/,""); 
	                            }                                
	                        }

	                        data.push(start);
	                    } else {
	                        start.id = draw2d.util.UUID.create();
	                        //start.id = this.createShortID(); TODO: FIXthis
	                        start.x = 0;
	                        start.y = 0;

	                        if (jsonDocument.greeting) {
	                            start.responses = [{ text: jsonDocument.greeting }];
	                        } else {
	                            start.responses = [{ text: "" }];
	                        }
	                        data.push(start);
	                    }

	                    const end = { type: 'limz_EndEntityShape', name: 'Unknown' };
	                    if (jsonDocument.attr && jsonDocument.attr.end) {
	                        end.id = jsonDocument.attr.end.id;
	                        end.x = jsonDocument.attr.end.x;
	                        end.y = jsonDocument.attr.end.y;

	                        let hasQuestion = jsonDocument.attr.end.isQuestion !== undefined;
	                        
	                        end.responses = this.toResponseArray(jsonDocument.unknown, hasQuestion);

	                        if (hasQuestion) {
	                            end.isQuestion = jsonDocument.attr.end.isQuestion;
	                            //Remove ? or !
	                            const lastResponse = end.responses[end.responses.length - 1];
	                            const lastChar = lastResponse.text.charAt(lastResponse.text.length-1);
	                            if (lastChar==='?'||lastChar==='!') {
	                                lastResponse.text = lastResponse.text.replace(/.$/,""); 
	                            }                                
	                        }

	                        data.push(end);
	                    } else {
	                        end.id = draw2d.util.UUID.create();
	                        //end.id = this.createShortID(); TODO FIXthis                     
	                        end.x = 0;
	                        end.y = 100;

	                        if (jsonDocument.unknown) {
	                            end.responses = [{ text: jsonDocument.unknown }];
	                        } else {
	                            end.responses = [{ text: "" }];
	                        }
	                        data.push(end);
	                    }
	                    
	                    const silent = { type: 'limz_SilentEntityShape', name: 'Silent' };
	                    if (jsonDocument.attr && jsonDocument.attr.silent) {
	                    	silent.id = jsonDocument.attr.silent.id;
	                    	silent.x = jsonDocument.attr.silent.x;
	                    	silent.y = jsonDocument.attr.silent.y;

	                        let hasQuestion = jsonDocument.attr.silent.isQuestion !== undefined;
	                        
	                    	silent.responses = this.toResponseArray(jsonDocument.silent, hasQuestion);

	                        if (hasQuestion) {
	                            silent.isQuestion = jsonDocument.attr.silent.isQuestion;
	                            //Remove ? or !
	                            const lastResponse = silent.responses[silent.responses.length - 1];
	                            const lastChar = lastResponse.text.charAt(lastResponse.text.length-1);
	                            if (lastChar==='?'||lastChar==='!') {
	                                lastResponse.text = lastResponse.text.replace(/.$/,""); 
	                            }                                
	                        }

	                        data.push(silent);
	                    } else {
	                    	silent.id = draw2d.util.UUID.create();
	                        //silent.id = this.createShortID(); TODO: cannot use short ID
	                    	silent.x = 0;
	                    	silent.y = 200;

	                        if (jsonDocument.silent) {
	                        	silent.responses = [{ text: jsonDocument.silent }];
	                        } else {
	                        	silent.responses = [{ text: "" }];
	                        }
	                        data.push(silent);
	                    }                

	                    if (jsonDocument.attr && jsonDocument.attr.connections) {
	                        const connections = jsonDocument.attr.connections.map(connection => {
	                            return { type: "limz_HoverConnection", id: connection.id, source: { node: connection.source, port: "output" }, target: { node: connection.target, port: "input" } };
	                        });
	                        data = data.concat(connections);
	                    }

	                    var reader = new draw2d.io.json.Reader();
	                    reader.unmarshal(this.view, data);                
	                    
	                    this.updateCountEntity();
	                                    
	                }, this));
	                
	            }, this));
	        },
	        
	        toResponseArray: function (response, hasQuestion, hasParam, isProperties) {
	        	
				//console.log("Response:" + response + " HAS PARAM: " + hasParam);
				
	            const responses = [];
	            	            
	            //response = response.replace(/\n/g, "_newline_");
	            response = response.replace(/\n/g, "[br]");
	            
	            response.split(/(\`.*?\`)/).filter((resp, i)=>{
					
	                return i===0 || (resp.trim().length>0 && resp.trim()!=="!" && resp.trim()!=="?");
	                
	            }).forEach((resp, i) => {
					
					//console.log("\t" + resp);
	            	
	            	if (!isProperties) {
		            	//resp = resp.replace(/_newline_/g, "\n");
		            	resp = resp.replace(/\[br\]/g, "\n");
	            	}
	            	
	                if (resp.startsWith("`") && resp.endsWith("`")) {
	                    var text = resp.substring(1, resp.length - 1).trim();
	                    if (text.startsWith("?")) {
	                    	
	                    	const responseType = "SET";
	                    	
	                    	const pair = text.substring(1);
	                        const key = pair.split("=")[0];
	                        const val = pair.substr(pair.indexOf("=") + 1);
	                        responses.push({ type: responseType, text: responseType + " " + key + " to " + val, parameters: [{ parameterName: 'name', value: key }, { parameterName: 'value', value: val }] });
	                        return;
	                    }
	                    if (text.startsWith("get://")) {
	                    	
	                    	const responseType = "GET";
	                    	
	                        const params = text.split("://");
	                        if (params.length === 3) {
	                            responses.push({ type: responseType, text: responseType + " " + params[2], parameters: [{ parameterName: 'headers', value: params[1] }, { parameterName: 'url', value: params[2] }] });
	                        } else if (params.length === 2) {
	                            responses.push({ type: responseType, text: responseType + " " + params[1], parameters: [{ parameterName: 'headers', value: '' }, { parameterName: 'url', value: params[1] }] });
	                        }
	                        return;
	                    }
	                    if (text.startsWith("post://")) {
	                    	
	                    	const responseType = "POST";
	                    	
	                        const params = text.split("://");
	                        if (params.length === 4) {
	                            responses.push({ type: responseType, text: responseType + " " + params[3], parameters: [{ parameterName: 'headers', value: params[1] }, { parameterName: 'body', value: params[2] }, { parameterName: 'url', value: params[3] }] });
	                        } else if (params.length === 3) {
	                            responses.push({ type: responseType, text: responseType + " " + params[2], parameters: [{ parameterName: 'headers', value: '' }, { parameterName: 'body', value: params[1] }, { parameterName: 'url', value: params[2] }] });
	                        }
	                        return;
	                    }
	                    if (text.startsWith("put://")) {
	                    	
	                    	const responseType = "PUT";
	                    	
	                        const params = text.split("://");
	                        if (params.length === 4) {
	                            responses.push({ type: responseType, text: responseType + " " + params[3], parameters: [{ parameterName: 'headers', value: params[1] }, { parameterName: 'body', value: params[2] }, { parameterName: 'url', value: params[3] }] });
	                        } else if (params.length === 3) {
	                            responses.push({ type: responseType, text: responseType + " " + params[2], parameters: [{ parameterName: 'headers', value: '' }, { parameterName: 'body', value: params[1] }, { parameterName: 'url', value: params[2] }] });
	                        }
	                        return;
	                    }
	                    if (text.startsWith("delete://")) {
	                    	
	                    	const responseType = "DELETE";
	                    	
	                        const params = text.split("://");
	                        if (params.length === 4) {
	                            responses.push({ type: responseType, text: responseType + " " + params[3], parameters: [{ parameterName: 'headers', value: params[1] }, { parameterName: 'body', value: params[2] }, { parameterName: 'url', value: params[3] }] });
	                        } else if (params.length === 3) {
	                            responses.push({ type: responseType, text: responseType + " " + params[2], parameters: [{ parameterName: 'headers', value: '' }, { parameterName: 'body', value: params[1] }, { parameterName: 'url', value: params[2] }] });
	                        }
	                        return;
	                    }
	                    if (text.startsWith("json-path://")) {
	                    	
	                    	const responseType = "JSON";
	                    	
	                        const params = text.split("://");
	                        if (params.length === 3) {
	                            responses.push({ type: responseType, text: responseType + " " + params[1] + " " + params[2], parameters: [{ parameterName: 'object', value: params[1] }, { parameterName: 'path', value: params[2] }] });
	                        }
	                        return;
	                    }
	                    if (text.startsWith("jsoup://")) {
	                    	
	                    	const responseType = "JSOUP";
	                    	
	                        const params = text.split("://");
	                        if (params.length === 3) {
	                            responses.push({ type: responseType, text: responseType + " " + params[1] + " " + params[2], parameters: [{ parameterName: 'dom', value: params[1] }, { parameterName: 'path', value: params[2] }] });
	                        }
	                        return;
	                    }
	                    if (text.startsWith("cmd://")) {
	                    	
	                    	const responseType = "CMD";
	                    	
	                        const params = text.split("://");
	                        if (params.length === 3) {
	                            responses.push({ type: responseType, text: responseType + " " + params[1] + " " + params[2], parameters: [{ parameterName: 'hook', value: params[1] }, { parameterName: 'params', value: params[2] }] });
	                        }
	                        return;
	                    }
	                    
	                } 
	                
	                if (i===0) {

						if (hasQuestion || hasParam) {
							
		                    //const indexOfComma = resp.lastIndexOf(", @");
		                    const indexOfComma = resp.lastIndexOf(", ");
		                    
		                    if (indexOfComma!==-1) {
								
		                        const firstText = resp;
		                        responses.push({ text: firstText.substring(0, indexOfComma) });
	                        
		                        const remainingText = firstText.substring(indexOfComma + 1);
	    	                    const additionalParameters = remainingText.split(" ");
	    	                    
	        	                additionalParameters.filter((parameter)=>{
	            	                return parameter.trim() && !parameter.trim().startsWith("@");
	                	        }).forEach((parameter)=>{
									//console.log("\t\t For index===0: " + parameter);
	                    	        responses.push({ type: "PARAM", text: parameter });//Display all params except @<id>
	                        	});

	                        	return;
	                        
	                    	}
						
						}
	                    
	                    responses.push({ text: resp.trim() });
	                    return;
	                }
	                
					if (hasQuestion || hasParam) {
						
		                resp.split(" ").filter(r=>{
		                    return r.trim().length > 0;
	    	            }).forEach(r=>{
							//console.log("\t\t For index>0: " + r);
	        	            responses.push({ type: "PARAM", text: r });
	            	    });

					}
	            });
	            
	            //console.log("LOADED: " + JSON.stringify(responses));

	            return responses;
	        },

	    });