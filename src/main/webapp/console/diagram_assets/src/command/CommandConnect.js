/**
 * @class limz.command.CommandConnect
 * 
 * Connects two ports with a connection.
 *
 * @inheritable
 * @author EOSS-TH
 * 
 * @extends draw2d.command.CommandConnect
 */
limz_CommandConnect = draw2d.command.CommandConnect.extend({
    NAME : "limz_CommandConnect", 
    
    init: function(source, target, dropTarget)
     {
       this._super(source, target, dropTarget);
    },

    /**
     * @method
     * Execute the command the first time
     * 
     **/
    execute: function()
    {
        var optionalCallback = $.proxy(function(conn) {

            this.connection = conn;
            this.connection.setSource(this.source);
            this.connection.setTarget(this.target);
            this.canvas.add(this.connection);

        },this);
        
        // the createConnection must return either a connection or "undefined". If the method return "undefined"
        // the asynch callback must be called. Usefull if the createConnection shows a selection dialog
        //
        if(this.connection===null){
          // deprecated call!!!!
          //
          var result = draw2d.Configuration.factory.createConnection(this.source, this.target, optionalCallback, this.dropTarget);
          debugger;
          // will be handled by the optional callback
          if(typeof result==="undefined"){
              return;
          }

          this.connection = result;
        }
       
        optionalCallback(this.connection);
    },
    
    /**
     * @method
     * Redo the command after the user has undo this command.
     *
     **/
    redo: function()
    {
       this.canvas.add(this.connection);
       this.connection.reconnect();
    },
    
    /** 
     * @method
     * Undo the command.
     *
     **/
    undo: function()
    {
        this.canvas.remove(this.connection);
    }
});