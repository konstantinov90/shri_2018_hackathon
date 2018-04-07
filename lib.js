const body = document.querySelector('body');


function appendHTMLToBody(text) {
    const child = document.createElement('p');
    child.innerHTML = text;
    body.appendChild(child);
}

function appendTextToBody(text) {
    const child = document.createElement('p');
    child.innerText = text;
    body.insertChild(child);
}

function prependTextToBody(text) {
    const child = document.createElement('p');
    child.innerText = text;
    body.insertBefore(child, body.firstChild);
}

function appendHTMLAfter(text, selector) {
    const child = document.createElement('p');
    child.innerHTML = text;
    body.querySelector(selector).insertAdjacentElement('afterend', child);
}

function appendTextAfter(text, selector) {
    const child = document.createElement('p');
    child.innerText = text;
    body.querySelector(selector).insertAdjacentElement('afterend', child);
}