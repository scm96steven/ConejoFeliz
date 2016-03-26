
var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    ups:3,
    gameScore:0,
    zanahorias: [],
     bombas: [],
        random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    function(location, event){
        
        
        
        
        
        },
    
    onTouch: function(touch, event) {
        var size = cc.winSize;
                cc.log(touch.getLocation());
                
                return true;
            },
    moverConejo: function(location, event){
          
        var score;
        
        var size = cc.winSize;
		var  juego = event.getCurrentTarget();
		var ubicacion = location.getLocation();
        
             if(ubicacion.x<275)
                ubicacion.x = 275;
        
             if(ubicacion.x > 675)
                ubicacion.x = 675;
        
		juego.sprConejo.setPosition(ubicacion.x, size.height * 0.15);
		
        

	},
    creaZanahorias: function(){
     var size = cc.winSize;
        var columnas =[300, 325, 375, 425, 475, 525, 575, 625, 675]
        
        console.log("agregando zanahoria");
        
        var zanahoria = new cc.Sprite(res.zanahoria_png);
        var tamano = zanahoria.getContentSize().width;
        zanahoria.setPosition(columnas[this.random(0, 8)], size.height);
        zanahoria.setScale(0.7,0.7);
        this.addChild(zanahoria, 1);
        zanahoria.setAnchorPoint(1, 1);
        
        //Movimiento de zanahorias
		var moveto = cc.moveTo(1, zanahoria.getPositionX(), 0);
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
        
      //movimiento de bombas
		var moveto = cc.moveTo(1, bomba.getPositionX(), 0);
		bomba.runAction(moveto);
        this.bombas.push(bomba);
		
	},
    score: function() {
        
        
        for(var bomba of this.bombas)
        {
            var bombaRect = bomba.getBoundingBox();
            var conejoRect = this.sprConejo.getBoundingBox();
            
            if(cc.rectIntersectsRect(bombaRect, conejoRect)){
                bomba.setVisible(false);
                this.ups--;
                cc.log("Comiendo Bomba");
                
            }
        }
        
        for(var zanahoria of this.zanahorias)
        {
            var zanahoriaRect = zanahoria.getBoundingBox();
            var conejoRect = this.sprConejo.getBoundingBox();
            
            if(cc.rectIntersectsRect(zanahoriaRect,conejoRect)){
                zanahoria.setVisible(false);
                this.gameScore+=1;
                cc.log("Comiendo Zanahoria");
                cc.log(this.gameScore);
            }
        }
        if(this.ups<=0){
            alert("PERDISTE!, tu puntuacion fue:"+ this.gameScore);
            this.gameScore=0;
            this.ups=3;
            this.zanahorias=[];
            this.bombas=[];
        }
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
        
        //Evento automatizado para que agregue zanahorias, bombas y chequee las colisiones.
        this.schedule(this.creaZanahorias,1);
         this.schedule(this.creaBombas,4);
         this.schedule(this.score,0.3);

        //Eventos touch
        cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouch,
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

