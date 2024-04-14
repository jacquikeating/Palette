// EXPORT -----------------------------------------------------------------------------
export { copyCode, tempTextArea, showCopiedSpan }


// FUNCTIONS --------------------------------------------------------------------------
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
// navigator.clipboard.writeText would be better, but it wasn't working in the Scrimba editor
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

// Code-copy step 3: display feedback to user
function showCopiedSpan(codeToCopy, targetClrDivId, contrastTextClr) {
    const copiedSpan = document.querySelector(`#${targetClrDivId}-span`)
    copiedSpan.classList.add("copied")
    copiedSpan.style.color = contrastTextClr
    copiedSpan.innerHTML = `${codeToCopy} <br> copied!`
    setTimeout(function(){copiedSpan.classList.remove('copied')}, 650)
}