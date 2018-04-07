function appendTextToBody(text) {
    const child = document.createElement('p');
    child.innerText = text;
    document.querySelector('body').appendChild(child);
}