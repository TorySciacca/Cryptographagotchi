
var debug = true //bool to determine if debug mode is on/off

function set_debug(set_debug) {
    debug = set_debug

    if (debug) {
        document.getElementById("debug").innerText = 'debug on';
    } else {
        document.getElementById("debug").innerText = ' ';
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

//initate debug
set_debug(false)