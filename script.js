let isDrawing = false
let startRandomColor = false
let color = 'black';
let eraserON = false;
let grid = document.querySelector('#grid')
const START_SIZE = 32;
let cell = document.querySelectorAll('.cell');
let cells;
const header = document.querySelector('#header')
const buttons = document.querySelectorAll('button')
const drawButton = document.querySelector('#drawButton')
drawButton.addEventListener('click',() =>{
    color=colorButton.value
    startRandomColor = false;
    eraserON = false;
})
const colorButton = document.querySelector('#color')
colorButton.addEventListener('input', (event) => {
    color = event.target.value
    header.style.color = color
    startRandomColor =false;
    console.log(color);
    eraserON = false;

})
const eraser = document.querySelector('#eraser');
eraser.addEventListener('click', () => {
    eraserON = true;
    console.log(eraserON)
       
})


function changeColor(cell){
    if(eraserON === true){
        cell.classList.remove('colored')
        cell.style.backgroundColor = 'white';
    }
    else{
        cell.style.backgroundColor = color;
        cell.classList.add('colored');
    }
    
    
}
function startDrawing(cell){
    isDrawing = true;
    
    if(startRandomColor===true && eraserON===false){
        randomColor()
    }
    
    if (cell.classList.contains('colored')){
        return;
    }
    
    cell.classList.add('colored');
    changeColor(cell)
    console.log(isDrawing)
}
function draw(cell){
    if(cell.classList.contains('colored') && eraserON === true && isDrawing){
        changeColor(cell)
    }
    if (!isDrawing || cell.classList.contains('colored')){
        console.log("colored")
        return;
    }
    if(startRandomColor===true && eraserON===false){
        randomColor()
    }
    console.log(isDrawing)
    changeColor(cell,color);
}
function stopDrawing(cell){
    isDrawing = false;
    console.log(isDrawing)
}
buttons.forEach(button  => {
    button.addEventListener('click', () => {
        if(button.id==='clearButton'){
            return;
        }
        clearAllButtons(buttons)
    })
    if(button.id!=='clearButton'){
    button.addEventListener('click', () => {
        button.style.backgroundColor = '#333333';
        button.style.color = '#ebebeb';
    })
}
    })


let clearButton = document.querySelector('#clearButton');
clearButton.addEventListener('click', ()=> clear(cells));

function clear(cells){
    console.log('Clearing')
    eraserON = false;
    cells.forEach(cell => {
        console.log("setting color")
        cell.style.backgroundColor = 'white';
        cell.classList.remove('colored')
    })
}
    



const randomColorButton = document.querySelector('#randomColor')
randomColorButton.addEventListener('click', () => randomColor())
function randomColor(){
    startRandomColor = true;
    color = 'rgb(' + Math.floor(Math.random() * 256) + ',' +
                     Math.floor(Math.random() * 256) + ',' +
                     Math.floor(Math.random() * 256) + ')' 
    console.log(color)
    eraserON = false;
    
};

function gridGenerator(size){
    let width = Math.sqrt(size);
    grid.style.gridTemplateColumns = `repeat(${width}, ${500 / width}px)`;
    grid.style.gridTemplateRows = `repeat(${width}, ${500 / width}px)`; 
    for (let i = 0; i < size; i++){
        let cell = document.createElement('div')
        cell.classList.add('cell')
        cell.addEventListener('dragstart', () => stopDrawing(cell))
        cell.addEventListener('mousedown', () => startDrawing(cell));
        cell.addEventListener('mousemove',() =>  draw(cell));
        cell.addEventListener('mouseup',() =>  stopDrawing(cell));
        grid.appendChild(cell)
        }    
     cells = document.querySelectorAll('.cell')
}
let slider = document.querySelector('#myRange')
let sliderValueFrame = document.querySelector('#sliderValueFrame');
let sliderValue;

slider.addEventListener('input', function(){
    console.log("Click")
    
     sliderValue = this.value;
     sliderValueFrame.innerHTML = sliderValue + ' x ' + sliderValue;
     size = sliderValue
     gridSize = size * size;
     clearGrid(gridSize)
     gridGenerator(gridSize)


});
function clearGrid(size){
    while (grid.firstChild){
        grid.removeChild(grid.firstChild);
    }
}


window.onload = () =>{
    gridGenerator(START_SIZE * START_SIZE)
}
function clearAllButtons(buttons){
    
    buttons.forEach(button => {
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
    })
}
