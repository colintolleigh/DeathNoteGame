import * as PIXI from 'pixi.js';

// Import images
import BackImg from './images/bg1.png';

//Import class
import { Background } from './Objects/background';

export class Game {
    //Globals
    public pixiWidth = 800;
    public pixiHeight = 450;

    private pixi : PIXI.Application;
    private loader : PIXI.Loader;

    private background : Background;

    constructor (){
        // Create PIXI Stage
        this.pixi = new PIXI.Application({width: this.pixiWidth, height: this.pixiHeight});
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        // Create Loader
        this.loader = new PIXI.Loader();
        this.loader
            .add('groundTexture', BackImg)
        this.loader.load(()=>this.loadCompleted());
    }

    private loadCompleted(){
        // Adding background to game
        this.background = new Background(this.loader.resources["backgroundTexture"].texture!, this.pixiHeight, this.pixiWidth);
        this.pixi.stage.addChild(this.background);
        
        // Update
    }
}

new Game();