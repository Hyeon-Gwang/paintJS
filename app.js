const canvas = document.querySelector('#jsCanvas')
const colors = document.querySelectorAll('.jsColor')
const range = document.querySelector('#jsRange')
const mode = document.querySelector('#jsMode')
const saveBtn = document.querySelector('#jsSave')
const ctx = canvas.getContext('2d')

let painting = false
let filling = false

// CANVAS DEFAULT
const INITIAL_COLOR = '#2c2c2c'
ctx.fillStyle = '#fff'
ctx.fillRect(0, 0, 700, 580)

ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = 2.5
canvas.width = 700
canvas.height = 580




function startPainting() {
    painting = true
}
function stopPainting() {
    painting = false
}

if(canvas){
    canvas.addEventListener('mousemove', () => {            // 라인 그리기
        const x = event.offsetX
        const y = event.offsetY

        if(!painting) {
            ctx.beginPath()
            ctx.moveTo(x, y)
        }else {
            ctx.lineTo(x, y)
            ctx.stroke()
        }
    })
    canvas.addEventListener('mousedown', startPainting)
    canvas.addEventListener('mouseup', stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
    canvas.addEventListener('click', () => {                // 채우기
        if(filling){
            ctx.fillRect(0, 0, 700, 580)
        }
    })
    canvas.addEventListener('contextmenu', () => {          // 우클릭 방지
        event.preventDefault()
    })
}

Array.from(colors).forEach(color => color.addEventListener("click", () => {
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color
    ctx.fillStyle = color
}));

if(range){
    range.addEventListener('input', () => {
        const size = event.target.value
        ctx.lineWidth = size
    })
}

if(mode){
    mode.addEventListener('click', () => {
        if(filling == true){
            filling = false
            mode.innerText = 'Fill'
        } else{
            filling = true
            mode.innerText = 'Paint'
        }
    })
}

if(saveBtn){
    saveBtn.addEventListener('click', () => {
        const image = canvas.toDataURL()
        const link = document.createElement('a')
        link.href = image
        link.download = 'paintJS'
        link.click()
    })
}