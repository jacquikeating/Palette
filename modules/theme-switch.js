// EXPORT -----------------------------------------------------------------------------
export { lightThemeBtn, darkThemeBtn, applyLightTheme, applyDarkTheme }


// ELEMENT REFERENCES -----------------------------------------------------------------
const lightThemeBtn = document.getElementById("light-theme-btn")
const darkThemeBtn = document.getElementById("dark-theme-btn")


// GLOBAL VARIABLE(S)  ----------------------------------------------------------------
let theme = 'dark'


// LISTENERS --------------------------------------------------------------------------
lightThemeBtn.addEventListener("click", applyLightTheme)
darkThemeBtn.addEventListener("click", applyDarkTheme)


// FUNCTIONS --------------------------------------------------------------------------
function applyLightTheme() {
    theme = 'light'
    lightThemeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`
    darkThemeBtn.innerHTML = `<i class="fa-regular fa-moon"></i>`
    document.querySelector("html").classList.add("light-theme")
}

function applyDarkTheme() {
    theme = 'dark'
    darkThemeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`
    lightThemeBtn.innerHTML = `<i class="fa-regular fa-sun"></i>`
    document.querySelector("html").classList.remove("light-theme")
}