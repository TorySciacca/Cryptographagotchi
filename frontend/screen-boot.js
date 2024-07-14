//

var game_state = 0 //0 - boot, 1 - login, 2 - decrypt, 3 - generate
var load_screen_state = 0
var login_screen_state = 1

function reset_screen_text(set_to_boot_screen){
    if(set_to_boot_screen){
        document.getElementById("ui_screen_text_l1").innerText = 'e7a7e6';
        document.getElementById("ui_screen_text_l2").innerText = 'a7e6c0';
        document.getElementById("ui_screen_text_l3").innerText = '13e389';

    } else {
        document.getElementById("ui_screen_text_l1").innerText = '';
        document.getElementById("ui_screen_text_l2").innerText = '';
        document.getElementById("ui_screen_text_l3").innerText = '';

    }

    document.getElementById("ui_screen_text_l1").style.textDecoration = 'none';
    document.getElementById("ui_screen_text_l2").style.textDecoration = 'none';
    document.getElementById("ui_screen_text_l3").style.textDecoration = 'none';
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