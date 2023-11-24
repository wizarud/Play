/**
 * @class limz.OutputPort
 * A OutputPort is the start anchor for a {@link draw2d.Connection}.
 * 
 * @author EOSS-TH
 * @extends draw2d.Port
 */ 

limz_OutputPort = draw2d.OutputPort.extend({

    NAME : "limz_OutputPort",

    init: function(attr, setter, getter)
    {
        this._super(attr, setter, getter);
    },

    createCommand: function(request)
    {
       // Connect request between two ports
       //
       if(request.getPolicy() === draw2d.command.CommandType.CONNECT){
           // source and target are changed.
           return new limz_CommandConnect(request.target, request.source, request.source, request.router);
       }
    
       // ...else call the base class
       return this._super(request);
    },

    onDisconnect: function(connection)
    {
    }
});