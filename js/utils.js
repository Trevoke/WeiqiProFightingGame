function rectangularCollision({rectangle1, rectangle2}) {
    return (  rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
      rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
      )
  }

function determineWinner({player, enemy, timerId }){
      clearTimeout( timerId )
      document.querySelector('#displayText').style.display = 'flex'
      if(player.health === enemy.health) {
          document.querySelector('#displayText').innerHTML = 'Tie' 
      } else if (player.health < enemy.health) {
          document.querySelector('#displayText').innerHTML = 'You Lose'
      } else if (player.health > enemy.health) {
          document.querySelector('#displayText').innerHTML = 'You Win'
      }
  }
  
let timer = 60
let timerId
  function decreaseTimer() {
      if(timer > 0) {
          timerId = setTimeout(decreaseTimer, 1000)
          timer --
          document.querySelector('#countdownTimer').innerHTML = timer
      }
      if(timer === 0){
        determineWinner({player, enemy, timerId })
  }}
 
function setDirection(){
        if (player.position.x > enemy.position.x){
        player.face = left,
        enemy.face = right
            } else {
                player.face = right,
                enemy.face = left
        }
    console.log(player.face, enemy.face)
}

// function playerswitchSprite (sprite) {
//     if (player.position.x >= enemy.position.x) {
//         player.switchSpriteR (sprite)
//     } else {
//         player.switchSpriteL (sprite)
//     }
// }

// function enemyswitchSprite (sprite) {
//     if (player.position.x >= enemy.position.x) {
//         enemy.switchSpriteL (sprite)
//     } else {
//         enemy.switchSpriteR (sprite)
//         console.log('hi')
//     }
// }

let faceToTheRight = {
    offset: {
        x: 70,
        y: 30,
    },
}
let faceToTheLeft = {
    offset: {
        x: -155,
        y: 30,
    },
}


function directionAttack() {
    if(player.position.x > enemy.position.x){
        player.attackBox.offset.x = faceToTheLeft.offset.x
        enemy.attackBox.offset.x = faceToTheRight.offset.x
    } else {
        player.attackBox.offset.x = faceToTheRight.offset.x
        enemy.attackBox.offset.x = faceToTheLeft.offset.x
    }
}

// function enemytakeHit() {
//     enemyswitchSprite('takeHit')
//     console.log(enemyswitchSprite('take'))
//     this.health -= 25
// }

// function playertakeHit() {
//     playerswitchSprite('takeHit')
//     this.health -= 20
// }