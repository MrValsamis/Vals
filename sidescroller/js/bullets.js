let bullet = [];

const b = {
  dmgScale: null, //scales all gun damage from momentum, but not raw .dmg //set in levels.setDifficulty
  gravity: 0.0006, //most other bodies have   gravity = 0.001
  //variables use for gun mod upgrades
  modCount: null,
  modFireRate: null,
  modExplosionRadius: null,
  modBulletSize: null,
  modEnergySiphon: null,
  modHealthDrain: null,
  modNoAmmo: null,
  modBulletsLastLonger: null,
  modIsImmortal: null,
  modSpores: null,
  AoEImmunity: null,
  makeDroneOnDamage: null,
  extraDmg: null,
  annihilation: null,
  fullHeal: null,
  setModDefaults() {
    b.modCount = 0;
    b.modFireRate = 1;
    b.modExplosionRadius = 1;
    b.AoEImmunity = false;
    b.modBulletSize = 1;
    b.makeDroneOnDamage = false;
    b.modEnergySiphon = 0;
    b.modHealthDrain = 0;
    b.modNoAmmo = 0;
    b.modBulletsLastLonger = 1;
    b.modIsImmortal = false;
    b.modSpores = 0;
    b.extraDmg = 0;
    b.annihilation = false;
    b.fullHeal = false;
    mech.throwChargeRate = 2;
    mech.throwChargeMax = 50;
    for (let i = 0; i < b.mods.length; i++) {
      b.mods[i].have = false;
    }
  },
  mods: [{
      name: "depleted uranium rounds",
      description: "your <strong class='color-b'>bullets</strong> are larger and do more physical <span class='color-d'>damage</span>",
      have: false, //0
      effect: () => {
        //good for guns that do mostly projectile damage:
        //testing at 1.08:  spray(point blank)(+0.25), one shot(+0.16), wave beam(point blank)(+0.14)
        b.modBulletSize = 1.07;
      }
    },
    {
      name: "auto-loading heuristics",
      description: "your rate of fire is 15% higher",
      have: false, //1
      effect: () => { //good for guns with extra ammo: needles, M80, rapid fire, flak, super balls
        b.modFireRate = 0.85
      }
    },
    {
      name: "desublimated ammunition",
      description: "use 50% less <strong class='color-b'>ammo</strong> when <strong>crouching</strong>",
      have: false, //2
      effect: () => { //good with guns that have less ammo: one shot, grenades, missiles, super balls, spray
        b.modNoAmmo = 1
      }
    },
    {
      name: "Lorentzian topology",
      description: "your <strong class='color-b'>bullets</strong> last 40% longer",
      have: false, //3
      effect: () => { //good with: drones, super balls, spore, missiles, wave beam(range), rapid fire(range), flak(range)
        b.modBulletsLastLonger = 1.40
      }
    },
    {
      name: "anti-matter cores",
      description: "the radius of your <strong class='color-e'>explosions</strong> is doubled<br><span style='opacity:0.3;'>be careful</span>",
      have: false, //4
      effect: () => { //at 1.4 gives a flat 40% increase, and increased range,  balanced by limited guns and self damage
        //testing at 1.3: grenade(+0.3), missiles, flak, M80
        b.modExplosionRadius = 1.8; //good for guns with explosions
      }
    },
    {
      name: "ceramic plating",
      description: "you take no damage from area effects<br>immune to <strong class='color-e'>explosions</strong> and enemy fields",
      have: false, //5
      effect: () => {
        b.AoEImmunity = true; //good for guns with explosions
      }
    },
    {
      name: "ablative synthesis",
      description: "after taking <span class='color-d'>damage</span>, there is a chance that your damaged parts will be rebuilt as <strong class='color-b'>drones</strong>",
      have: false, //6
      effect: () => { //makes dangerous situations more survivable
        b.makeDroneOnDamage = true;
      }
    },
    {
      name: "zoospore vector",
      description: "when an enemy <span style='color: #888;'>dies</span> it has a 20% chance to release <strong class='color-s'>spores</strong>",
      have: false, //7
      effect: () => { //good late game maybe?
        b.modSpores = 0.20;
      }
    },
    {
      name: "field siphon",
      description: "regenerate <span class='color-f'>field energy</span> proportional to your <span class='color-d'>damage</span> done",
      have: false, //8
      effect: () => { //good with laser, and all fields

        b.modEnergySiphon = 0.2;
      }
    },
    {
      name: "entropy transfer",
      description: "<span class='color-h'>heal</span> proportional to your <span class='color-d'>damage</span> done",
      have: false, //9
      effect: () => { //good with guns that overkill: one shot, grenade
        b.modHealthDrain = 0.01;
      }
    },
    {
      name: "quantum immortality",
      description: "after you <strong style='color: #606;'>die</strong> continue in an <em>alternate reality</em><br>guns, ammo, and field are randomized",
      have: false, //10
      effect: () => {
        b.modIsImmortal = true;
      }
    },
    {
      name: "fluoroantimonic acid",
      description: "your bullets do extra chemical <span class='color-d'>damage</span> each time they make contact",
      have: false, //11
      effect: () => { //good with guns that fire many bullets at low speeds, minigun, drones, junk-bots, shotgun, superballs, wavebeam
        b.extraDmg = 0.1
      }
    },
    {
      name: "annihilation",
      description: "after you touch any enemy, they are <strong class='color-l'>annihilated</strong><br><em>touching enemies damages you, but destroys them</em>",
      have: false, //12
      effect: () => { //good with mods that heal: superconductive healing, entropy transfer 
        b.annihilation = true
      }
    },
    {
      name: "recursive healing",
      description: "<span class='color-h'>heals</span> bring you to full health",
      have: false, //13
      effect: () => { // good with ablative synthesis, electrostatic field
        b.fullHeal = true
      }
    },
    {
      name: "superconductive rail gun",
      description: "throw blocks at very high speeds<br><em>to charge a throw, hold right click while holding a block<br>release right click to fire</em>",
      have: false, //14
      effect: () => { // good with ablative synthesis, electrostatic field
        b.fullHeal = true
        mech.throwChargeRate = 4;
        mech.throwChargeMax = 150;
      }
    },
  ],
  giveMod(i) {
    b.mods[i].effect(); //give specific mod
    b.modCount++
    b.mods[i].have = true
    game.updateModHUD();
  },
  activeGun: null, //current gun in use by player
  inventoryGun: 0,
  inventory: [], //list of what guns player has  // 0 starts with basic gun
  giveGuns(gun = "all", ammoPacks = 2) {
    if (gun === "all") {
      b.activeGun = 0;
      b.inventoryGun = 0;
      for (let i = 0; i < b.guns.length; i++) {
        b.guns[i].have = true;
        b.guns[i].ammo = b.guns[i].ammoPack * ammoPacks;
        b.inventory[i] = i;
      }
    } else {
      if (!b.guns[gun].have) b.inventory.push(gun);
      b.activeGun = gun;
      b.guns[gun].have = true;
      b.guns[gun].ammo = b.guns[gun].ammoPack * ammoPacks;
    }
    game.makeGunHUD();
  },
  fire() {
    if (game.mouseDown && mech.fireCDcycle < mech.cycle && (!(keys[32] || game.mouseDownRight) || mech.fieldFire) && b.inventory.length) {
      if (b.guns[b.activeGun].ammo > 0) {
        b.guns[b.activeGun].fire();
        if (b.modNoAmmo && mech.crouch) {
          if (b.modNoAmmo % 2) {
            b.guns[b.activeGun].ammo--;
            game.updateGunHUD();
          }
          b.modNoAmmo++ //makes the no ammo toggle off and on
        } else {
          b.guns[b.activeGun].ammo--;
          game.updateGunHUD();
        }
      } else {
        mech.fireCDcycle = mech.cycle + 30; //cooldown
        // game.makeTextLog("<div style='font-size:140%;'>NO AMMO</div><span class = 'box'>E</span> / <span class = 'box'>Q</span>", 200);
        game.replaceTextLog = true;
        game.makeTextLog("<div style='font-size:140%;'>NO AMMO</div> <p style='font-size:90%;'><strong>Q</strong>, <strong>E</strong>, and <strong>mouse wheel</strong> change weapons</p>", 200);
      }
      if (mech.isHolding) {
        mech.drop();
      }
    }
  },
  draw() {
    ctx.beginPath();
    let i = bullet.length;
    while (i--) {
      //draw
      let vertices = bullet[i].vertices;
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let j = 1; j < vertices.length; j += 1) {
        ctx.lineTo(vertices[j].x, vertices[j].y);
      }
      ctx.lineTo(vertices[0].x, vertices[0].y);
      //remove bullet if at end cycle for that bullet
      if (bullet[i].endCycle < game.cycle) {
        bullet[i].onEnd(i); //some bullets do stuff on end
        if (bullet[i]) {
          Matter.World.remove(engine.world, bullet[i]);
          bullet.splice(i, 1);
        } else {
          break; //if bullet[i] doesn't exist don't complete the for loop, because the game probably reset
        }
      }
    }
    ctx.fillStyle = "#000";
    ctx.fill();
    //do things
    for (let i = 0, len = bullet.length; i < len; i++) {
      bullet[i].do();
    }
  },
  fireProps(cd, speed, dir, me) {
    mech.fireCDcycle = mech.cycle + Math.floor(cd * b.modFireRate); // cool down
    Matter.Body.setVelocity(bullet[me], {
      x: mech.Vx / 2 + speed * Math.cos(dir),
      y: mech.Vy / 2 + speed * Math.sin(dir)
    });
    World.add(engine.world, bullet[me]); //add bullet to world
  },
  fireAttributes(dir, rotate = true) {
    if (rotate) {
      return {
        // density: 0.0015,			//frictionAir: 0.01,			//restitution: 0,
        angle: dir,
        friction: 0.5,
        frictionAir: 0,
        dmg: b.extraDmg, //damage done in addition to the damage from momentum
        classType: "bullet",
        collisionFilter: {
          category: 0x000100,
          mask: 0x010011 //mask: 0x000101,  //for self collision
        },
        minDmgSpeed: 10,
        onDmg() {}, //this.endCycle = 0  //triggers despawn
        onEnd() {}
      };
    } else {
      return {
        // density: 0.0015,			//frictionAir: 0.01,			//restitution: 0,
        inertia: Infinity, //prevents rotation
        angle: dir,
        friction: 0.5,
        frictionAir: 0,
        dmg: 0, //damage done in addition to the damage from momentum
        classType: "bullet",
        collisionFilter: {
          category: 0x000100,
          mask: 0x010011 //mask: 0x000101,  //for self collision
        },
        minDmgSpeed: 10,
        onDmg() {}, //this.endCycle = 0  //triggers despawn
        onEnd() {}
      };
    }
  },
  muzzleFlash(radius = 10) {
    ctx.fillStyle = "#fb0";
    ctx.beginPath();
    ctx.arc(mech.pos.x + 35 * Math.cos(mech.angle), mech.pos.y + 35 * Math.sin(mech.angle), radius, 0, 2 * Math.PI);
    ctx.fill();
  },
  drawOneBullet(vertices) {
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (let j = 1; j < vertices.length; j += 1) {
      ctx.lineTo(vertices[j].x, vertices[j].y);
    }
    ctx.lineTo(vertices[0].x, vertices[0].y);
    ctx.fillStyle = "#000";
    ctx.fill();
  },
  removeConsBB(me) {
    for (let i = 0, len = consBB.length; i < len; ++i) {
      if (consBB[i].bodyA === me) {
        consBB[i].bodyA = consBB[i].bodyB;
        consBB.splice(i, 1);
        // b.removeConsBB(me);
        break;
      } else if (consBB[i].bodyB === me) {
        consBB[i].bodyB = consBB[i].bodyA;
        consBB.splice(i, 1);
        // b.removeConsBB(me);
        break;
      }
    }
  },
  explode(me) {
    // typically explode is used for some bullets with .onEnd
    const radius = bullet[me].explodeRad * b.modExplosionRadius
    //add dmg to draw queue
    game.drawList.push({
      x: bullet[me].position.x,
      y: bullet[me].position.y,
      radius: radius,
      color: "rgba(255,25,0,0.6)",
      time: game.drawTime
    });
    let dist, sub, knock;
    const dmg = b.dmgScale * radius * 0.009;

    const alertRange = 100 + radius * 2; //alert range
    //add alert to draw queue
    game.drawList.push({
      x: bullet[me].position.x,
      y: bullet[me].position.y,
      radius: alertRange,
      color: "rgba(100,20,0,0.03)",
      time: game.drawTime
    });

    //player damage and knock back
    sub = Matter.Vector.sub(bullet[me].position, player.position);
    dist = Matter.Vector.magnitude(sub);
    if (dist < radius) {
      if (!b.AoEImmunity) mech.damage(radius * 0.0002);
      knock = Matter.Vector.mult(Matter.Vector.normalise(sub), -Math.sqrt(dmg) * player.mass / 30);
      player.force.x += knock.x;
      player.force.y += knock.y;
      mech.drop();
    } else if (dist < alertRange) {
      knock = Matter.Vector.mult(Matter.Vector.normalise(sub), -Math.sqrt(dmg) * player.mass / 55);
      player.force.x += knock.x;
      player.force.y += knock.y;
      mech.drop();
    }

    //body knock backs
    for (let i = 0, len = body.length; i < len; ++i) {
      sub = Matter.Vector.sub(bullet[me].position, body[i].position);
      dist = Matter.Vector.magnitude(sub);
      if (dist < radius) {
        knock = Matter.Vector.mult(Matter.Vector.normalise(sub), (-Math.sqrt(dmg) * body[i].mass) / 18);
        body[i].force.x += knock.x;
        body[i].force.y += knock.y;
      } else if (dist < alertRange) {
        knock = Matter.Vector.mult(Matter.Vector.normalise(sub), (-Math.sqrt(dmg) * body[i].mass) / 40);
        body[i].force.x += knock.x;
        body[i].force.y += knock.y;
      }
    }

    //power up knock backs
    for (let i = 0, len = powerUp.length; i < len; ++i) {
      sub = Matter.Vector.sub(bullet[me].position, powerUp[i].position);
      dist = Matter.Vector.magnitude(sub);
      if (dist < radius) {
        knock = Matter.Vector.mult(Matter.Vector.normalise(sub), (-Math.sqrt(dmg) * powerUp[i].mass) / 26);
        powerUp[i].force.x += knock.x;
        powerUp[i].force.y += knock.y;
      } else if (dist < alertRange) {
        knock = Matter.Vector.mult(Matter.Vector.normalise(sub), (-Math.sqrt(dmg) * powerUp[i].mass) / 40);
        powerUp[i].force.x += knock.x;
        powerUp[i].force.y += knock.y;
      }
    }

    //mob damage and knock back with alert
    let damageScale = 1; // reduce dmg for each new target to limit total AOE damage
    for (let i = 0, len = mob.length; i < len; ++i) {
      if (mob[i].alive) {
        sub = Matter.Vector.sub(bullet[me].position, mob[i].position);
        dist = Matter.Vector.magnitude(sub) - mob[i].radius;
        if (dist < radius) {
          mob[i].damage(dmg * damageScale);
          mob[i].locatePlayer();
          knock = Matter.Vector.mult(Matter.Vector.normalise(sub), (-Math.sqrt(dmg * damageScale) * mob[i].mass) / 18);
          mob[i].force.x += knock.x;
          mob[i].force.y += knock.y;
          damageScale *= 0.8 //reduced damage for each additional explosion target 
        } else if (!mob[i].seePlayer.recall && dist < alertRange) {
          mob[i].locatePlayer();
          knock = Matter.Vector.mult(Matter.Vector.normalise(sub), (-Math.sqrt(dmg * damageScale) * mob[i].mass) / 35);
          mob[i].force.x += knock.x;
          mob[i].force.y += knock.y;
        }
      }
    }

    // Matter.Vector.magnitudeSquared(Matter.Vector.sub(bullet[me].position, mob[i].position))
  },
  spore(who) { //used with the mod upgrade in mob.death()
    const bIndex = bullet.length;
    const RADIUS = 3 * b.modBulletSize;
    bullet[bIndex] = Bodies.circle(who.position.x, who.position.y, RADIUS, {
      // density: 0.0015,			//frictionAir: 0.01,
      inertia: Infinity,
      restitution: 0.5,
      angle: Math.random() * 2 * Math.PI,
      friction: 0,
      frictionAir: 0.011,
      dmg: 1.8, //damage done in addition to the damage from momentum
      classType: "bullet",
      collisionFilter: {
        category: 0x000100,
        mask: 0x000011 //no collide with body
      },
      endCycle: game.cycle + Math.floor((360 + Math.floor(Math.random() * 240)) * b.modBulletsLastLonger),
      minDmgSpeed: 0,
      onDmg() {
        this.endCycle = 0; //bullet ends cycle after doing damage 
      },
      onEnd() {},
      lookFrequency: 67 + Math.floor(47 * Math.random()),
      do() {
        //find mob targets
        if (!(game.cycle % this.lookFrequency)) {
          this.closestTarget = null;
          this.lockedOn = null;
          let closeDist = Infinity;
          for (let i = 0, len = mob.length; i < len; ++i) {
            if (Matter.Query.ray(map, this.position, mob[i].position).length === 0) {
              // Matter.Query.ray(body, this.position, mob[i].position).length === 0
              const targetVector = Matter.Vector.sub(this.position, mob[i].position)
              const dist = Matter.Vector.magnitude(targetVector);
              if (dist < closeDist) {
                this.closestTarget = mob[i].position;
                closeDist = dist;
                this.lockedOn = Matter.Vector.normalise(targetVector);
                if (0.3 > Math.random()) break //doesn't always target the closest mob
              }
            }
          }
        }
        //accelerate towards mobs
        const THRUST = this.mass * 0.0009
        if (this.lockedOn) {
          this.force.x -= THRUST * this.lockedOn.x
          this.force.y -= THRUST * this.lockedOn.y
        } else {
          this.force.y += this.mass * 0.00027; //gravity
        }
      },
    });
    const SPEED = 9;
    const ANGLE = 2 * Math.PI * Math.random()
    Matter.Body.setVelocity(bullet[bIndex], {
      x: SPEED * Math.cos(ANGLE),
      y: SPEED * Math.sin(ANGLE)
    });
    World.add(engine.world, bullet[bIndex]); //add bullet to world
  },
  guns: [{
      name: "laser", //0
      description: "fire a  <span style='color:#f00;'>beam</span> of coherent light<br>reflects off walls at 75% intensity<br>uses  <span class='color-f'>energy</span> instead of ammunition",
      ammo: 0,
      // ammoPack: 350,
      ammoPack: Infinity,
      have: false,
      isStarterGun: true,
      fire() {
        // mech.fireCDcycle = mech.cycle + 1
        //laser drains energy as well as bullets
        const FIELD_DRAIN = 0.002
        const damage = 0.05
        if (mech.fieldMeter < FIELD_DRAIN) {
          mech.fireCDcycle = mech.cycle + 100; // cool down if out of energy
        } else {
          mech.fieldMeter -= mech.fieldRegen + FIELD_DRAIN
          let best;
          const color = "#f00";
          const range = 3000;
          const path = [{
              x: mech.pos.x + 20 * Math.cos(mech.angle),
              y: mech.pos.y + 20 * Math.sin(mech.angle)
            },
            {
              x: mech.pos.x + range * Math.cos(mech.angle),
              y: mech.pos.y + range * Math.sin(mech.angle)
            }
          ];
          const vertexCollision = function (v1, v1End, domain) {
            for (let i = 0; i < domain.length; ++i) {
              let vertices = domain[i].vertices;
              const len = vertices.length - 1;
              for (let j = 0; j < len; j++) {
                results = game.checkLineIntersection(v1, v1End, vertices[j], vertices[j + 1]);
                if (results.onLine1 && results.onLine2) {
                  const dx = v1.x - results.x;
                  const dy = v1.y - results.y;
                  const dist2 = dx * dx + dy * dy;
                  if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) {
                    best = {
                      x: results.x,
                      y: results.y,
                      dist2: dist2,
                      who: domain[i],
                      v1: vertices[j],
                      v2: vertices[j + 1]
                    };
                  }
                }
              }
              results = game.checkLineIntersection(v1, v1End, vertices[0], vertices[len]);
              if (results.onLine1 && results.onLine2) {
                const dx = v1.x - results.x;
                const dy = v1.y - results.y;
                const dist2 = dx * dx + dy * dy;
                if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) {
                  best = {
                    x: results.x,
                    y: results.y,
                    dist2: dist2,
                    who: domain[i],
                    v1: vertices[0],
                    v2: vertices[len]
                  };
                }
              }
            }
          };
          const checkforCollisions = function () {
            best = {
              x: null,
              y: null,
              dist2: Infinity,
              who: null,
              v1: null,
              v2: null
            };
            vertexCollision(path[path.length - 2], path[path.length - 1], mob);
            vertexCollision(path[path.length - 2], path[path.length - 1], map);
            vertexCollision(path[path.length - 2], path[path.length - 1], body);
          };
          const laserHitMob = function (dmg) {
            if (best.who.alive) {
              dmg *= b.dmgScale * damage;
              best.who.damage(dmg);
              best.who.locatePlayer();
              //draw mob damage circle
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(path[path.length - 1].x, path[path.length - 1].y, Math.sqrt(dmg) * 100, 0, 2 * Math.PI);
              ctx.fill();
            }
          };

          const reflection = function () {
            // https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector
            const n = Matter.Vector.perp(Matter.Vector.normalise(Matter.Vector.sub(best.v1, best.v2)));
            const d = Matter.Vector.sub(path[path.length - 1], path[path.length - 2]);
            const nn = Matter.Vector.mult(n, 2 * Matter.Vector.dot(d, n));
            const r = Matter.Vector.normalise(Matter.Vector.sub(d, nn));
            path[path.length] = Matter.Vector.add(Matter.Vector.mult(r, range), path[path.length - 1]);
          };
          //beam before reflection
          checkforCollisions();
          if (best.dist2 != Infinity) {
            //if hitting something
            path[path.length - 1] = {
              x: best.x,
              y: best.y
            };
            laserHitMob(1);

            //1st reflection beam
            reflection();
            //ugly bug fix: this stops the reflection on a bug where the beam gets trapped inside a body
            let who = best.who;
            checkforCollisions();
            if (best.dist2 != Infinity) {
              //if hitting something
              path[path.length - 1] = {
                x: best.x,
                y: best.y
              };
              laserHitMob(0.75);

              //2nd reflection beam
              //ugly bug fix: this stops the reflection on a bug where the beam gets trapped inside a body
              if (who !== best.who) {
                reflection();
                checkforCollisions();
                if (best.dist2 != Infinity) {
                  //if hitting something
                  path[path.length - 1] = {
                    x: best.x,
                    y: best.y
                  };
                  laserHitMob(0.5);
                }
              }
            }
          }
          ctx.fillStyle = color;
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.lineDashOffset = 300 * Math.random()
          // ctx.setLineDash([200 * Math.random(), 250 * Math.random()]);

          ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
          for (let i = 1, len = path.length; i < len; ++i) {
            ctx.beginPath();
            ctx.moveTo(path[i - 1].x, path[i - 1].y);
            ctx.lineTo(path[i].x, path[i].y);
            ctx.stroke();
            ctx.globalAlpha *= 0.5; //reflections are less intense
            // ctx.globalAlpha -= 0.1; //reflections are less intense
          }
          ctx.setLineDash([0, 0]);
          ctx.globalAlpha = 1;
        }
      }
    }, {
      name: "kinetic slugs", //1
      description: "fire a large <strong>rod</strong> that does excessive physical <span class='color-d'>damage</span><br><em>high recoil</em>",
      ammo: 0,
      ammoPack: 5,
      have: false,
      isStarterGun: true,
      fire() {
        b.muzzleFlash(45);
        // mobs.alert(800);
        const me = bullet.length;
        const dir = mech.angle;
        bullet[me] = Bodies.rectangle(mech.pos.x + 50 * Math.cos(mech.angle), mech.pos.y + 50 * Math.sin(mech.angle), 70 * b.modBulletSize, 30 * b.modBulletSize, b.fireAttributes(dir));
        b.fireProps(mech.crouch ? 55 : 40, 50, dir, me); //cd , speed
        bullet[me].endCycle = game.cycle + Math.floor(180 * b.modBulletsLastLonger);
        bullet[me].do = function () {
          this.force.y += this.mass * 0.0005;
        };

        //knock back
        const KNOCK = ((mech.crouch) ? 0.025 : 0.25) * b.modBulletSize * b.modBulletSize
        player.force.x -= KNOCK * Math.cos(dir)
        player.force.y -= KNOCK * Math.sin(dir) * 0.4 //reduce knock back in vertical direction to stop super jumps
      }
    },
    {
      name: "minigun", //2
      description: "rapidly fire a stream of small <strong>bullets</strong>",
      ammo: 0,
      ammoPack: 105,
      have: false,
      isStarterGun: true,
      fire() {
        const me = bullet.length;
        b.muzzleFlash(15);
        // if (Math.random() > 0.2) mobs.alert(500);
        const dir = mech.angle + (Math.random() - 0.5) * ((mech.crouch) ? 0.03 : 0.14);
        bullet[me] = Bodies.rectangle(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 17 * b.modBulletSize, 5 * b.modBulletSize, b.fireAttributes(dir));
        b.fireProps(mech.crouch ? 11 : 5, mech.crouch ? 44 : 36, dir, me); //cd , speed
        bullet[me].endCycle = game.cycle + Math.floor(65 * b.modBulletsLastLonger);
        bullet[me].frictionAir = mech.crouch ? 0.007 : 0.01;
        bullet[me].do = function () {
          this.force.y += this.mass * 0.0005;
        };
      }
    },
    {
      name: "wave beam", //3
      description: "fire a stream of oscillating particles<br><strong style='opacity: 0.4;'>propagates through solids</strong>",
      ammo: 0,
      ammoPack: 85,
      have: false,
      isStarterGun: true,
      fire() {
        const me = bullet.length;
        const DIR = mech.angle
        const SCALE = (mech.crouch ? 0.963 : 0.95)
        const wiggleMag = ((mech.flipLegs === 1) ? 1 : -1) * ((mech.crouch) ? 0.004 : 0.005)
        bullet[me] = Bodies.circle(mech.pos.x + 25 * Math.cos(DIR), mech.pos.y + 25 * Math.sin(DIR), 10 * b.modBulletSize, {
          angle: DIR,
          cycle: -0.43, //adjust this number until the bullets line up with the cross hairs
          endCycle: game.cycle + Math.floor((mech.crouch ? 155 : 120) * b.modBulletsLastLonger),
          inertia: Infinity,
          frictionAir: 0,
          minDmgSpeed: 0,
          dmg: 0.13 + b.extraDmg, //damage done in addition to the damage from momentum
          classType: "bullet",
          collisionFilter: {
            category: 0x000100,
            mask: 0x000010
          },
          onDmg() {},
          onEnd() {},
          do() {
            if (!mech.isBodiesAsleep) {
              this.cycle++
              const THRUST = wiggleMag * Math.cos(this.cycle * 0.3)
              this.force = Matter.Vector.mult(Matter.Vector.normalise(this.direction), this.mass * THRUST) //wiggle

              if (this.cycle > 0 && !(Math.floor(this.cycle) % 6)) Matter.Body.scale(this, SCALE, SCALE); //shrink
            }
          }
        });
        World.add(engine.world, bullet[me]); //add bullet to world
        mech.fireCDcycle = mech.cycle + Math.floor((mech.crouch ? 8 : 4) * b.modFireRate); // cool down
        const SPEED = mech.crouch ? 5.2 : 4.5;
        Matter.Body.setVelocity(bullet[me], {
          x: SPEED * Math.cos(DIR),
          y: SPEED * Math.sin(DIR)
        });
        bullet[me].direction = Matter.Vector.perp(bullet[me].velocity)
        // if (mech.angle + Math.PI / 2 > 0) {
        //   bullet[me].direction = Matter.Vector.perp(bullet[me].velocity, true)
        // } else {
        //   bullet[me].direction = Matter.Vector.perp(bullet[me].velocity)
        // }

        World.add(engine.world, bullet[me]); //add bullet to world
      }
    },
    {
      name: "super balls", //4
      description: "fire 3 very <strong>bouncy</strong> balls",
      ammo: 0,
      ammoPack: 11,
      have: false,
      isStarterGun: true,
      fire() {
        b.muzzleFlash(20);
        // mobs.alert(450);
        const SPREAD = mech.crouch ? 0.04 : 0.14
        let dir = mech.angle - SPREAD;
        for (let i = 0; i < 3; i++) {
          const me = bullet.length;
          bullet[me] = Bodies.circle(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 7 * b.modBulletSize, b.fireAttributes(dir, false));
          b.fireProps(mech.crouch ? 40 : 20, mech.crouch ? 34 : 26, dir, me); //cd , speed
          Matter.Body.setDensity(bullet[me], 0.0001);
          bullet[me].endCycle = game.cycle + Math.floor(360 * b.modBulletsLastLonger);
          bullet[me].dmg = 0.5 + b.extraDmg;
          bullet[me].minDmgSpeed = 0;
          bullet[me].restitution = 0.96;
          bullet[me].friction = 0;
          bullet[me].do = function () {
            this.force.y += this.mass * 0.001;
          };
          dir += SPREAD;
        }
      }
    },
    {
      name: "shotgun", //5
      description: "fire a <strong>burst</strong> of bullets<br><em>high recoil</em>",
      ammo: 0,
      ammoPack: 8,
      have: false,
      isStarterGun: true,
      fire() {
        b.muzzleFlash(35);
        // mobs.alert(650);
        const side = 11 * b.modBulletSize
        for (let i = 0; i < 9; i++) {
          const me = bullet.length;
          const dir = mech.angle + (Math.random() - 0.5) * (mech.crouch ? 0.22 : 0.7)
          bullet[me] = Bodies.rectangle(mech.pos.x + 35 * Math.cos(mech.angle) + 15 * (Math.random() - 0.5), mech.pos.y + 35 * Math.sin(mech.angle) + 15 * (Math.random() - 0.5), side, side, b.fireAttributes(dir));
          b.fireProps(mech.crouch ? 60 : 30, 40 + Math.random() * 11, dir, me); //cd , speed
          bullet[me].endCycle = game.cycle + Math.floor(55 * b.modBulletsLastLonger);
          bullet[me].frictionAir = 0.03;
          bullet[me].do = function () {
            this.force.y += this.mass * 0.001;
          };
        }

        //knock back
        const KNOCK = ((mech.crouch) ? 0.015 : 0.15) * b.modBulletSize * b.modBulletSize
        player.force.x -= KNOCK * Math.cos(mech.angle)
        player.force.y -= KNOCK * Math.sin(mech.angle) * 0.4 //reduce knock back in vertical direction to stop super jumps
      }
    },
    {
      name: "fléchettes", //6
      description: "fire accurate high speed needles",
      ammo: 0,
      ammoPack: 20,
      have: false,
      isStarterGun: true,
      fire() {
        function spawnFlechette(dir = mech.angle, speed, size = 1) {
          const me = bullet.length;
          bullet[me] = Bodies.rectangle(mech.pos.x + 40 * Math.cos(dir), mech.pos.y + 40 * Math.sin(dir), 65 * size * b.modBulletSize, 1.5 * size * b.modBulletSize, b.fireAttributes(dir));
          bullet[me].endCycle = game.cycle + Math.floor(180 * b.modBulletsLastLonger);
          bullet[me].dmg = 0.25 * size + b.extraDmg;
          b.drawOneBullet(bullet[me].vertices);
          bullet[me].do = function () {
            this.force.y += this.mass * 0.0002; //low gravity
          };
          Matter.Body.setVelocity(bullet[me], {
            x: mech.Vx / 2 + speed * Math.cos(dir),
            y: mech.Vy / 2 + speed * Math.sin(dir)
          });
          World.add(engine.world, bullet[me]); //add bullet to world
        }

        if (mech.crouch) {
          spawnFlechette(mech.angle, 55, 1.2)
        } else {
          for (let i = 0; i < 7; i++) {
            spawnFlechette(mech.angle + 0.14 * (Math.random() - 0.5), 30 + 8 * Math.random(), 0.5)
          }
        }
        mech.fireCDcycle = mech.cycle + Math.floor(30 * b.modFireRate); // cool down
      }
    },
    {
      name: "missiles", //7
      description: "fire a missile that accelerates towards nearby targets<br><span class='color-e'>explodes</span> when near target",
      ammo: 0,
      ammoPack: 8,
      have: false,
      isStarterGun: false,
      fireCycle: 0,
      ammoLoaded: 0,
      fire() {
        const thrust = 0.0003;
        let dir = mech.angle + (0.5 - Math.random()) * (mech.crouch ? 0 : 0.2);
        const me = bullet.length;
        bullet[me] = Bodies.rectangle(mech.pos.x + 40 * Math.cos(mech.angle), mech.pos.y + 40 * Math.sin(mech.angle) - 3, 30 * b.modBulletSize, 4 * b.modBulletSize, b.fireAttributes(dir));
        b.fireProps(mech.crouch ? 70 : 30, -3 * (0.5 - Math.random()) + (mech.crouch ? 25 : -8), dir, me); //cd , speed

        b.drawOneBullet(bullet[me].vertices);
        // Matter.Body.setDensity(bullet[me], 0.01)  //doesn't help with reducing explosion knock backs
        bullet[me].force.y += 0.00045; //a small push down at first to make it seem like the missile is briefly falling
        bullet[me].frictionAir = 0
        bullet[me].endCycle = game.cycle + Math.floor((265 + Math.random() * 20) * b.modBulletsLastLonger);
        bullet[me].explodeRad = 170 + 60 * Math.random();
        bullet[me].lookFrequency = Math.floor(8 + Math.random() * 7);
        bullet[me].onEnd = b.explode; //makes bullet do explosive damage at end
        bullet[me].onDmg = function () {
          this.endCycle = 0; //bullet ends cycle after doing damage  // also triggers explosion
        };
        bullet[me].lockedOn = null;
        bullet[me].do = function () {
          if (!mech.isBodiesAsleep) {
            if (!(mech.cycle % this.lookFrequency)) {
              this.closestTarget = null;
              this.lockedOn = null;
              let closeDist = Infinity;

              //look for targets
              for (let i = 0, len = mob.length; i < len; ++i) {
                if (
                  mob[i].alive &&
                  mob[i].dropPowerUp &&
                  Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                  Matter.Query.ray(body, this.position, mob[i].position).length === 0
                ) {
                  const dist = Matter.Vector.magnitude(Matter.Vector.sub(this.position, mob[i].position));
                  if (dist < closeDist) {
                    this.closestTarget = mob[i].position;
                    closeDist = dist;
                    this.lockedOn = mob[i];
                  }
                }
              }
              //explode when bullet is close enough to target
              if (this.closestTarget && closeDist < this.explodeRad) {
                this.endCycle = 0; //bullet ends cycle after doing damage  //this also triggers explosion
              }

              if (this.lockedOn) {
                this.frictionAir = 0.04; //extra friction

                //draw locked on targeting
                ctx.beginPath();
                const vertices = this.lockedOn.vertices;
                ctx.moveTo(this.position.x, this.position.y);
                const mod = Math.floor((game.cycle / 3) % vertices.length);
                ctx.lineTo(vertices[mod].x, vertices[mod].y);
                ctx.strokeStyle = "rgba(0,0,155,0.35)"; //"#2f6";
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }

            //rotate missile towards the target
            if (this.closestTarget) {
              const face = {
                x: Math.cos(this.angle),
                y: Math.sin(this.angle)
              };
              const target = Matter.Vector.normalise(Matter.Vector.sub(this.position, this.closestTarget));
              if (Matter.Vector.dot(target, face) > -0.98) {
                if (Matter.Vector.cross(target, face) > 0) {
                  Matter.Body.rotate(this, 0.08);
                } else {
                  Matter.Body.rotate(this, -0.08);
                }
              }
            }
            //accelerate in direction bullet is facing
            const dir = this.angle; // + (Math.random() - 0.5);
            this.force.x += Math.cos(dir) * thrust;
            this.force.y += Math.sin(dir) * thrust;

            //draw rocket
            ctx.beginPath();
            ctx.arc(this.position.x - Math.cos(this.angle) * 27 + (Math.random() - 0.5) * 4, this.position.y - Math.sin(this.angle) * 27 + (Math.random() - 0.5) * 4, 11, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255,155,0,0.5)";
            ctx.fill();
          } else {
            //draw rocket  with time stop
            ctx.beginPath();
            ctx.arc(this.position.x - Math.cos(this.angle) * 27, this.position.y - Math.sin(this.angle) * 27, 11, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255,155,0,0.5)";
            ctx.fill();
          }
        }
      }
    },
    {
      name: "flak", //8
      description: "fire a cluster of short range projectiles<br><span class='color-e'>explode</span> on contact or after half a second",
      ammo: 0,
      ammoPack: 20,
      have: false,
      isStarterGun: true,
      fire() {
        b.muzzleFlash(30);
        const totalBullets = 5
        const angleStep = (mech.crouch ? 0.06 : 0.15) / totalBullets
        const SPEED = mech.crouch ? 30 : 25
        const CD = mech.crouch ? 45 : 11
        const END = Math.floor((mech.crouch ? 30 : 18) * b.modBulletsLastLonger);
        let dir = mech.angle - angleStep * totalBullets / 2;
        const side1 = 17 * b.modBulletSize
        const side2 = 4 * b.modBulletSize

        for (let i = 0; i < totalBullets; i++) { //5 -> 7
          dir += angleStep
          const me = bullet.length;
          bullet[me] = Bodies.rectangle(mech.pos.x + 50 * Math.cos(mech.angle), mech.pos.y + 50 * Math.sin(mech.angle), side1, side2, b.fireAttributes(dir));
          b.fireProps(CD, SPEED + 15 * Math.random() - 2 * i, dir, me); //cd , speed
          // Matter.Body.setDensity(bullet[me], 0.005);
          bullet[me].endCycle = 2 * i + game.cycle + END
          bullet[me].restitution = 0;
          bullet[me].friction = 1;
          // bullet[me].dmg = 0.15;
          bullet[me].explodeRad = (mech.crouch ? 70 : 45) + (Math.random() - 0.5) * 50;
          bullet[me].onEnd = b.explode;
          bullet[me].onDmg = function () {
            this.endCycle = 0; //bullet ends cycle after hitting a mob and triggers explosion
          };
          bullet[me].do = function () {
            this.force.y += this.mass * 0.0004;
            // if (this.speed < 10) { //if slow explode
            //   for (let i = 0, len = bullet.length; i < len; i++) {
            //     bullet[i].endCycle = 0 //all other bullets explode
            //   }
            // }
          }
        }
      }
    },
    {
      name: "grenades", //9
      description: "fire a projectile that <span class='color-e'>explodes</span> on contact or after one second",
      ammo: 0,
      ammoPack: 9,
      have: false,
      isStarterGun: true,
      fire() {
        const me = bullet.length;
        const dir = mech.angle; // + Math.random() * 0.05;
        bullet[me] = Bodies.circle(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 15 * b.modBulletSize, b.fireAttributes(dir, false));
        b.fireProps(mech.crouch ? 40 : 20, mech.crouch ? 43 : 32, dir, me); //cd , speed
        b.drawOneBullet(bullet[me].vertices);
        // Matter.Body.setDensity(bullet[me], 0.000001);
        bullet[me].totalCycles = 100;
        bullet[me].endCycle = game.cycle + Math.floor((mech.crouch ? 120 : 60) * b.modBulletsLastLonger);
        bullet[me].restitution = 0.5;
        bullet[me].explodeRad = 210;
        bullet[me].onEnd = b.explode; //makes bullet do explosive damage before despawn
        bullet[me].minDmgSpeed = 1;
        bullet[me].onDmg = function () {
          this.endCycle = 0; //bullet ends cycle after doing damage  //this also triggers explosion
        };
        bullet[me].do = function () {
          //extra gravity for harder arcs
          this.force.y += this.mass * 0.002;
        };
      }
    },
    {
      name: "vacuum bomb", //10
      description: "fire a huge <strong>bomb</strong> that sucks before it <span class='color-e'>explodes</span><br>click left mouse <strong>again</strong> to detonate",
      ammo: 0,
      ammoPack: 4,
      have: false,
      isStarterGun: false,
      fire() {
        const me = bullet.length;
        const dir = mech.angle;
        bullet[me] = Bodies.circle(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 26 * b.modBulletSize, b.fireAttributes(dir, false));
        bullet[me].radius = 22; //used from drawing timer
        b.fireProps(10, mech.crouch ? 42 : 26, dir, me); //cd , speed

        b.drawOneBullet(bullet[me].vertices);
        bullet[me].endCycle = Infinity
        bullet[me].endCycle = Infinity
        // bullet[me].restitution = 0.3;
        // bullet[me].frictionAir = 0.01;
        // bullet[me].friction = 0.15;
        bullet[me].inertia = Infinity; //prevents rotation
        bullet[me].restitution = 0;
        bullet[me].friction = 1;

        bullet[me].explodeRad = 380 + Math.floor(Math.random() * 60);
        bullet[me].onEnd = b.explode; //makes bullet do explosive damage before despawn
        bullet[me].onDmg = function () {
          // this.endCycle = 0; //bullet ends cycle after doing damage  //this triggers explosion
        };
        bullet[me].isArmed = false;
        bullet[me].isSucking = false;
        bullet[me].do = function () {
          //extra gravity for harder arcs
          this.force.y += this.mass * 0.0022;
          mech.fireCDcycle = mech.cycle + 10 //can't fire until after the explosion

          //set armed and sucking status
          if (!this.isArmed && !game.mouseDown) {
            this.isArmed = true
          } else if (this.isArmed && game.mouseDown && !this.isSucking) {
            this.isSucking = true;
            this.endCycle = game.cycle + 35;
          }

          if (this.isSucking) {
            if (!mech.isBodiesAsleep) {
              const that = this
              let mag = 0.1

              function suck(who, radius = that.explodeRad * 2) {
                for (i = 0, len = who.length; i < len; i++) {
                  const sub = Matter.Vector.sub(that.position, who[i].position);
                  const dist = Matter.Vector.magnitude(sub);
                  if (dist < radius && dist > 150) {
                    knock = Matter.Vector.mult(Matter.Vector.normalise(sub), mag * who[i].mass / Math.sqrt(dist));
                    who[i].force.x += knock.x;
                    who[i].force.y += knock.y;
                  }
                }
              }
              if (game.cycle > this.endCycle - 5) {
                mag = -0.22
                suck(body)
                suck(mob)
                suck(powerUp)
                suck(bullet)
                suck([player])
              } else {
                mag = 0.1
                suck(body)
                suck(mob)
                suck(powerUp)
                suck(bullet)
                suck([player])
              }
              //keep bomb in place
              Matter.Body.setVelocity(this, {
                x: 0,
                y: 0
              });
              //draw suck
              const radius = 2.5 * this.explodeRad * (this.endCycle - game.cycle) / 35
              ctx.fillStyle = "rgba(0,0,0,0.1)";
              ctx.beginPath();
              ctx.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI);
              ctx.fill();
            }
          } else {
            // flashing lights to show armed
            if (!(game.cycle % 10)) {
              if (this.isFlashOn) {
                this.isFlashOn = false;
              } else {
                this.isFlashOn = true;
              }
            }
            if (this.isFlashOn) {
              ctx.fillStyle = "#000";
              ctx.beginPath();
              ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
              ctx.fill();
              //draw clock on timer
              ctx.fillStyle = "#f04";
              ctx.beginPath();
              ctx.arc(this.position.x, this.position.y, this.radius * 0.5, 0, 2 * Math.PI);
              ctx.fill();
            }
          }
        }
      }
    },
    {
      name: "ferro frag", //11
      description: "fire a <strong>grenade</strong> that ejects <strong class='color-m'>magnetized</strong> nails<br>nails are <strong class='color-m'>attracted</strong> to enemy targets",
      ammo: 0,
      ammoPack: 8,
      have: false,
      isStarterGun: false,
      fire() {
        const me = bullet.length;
        const dir = mech.angle;
        bullet[me] = Bodies.circle(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 15 * b.modBulletSize, b.fireAttributes(dir, false));
        b.fireProps(mech.crouch ? 40 : 30, mech.crouch ? 34 : 22, dir, me); //cd , speed
        b.drawOneBullet(bullet[me].vertices);
        bullet[me].endCycle = game.cycle + Math.floor(60 * b.modBulletsLastLonger);
        bullet[me].restitution = 0.3;
        // bullet[me].frictionAir = 0.01;
        // bullet[me].friction = 0.15;
        // bullet[me].friction = 1;
        bullet[me].onEnd = () => {}
        bullet[me].do = function () {
          this.force.y += this.mass * 0.0018; //extra gravity for grenades

          if (game.cycle > this.endCycle - 1) {
            if (!mech.isBodiesAsleep) {
              //target nearby mobs
              const targets = []
              for (let i = 0, len = mob.length; i < len; i++) {
                const sub = Matter.Vector.sub(this.position, mob[i].position);
                const dist = Matter.Vector.magnitude(sub);
                if (dist < 1400 &&
                  Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                  Matter.Query.ray(body, this.position, mob[i].position).length === 0) {
                  targets.push(mob[i].position)
                }
              }
              for (let i = 0; i < 14; i++) {
                const SPEED = 35 + 20 * Math.random()
                if (targets.length > 0) { // aim near a random target
                  const SPREAD = 100
                  const INDEX = Math.floor(Math.random() * targets.length)
                  const WHERE = {
                    x: targets[INDEX].x + SPREAD * (Math.random() - 0.5),
                    y: targets[INDEX].y + SPREAD * (Math.random() - 0.5)
                  }
                  needle(this.position, Matter.Vector.mult(Matter.Vector.normalise(Matter.Vector.sub(WHERE, this.position)), SPEED))
                } else { // aim in random direction
                  const ANGLE = 2 * Math.PI * Math.random()
                  needle(this.position, {
                    x: SPEED * Math.cos(ANGLE),
                    y: SPEED * Math.sin(ANGLE)
                  })
                }

                function needle(pos, velocity) {
                  const me = bullet.length;
                  bullet[me] = Bodies.rectangle(pos.x, pos.y, 23 * b.modBulletSize, 2 * b.modBulletSize, b.fireAttributes(Math.atan2(velocity.y, velocity.x)));
                  Matter.Body.setVelocity(bullet[me], velocity);
                  World.add(engine.world, bullet[me]); //add bullet to world
                  bullet[me].endCycle = game.cycle + 60 + Math.floor(15 * Math.random());
                  // bullet[me].dmg = 1.1+b.extraDmg;
                  bullet[me].do = function () {};
                }
              }
            }
          }
        }
      }
    },
    {
      name: "spores", //12
      description: "release an orb that discharges <span class='color-s'>spores</span> after 2 seconds<br>seeks out targets<br>passes through blocks",
      ammo: 0,
      ammoPack: 5,
      have: false,
      isStarterGun: false,
      fire() {
        const me = bullet.length;
        const dir = mech.angle;
        bullet[me] = Bodies.polygon(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 20, 4.5, b.fireAttributes(dir, false));
        b.fireProps(mech.crouch ? 75 : 55, mech.crouch ? 25 : 14, dir, me); //cd , speed
        b.drawOneBullet(bullet[me].vertices);
        Matter.Body.setDensity(bullet[me], 0.000001);
        bullet[me].endCycle = game.cycle + 100;
        bullet[me].frictionAir = 0;
        bullet[me].friction = 0.5;
        bullet[me].restitution = 0.3;
        bullet[me].minDmgSpeed = 0;
        bullet[me].onDmg = function () {};
        bullet[me].do = function () {
          if (!mech.isBodiesAsleep) {
            const SCALE = 1.017
            Matter.Body.scale(this, SCALE, SCALE);
            this.frictionAir += 0.00023;
          }

          this.force.y += this.mass * 0.00045;

          //draw green glow
          ctx.fillStyle = "rgba(0,200,125,0.16)";
          ctx.beginPath();
          ctx.arc(this.position.x, this.position.y, 26, 0, 2 * Math.PI);
          ctx.fill();
        };

        //spawn bullets on end
        bullet[me].onEnd = function () {
          const NUM = 9;
          for (let i = 0; i < NUM; i++) {
            const bIndex = bullet.length;
            const RADIUS = 3 * b.modBulletSize;
            bullet[bIndex] = Bodies.circle(this.position.x, this.position.y, RADIUS, {
              // density: 0.0015,			//frictionAir: 0.01,
              inertia: Infinity,
              restitution: 0.5,
              angle: dir,
              friction: 0,
              frictionAir: 0.011,
              dmg: 1.8 + b.extraDmg, //damage done in addition to the damage from momentum
              classType: "bullet",
              collisionFilter: {
                category: 0x000100,
                mask: 0x000011 //no collide with body
              },
              endCycle: game.cycle + Math.floor((360 + Math.floor(Math.random() * 240)) * b.modBulletsLastLonger),
              minDmgSpeed: 0,
              onDmg() {
                this.endCycle = 0; //bullet ends cycle after doing damage 
              },
              onEnd() {},
              lookFrequency: 67 + Math.floor(47 * Math.random()),
              do() {
                //find mob targets
                if (!(game.cycle % this.lookFrequency)) {
                  this.closestTarget = null;
                  this.lockedOn = null;
                  let closeDist = Infinity;
                  for (let i = 0, len = mob.length; i < len; ++i) {
                    if (Matter.Query.ray(map, this.position, mob[i].position).length === 0) {
                      // Matter.Query.ray(body, this.position, mob[i].position).length === 0
                      const targetVector = Matter.Vector.sub(this.position, mob[i].position)
                      const dist = Matter.Vector.magnitude(targetVector);
                      if (dist < closeDist) {
                        this.closestTarget = mob[i].position;
                        closeDist = dist;
                        this.lockedOn = Matter.Vector.normalise(targetVector);
                        if (0.3 > Math.random()) break //doesn't always target the closest mob
                      }
                    }
                  }
                }
                //accelerate towards mobs
                const THRUST = this.mass * 0.0009
                if (this.lockedOn) {
                  this.force.x -= THRUST * this.lockedOn.x
                  this.force.y -= THRUST * this.lockedOn.y
                } else {
                  this.force.y += this.mass * 0.00025; //gravity
                }
              },
            });
            const SPEED = 9;
            const ANGLE = 2 * Math.PI * Math.random()
            Matter.Body.setVelocity(bullet[bIndex], {
              x: SPEED * Math.cos(ANGLE),
              y: SPEED * Math.sin(ANGLE)
            });
            World.add(engine.world, bullet[bIndex]); //add bullet to world
          }
        }

      }
    },
    {
      name: "drones", //13
      description: "release <strong>drones</strong> that seek out targets for 16 seconds<br>follows mouse if no targets are found",
      ammo: 0,
      ammoPack: 20,
      have: false,
      isStarterGun: true,
      fire() {
        const THRUST = 0.0015
        const dir = mech.angle + 0.2 * (Math.random() - 0.5);
        const me = bullet.length;
        const RADIUS = (4.5 + 3 * Math.random()) * b.modBulletSize
        bullet[me] = Bodies.circle(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), RADIUS, {
          angle: dir,
          inertia: Infinity,
          friction: 0,
          frictionAir: 0.0005,
          restitution: 1,
          dmg: 0.14 + b.extraDmg, //damage done in addition to the damage from momentum
          lookFrequency: 79 + Math.floor(37 * Math.random()),
          endCycle: game.cycle + Math.floor((780 + 360 * Math.random()) * b.modBulletsLastLonger),
          classType: "bullet",
          collisionFilter: {
            category: 0x000100,
            mask: 0x010111 //self collide
          },
          minDmgSpeed: 0,
          lockedOn: null,
          isFollowMouse: true,
          onDmg() {
            this.lockedOn = null
          },
          onEnd() {},
          do() {
            this.force.y += this.mass * 0.0002;
            //find mob targets
            if (!(game.cycle % this.lookFrequency)) {
              this.lockedOn = null;
              let closeDist = Infinity;
              for (let i = 0, len = mob.length; i < len; ++i) {
                if (
                  Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                  Matter.Query.ray(body, this.position, mob[i].position).length === 0
                ) {
                  const TARGET_VECTOR = Matter.Vector.sub(this.position, mob[i].position)
                  const DIST = Matter.Vector.magnitude(TARGET_VECTOR);
                  if (DIST < closeDist) {
                    closeDist = DIST;
                    this.lockedOn = mob[i]
                  }
                }
              }
              if (!this.lockedOn) {
                //grab a power up if it is (ammo) or (a heal when player is low)
                let closeDist = Infinity;
                for (let i = 0, len = powerUp.length; i < len; ++i) {
                  if (
                    ((powerUp[i].name !== "field" && powerUp[i].name !== "heal") || (powerUp[i].name === "heal" && mech.health < 0.8)) &&
                    Matter.Query.ray(map, this.position, powerUp[i].position).length === 0 &&
                    Matter.Query.ray(body, this.position, powerUp[i].position).length === 0
                  ) {
                    const TARGET_VECTOR = Matter.Vector.sub(this.position, powerUp[i].position)
                    const DIST = Matter.Vector.magnitude(TARGET_VECTOR);
                    if (DIST < closeDist) {
                      if (DIST < 50) { //eat the power up if close enough
                        powerUp[i].effect();
                        Matter.World.remove(engine.world, powerUp[i]);
                        powerUp.splice(i, 1);
                        break;
                      }
                      closeDist = DIST;
                      this.lockedOn = powerUp[i]
                    }
                  }
                }
              }
            }
            if (this.lockedOn) { //accelerate towards mobs
              this.force = Matter.Vector.mult(Matter.Vector.normalise(Matter.Vector.sub(this.position, this.lockedOn.position)), -this.mass * THRUST)
            } else { //accelerate towards mouse
              this.force = Matter.Vector.mult(Matter.Vector.normalise(Matter.Vector.sub(this.position, game.mouseInGame)), -this.mass * THRUST)
            }
            // speed cap instead of friction to give more agility
            if (this.speed > 6) {
              Matter.Body.setVelocity(this, {
                x: this.velocity.x * 0.97,
                y: this.velocity.y * 0.97
              });
            }
          }
        })
        b.fireProps(mech.crouch ? 19 : 15, mech.crouch ? 35 : 1, dir, me); //cd , speed
        b.drawOneBullet(bullet[me].vertices);
      }
    },
    {
      //draw a halo, since there will only be 1-3 balls
      name: "junk-bots", //14
      description: "release large <strong>drones</strong> that defend the space around the player<br>despawn after not doing <span class='color-d'>damage</span> for 3 seconds",
      ammo: 0,
      ammoPack: 20,
      have: false,
      isStarterGun: true,
      fire() {
        const THRUST = 0.004
        const dir = mech.angle + 0.2 * (Math.random() - 0.5);
        const me = bullet.length;
        const RADIUS = (18 + 5 * Math.random()) * b.modBulletSize
        const LENGTH = 0.6 + 0.8 * Math.random()
        bullet[me] = Bodies.rectangle(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), RADIUS * LENGTH, RADIUS / LENGTH, {
          isOrb: true,
          angle: dir,
          // inertia: Infinity,
          friction: 0,
          frictionAir: 0.06,
          restitution: 1,
          dmg: b.extraDmg, // 0.14   //damage done in addition to the damage from momentum
          minDmgSpeed: 2,
          lookFrequency: 37 + Math.floor(37 * Math.random()),
          endCycle: game.cycle + Math.floor((170 + 120 * Math.random()) * b.modBulletsLastLonger),
          classType: "bullet",
          collisionFilter: {
            category: 0x000100,
            mask: 0x010111 //self, mob,map,body collide
          },
          range: 500 + 150 * Math.random(),
          lockedOn: null,
          onDmg() {
            // this.endCycle = 0;
            this.lockedOn = null
            this.endCycle = game.cycle + Math.floor(180 * b.modBulletsLastLonger)
          },
          onEnd() {},
          do() {
            if (!(game.cycle % this.lookFrequency)) {
              this.lockedOn = null;
              let closeDist = Infinity;
              for (let i = 0, len = mob.length; i < len; ++i) {
                const TARGET_VECTOR = Matter.Vector.sub(mech.pos, mob[i].position)
                const DIST = Matter.Vector.magnitude(TARGET_VECTOR);
                if (DIST < this.range && DIST < closeDist && Matter.Query.ray(map, this.position, mob[i].position).length === 0) {
                  closeDist = DIST;
                  this.lockedOn = mob[i]
                }
              }
            }

            const distanceToPlayer = Matter.Vector.magnitude(Matter.Vector.sub(this.position, mech.pos))
            if (this.lockedOn) { //accelerate towards mobs
              this.force = Matter.Vector.mult(Matter.Vector.normalise(Matter.Vector.sub(this.position, this.lockedOn.position)), -this.mass * THRUST)
              this.frictionAir = 0.06
            } else if (distanceToPlayer > 0.2 * this.range) {
              this.force = Matter.Vector.mult(Matter.Vector.normalise(Matter.Vector.sub(this.position, mech.pos)), -this.mass * THRUST * 0.3)
              this.frictionAir = 0.02
              // // speed cap instead of friction to give more agility
              // if (this.speed > 14) {
              //   Matter.Body.setVelocity(this, {
              //     x: this.velocity.x * 0.97,
              //     y: this.velocity.y * 0.97
              //   });
              // }
            } else { //must be close to player  //add some random motion
              this.frictionAir = 0
            }
          }
        })
        b.fireProps(mech.crouch ? 40 : 10, mech.crouch ? 40 : 10, dir, me); //cd , speed
        b.drawOneBullet(bullet[me].vertices);
      }
    },
  ]
};