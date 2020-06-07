const GRASS_FRICTION = 0.3;
const ROADS_FRICTION = {
  road: 1,
  ground: 0.5,
  sand: 0.4,
};

export default class Map {
  constructor(scene) {
    this.scene = scene;
    this.init();
    this.create();
  }

  init() {
    this.tilemap = this.scene.make.tilemap({key: 'tilemap'});
    this.tileset = this.tilemap.addTilesetImage('tileset', 'tileset', 64, 64, 0, 1);
  }

  create() {
    this.createLayers();
    this.createCollisions();
  }

  createLayers() {
    this.tilemap.createStaticLayer('grass', this.tileset);
    this.tilemap.createStaticLayer('road', this.tileset);
    this.tilemap.createStaticLayer('sand', this.tileset);
    this.tilemap.createStaticLayer('ground', this.tileset);
  }

  createCollisions() {
    this.tilemap.findObject('collisions', collision => {
      const sprite = this.scene.matter.add.sprite(collision.x + collision.width / 2, collision.y - collision.height / 2, 'objects', collision.name)
      // sprite.setOrigin(0,1)
      sprite.setStatic(true)
    })
  }

  getPlayerPosition() {
    return this.tilemap.findObject('player', position => {
      return position.name === 'player'
    })
  }

  getTileFriction(car) {
    for (let road in ROADS_FRICTION) {
      let tile = this.tilemap.getTileAtWorldXY(car.x, car.y, false, this.scene.cameras.main, road);
      if (tile) {
        return ROADS_FRICTION[road];
      }
    }
    return GRASS_FRICTION
  }
}
