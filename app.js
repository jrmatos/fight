console.log = function () {};

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
		
	// loading images
	bg_image = new Image();
	bg_image.src = 'img/bg.gif';
        
        player = new Image();
	player.src = 'img/characters/alucardfinal.png';

	canvas.width = WIDTH;
	canvas.height = HEIGHT;	
	
	// -----------------------------------------------------------
	// Background class
	function Background(style) {
            this.update = function () {
                // console.log('updating background...');	
            };
            this.draw = function () {		
                ctx.drawImage(bg_image, 0, 0, WIDTH, HEIGHT);  			
            };
	}	

	var bg = new Background();
	// -----------------------------------------------------------


	// -----------------------------------------------------------	
	// Player class
	function Player(name, style, side, key_up, key_down) {

		this.name = name;
		this.style = style;
		this.width = 100;
		this.height = 100;
		this.side = side;
		this.x = (side === 'left') ? 10 : WIDTH - 200;
		this.y = HEIGHT -120;
		this.key_up = key_up;
		this.key_down = key_down;
		this.score = 0;

		this.update = function () {
		};

		this.draw = function () {
			ctx.fillStyle = this.style;
			ctx.font = '16px Arial';
                        
                        // 1- imagem
                        // 2- x da imagem
                        // 3- y da imagem
                        // 4- width do sprite
                        // 5- height do sprite
                        // 6- x do canvas
                        // 7- y do canvas
                        // 8- width do objeto no canvas
                        // 9- height do objeto no canvas
                        
			ctx.drawImage(player, 195, 3456, 125, 125, 0, 450, 125 * 2, 125 * 2);  	


		}
	}

	players = [ 
		new Player('Player1', 'yellow', 'left', 87, 83),
		new Player('Player2', 'yellow', 'right', 38, 40)
	];
	// -----------------------------------------------------------	

	// -----------------------------------------------------------
	// prevent mouse right click
	window.oncontextmenu = function (event) {
		// event.preventDefault();
	}
	// -----------------------------------------------------------	

	// -----------------------------------------------------------
	// game loop
	function gameLoop() {

		// bg
		bg.draw();
                players[0].update();
                players[0].draw();
                players[1].update();
                players[1].draw();
                
	}
	// -----------------------------------------------------------

	// running
	loopInterval = setInterval(gameLoop, 40);
};
