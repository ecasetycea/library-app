window.onload = onLoad;



function onLoad() {
    document.querySelector('#year').innerHTML = new Date().getFullYear();
}

function test() {
    console.log("Hello test");
}