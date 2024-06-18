
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
    if(window.location.href.indexOf("GitHub")) // If the URL is in a github folder location, then user is a dev
        {
            set_debug(true)
        }
    else
        {
            set_debug(false)
        }
    };

function button_a() {
    if (debug == true){
        console.log('select');
        document.getElementById("debug").innerText = 'select'
        }
};

function button_b() {
    if (debug == true){
        console.log('execute');
        document.getElementById("debug").innerText = 'execute'
        }
};

function button_c() {
    if (debug == true){
        console.log('cancel');
        document.getElementById("debug").innerText = 'cancel'
        }
};

function map_keyboard_shortcuts() { //alternative way of interacting with UI
    window.addEventListener('keydown',(event) => {
        if (event.key == '1'){
            button_a()
        } else if (event.key == '2'){
            button_b()
        } else if (event.key == '3'){
            button_c()
        }
    })
}

function on_start() {
    init_debug()
    map_keyboard_shortcuts() 
}

on_start()