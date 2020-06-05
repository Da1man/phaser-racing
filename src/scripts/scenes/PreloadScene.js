import Phaser from "phaser";
import LoadingBar from "../classes/LoadingBar";
import tileSetPng from "../../assets/tileset.png";
import tileMapJson from "../../assets/tilemap";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload')
    }

    preload() {
        this.add.sprite(0, 0, 'bg').setOrigin(0)
        this.LoadingBar = new LoadingBar(this)
        this.load.spritesheet('tileset', tileSetPng, {frameWidth: 64, frameHeight: 64})
        this.load.tilemapTiledJSON('tilemap', tileMapJson);
    }

    create() {
        console.log('PreloadScene create')
        this.scene.start('Game')
    }
}
