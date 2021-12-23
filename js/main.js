import {GameView, clickToTail, canvas, winGame} from "./gameview.js"
import {move, goalTest, actions, successor} from "./game.js"
import {search} from "./search.js"


const initialState = [
    [4, 1, 3],
    [7, 2, 5],
    [8, 0, 6]]

const winState = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]]

const length = winState.length
let count = 0
let s1 = initialState
new GameView(s1)

canvas.addEventListener('click', moveView)
const btn_start_ai = document.querySelector('#btn_start_ai')
btn_start_ai.addEventListener('click', start_ai)


function moveView(event)
{
    const [i, j] = clickToTail(event.offsetX, event.offsetY)
    s1 = move(s1, i, j)
    new GameView(s1)
    count = 0
    for(let i = 0; i < length; i++){
        for(let j = 0; j < length; j++){
            if(s1[i][j] === winState[i][j]) {
                count += 1
            }
        }
    }
    if(count === 9){
        winGame()
    }
}

function start_ai()
{
    const solution = search(s1, goalTest, actions, successor, false)
    for(let i = 0; i < solution.length; i++)
    {
        setTimeout(()=>{new GameView(solution[i].state)}, i * 2000)
        if(i === solution.length - 1)
            s1 = solution[i].state
    }
}
