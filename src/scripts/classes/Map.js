export default class Map {
    constructor(scene){
        this.scene = scene;
        this.init();
    }

    init() {
        this.tilemap = this.scene.make.tilemap({key: 'tilemap'})
        this.tileset = this.tilemap.addTilesetImage('tileset', 'tileset',)
    }
}
