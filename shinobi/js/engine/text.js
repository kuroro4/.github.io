'use strict'

class Text {

constructor( text ) {

  this.text = text;

  this.font = "游ゴシック体, 'Yu Gothic', YuGothic, sans-serif";

  this.x = this.y = 0;

  this.vx = this.vy = 0;

  this.baseline = 'top';

  this.size = 10;

  this.color = '#FFD400';

  this.weight = 'normal';

  this._width = 0;

  this.height = 0;
}

update( canvas ) {

  const _ctx = canvas.getContext( '2d' );

  _ctx.font = `${this.weight} ${this.size}px ${this.font}`;

  _ctx.fillStyle = this.color;

  _ctx.textBaseline = this.baseline

  this._width = _ctx.measureText( this.text ).width;

  this._height = Math.abs( _ctx.measureText( this.text ).actualBoundingBoxAscent ) + Math.abs( _ctx.measureText( this.text ).actualBoundingBoxDescent );

  this.render( canvas, _ctx );

  this.onenterframe();

  this.x += this.vx;
  this.y += this.vy;
}

render( canvas, ctx ) {

  if ( this.x < -1 * this._width || this.x > canvas.width ) return;
  if ( this.y < -1 * this._height || this.y > canvas.height + this._height ) return

  ctx.fillText( this.text, this.x, this.y );
}
  onenterframe(){}
}
