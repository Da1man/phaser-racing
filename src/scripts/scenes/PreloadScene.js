import Phaser from "phaser";
import LoadingBar from "../classes/LoadingBar";
import tileSetPng from "../../assets/tileset.png";
import tileMapJson from "../../assets/tilemap";
import objectsPng from '../../assets/objects.png';
import objectsJson from '../../assets/objects';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload')
    }

    preload() {
        this.add.sprite(0, 0, 'bg').setOrigin(0);
        this.LoadingBar = new LoadingBar(this)
        this.load.spritesheet('tileset', tileSetPng, {frameWidth: 64, frameHeight: 64})
        this.load.tilemapTiledJSON('tilemap', tileMapJson);
        this.load.atlas('objects', objectsPng, objectsJson)
    }

    create() {
        console.log('PreloadScene create')
        this.scene.start('Start')
    }
}
