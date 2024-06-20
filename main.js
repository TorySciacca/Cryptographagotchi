
var debug = true //bool to determine if debug mode is on/off

function set_debug(set_debug) {
    debug = set_debug

    if (debug) {
        document.getElementById("debug").innerText = 'debug on';
    } else {
        document.getElementById("debug").innerText = ' ';
    }
};

function init_debug(){
    if(window.location.href.indexOf("GitHub")) // If the URL is in a github folder location, then user is likely a dev
        { set_debug(true) }
    else
        { set_debug(false)}
    };

function button_a() {
    highlightOnLeftClick('a')
    if (debug == true){
        console.log('select');
        document.getElementById("debug").innerText = 'select'
        }
};

function button_b() {
    highlightOnLeftClick('b')
    if (debug == true){
        console.log('execute');
        document.getElementById("debug").innerText = 'execute'
        }
};

function button_c() {
    highlightOnLeftClick('c')
    if (debug == true){
        console.log('cancel');
        document.getElementById("debug").innerText = 'cancel'
        }
};

function map_keyboard_shortcuts() { //alternative way of interacting with UI
    window.addEventListener('keydown',(event) => {
        if (event.key == '1'){
            button_a()
            document.getElementById('a').style.backgroundColor = '#f1f8d4ff';
        } else if (event.key == '2'){
            button_b()
            document.getElementById('b').style.backgroundColor = '#f1f8d4ff';
        } else if (event.key == '3'){
            button_c()
            document.getElementById('c').style.backgroundColor = '#f1f8d4ff';
        }
    })
    
    window.addEventListener('keyup',(event) => {
        if (event.key == '1'){
            document.getElementById('a').style.backgroundColor = '#241f21ff';
        } else if (event.key == '2'){
            document.getElementById('b').style.backgroundColor = '#241f21ff';
        } else if (event.key == '3'){
            document.getElementById('c').style.backgroundColor = '#241f21ff';
        }
    })

    window.addEventListener('mouseup',(event) => {
        if (event.buttons == 0){
            document.getElementById('a').style.backgroundColor = '#241f21ff';
            document.getElementById('b').style.backgroundColor = '#241f21ff';
            document.getElementById('c').style.backgroundColor = '#241f21ff'; }
    })
}

function highlightOnLeftClick(IDString) {
    const element = document.getElementById(IDString);
    
    element.addEventListener('mousedown', function(event) {
        // Check if the left mouse button (button code 0) is clicked
        if (event.button === 0) {
            // Apply the highlight style
            element.style.backgroundColor = '#f1f8d4ff';
        }
    });
}


function on_start() {
    init_debug()
    map_keyboard_shortcuts() 
};

on_start()