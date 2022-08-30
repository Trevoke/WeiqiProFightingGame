class Sprite {
    constructor({ 
    position, 
    imageSrc, 
    scale = 1, 
    frameMax = 1, 
    offset = {x: 0, y: 0} 
}) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.frameMax = frameMax
        this.frameCurrent = 0
        this.frameElapsed = 0
        this.frameHold = 10
        this.offset = offset
    }

    draw() {
        c.drawImage(
            this.image,
            this.frameCurrent * (this.image.width / this.frameMax),
            0,
            this.image.width / this.frameMax,
            this.image.height,

            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            this.image.width / this.frameMax * this.scale, 
            this.image.height * this.scale
        )
    }

    animateFrames (){
        this.frameElapsed ++
        if(this.frameElapsed % this.frameHold === 0){
            if (this.frameCurrent < this.frameMax - 1){
                this.frameCurrent ++
                    } else {
                     this.frameCurrent = 0
                }
        }
    }

    update() {
        this.draw()
        this.frameElapsed ++

        if(this.frameElapsed % this.frameHold === 0){
            if (this.frameCurrent < this.frameMax - 1){
                this.frameCurrent ++
                    } else {
                     this.frameCurrent = 0
                }
        }
    }
}

class Fighter extends Sprite {
    constructor({ 
        position, 
        velocity, 
        color,
        imageSrc, 
        scale = 1, 
        frameMax = 1,
        offset = {x: 0, y: 0},
        spritesL,
        spritesR,
        attackBox = {
            offset:{}, 
            width: undefined, 
            height: undefined
        },
        face = left,
    }) {
        super({
            position,
            imageSrc,
            scale,
            frameMax,
            offset
        })
            this.position = position
            this.velocity = velocity
            this.width = 50
            this.height = 150
            this.lastKey
            this.attackBox = {
                position: {
                    x: this.position.x,
                    y: this.position.y
                },
                offset: attackBox.offset,
                width: attackBox.width ,
                height: attackBox.height ,
            }
            this.color = color
            this.isAttacking
            this.health = 100
            this.frameCurrent = 0
            this.frameElapsed = 0
            this.frameHold = 5
            this.spritesL = spritesL
            this.spritesR = spritesR
            this.face = face
            this.death = false

            for (const sprite in spritesL) {
                spritesL[sprite].image = new Image()
                spritesL[sprite].image.src = spritesL[sprite].imageSrc
            }

            for (const sprite in spritesR) {
                spritesR[sprite].image = new Image()
                spritesR[sprite].image.src = spritesR[sprite].imageSrc
            }
    }

    update() {
        this.draw()
        if (!this.death) this.animateFrames()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // draw attackbox

        // c.fillRect(
        //     this.attackBox.position.x, 
        //     this.attackBox.position.y, 
        //     this.attackBox.width, 
        //     this.attackBox.height
        // )

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //gravity function and border control
        if (this.position.x + this.width + this.velocity.x >= canvas.width) {
            this.position.x = canvas.width - this.width
            this.velocity.x = 0
        } else
        if (this.position.x + this.velocity.x <= 30) {
            this.position.x = 30 
            this.velocity.x = 0
        }

        if ( this.position.y + this.height + this.velocity.y >= groundHeight ) {
         this.velocity.y = 0
         this.position.y = 332
        } else this.velocity.y += gravity

        if ( this.position.y + this.velocity.y <= 0 ) {
            this.position.y = 332
            this.velocity.y = 0
        }

    }

    switchfighterSprite(sprite){
        if(!this.death === true){
            setDirection()
            if (this.face !== 1){
            this.switchSpriteL(sprite)
            } else {
            this.switchSpriteR(sprite)}
        }
    }
    

    attack() {
        this.isAttacking = true
    }
    
    takeHit() {
        this.health -= 33.34
        if (this.health < 0)
        this.health = 0

        if (this.health <=0){
            this.switchfighterSprite('death')
            } else {
                this.switchfighterSprite('takeHit')
            }
    }

    switchSpriteL (sprite){
        //overriding all other animation
        if (this.image === this.spritesL.death.image) {
            if (this.frameCurrent < this.spritesL.death.frameMax -1 )
            this.death = true
            return 
        } 

        if (this.image === this.spritesL.attack1.image &&
             this.frameCurrent < this.spritesL.attack1.frameMax -1 )
        return

        if (this.image === this.spritesL.takeHit.image && 
            this.frameCurrent < this.spritesL.takeHit.frameMax -1)
        return

        switch(sprite) {
            case 'idle':
                if (this.image !== this.spritesL.idle.image){
                    this.image = this.spritesL.idle.image
                    this.frameMax = this.spritesL.idle.frameMax
                    this.frameCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.spritesL.run.image){
                    this.image = this.spritesL.run.image
                    this.frameMax = this.spritesL.run.frameMax
                    this.frameCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.spritesL.jump.image){
                    this.image = this.spritesL.jump.image
                    this.frameMax = this.spritesL.jump.frameMax
                    this.frameCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.spritesL.fall.image){
                    this.image = this.spritesL.fall.image
                    this.frameMax = this.spritesL.fall.frameMax
                    this.frameCurrent = 0
                }
                break
            case 'attack1':
                if (this.image !== this.spritesL.attack1.image){
                    this.image = this.spritesL.attack1.image
                    this.frameMax = this.spritesL.attack1.frameMax
                    this.frameCurrent = 0
                }
                break
            case 'takeHit':
                if (this.image !== this.spritesL.takeHit.image){
                    this.image = this.spritesL.takeHit.image
                    this.frameMax = this.spritesL.takeHit.frameMax
                    this.frameCurrent = 0
                }
                break
            case 'death':
                if (this.image !== this.spritesL.death.image){
                    this.image = this.spritesL.death.image
                    this.frameMax = this.spritesL.death.frameMax
                    this.frameCurrent = 0
                }
                break
        }
    }

    switchSpriteR (sprite){
        if (this.image === this.spritesR.death.image) {
            if (this.frameCurrent < this.spritesR.death.frameMax -1 )
            this.death = true
            return 
        } 

        if (this.image === this.spritesR.attack1.image &&
             this.frameCurrent < this.spritesR.attack1.frameMax -1 )
        return

        if (this.image === this.spritesR.takeHit.image &&
            this.frameCurrent < this.spritesR.takeHit.frameMax -1 )
       return
        
        switch(sprite) {
            case 'idle':
                if (this.image !== this.spritesR.idle.image){
                    this.image = this.spritesR.idle.image
                    this.frameMax = this.spritesR.idle.frameMax
                    this.frameCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.spritesR.run.image){
                    this.image = this.spritesR.run.image
                    this.frameMax = this.spritesR.run.frameMax
                    this.frameCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.spritesR.jump.image){
                    this.image = this.spritesR.jump.image
                    this.frameMax = this.spritesR.jump.frameMax
                    this.frameCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.spritesR.fall.image){
                    this.image = this.spritesR.fall.image
                    this.frameMax = this.spritesR.fall.frameMax
                    this.frameCurrent = 0
                }
                break
            case 'attack1':
                if (this.image !== this.spritesR.attack1.image){
                    this.image = this.spritesR.attack1.image
                    this.frameMax = this.spritesR.attack1.frameMax
                    this.frameCurrent = 0
                }
                break
            case 'attack2':
                if (this.image !== this.spritesR.attack2.image){
                    this.image = this.spritesR.attack2.image
                    this.frameMax = this.spritesR.attack2.frameMax
                    this.frameCurrent = 0
                }
                break
            case 'takeHit':
                if (this.image !== this.spritesR.takeHit.image){
                    this.image = this.spritesR.takeHit.image
                    this.frameMax = this.spritesR.takeHit.frameMax
                    this.frameCurrent = 0
                }
                break
            case 'death':
                if (this.image !== this.spritesR.death.image){
                    this.image = this.spritesR.death.image
                    this.frameMax = this.spritesR.death.frameMax
                    this.frameCurrent = 0
                }
                break
        }
    }
}