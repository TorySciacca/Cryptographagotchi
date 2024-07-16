var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Global variables
var gameState = 0; // 0 - boot, 1 - login screen selection, 2 - login/decrypt, 3 - sign up
var bootScreenState = 0;
var loginScreenState = 1;
var decryptState = 0;
var usernameState = 0;
var gameDebugMode = true; // bool to determine if debug mode is on/off
// Constants
var SELECT_COLOUR = '#241f21ff';
var INITIAL_COLOUR = '#f1f8d4ff';
var DEFAULT_FONT_SIZE = "3.4vh";
// Initialization
function onStart() {
    document.addEventListener('DOMContentLoaded', function () {
        initDebug();
        mapKeyboardShortcuts();
    });
}
;
onStart();
function initDebug() {
    setDebug(window.location.href.indexOf("GitHub") !== -1);
}
;
function setDebug(gameDebugMode) {
    var debugElement = document.getElementById("debug");
    if (debugElement) {
        debugElement.innerText = gameDebugMode ? 'debug on' : '';
    }
}
;
// Debugging utility
function updateDebugMessage(message) {
    if (gameDebugMode) {
        var debugElement = document.getElementById("debug");
        if (debugElement)
            debugElement.innerText = message;
    }
}
// Keyboard mapping 
function mapKeyboardShortcuts() {
    window.addEventListener('keydown', function (event) {
        switch (event.key) {
            case '1':
                buttonA();
                setBackgroundColor('a', INITIAL_COLOUR);
                break;
            case '2':
                buttonB();
                setBackgroundColor('b', INITIAL_COLOUR);
                break;
            case '3':
                buttonC();
                setBackgroundColor('c', INITIAL_COLOUR);
                break;
        }
    });
    window.addEventListener('keyup', function (event) {
        switch (event.key) {
            case '1':
                setBackgroundColor('a', SELECT_COLOUR);
                break;
            case '2':
                setBackgroundColor('b', SELECT_COLOUR);
                break;
            case '3':
                setBackgroundColor('c', SELECT_COLOUR);
                break;
        }
    });
    window.addEventListener('mousedown', function (event) {
        var _a;
        var targetId = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id;
        switch (targetId) {
            case 'a':
                buttonA();
                break;
            case 'b':
                buttonB();
                break;
            case 'c':
                buttonC();
                break;
        }
    });
    window.addEventListener('mouseup', function () {
        setBackgroundColor('a', SELECT_COLOUR);
        setBackgroundColor('b', SELECT_COLOUR);
        setBackgroundColor('c', SELECT_COLOUR);
    });
}
;
// UI Manipulation
function setBackgroundColor(elementId, color) {
    var element = document.getElementById(elementId);
    if (element) {
        element.style.backgroundColor = color;
    }
}
;
function setText(elementId, text) {
    var element = document.getElementById(elementId);
    if (element) {
        element.innerText = text;
    }
}
;
function resetScreenText(setToBootScreen) {
    var uiScreenTextL1 = document.getElementById("ui_screen_text_l1");
    var uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    var uiScreenTextL3 = document.getElementById("ui_screen_text_l3");
    if (uiScreenTextL1) {
        uiScreenTextL1.style.color = SELECT_COLOUR;
        uiScreenTextL1.style.backgroundColor = INITIAL_COLOUR;
        uiScreenTextL1.style.fontSize = DEFAULT_FONT_SIZE;
    }
    if (uiScreenTextL2) {
        uiScreenTextL2.style.color = SELECT_COLOUR;
        uiScreenTextL2.style.backgroundColor = INITIAL_COLOUR;
        uiScreenTextL2.style.fontSize = DEFAULT_FONT_SIZE;
    }
    if (uiScreenTextL3) {
        uiScreenTextL3.style.color = SELECT_COLOUR;
        uiScreenTextL3.style.backgroundColor = INITIAL_COLOUR;
        uiScreenTextL3.style.fontSize = DEFAULT_FONT_SIZE;
    }
    if (setToBootScreen) {
        if (uiScreenTextL1)
            uiScreenTextL1.innerText = 'e7a7e6';
        if (uiScreenTextL2)
            uiScreenTextL2.innerText = 'a7e6c0';
        if (uiScreenTextL3)
            uiScreenTextL3.innerText = '13e389';
    }
    else {
        if (uiScreenTextL1)
            uiScreenTextL1.innerText = '';
        if (uiScreenTextL2)
            uiScreenTextL2.innerText = '';
        if (uiScreenTextL3)
            uiScreenTextL3.innerText = '';
    }
}
;
// State management
function launchDevice() {
    switch (bootScreenState) {
        case 0:
            bootScreenState++;
            resetScreenText(true);
            break;
        case 1:
            bootScreenState++;
            setText('ui_screen_text_l1', 'crypto');
            setText('ui_screen_text_l2', 'a7e6c0');
            break;
        case 2:
            bootScreenState++;
            setText('ui_screen_text_l2', 'grapha');
            setText('ui_screen_text_l3', '13e389');
            break;
        case 3:
            bootScreenState++;
            setText('ui_screen_text_l3', 'gotchi');
            break;
        case 4:
            bootScreenState++;
            resetScreenText(false);
            setText('ui_screen_text_l1', 'decrypt');
            setText('ui_screen_text_l2', 'new egg');
            loginScreenState = 2;
            loginScreenSelector();
            gameState = 1;
            break;
        default:
            bootScreenState = 0;
            resetScreenText(true);
            break;
    }
}
;
function loginScreenSelector() {
    var currentLoginScreenText = document.getElementById("ui_screen_text_l" + String(loginScreenState));
    if (currentLoginScreenText) {
        currentLoginScreenText.style.color = SELECT_COLOUR; // light
        currentLoginScreenText.style.backgroundColor = INITIAL_COLOUR; // dark
    }
    loginScreenState = loginScreenState === 1 ? 2 : 1;
    var newLoginScreenText = document.getElementById("ui_screen_text_l" + String(loginScreenState));
    if (newLoginScreenText) {
        newLoginScreenText.style.color = INITIAL_COLOUR; // dark
        newLoginScreenText.style.backgroundColor = SELECT_COLOUR; // light
    }
}
;
function updateSelector(selector, minValue, maxValue) {
    return selector < maxValue ? selector + 1 : minValue;
}
;
function buttonA() {
    if (gameState === 1) {
        loginScreenSelector();
    }
    else if (gameState === 2 || gameState === 3) {
        decryptState = inputLetters('a', decryptState);
    }
    setBackgroundColor('a', '#f1f8d4ff');
    if (gameDebugMode) {
        var debugElement = document.getElementById("debug");
        if (debugElement)
            debugElement.innerText = "select - ".concat(gameState.toString());
    }
}
;
function buttonB() {
    if (gameState === 0) {
        launchDevice();
    }
    else if (gameState === 1) {
        if (loginScreenState === 1) {
            gameState = 2;
            launchSignIn();
        }
        else if (loginScreenState === 2) {
            gameState = 3;
            launchSignUp();
        }
    }
    else if (gameState === 2 || gameState === 3) {
        decryptState = inputLetters('b', decryptState); // Sign in menu
    }
    setBackgroundColor('b', '#f1f8d4ff');
    if (gameDebugMode) {
        var debugElement = document.getElementById("debug");
        if (debugElement)
            debugElement.innerText = "execute - ".concat(gameState.toString());
    }
}
;
function buttonC() {
    if (gameState === 0) {
        bootScreenState--;
        bootScreenState--;
        launchDevice();
    }
    else if (gameState === 1) {
        gameState--;
        bootScreenState = 0;
        launchDevice();
    }
    else if (gameState === 2 || gameState === 3) {
        if (decryptState != 0) {
            decryptState = inputLetters('c', decryptState);
        }
        else {
            gameState--;
            bootScreenState = 4;
            launchDevice();
        }
    }
    else if (gameState === 3) {
        gameState--;
        bootScreenState = 4;
        launchDevice();
    }
    setBackgroundColor('c', '#f1f8d4ff');
    if (gameDebugMode) {
        var debugElement = document.getElementById("debug");
        if (debugElement)
            debugElement.innerText = "cancel - ".concat(gameState.toString());
    }
}
;
// STATE 1 - Login 
function launchSignIn() {
    resetScreenText(false);
    setText('ui_screen_text_l1', 'username');
    setText('ui_screen_text_l2', 'a');
    setText('ui_screen_text_l3', '');
    var uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    if (uiScreenTextL2) {
        uiScreenTextL2.style.fontSize = '5.5vh';
    }
}
;
function launchSignUp() {
    resetScreenText(false);
    setText('ui_screen_text_l1', 'username');
    setText('ui_screen_text_l2', 'a');
    setText('ui_screen_text_l3', '');
    var uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    if (uiScreenTextL2) {
        uiScreenTextL2.style.fontSize = '5.5vh';
    }
}
;
// STATE 2 - User Login / 'Decrypt'
function inputLetters(buttonType, inputState) {
    var uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    var characterLimit = 3;
    if (uiScreenTextL2) {
        if (buttonType === 'a') {
            var newChar = uiScreenTextL2.innerText[inputState];
            uiScreenTextL2.innerText = uiScreenTextL2.innerText.substring(0, uiScreenTextL2.innerText.length - 1);
            uiScreenTextL2.innerText += circularCharacter(newChar, 'forward');
        }
        else if (buttonType === 'b') {
            if (inputState < characterLimit) {
                inputState++;
                uiScreenTextL2.innerText = uiScreenTextL2.innerText + 'a';
            }
            else {
                fetchUserByUsername(uiScreenTextL2.innerText);
            }
        }
        else if (buttonType === 'c') {
            inputState--;
            uiScreenTextL2.innerText = uiScreenTextL2.innerText.substring(0, uiScreenTextL2.innerText.length - 1);
        }
        ;
    }
    return inputState;
}
function circularCharacter(char, direction) {
    var validCharacters = __spreadArray([], Array(26), true).map(function (_, i) { return String.fromCharCode('a'.charCodeAt(0) + i); })
        .concat(__spreadArray([], Array(10), true).map(function (_, i) { return String.fromCharCode('0'.charCodeAt(0) + i); }));
    var lowerChar = char.toLowerCase();
    var currentIndex = -1;
    for (var i = 0; i < validCharacters.length; i++) {
        if (validCharacters[i] === lowerChar) {
            currentIndex = i;
            break;
        }
    }
    if (currentIndex === -1) {
        return 'a'; // reset, Character not found in validCharacters
    }
    // Determine the next index based on direction
    if (direction === 'forward') {
        currentIndex = (currentIndex + 1) % validCharacters.length;
    }
    else if (direction === 'backward') {
        currentIndex = (currentIndex - 1 + validCharacters.length) % validCharacters.length;
    }
    return validCharacters[currentIndex];
}
// STATE 3 - User Sign Up / 'Decrypt'
function decryptData() {
    console.log('decrypt');
    resetScreenText(false);
}
;
function generateNewEgg() {
    console.log('generate new egg');
    resetScreenText(false);
}
;
// REST API FUNCTIONS
function fetchUsers() {
    fetch('/api/users')
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(function (data) {
        console.log('All Users:', data);
    })
        .catch(function (error) { return console.error('Error fetching users:', error); });
}
;
function fetchUserByUsername(username) {
    fetch("/api/users/".concat(btoa(username)))
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(function (data) {
        console.log('User:', data);
    })
        .catch(function (error) { return console.error('Error fetching user:', error); });
}
;
function createUser(username) {
    fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: btoa(username) })
    })
        .then(function (res) {
        return res.json();
    })
        .then(function (data) { return console.log(data); })
        .catch(function (error) { return console.error('ERROR', error); });
}
;
