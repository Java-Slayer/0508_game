const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const FPS = 60;

let player_x = 180;
let key_left = 0;
let key_right = 0;


document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowLeft') {
        key_left = 1;
    }
    if (event.key == 'ArrowRight') {
        key_right = 1;
    }
});
document.addEventListener('keyup', (event) => {
    if (event.key == 'ArrowLeft') {
        key_left = 0;
    }
    if (event.key == 'ArrowRight') {
        key_right = 0;
    }
});


class Ddong {
    constructor(x, spd) {
        this.x = x;
        this.y = -16;
        this.spd = spd;
    }

    move() {
        this.y += this.spd;
    }
}
Ddongs = [];



let t = 0;


function step() {
    if (key_left == 1 && player_x > 0)
        player_x -= 4;
    if (key_right == 1 && player_x < 360)
        player_x += 4;

    t++;
    if (t % 5 == 0) {
        x = Math.random() * 360;
        ddong = new Ddong(x, 4 + Math.random() * 4);
        Ddongs.push(ddong);
    }

    Ddongs.forEach((ddong, index) => {
        ddong.move();
        if (ddong.y >= 680) {
            Ddongs.splice(index, 1);
        }
        if ((player_x - ddong.x) * (player_x - ddong.x) + (650 - ddong.y) * (650 - ddong.y) <= 16 * 16) {
            alert("GAME OVER\nSCORE : " + t);
            Ddongs.splice(index, 1);
            window.location.reload();
        }

    });


}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(spr_player, player_x - 16, 650 - 16, spr_player.width, spr_player.height);

    Ddongs.forEach((ddong, index) => {
        ctx.drawImage(spr_ddong, ddong.x - 16, ddong.y - 16, 32, 32);
    });


    ctx.font = "24px 궁서체";
    ctx.fillText(t, 0, 680);


}

function game() {
    step();
    draw();
}