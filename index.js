// ELEMENT REFERENCES -----------------------------------------------------------------

const lightThemeBtn = document.getElementById("light-theme-btn")
const darkThemeBtn = document.getElementById("dark-theme-btn")
const clrInput = document.querySelector("#clr-input")
const clrInputText = document.querySelector("#clr-input-text")
const schemeSelect = document.querySelector(".scheme-select")
const getSchemeBtn = document.querySelector(".get-scheme-btn")
const clrDivs = document.querySelectorAll(".clr")



// GLOBAL VARIABLES -----------------------------------------------------------------

let seedClrData
let clrsArray
let theme = 'dark'
let seedClr = clrInput.value.replace(/#/, "")
let schemeType



// LISTENERS -----------------------------------------------------------------

// Selecting dark or light mode "fills in" the corresponding icon and applies the theme
lightThemeBtn.addEventListener("click", function() {
    theme = 'light'
    lightThemeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`
    darkThemeBtn.innerHTML = `<i class="fa-regular fa-moon"></i>`
    applyLightTheme()
})

darkThemeBtn.addEventListener("click", function() {
    theme = 'dark'
    darkThemeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`
    lightThemeBtn.innerHTML = `<i class="fa-regular fa-sun"></i>`
    applyDarkTheme()
})

// Calls updateClrInput() whenever user chooses a colour, not just when clicking getSchemeBtn
clrInput.addEventListener("input", updateClrInput)

// getSchemeBtn triggers a small chain of events, starting with getColourScheme()
getSchemeBtn.addEventListener("click", getColourScheme)

// Triggers copyCode() whenever any colour is clicked
for (let i = 0; i < clrDivs.length; i++) {
    clrDivs[i].addEventListener("click", copyCode)
}


// FUNCTIONS
// Displays the hex code of the seed colour each time the user changes it
function updateClrInput() {
    clrInputText.textContent = clrInput.value.toUpperCase()
    seedClr = clrInput.value.replace(/#/, "")
    fetch(`https://www.thecolorapi.com/id?hex=${seedClr}`)
        .then(res => res.json())
        .then(data => {
            seedClrData = data
             clrInputText.style.color = seedClrData.contrast.value
             clrInput.setAttribute("data-contrast", `${seedClrData.contrast.value}`)
        })
}

// Get colour scheme, step 1: Call API to fill clrsArray variable with data
function getColourScheme() {
    schemeType = document.querySelector(".scheme-select").value    
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedClr}&mode=${schemeType}&count=5`)
        .then(res => res.json())
        .then(data => {
            clrsArray = data
            updatePalette() // Calls step 2
        })
}

// Step 2: Fill colour divs with fetched data
function updatePalette(){
    const clrDivs = document.querySelectorAll(".clr")

    for (let i = 0; i < clrDivs.length; i++){
        const clrDiv = document.getElementById(`clr-${i}`)
        const clrText = document.getElementById(`clr-${i}-text`)
        const clrCode = clrsArray.colors[i].hex.value
        clrDiv.setAttribute("data-contrast", `${clrsArray.colors[i].contrast.value}`)
        clrDiv.style.background = clrCode
        clrText.textContent = clrCode
    }
}

// Code-copying function 1: Basically just sets up all the arguments the other functions need
function copyCode(e) {
    let targetClrDiv = e.target

    if (e.target.tagName === "P") {
        targetClrDiv = e.target.parentElement
    }
        
    let targetClrDivId = targetClrDiv.id
    let codeToCopy = document.querySelector(`#${targetClrDivId} p`).textContent
    let contrastTextClr = targetClrDiv.getAttribute("data-contrast")
    tempTextArea(codeToCopy, targetClrDivId, contrastTextClr)
}

// code-copy 2: Cretes a temporary <textarea> so we can put our text in it and then copy from that.
// There's gotta be an easier way of doing this... test the non-Scrimba option on desktop
function tempTextArea(codeToCopy, targetClrDivId, contrastTextClr) {
     const textArea = document.createElement('textarea')
        textArea.value = codeToCopy
        textArea.style.opacity = 0
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
    document.body.removeChild(textArea)
    
    showCopiedSpan(codeToCopy, targetClrDivId, contrastTextClr)
}

// Code-copy step 3: 
function showCopiedSpan(codeToCopy, targetClrDivId, contrastTextClr) {
    const copiedSpan = document.querySelector(`#${targetClrDivId}-span`)
    copiedSpan.classList.add("copied")
    copiedSpan.style.color = contrastTextClr
    copiedSpan.innerHTML = `${codeToCopy} <br> copied!`
    setTimeout(function(){copiedSpan.classList.remove('copied')}, 650)
}

// Dark/light theme
function applyLightTheme() {
    document.querySelector("html").classList.add("light-theme")
}

function applyDarkTheme() {
    document.querySelector("html").classList.remove("light-theme")
}
