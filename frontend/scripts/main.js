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
    const SELECT_COLOUR = '#241f21ff'
    const INITAL_COLOUR = '#f1f8d4ff'

    window.addEventListener('keydown',(event) => {
        if (event.key == '1'){
            button_a()
            document.getElementById('a').style.backgroundColor = INITAL_COLOUR;
        } else if (event.key == '2'){
            button_b()
            document.getElementById('b').style.backgroundColor = INITAL_COLOUR;
        } else if (event.key == '3'){
            button_c()
            document.getElementById('c').style.backgroundColor = INITAL_COLOUR;
        }
    });

    window.addEventListener('keyup',(event) => {
        if (event.key == '1'){
            document.getElementById('a').style.backgroundColor = SELECT_COLOUR;
        } else if (event.key == '2'){
            document.getElementById('b').style.backgroundColor = SELECT_COLOUR;
        } else if (event.key == '3'){
            document.getElementById('c').style.backgroundColor = SELECT_COLOUR;
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
            document.getElementById('a').style.backgroundColor = SELECT_COLOUR;
            document.getElementById('b').style.backgroundColor = SELECT_COLOUR;
            document.getElementById('c').style.backgroundColor = SELECT_COLOUR; }
    })
}

function on_start() {
    init_debug()
    map_keyboard_shortcuts() 
};

on_start()

//

var game_state = 0 //0 - boot, 1 - login, 2 - decrypt, 3 - generate
var load_screen_state = 0
var login_screen_state = 1

function reset_screen_text(set_to_boot_screen){

    document.getElementById("ui_screen_text_l1").style.textDecoration = 'none';
    document.getElementById("ui_screen_text_l2").style.textDecoration = 'none';
    document.getElementById("ui_screen_text_l3").style.textDecoration = 'none';

    if(set_to_boot_screen){
        document.getElementById("ui_screen_text_l1").innerText = 'e7a7e6';
        document.getElementById("ui_screen_text_l2").innerText = 'a7e6c0';
        document.getElementById("ui_screen_text_l3").innerText = '13e389';

    } else {
        document.getElementById("ui_screen_text_l1").innerText = '';
        document.getElementById("ui_screen_text_l2").innerText = '';
        document.getElementById("ui_screen_text_l3").innerText = '';

    }
}

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
        load_screen_state += 1; //important for reloading this script
        document.getElementById("ui_screen_text_l1").innerText = 'sign in';
        document.getElementById("ui_screen_text_l2").innerText = 'sign up';
         document.getElementById("ui_screen_text_l3").innerText = '';
         login_screen_state = 2
         login_screen_selector()
        game_state = 1
    }else if (load_screen_state > 3){
        load_screen_state = 0;
        reset_screen_text(true)
    }console.log(game_state)
}

function login_screen_selector(){ 
    document.getElementById("ui_screen_text_l" + String(login_screen_state)).style.textDecoration = 'none'
    if (login_screen_state == 1 ) {
        login_screen_state = 2
    } else {
        login_screen_state = 1
    };
    document.getElementById("ui_screen_text_l" + String(login_screen_state)).style.textDecoration = 'underline'
}

function update_selector(selector,min_value,max_value) { 
    if (selector < max_value){
        selector++
    } else {
        selector = min_value
    }
}  

// STATE 1

function launch_sign_in(){
    reset_screen_text(false)
}

function launch_sign_up(){
    reset_screen_text(false)
}


// STATE 2 

function decrypt(){
    console.log('decrypt')
    reset_screen_text(false)
}

function generate_new_egg(){
    console.log('generate new egg')
    reset_screen_text(false)
}

//button functions

function button_a() {
    //if (game_state == 0){launch_device()}
    if (game_state == 1){login_screen_selector()};

    document.getElementById('a').style.backgroundColor = '#f1f8d4ff';

    if (debug == true){document.getElementById("debug").innerText = 'select'}
};

function button_b() {
    if (game_state == 0){launch_device()}

    else if (game_state == 1){ //
        if (login_screen_state == 1){
            game_state = 2
            launch_sign_in()
        } else if (login_screen_state == 2){
            game_state = 3
            launch_sign_up()
        };}
    else if (game_state == 2){ //sign in menu
        
    }

    document.getElementById('b').style.backgroundColor = '#f1f8d4ff';

    if (debug == true){document.getElementById("debug").innerText = 'execute'}
};

function button_c() {
    //if (game_state == 0){launch_device()}
    if (game_state == 1){game_state -= 1;launch_device()}
    else if (game_state == 2 || game_state == 3){game_state = 0;load_screen_state = 3,launch_device()};

    document.getElementById('c').style.backgroundColor = '#f1f8d4ff';

    if (debug == true){document.getElementById("debug").innerText = 'cancel'}
};

//REST API FUNCTIONS
function getAllUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            console.log('All Users:', data);
        })
        .catch(error => console.error('Error fetching users:', error));
}

function getUserByUsername(username) {
    fetch(`/api/users/${btoa(username)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('User:', data);
    })
    .catch(error => console.error('Error fetching user:', error));
}

function postUser(username){
    fetch('/api/users',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: btoa(username)})
    })
    .then(res => {
        return res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.log('ERROR', error))
}