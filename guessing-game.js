function guessingGame() {
    // generate a random number between 1 - 99
    let answer = Math.floor(Math.random() * 100);
    let isOver = false;

    return function guess(num) {
        if(isOver) return 'you won!';
        if (num === answer) {
            isOver = true;
        }
        if (num < answer) return `${num} is too low`;
        if (num > answer) return `${num} is too high`;
    }
}

module.exports = { guessingGame };
