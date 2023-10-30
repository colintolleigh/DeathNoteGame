import * as PIXI from "pixi.js";

// Import images
import BackgroundImg from "./images/bg1.png";

export class Game {
  private pixi: PIXI.Application;
  private loader: PIXI.Loader;

  constructor() {
    // Create PIXI Stage
    this.pixi = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.pixi.stage.interactive = true;
    this.pixi.stage.hitArea = this.pixi.renderer.screen;
    document.body.appendChild(this.pixi.view);

    // Create Loader
    this.loader = new PIXI.Loader();
    this.loader.add("backgroundTexture", BackgroundImg);
    this.loader.load(() => this.loadCompleted());
  }

  private loadCompleted() {
    const background = new PIXI.Sprite(
      this.loader.resources["backgroundTexture"].texture
    );
    background.width = window.innerWidth;
    background.height = window.innerHeight;
    this.pixi.stage.addChild(background);
    // Update
  }
}

new Game();
