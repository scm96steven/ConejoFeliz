
var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    zanahorias: [],
     bombas: [],
        random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    moverConejo: function(location, event){
        var size = cc.winSize;
		cc.log("Mover Conejo");
		var  juego = event.getCurrentTarget();
		var ubicacion = location.getLocation();
        
             if(ubicacion.x<275)
                ubicacion.x = 275;
        
             if(ubicacion.x > 675)
                ubicacion.x = 675;
        
		juego.sprConejo.setPosition(ubicacion.x, size.height * 0.15);
        this.creaZanahorias;

	},
    creaZanahorias: function(){
     var size = cc.winSize;
        var columnas =[300, 325, 375, 425, 475, 525, 575, 625, 675]
        
        console.log("agregando zanahoria");
        
        var zanahoria = new cc.Sprite(res.zana_png);
        var tamano = zanahoria.getContentSize().width;
        zanahoria.setPosition(columnas[this.random(0, 8)], size.height);
        zanahoria.setScale(0.7,0.7);
        this.addChild(zanahoria, 1);
        zanahoria.setAnchorPoint(1, 1);
        
        //Movimiento
		var moveto = cc.moveTo(this.random(1,9), zanahoria.getPositionX(), 0);
		zanahoria.runAction(moveto);
        this.zanahorias.push(zanahoria);
		
	},
    creaBombas: function(){
     var size = cc.winSize;
        var columnas =[300, 325, 375, 425, 475, 525, 575, 625, 675]
        
        console.log("agregando bomba");
        
        var bomba = new cc.Sprite(res.bomba_png);
        var tamano = bomba.getContentSize().width;
       bomba.setPosition(columnas[this.random(0, 8)], size.height);
        bomba.setScale(0.7,0.7);
        this.addChild(bomba, 1);
        bomba.setAnchorPoint(1, 1);
        
      //movimiento
		var moveto = cc.moveTo(this.random(1,9), bomba.getPositionX(), 0);
		bomba.runAction(moveto);
        this.bombas.push(bomba);
		
	},
    ctor:function () {
        this._super();
        //Obteniendo el tamaño de la pantalla
        var size = cc.winSize;

        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2, size.height / 2);
        this.addChild(this.sprFondo, 0);
        
        //posicionando la imagen de fondo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.addChild(this.sprConejo, 1);
        
        //Evento automatizado para que agregue zanahorias y bombas
        this.schedule(this.creaZanahorias,1);
         this.schedule(this.creaBombas,4);
        

        //Eventos touch
        cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                cc.log(event.getCurrentTarget());
                return true;
            },
			onTouchMoved: this.moverConejo
			
		}, this);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

