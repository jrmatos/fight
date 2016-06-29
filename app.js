(function() {
    
//    console.log = function () {};

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function testCollisionRect(rect1, rect2) {
            return rect1.x <= rect2.x + rect2.width
            && rect2.x <= rect1.x + rect1.width
            && rect1.y <= rect2.y + rect2.height
            && rect2.y <= rect1.y + rect1.height;
    }

    window.onload = function () {

            var canvas = document.getElementById('canvas'),
                ctx = canvas.getContext('2d'),
                WIDTH = 1530,
                HEIGHT = 700,
                BORDER = 20,
                GAMEOVER = false,
                entities = [], // all draw methods to call them once
                loopInterval = false,
                winner = 0,
                loser = 0;

            canvas.width = WIDTH;
            canvas.height = HEIGHT;	
            
            // -----------------------------------------------------------
            // Util functions
            function checkMovement(obj, movement) {
                console.log(obj.x, obj.speed, WIDTH);
                switch(movement) {
                    case 'backward':
                        return ((obj.x - obj.speed) >= 0) ? true : false;                
                        break;
                    case 'forward':
                        return ((obj.x + obj.speed + obj.width) <= WIDTH) ? true : false;                
                        break;
                }                
            }

            // -----------------------------------------------------------
            // Background class
            function Background(src) {
                
                this.bg_image = new Image();
                this.bg_image.src = src;
                
                this.update = function () {
                    // console.log('updating background...');	
                };
                this.draw = function () {		
                    ctx.drawImage(this.bg_image, 0, 0, WIDTH, HEIGHT);  			
                };
            }	

            var bg = new Background('img/bg.gif');
            // -----------------------------------------------------------

            // -----------------------------------------------------------	
            // Player class
            function Player(name, imageSource, key_backward, key_forward) {

                this.name = name;                
                this.x = 10;
                this.y = HEIGHT - 250;
                this.key_backward = key_backward;
                this.key_forward = key_forward;
                this.speed = 20;
                this.step = 0;
                
                this.movements = {
                    initial: {
                        x: 35,
                        y: 325
                    },
                    runningForward: {
                        x: 70,
                        y: 795
                    },
                    runningBackward: {
                        x: 210,
                        y: 5450
                    }
                };                
                
                this.spriteX = this.movements.initial.x;
                this.spriteY = this.movements.initial.y;
                
                this.spriteWidth = 140;
                this.spriteHeight = 125;
                this.width = this.spriteWidth * 2;
                this.height = this.spriteHeight * 2;
                
                this.image = new Image();
                this.image.src = imageSource;

                this.initialPosition = function () {
                    this.spriteX = this.movements.initial.x;
                    this.spriteY = this.movements.initial.y;
                };
                                                
                this.moveBackward = function () {                    
                    if(checkMovement(this, 'backward')) {
                        this.x -= this.speed;                                          
                    }
                    this.spriteX = this.movements.runningBackward.x;
                    this.spriteY = this.movements.runningBackward.y; 
                };
                
                this.moveForward = function () {                    
                    if(checkMovement(this, 'forward')) {                    
                        this.x += this.speed;                        
                    }                    
                    this.spriteX = this.movements.runningForward.x;
                    this.spriteY = this.movements.runningForward.y;  
                };

                this.update = function () {
                };

                this.draw = function () {

                    // 1- imagem
                    // 2- x da imagem
                    // 3- y da imagem
                    // 4- width do sprite
                    // 5- height do sprite
                    // 6- x do canvas
                    // 7- y do canvas
                    // 8- width do objeto no canvas
                    // 9- height do objeto no canvas

                    ctx.drawImage(this.image, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);  	

                };
            }


            // -----------------------------------------------------------
            // creating the players
            var player1 = new Player('Alucard', 'img/characters/alucardfinal.png', 65, 68);
//            var player2 = new Player('Player2', 'yellow', 'right', 38, 40);	
            // -----------------------------------------------------------	

            // -----------------------------------------------------------
            // prevent mouse right click
            window.oncontextmenu = function (event) {
                event.preventDefault();
            };
            
            
            
            document.querySelector('body').addEventListener('keydown', function (e) {
                console.log(e.which);
                
                if(e.which === 65) {
                    player1.moveBackward();
                }
                
                if(e.which === 68) {
                    player1.moveForward();
                }
                
            });
            
            document.querySelector('body').addEventListener('keyup', function (e) {
                console.log(e.which);
                
                player1.initialPosition();
                
            });
            
            
            
            
            
            // -----------------------------------------------------------	        
            // adding entities into a single array
            entities.push(bg);
            entities.push(player1);

            // -----------------------------------------------------------
            // game loop
            function gameLoop() {                
                entities.forEach(function (value) {
                    value.update();
                    value.draw();
                });                
            }
            // -----------------------------------------------------------

            // running
            loopInterval = setInterval(gameLoop, 40);
    };
})();