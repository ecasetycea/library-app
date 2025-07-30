window.onload = onLoad;



function onLoad() {
    document.querySelector('#year').innerHTML = new Date().getFullYear();
}