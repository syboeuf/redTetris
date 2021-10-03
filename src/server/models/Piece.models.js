class Piece {
    constructor(tetrimino) {
        this.tetrimino = tetrimino
    }

    rotateTetrimino() {
        const rotatedTetrimino = this.tetrimino.map((_, index) =>
            this.tetrimino.map((col) => col[index]))

        this.tetrimino = rotatedTetrimino.reverse()
        return this.tetrimino
    }
}

module.exports = Piece