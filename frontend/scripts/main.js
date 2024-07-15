var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var gameDebugMode = true; // bool to determine if debug mode is on/off
function setDebug(gameDebugMode) {
    var debugElement = document.getElementById("debug");
    if (debugElement) {
        debugElement.innerText = gameDebugMode ? 'debug on' : '';
    }
}
;
function initDebug() {
    if (window.location.href.indexOf("GitHub") !== -1) { // Check for GitHub in the URL
        setDebug(true);
    }
    else {
        setDebug(false);
    }
}
;
// Init and mapping functions
var SELECT_COLOUR = '#241f21ff';
var INITIAL_COLOUR = '#f1f8d4ff';
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
function setBackgroundColor(elementId, color) {
    var element = document.getElementById(elementId);
    if (element) {
        element.style.backgroundColor = color;
    }
}
;
function onStart() {
    document.addEventListener('DOMContentLoaded', function () {
        initDebug();
        mapKeyboardShortcuts();
    });
}
;
onStart();
//
var gameState = 0; // 0 - boot, 1 - login, 2 - decrypt, 3 - generate
//let hasBooted: boolean = false
var bootScreenState = 0;
var loginScreenState = 1;
var decryptState = 0; // character selected (limit of 8)
var DEFAULT_FONT_SIZE = "3.4vh";
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
// STATE 1
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
}
;
function inputLetters(buttonType) {
    var uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    if (uiScreenTextL2) {
        if (buttonType === 'a') {
            console.log(decryptState, uiScreenTextL2.innerText, uiScreenTextL2.innerText[decryptState]);
            var newChar = uiScreenTextL2.innerText[decryptState];
            uiScreenTextL2.innerText = uiScreenTextL2.innerText.substring(0, uiScreenTextL2.innerText.length - 1);
            uiScreenTextL2.innerText += circularCharacter(newChar, 'forward');
        }
        else if (buttonType === 'b') {
            if (decryptState < 4) {
                decryptState++;
                uiScreenTextL2.innerText = uiScreenTextL2.innerText + 'a';
            }
        }
        else if (buttonType === 'c') {
            //
        }
        ;
    }
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
// STATE 2
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
// Button functions
function buttonA() {
    if (gameState === 1) {
        loginScreenSelector();
    }
    else if (gameState === 2) {
        inputLetters('a');
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
    else if (gameState === 2) {
        inputLetters('b');
        // Sign in menu
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
function setText(elementId, text) {
    var element = document.getElementById(elementId);
    if (element) {
        element.innerText = text;
    }
}
;
