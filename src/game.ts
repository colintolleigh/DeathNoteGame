import * as PIXI from "pixi.js";

// Import images
import BackgroundImg from "./images/bg1.png";
import PlayerImg from "./images/player.png";

const moveSpeed = 5; // Adjust as needed
const jumpForce = -10; // Adjust as needed

export class Game {
  private pixi: PIXI.Application;
  private loader: PIXI.Loader;
  private character: PIXI.Sprite;
  private gravity: number = 0.2;
  private velocityY: number = 0;
  private keys: { [key: string]: boolean } = {};
  private isJumping: boolean = false;

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
    this.loader
      .add("backgroundTexture", BackgroundImg)
      .add("playerTexture", PlayerImg);
    this.loader.load(() => this.loadCompleted());
  }

  private loadCompleted() {
    const background = new PIXI.Sprite(
      this.loader.resources["backgroundTexture"].texture
    );
    background.width = window.innerWidth;
    background.height = window.innerHeight;
    this.pixi.stage.addChild(background);

    // Create a character instance and add it to the stage
    this.character = new PIXI.Sprite(
      this.loader.resources["playerTexture"].texture
    );
    this.character.anchor.set(0.5);
    this.character.x = this.pixi.view.width / 4;
    this.character.y = this.pixi.view.height - this.character.height / 2;
    this.pixi.stage.addChild(this.character);

    // Listen for keyboard input
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.pixi.ticker.add(this.update.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent) {
    this.keys[event.key] = true;
  }

  private handleKeyUp(event: KeyboardEvent) {
    this.keys[event.key] = false;
  }

  private update() {
    // Character movement
    if (this.keys["w"] && !this.isJumping) {
      this.velocityY = jumpForce;
      this.isJumping = true;
    }
    if (this.keys["a"]) {
      this.character.x -= moveSpeed;
    }
    if (this.keys["d"]) {
      this.character.x += moveSpeed;
    }
    if (this.keys["s"]) {
      this.character.y += moveSpeed;
    }

    // Apply gravity
    this.velocityY += this.gravity;
    this.character.y += this.velocityY;

    // Collision with the ground
    if (this.character.y >= this.pixi.view.height - this.character.height / 2) {
      this.character.y = this.pixi.view.height - this.character.height / 2;
      this.isJumping = false;
    }

    // Render the changes
    this.pixi.renderer.render(this.pixi.stage);
  }
}

new Game();
