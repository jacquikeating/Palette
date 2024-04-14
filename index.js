// IMPORTS ----------------------------------------------------------------
import { lightThemeBtn, darkThemeBtn, applyLightTheme, applyDarkTheme } from './modules/theme-switch.js'
import { copyCode } from './modules/copy-code.js'


// ELEMENT REFERENCES ----------------------------------------------------------------
const clrInput = document.querySelector("#clr-input")
const clrInputText = document.querySelector("#clr-input-text")
const schemeSelect = document.querySelector(".scheme-select")
const getSchemeBtn = document.querySelector(".get-scheme-btn")
const clrDivs = document.querySelectorAll(".clr")


// GLOBAL VARIABLES -----------------------------------------------------------------
let clrsArray
let seedClr = clrInput.value.replace(/#/, "")


// LISTENERS ------------------------------------------------------------------------
// Selecting dark or light mode "fills in" the corresponding icon and applies the theme
lightThemeBtn.addEventListener("click", applyLightTheme)
darkThemeBtn.addEventListener("click", applyDarkTheme)

// Calls updateClrInput() whenever user chooses a colour, not just when clicking getSchemeBtn
clrInput.addEventListener("input", updateClrInput)

// getSchemeBtn triggers getColourScheme() followed by updatePalette()
getSchemeBtn.addEventListener("click", getColourScheme)

// Triggers copyCode() whenever any colour is clicked
for (let i = 0; i < clrDivs.length; i++) {
    clrDivs[i].addEventListener("click", copyCode)
}


// FUNCTIONS -------------------------------------------------------------------------
// Displays the hex code of the seed colour each time the user changes it
function updateClrInput() {
    clrInputText.textContent = clrInput.value.toUpperCase()
    seedClr = clrInput.value.replace(/#/, "")
    fetch(`https://www.thecolorapi.com/id?hex=${seedClr}`)
        .then(res => res.json())
        .then(data => {
             clrInputText.style.color = data.contrast.value
             clrInput.setAttribute("data-contrast", `${data.contrast.value}`)
        })
}

// Get colour scheme, step 1: Call API to fill clrsArray variable with data
function getColourScheme() {
    let schemeType = document.querySelector(".scheme-select").value    
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

updateClrInput()
getColourScheme()