
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

// init and mapping functions

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
    });

    window.addEventListener('keyup',(event) => {
        if (event.key == '1'){
            document.getElementById('a').style.backgroundColor = '#241f21ff';
        } else if (event.key == '2'){
            document.getElementById('b').style.backgroundColor = '#241f21ff';
        } else if (event.key == '3'){
            document.getElementById('c').style.backgroundColor = '#241f21ff';
        }
    });

    window.addEventListener('mousedown',(event) => {
        if (event.target == document.getElementById('a')){
            button_a()
        } else if (event.target == document.getElementById('b')) {
            button_b()
        } else if (event.target == document.getElementById('c')) {
            button_c()
        }
    });

    window.addEventListener('mouseup',(event) => {
        if (event.buttons == 0){
            document.getElementById('a').style.backgroundColor = '#241f21ff';
            document.getElementById('b').style.backgroundColor = '#241f21ff';
            document.getElementById('c').style.backgroundColor = '#241f21ff'; }
    })
}

function on_start() {
    init_debug()
    map_keyboard_shortcuts() 
};


//

var game_state = 0 //int
var load_screen_state = 0
var login_screen_state = 1

function launch_device() {
    
    if (load_screen_state == 0){
        load_screen_state += 1;
        document.getElementById("ui_screen_text_l1").innerText = 'crypto'
    } else if(load_screen_state == 1){                          
        load_screen_state += 1;
        document.getElementById("ui_screen_text_l2").innerText = 'grapha'
    } else if(load_screen_state == 2){
        load_screen_state += 1;
        document.getElementById("ui_screen_text_l3").innerText = 'gotchi'
    } else if(load_screen_state == 3){

        document.getElementById("ui_screen_text_l1").innerText = 'decrypt';
        document.getElementById("ui_screen_text_l2").innerText = 'new egg';
         document.getElementById("ui_screen_text_l3").innerText = '';
        game_state = 1
    }console.log(game_state)
}

function login_screen_selector(){ //bad function name, please rename
    document.getElementById("ui_screen_text_l" + String(login_screen_state)).style.textDecoration = 'none'
    if (login_screen_state == 1 ) {
        login_screen_state = 2
    } else {
        login_screen_state = 1
    };
    document.getElementById("ui_screen_text_l" + String(login_screen_state)).style.textDecoration = 'underline'
}

function button_a() {
    launch_device() 
    if (game_state == 1){login_screen_selector()}
    document.getElementById('a').style.backgroundColor = '#f1f8d4ff'
    if (debug == true){
        console.log('select');
        document.getElementById("debug").innerText = 'select'
        }
};

function button_b() {
    launch_device()
    if (game_state == 1){console.log('make selection')}
    document.getElementById('b').style.backgroundColor = '#f1f8d4ff'
    if (debug == true){
        console.log('execute');
        document.getElementById("debug").innerText = 'execute'
        }
};

function button_c() {
    launch_device()
    if (game_state == 1){login_screen_selector()}
     document.getElementById('c').style.backgroundColor = '#f1f8d4ff'
    if (debug == true){
        console.log('cancel');
        document.getElementById("debug").innerText = 'cancel'
        }
};

on_start()