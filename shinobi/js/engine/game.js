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
