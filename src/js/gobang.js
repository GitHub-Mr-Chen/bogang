function gobang() {
    this.down = 0;
    this.mapArr = [0];
    this.mode = [
        [1, 0],
        [0, 1],
        [1, -1],
        [-1, -1],
    ]
}
var canvas = document.getElementById("canvas");
canvas.width = 510;
canvas.height = 510;
var cxt = canvas.getContext("2d");
gobang.prototype = {
    // 判断胜负
    win: function (x, y, color, mode) {
        let succession = 0;
        let i = 0;
        // console.log(x,succession);
        while (gobang.mapArr[x - i * mode[0]]) {
            if (gobang.mapArr[x - i * mode[0]][y - i * mode[1]] == color) {
                succession++;
                i++;
            } else {
                break;
            }
        }
        i = 1;
        while (gobang.mapArr[x + i * mode[0]][y + i * mode[1]] == color) {
            succession++;
            i++;
            // console.log(x,succession);
        }
        return succession;
        // console.log(succession);
    },
    // 绘制黑白棋子
    chessPieces: function (x, y, color) {
        let xa = x / 30 - 1;
        let ya = y / 30 - 1;
        // 如果棋盘相应位置没有棋子，值为0
        if (!gobang.mapArr[xa][ya]) {
            // console.log( xa, ya);
            gobang.mapArr[xa][ya] = color;
            cxt.fillStyle = color;
            cxt.beginPath();
            cxt.arc(x, y, 14, 0, Math.PI * 2, true);
            cxt.closePath();
            cxt.fill();
            cxt.stroke();
            gobang.down++;
            for (let index = 0; index < gobang.mode.length; index++) {
                if (this.win(xa, ya, color, gobang.mode[index]) >= 5) {
                    alert(color + ": win!");
                    window.location.href="";
                }
            }


        }
    },
    // 绘制棋盘
    chessboard: function () {
        cxt.beginPath();
        for (let i = 1; i < 17; i++) {
            cxt.moveTo(30 * i, 30);
            cxt.lineTo(30 * i, 480);
            cxt.moveTo(30, 30 * i);
            cxt.lineTo(480, 30 * i);
        }
        cxt.closePath();
        cxt.stroke();
        for (let i = 0; i < 16; i++) {
            this.mapArr[i] = [0];
            for (let j = 0; j < 16; j++) {
                this.mapArr[i][j] = 0;
            }
        }
        this.chessboardClick();
    },
    // 点击落子
    chessboardClick: function (params) {
        canvas.addEventListener("click", function (el) {
            let eX = el.offsetX;
            let eY = el.offsetY;
            // console.log(gobang.down);
            let x = Math.floor((eX + 15) / 30) * 30;
            let y = Math.floor((eY + 15) / 30) * 30;
            if (x == 0 || y == 0) {
                return;
            }
            switch (gobang.down % 2) {
                case 0:
                    gobang.chessPieces(x, y, "white");
                    break;
                case 1:
                    gobang.chessPieces(x, y, "black");
                    break;
                default:
                    break;
            }
        })
    }
}
var gobang = new gobang();
gobang.chessboard();
// gobang.black(60,60);
// gobang.white(90,180);
