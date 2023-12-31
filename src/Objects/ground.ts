// Import PIXI
import * as PIXI from 'pixi.js';

export class Ground extends PIXI.Sprite{

    constructor(texture: PIXI.Texture){
        super(texture);

        // Setting the start position
        this.x = 0;
        this.y = 400;

        // Setting the width & height
        this.width = 800;
        this.height = 70;
    }
}