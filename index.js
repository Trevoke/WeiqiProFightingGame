const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

canvas.addEventListener("mousedown", function(e)
        {
            getMousePosition(canvas, e);
        });

const gravity = 1.3

const groundHeight = 482

const left = 1
const right = 0

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: './img/background.png',
})

const shop = new Sprite({
    position: {
        x:600,
        y:128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    frameMax: 6
})

const player = new Fighter ({
    position:{
        x: 100,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset:{
        x: 50,
        y: 0

    },
    color: 'red',
    imageSrc: './img/Hero Knight/Sprites/Idle.png',
    frameMax: 11,
    scale: 2.5,
    offset: {
        x: 222,
        y: 138,
    },
    initialSprite: 'run',
    spritesL: {
        idle: {
            imageSrc: './img/Hero Knight/Sprites/Idle.png',
            frameMax: 11
        },
        run: {
            imageSrc: './img/Hero Knight/Sprites/Run.png',
            frameMax: 8
        },
        jump: {
            imageSrc: './img/Hero Knight/Sprites/Jump.png',
            frameMax: 3
        },
        fall: {
            imageSrc: './img/Hero Knight/Sprites/Fall.png',
            frameMax: 3
        },
        attack1: {
            imageSrc: './img/Hero Knight/Sprites/Attack2.png',
            frameMax: 7
        },
        takeHit: {
            imageSrc: './img/Hero Knight/Sprites/Take hit.png',
            frameMax: 4
        },
        death: {
            imageSrc: './img/Hero Knight/Sprites/Death.png',
            frameMax: 11
        },
    },
    spritesR: {
        idle: {
            imageSrc: './img/Hero Knight/Flipped/Idle.png',
            frameMax: 11
        },
        run: {
            imageSrc: './img/Hero Knight/Flipped/Run.png',
            frameMax: 8
        },
        jump: {
            imageSrc: './img/Hero Knight/Flipped/Jump.png',
            frameMax: 3
        },
        fall: {
            imageSrc: './img/Hero Knight/Flipped/Fall.png',
            frameMax: 3
        },
        attack1: {
            imageSrc: './img/Hero Knight/Flipped/Attack2.png',
            frameMax: 7
        },
        takeHit: {
            imageSrc: './img/Hero Knight/Flipped/Take hit.png',
            frameMax: 4
        },
        death: {
            imageSrc: './img/Hero Knight/Flipped/Death.png',
            frameMax: 11
        },
    },
    attackBox:{
        offset: {
            x: 70,
            y: 30,
        },
        width: 140,
        height: 50,
    },
    face: left,
})

const enemy = new Fighter ({
    position:{
        x: 924,
        y: 0
},
    velocity: {
        x: 0,
        y: 0
    },
    offset:{
        x: -100,
        y: 0

    },
    color: 'yellow',
    imageSrc: './img/Huntress/Flipped/Idle.png',
    frameMax: 11,
    scale: 2.9,
    offset: {
        x: 222,
        y: 133,
    },
    initialSprite: 'run',
    spritesL: {
        idle: {
            imageSrc: './img/Huntress/Sprites/Idle.png',
            frameMax: 8
        },
        run: {
            imageSrc: './img/Huntress/Sprites/Run.png',
            frameMax: 8
        },
        jump: {
            imageSrc: './img/Huntress/Sprites/Jump.png',
            frameMax: 2
        },
        fall: {
            imageSrc: './img/Huntress/Sprites/Fall.png',
            frameMax: 2
        },
        attack1: {
            imageSrc: './img/Huntress/Sprites/Attack1.png',
            frameMax: 5
        },
        attack2: {
            imageSrc: './img/Huntress/Sprites/Attack2.png',
            frameMax: 5
        },
        takeHit: {
            imageSrc: './img/Huntress/Sprites/Take hit.png',
            frameMax: 3
        },
        death: {
            imageSrc: './img/Huntress/Sprites/Death.png',
            frameMax: 8
        },
    },
    spritesR: {
        idle: {
            imageSrc: './img/Huntress/Flipped/Idle.png',
            frameMax: 8
        },
        run: {
            imageSrc: './img/Huntress/Flipped/Run.png',
            frameMax: 8
        },
        jump: {
            imageSrc: './img/Huntress/Flipped/Jump.png',
            frameMax: 2
        },
        fall: {
            imageSrc: './img/Huntress/Flipped/Fall.png',
            frameMax: 2
        },
        attack1: {
            imageSrc: './img/Huntress/Flipped/Attack1.png',
            frameMax: 5
        },
        attack2: {
            imageSrc: './img/Huntress/Flipped/Attack2.png',
            frameMax: 5
        },
        takeHit: {
            imageSrc: './img/Huntress/Flipped/Take hit.png',
            frameMax: 3
        },
        death: {
            imageSrc: './img/Huntress/Flipped/Death.png',
            frameMax: 8
        },
    },
    attackBox:{
        offset: {
            x: -155,
            y: 30,
        },
        width: 140,
        height: 50,
    },
    direction: 0,
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle ='rgba(255, 255, 255, 0.15)'
    c.fillRect(0,0, canvas.width,canvas.height)

    player.update()
    enemy.update()
    
    player.face = 1
    player.face = 0

    player.velocity.x = 0
    enemy.velocity.x = 0
    

// player movement
    if (keys.d.pressed && player.lastKey ==='d' ) {
        player.velocity.x = 7
        player.switchSpriteL('run')
    } else if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -7
        player.switchSpriteR('run')
    } else {
        player.switchfighterSprite('idle')
    }

// jumping
    if (player.velocity.y < 0){
        player.switchfighterSprite('jump')
    } else if (player.velocity.y > 0){
        player.switchfighterSprite('fall')
    }

    if (keys.w.pressed && player.velocity.y === 0 ) {
        player.velocity.y = -25
    }

// enemy movement
    if (keys.ArrowRight.pressed && enemy.lastKey ==='ArrowRight' ) {
        enemy.velocity.x = 9
        enemy.switchSpriteL('run')
    } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -9
        enemy.switchSpriteR('run')
    } else {
        enemy.switchfighterSprite('idle')
    }
// jumping
    if (enemy.velocity.y < 0){
        enemy.switchfighterSprite('jump')
    } else if (enemy.velocity.y > 0){
        enemy.switchfighterSprite('fall')
    }

    if (keys.ArrowUp.pressed && enemy.velocity.y === 0 ) {
        enemy.velocity.y = -25
    }

// detect for collision

// Player attack
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking &&
        player.health >= 1 &&
        player.frameCurrent === 4
    ) {
        enemy.takeHit()
        player.isAttacking = false
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

    if (player.isAttacking && player.frameCurrent === 4){
        player.isAttacking = false
    }

// Enemy attack
    if (enemy.isAttacking &&
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking &&
        enemy.health >= 1 &&
        enemy.frameCurrent === 3
    ) {
        player.takeHit()
        enemy.isAttacking = false
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }

    if (enemy.isAttacking && enemy.frameCurrent === 3){
        enemy.isAttacking = false
    }
// Zero-Health Bar
    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({player, enemy, timerId})
    }

}

animate()

window.addEventListener('keydown' , (event) => {
    if (!player.death){
    switch (event.key) {
        case 'd' :
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a' :
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w' :
            keys.w.pressed = true
            break
        case 's':
            player.attack()
            player.switchfighterSprite('attack1')
            directionAttack()
            break
    }
}
// Enemy Keys
    if (!enemy.death){
    switch (event.key){
        case 'ArrowRight' :
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp' :
            keys.ArrowUp.pressed = true
            break
        case 'ArrowDown' :
            enemy.attack()
            enemy.switchfighterSprite('attack1')
            directionAttack()
            break
        }
    }
    //console.log(event.key)
})

window.addEventListener('keyup' , (event) => {
// player keys
    switch (event.key) {
        case 'd' :
            keys.d.pressed = false
            player.lastKey = null
            break
        case 'a' :
            keys.a.pressed = false
            player.lastKey = null
            break
        case 'w' :
            keys.w.pressed = false
            player.lastKey = null
            break
// Enemy Keys
        case 'ArrowRight' :
                keys.ArrowRight.pressed = false
                enemy.lastKey = null
                break
        case 'ArrowLeft' :
                keys.ArrowLeft.pressed = false
                enemy.lastKey = null
                break
        case 'ArrowUp' :
                keys.ArrowUp.pressed = false
                enemy.lastKey = null
                break
        }
    //console.log(event.key)
})

//pixel finder

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x, 
                "Coordinate y: " + y);
}

// window.addEventListener('mousedown', (event) => {
//     x = getImageData(canvas),
//     y = getImageData(canvas)
//     console.log(x , y)
// })