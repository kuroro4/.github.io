'use strict'

class Game{
  constructor(width,height){
  this.canvas=document.createElement('canvas');
  document.body.appendChild(this.canvas);
  this.canvas.width=width||320;
  this.canvas.height=height||320;

  this.scenes = [];

  this.currentScene;

  this.input = {};

  this._keys = {};
  }

start(){

  this.keybind('up','ArrowUp');
  this.keybind('down','ArrowDown');
  this.keybind('right','ArrowRight');
  this.keybind('left','ArrowLeft');

  this.currentScene = this.currentScene || this.scenes[0];

const _resizeEvent = () => {

  const _ratio = Math.min( innerWidth / this, innerHeight / this.canvas.height );
    this.canvas.style.width = this.canvas.width*_ratio + 'px';
    this.canvas.style.height = this.canvas.height*_ratio + 'px';
}

addEventListener( 'reresize', _resizeEvent, { passive: true } );

_resizeEvent();

  this._mainLoop();

  this._setEventListener();
}

_setEventListener(){

const _keyEvent=e=>{

e.preventDefault();

for(let key in this._keys){

  switch(e.type){
  case 'keydown':
    if(e.key===this._keys[key])this.input[key]=true;
  break;

  case 'keyup':
    if(e.key===this._keys[key])this.input[key]=false;
  break;
  }
}

}

addEventListener('keydown',_keyEvent,{passive:false});

addEventListener('keyup',_keyEvent,{passive:false});



const _touchEvent = e => {

e.preventDefault();

const _touches = e.changedTouches[0];

const _rect = _touches.target.getBoundingClientRect();

const _fingerPosition = {
  x: ( _touches.clientX - _rect.left ) / _rect.width * this.canvas.width,
  y: ( _touches.clientY - _rect.top ) / _rect.height * this.canvas.height
};

const _eventType = e.type;

this.currentScene.assignTouchevent( _eventType, _fingerPosition );
}

this.canvas.addEventListener( 'touchstart', _touchEvent, { passive: false } );

this.canvas.addEventListener( 'touchmove', _touchEvent, { passive: false } );

this.canvas.addEventListener( 'touchend', _touchEvent, { passive: false } );
}


_mainLoop(){
  const ctx=this.canvas.getContext('2d');

  ctx.fillStyle='#000000';

  ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

  this.currentScene.update();

  for(let i=0; i<this.currentScene.objs.length; i++){

    this.currentScene.objs[i].update(this.canvas);
  }

  requestAnimationFrame(this._mainLoop.bind(this));
  }

add(scene){

  if(scene instanceof Scene)this.scenes.push(scene);

  else console.error('Gameに追加できるのはSceneだけだよ！');

  }

keybind(name,key){
  this._keys[name]=key;
  this.input[name]=false;
}
}
