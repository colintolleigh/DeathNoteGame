// Import PIXI
import * as PIXI from 'pixi.js';

export class Enemy extends PIXI.Sprite {
    //Globals for enemy
    public xspeed = 0;
    public yspeed = 2;
    private sprite: PIXI.Sprite;
    private health: number;

    constructor(texture: PIXI.Texture, initialHealth: number, x: number, y: number){
        super(texture);
        this.sprite.position.set(x, y);
        this.health = initialHealth;
    }

    getSprite(): PIXI.Sprite {
        return this.sprite;
    }

    takeDamage(damage: number): void {
        this.health -= damage;

        // Check if the enemy is defeated
        if (this.health <= 0) {
            this.defeated();
        }
    }

    defeated(): void {
        // Handle defeated state (e.g., play an animation, remove sprite, etc.)
        this.sprite.visible = false; // Hide the sprite when defeated
    }

}


// Example usage
const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);

// Load enemy texture (replace 'path/to/enemyTexture.png' with the actual path to your enemy texture)
PIXI.Loader.shared.add('enemyTexture', 'path/to/enemyTexture.png').load((loader, resources) => {
    const enemyTexture = resources.enemyTexture.texture;

    // Create an enemy instance
    const enemy = new Enemy(enemyTexture, 100, 400, 300);

    // Add the enemy sprite to the stage
    app.stage.addChild(enemy.getSprite());

    // Example: simulate player dealing damage to the enemy
    setTimeout(() => {
        enemy.takeDamage(50); // Deal 50 damage to the enemy
    }, 2000);
});
