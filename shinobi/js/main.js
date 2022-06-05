'use strict'


addEventListener( 'load', () => {


	const game = new Game( );

	const map = [
			[11,11,11,11,11,11,11,11,11,11],
			[11,10,10,10,10,10,10,10,10,11],
			[11, 4, 4, 4, 4, 4, 4, 4, 4,11],
			[11, 4,11, 4, 4,11,11,11, 4,11],
			[11, 4,11,11,11,11,10,10, 4,11],
			[11, 4,11,10,10,11, 4, 4, 4,11],
			[11, 4,11, 4, 4,11,11,11, 4,11],
			[11, 4, 9, 4, 4, 9,10,11, 4,11],
			[11, 4, 4, 4, 4, 4, 4,11, 4,11],
			[11,11,11,11,11,11,11,11,11,11]
		];

const TILE_SIZE = 32;

const WALKING_SPEED=4;

const scene = new Scene();

const tilemap = new Tilemap( 'img/tile.png' );

tilemap.data = map;

tilemap.x = TILE_SIZE*4 - TILE_SIZE/2;
tilemap.y = TILE_SIZE*3 - TILE_SIZE/2;

tilemap.obstacles = [0,3,6,7,8,9,10,11];

scene.add(tilemap);

const start = new Tile( 'img/start.png' );

start.x = TILE_SIZE;
start.y = TILE_SIZE*2;

tilemap.add( start );

const goal = new Tile( 'img/goal.png' )

goal.x = TILE_SIZE*8;
goal.y = TILE_SIZE*8;

tilemap.add( goal );

const hapitaso = new CharacterTile('img/hapitaso.png');

hapitaso.x = hapitaso.y = TILE_SIZE*5 - TILE_SIZE/2;

hapitaso.isSynchronize = false;

tilemap.add(hapitaso);

let toggleForAnimation = 0;

let hasDisplayedGoalText = false;

scene.onenterframe = () => {

	if ( (tilemap.x - TILE_SIZE/2 ) % TILE_SIZE === 0 && ( tilemap.y - TILE_SIZE/2 ) % TILE_SIZE === 0) {

	tilemap.vx = tilemap.vy = 0;

	hapitaso.animation = 1;

	if ( hapitaso.isOverlapped( goal ) ) {

		if ( !hasDisplayedGoalText ) {

			const goalText =  new Text( 'congratulations!' );

			goalText.size = 50;

			goalText.x = 15;
			goalText.y = 135;

			scene.add( goalText );

			hasDisplayedGoalText = true;
		}

	}

  if(game.input.left) {
		tilemap.vx = WALKING_SPEED;
		hapitaso.direction = 1;
	}
  else if (game.input.right) {
		tilemap.vx = -1 * WALKING_SPEED;
		hapitaso.direction = 2;
	}
  else if (game.input.up) {
		tilemap.vy = WALKING_SPEED;
		hapitaso.direction = 3
	}
  else if (game.input.down) {
		tilemap.vy = -1 * WALKING_SPEED;
		hapitaso.direction = 0;
	}

	const hapitasoCoordinateAfterMoveX = hapitaso.mapX - tilemap.vx/WALKING_SPEED;
	const hapitasoCoordinateAfterMoveY = hapitaso.mapY - tilemap.vy/WALKING_SPEED;

	if ( tilemap.hasObstacle( hapitasoCoordinateAfterMoveX,hapitasoCoordinateAfterMoveY ) ) tilemap.vx = tilemap.vy = 0;
		}

	else if ( ( tilemap.x + TILE_SIZE/2 ) % ( TILE_SIZE/2 ) === 0 && ( tilemap.y + TILE_SIZE/2 ) % ( TILE_SIZE/2 ) === 0) {

		toggleForAnimation ^= 1;

		if ( toggleForAnimation === 0 ) hapitaso.animation = 2;
		else hapitaso.animation = 0;
	}
}

game.add(scene);

game.start();

} );
