// Import PIXI
import * as PIXI from 'pixi.js';

// Import images
import CharacterImg from '../../images/char1.png';
import BackgImg from '../../images/bg1.png';
import WorldImg from '../../images/groundImage.png';


// Import classes
import { Character } from './character';
import { World } from './world';
import { Background } from './background';

export class Game{
    // Globals
    public pixiWidth = 800;
    public pixiHeight = 450;

    private pixi : PIXI.Application;
    private loader : PIXI.Loader;

    private character : Character;
    private world : World;
    private background : Background;

    constructor(){
        // Create PIXI Stage
        this.pixi = new PIXI.Application({width: this.pixiWidth, height: this.pixiHeight});
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        // Create Loader
        this.loader = new PIXI.Loader();
        this.loader
            .add('charTexture', CharacterImg)
            .add('backgroundTexture', BackgImg)
            .add('groundTexture', WorldImg)
        this.loader.load(()=>this.loadCompleted());
    }

    private loadCompleted(){
        // Adding background to game
        this.background = new Background(this.loader.resources["backgroundTexture"].texture!, this.pixiWidth, this.pixiHeight);
        this.pixi.stage.addChild(this.background);

        // Adding ground to game
        this.world = new World(this.loader.resources["groundTexture"].texture!);
        this.pixi.stage.addChild(this.world);

        
        // // Adding player to game
        // this.character = new Character(this.loader.resources["charTexture"].texture!);
        // this.pixi.stage.addChild(this.character);
        
        // Update
        this.pixi.ticker.add((delta) => this.update(delta));
    }

    private update(delta: number){
    //     // Update player
    //     this.character.update(delta);

    //     // Vertical collision player with ground
    //     if(this.character.collisionVerticalTop(this.world) && this.character.y + this.character.height < this.world.y + this.character.yspeed){
    //         this.character.y = this.world.y - this.character.height;
    //         this.character.yspeed = 0;
    //     }

    //     // Vertical collision player with block
    //     if(this.character.collisionVerticalTop(this.block) && this.character.y + this.character.height < this.block.y + this.character.yspeed){
    //         this.character.y = this.block.y - this.character.height;
    //         this.character.yspeed = 0;
    //     }

    //     // Horizontal collision player with ground & block
    //     this.character.collisionHorizontal(this.world);
    //     this.character.collisionHorizontal(this.block);

    //     // Vertical bottom collision player with ground & block
    //     this.character.collisionVerticalBottom(this.block);
    //     this.character.collisionVerticalBottom(this.world);
    }
}

new Game();