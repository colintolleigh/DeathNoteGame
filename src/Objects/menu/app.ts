// Import PIXI
import * as PIXI from 'pixi.js';

// Import Images
import bg from "../../images/bg1.png";
import collision from "../../images/collisionButton.png";
import animation from "../../images/animationButton.png";
import enemies from "../../images/enemiesButton.png";


export class App {
    // Globals
    private pixiWidth = 800;
    private pixiHeight = 700;
    private pixi: PIXI.Application;
    private loader: PIXI.Loader;

    constructor() {
        // Create PIXI Stage
        this.pixi = new PIXI.Application({
            width: this.pixiWidth,
            height: this.pixiHeight
        });

        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        this.collisionPrototype = this.collisionPrototype.bind(this);
        this.animationPrototype = this.animationPrototype.bind(this);
        this.enemiesPrototype = this.enemiesPrototype.bind(this);

        // Create Loader
        this.loader = new PIXI.Loader();
        this.loader
            .add('backgroundTexture', bg)
            .add('collisionTexture', collision)
            .add('animationTexture', animation)
            .add('enemiesTexture', enemies)
        this.loader.load(() => this.loadCompleted());
    }


    private loadCompleted() {
        // Adding background for the menu
        let background = new PIXI.Sprite(this.loader.resources['backgroundTexture'].texture!);
        this.pixi.stage.addChild(background);
        background.width = 900;
        background.height = 800;

        // Adding collision prototype button
        let collisionProto = new PIXI.Sprite(this.loader.resources['collisionTexture'].texture!);
        this.pixi.stage.addChild(collisionProto);
        collisionProto.interactive = true;
        collisionProto.buttonMode = true;
        collisionProto.on('pointerdown', this.collisionPrototype);
        collisionProto.anchor.set(0.5);
        collisionProto.y = 120;
        collisionProto.x = 400;
        collisionProto.height = 100;
        collisionProto.width = 400;

        // Adding animation prototype button
        let animationProto = new PIXI.Sprite(this.loader.resources['animationTexture'].texture!);
        this.pixi.stage.addChild(animationProto);
        animationProto.interactive = true;
        animationProto.buttonMode = true;
        animationProto.on('pointerdown', this.animationPrototype);
        animationProto.anchor.set(0.5);
        animationProto.y = 290;
        animationProto.x = 400;
        animationProto.height = 100;
        animationProto.width = 400;

        // Adding enemies button
        let enemiesProto = new PIXI.Sprite(this.loader.resources['enemiesTexture'].texture!);
        this.pixi.stage.addChild(enemiesProto);
        enemiesProto.interactive = true;
        enemiesProto.buttonMode = true;
        enemiesProto.on('pointerdown', this.enemiesPrototype);
        enemiesProto.anchor.set(0.5);
        enemiesProto.y = 470;
        enemiesProto.x = 400;
        enemiesProto.height = 100;
        enemiesProto.width = 400;
    }

    private collisionPrototype() {
        window.location.href = "collision.html";
    }

    private animationPrototype() {
        window.location.href = "animation.html";
    }

    private enemiesPrototype() {
        window.location.href = "enemies.html";
    }
}

new App();