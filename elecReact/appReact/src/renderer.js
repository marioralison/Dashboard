// import './index.jsx';

const counter = document.getElementById('counter')

// btn.addEventListener('click', async () => {
//     const filePath = await window.electronAPI.openFile()
//     filePathElement.innerText = filePath
// })  

window.electronAPI.onUpdateCounter((value) => {
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value
    counter.innerText = newValue.toString()
    window.electronAPI.counterValue(newValue)
})