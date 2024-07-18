//캔바스 선택
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const FPS = 60 //FPS 저장
let playerX = 180 //플레이어 X값
let playerY = 420

//플레이어 조작 변수
let keyLeft = 0 //왼쪽 유무 확인용
let keyRight = 0
let keyUp = 0
let keyDown = 0

document.addEventListener('keydown', (event) => { //키가 눌렸을 때
    if (event.key == 'ArrowLeft') { //왼쪽 화살표가 눌렸을 때
        keyLeft = 1 //변수를 1로 저장
    }
    if (event.key == 'ArrowRight') {
        keyRight = 1
    }
    if (event.key == 'ArrowUp') {
        keyUp = 1
    }
    if (event.key == 'ArrowDown') {
        keyDown = 1
    }
})
document.addEventListener('keyup', (event) => { //키를 땟을 떄
    if (event.key == 'ArrowLeft') {
        keyLeft = 0
    }
    if (event.key == 'ArrowRight') {
        keyRight = 0
    }
    if (event.key == 'ArrowUp') {
        keyUp = 0
    }
    if (event.key == 'ArrowDown') {
        keyDown = 0
    }
})

class cBullet { //총알 클래스
    constructor(x, speed) { //constructor <=생성자. 매게변수로 x값, 스피드 넣음
        this.x = x
        this.y = -16
        this.speed = speed
    }
    move() {
        this.y += this.speed //자신의 스피드 만큼 내려감
    }
}
bullets = [] //총알 배열
class cBullet2 {
    constructor(y, speed) {
        this.x = -16
        this.y = y
        this.speed = speed
    }
    move() {
        this.x += this.speed
    }
}
bullets2 = []
class cBullet3 {
    constructor(y, speed) {
        this.x = canvas.width + 16
        this.y = y
        this.speed = speed
    }
    move() {
        this.x -= this.speed
    }
}
bullets3 = []
class cBullet4 {
    constructor(y, speed) {
        this.x = -16
        this.y = y
        this.speed = speed
    }
    move() {
        this.x += this.speed
        this.y += this.speed
    }
}
bullets4 = []
class cBullet5 {
    constructor(y, speed) {
        this.x = canvas.width + 16
        this.y = y
        this.speed = speed
    }
    move() {
        this.x -= this.speed
        this.y += this.speed
    }
}
bullets5 = []

let t = 0 //타이머

function step() { //움직임 함수
    //플레이어 움직임
    if (keyLeft == 1 && playerX > 0) { //왼쪽 함수가 1이고, 벽에 안닿아있으면 4만큼 움직임
        playerX -= 4
    }
    if (keyRight == 1 && playerX < canvas.width) {
        playerX += 4
    }
    if (keyUp == 1 && playerY > 0) {
        playerY -= 4
    }
    if (keyDown == 1 && playerY < canvas.height) {
        playerY += 4
    }
    //총알 움직임
    t++ //매 프레임마다 1씩 타이머 증가
    if (t % 120 == 0) { //타이머를 FPS로 나눈 나머지가 0과 같다면 총알 객체 생성
        x = Math.random() * canvas.width //캔버스 폭 안의 랜덤 x좌표
        y = Math.random() * canvas.height //캔버스 높이 안의 랜덤 y좌표
        ry = Math.random() * canvas.height
        bullet = new cBullet(x, 8) //총알 에 좌표, 속도 삽입
        bullet2 = new cBullet2(y, 8)
        bullet3 = new cBullet3(ry, 8)
        bullet4 = new cBullet4(y, 8)
        bullet5 = new cBullet5(ry, 8)
        bullets.push(bullet) //리스트에 총알 삽입
        bullets2.push(bullet2)
        bullets3.push(bullet3)
        bullets4.push(bullet4)
        bullets5.push(bullet5)
    }
    bullets.forEach((bullet, index) => {
        bullet.move() //매 프레임마다 .move 메서드 사용으로 총알이 날아옴
        bullet2.move()
        bullet3.move()
        bullet4.move()
        bullet5.move()
        if (bullet.y >= canvas.height) { //총알이 바닥에 닿으면 사라짐
            bullets.splice(index, 1)
        }
        if (bullet2.x >= canvas.width) {
            bullets2.splice(index, 1)
        }
        if (bullet3.x <= 0) {
            bullets3.splice(index, 1)
        }
        if (bullet4.y >= canvas.height || bullet4.x >= canvas.width) {
            bullets4.splice(index, 1)
        }
        if (bullet5.y >= canvas.height || bullet5.x <= 0) {
            bullets5.splice(index, 1)
        }
        //(플레이어 좌표 - 총알 좌표) X (플레이어 좌표 - 총알 좌표) + (같은공식 Y좌표로)=결과가 총알크기의 1/4보다 작다면 게임오버
        //플레이어와, 총알의 거리가 16보다 작다면 게임오버라는 뜻...
        if ((playerX - bullet.x) * (playerX - bullet.x) + (playerY - bullet.y) * (playerY - bullet.y) <= 16 * 16 ||
            (playerX - bullet2.x) * (playerX - bullet2.x) + (playerY - bullet2.y) * (playerY - bullet2.y) <= 16 * 16 ||
            (playerX - bullet3.x) * (playerX - bullet3.x) + (playerY - bullet3.y) * (playerY - bullet3.y) <= 16 * 16 ||
            (playerX - bullet4.x) * (playerX - bullet4.x) + (playerY - bullet4.y) * (playerY - bullet4.y) <= 16 * 16 ||
            (playerX - bullet5.x) * (playerX - bullet5.x) + (playerY - bullet5.y) * (playerY - bullet5.y) <= 16 * 16) { //플레이어와 총알이 충돌할 경우
            alert('게임오바 / 최종스코어 : ' + t) //종료문구가 뜸
            bullets.splice(index, 1)
            window.location.reload() //새로고침
        }
    });
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height) //잔상을 지우기 위해 캔버스 초기화
    context.drawImage(background, 0, 0)
    context.drawImage(sPlayer, playerX - 16, playerY - 31, sPlayer.width, sPlayer.height) //플레이어 이미지 조정
    bullets.forEach((bullet, index) => {
        context.drawImage(sBullet, bullet.x - 16, bullet.y - 16, 32, 32) //총알 이미지 조정
    })
    bullets2.forEach((bullet2, index) => {
        context.drawImage(sBullet2, bullet2.x - 16, bullet2.y - 16, 32, 32)
    })
    bullets3.forEach((bullet3, index) => {
        context.drawImage(sBullet3, bullet3.x - 16, bullet3.y - 16, 32, 32)
    })
    bullets4.forEach((bullet4, index) => {
        context.drawImage(sBullet4, bullet4.x - 16, bullet4.y - 16, 32, 32)
    })
    bullets5.forEach((bullet5, index) => {
        context.drawImage(sBullet5, bullet5.x - 16, bullet5.y - 16, 32, 32)
    })
    context.font = '24px 궁서체'
    context.fillText('점수 : ' + t, 10, 30)
}
function game() {
    step()
    draw()
}