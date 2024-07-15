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
function mapKeyboardShortcuts() {
    var SELECT_COLOUR = '#241f21ff';
    var INITIAL_COLOUR = '#f1f8d4ff';
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
var loadScreenState = 0;
var loginScreenState = 1;
function resetScreenText(setToBootScreen) {
    var uiScreenTextL1 = document.getElementById("ui_screen_text_l1");
    var uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    var uiScreenTextL3 = document.getElementById("ui_screen_text_l3");
    if (uiScreenTextL1)
        uiScreenTextL1.style.textDecoration = 'none';
    if (uiScreenTextL2)
        uiScreenTextL2.style.textDecoration = 'none';
    if (uiScreenTextL3)
        uiScreenTextL3.style.textDecoration = 'none';
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
    switch (loadScreenState) {
        case 0:
            loadScreenState++;
            setText('ui_screen_text_l1', 'crypto');
            break;
        case 1:
            loadScreenState++;
            setText('ui_screen_text_l2', 'grapha');
            break;
        case 2:
            loadScreenState++;
            setText('ui_screen_text_l3', 'gotchi');
            break;
        case 3:
            loadScreenState++;
            setText('ui_screen_text_l1', 'sign in');
            setText('ui_screen_text_l2', 'sign up');
            loginScreenState = 2;
            loginScreenSelector();
            gameState = 1;
            break;
        default:
            loadScreenState = 0;
            resetScreenText(true);
            break;
    }
}
;
function loginScreenSelector() {
    var currentLoginScreenText = document.getElementById("ui_screen_text_l" + String(loginScreenState));
    if (currentLoginScreenText)
        currentLoginScreenText.style.textDecoration = 'underline';
    loginScreenState = loginScreenState === 1 ? 2 : 1;
    var newLoginScreenText = document.getElementById("ui_screen_text_l" + String(loginScreenState));
    if (newLoginScreenText)
        newLoginScreenText.style.textDecoration = 'none';
}
;
function updateSelector(selector, minValue, maxValue) {
    return selector < maxValue ? selector + 1 : minValue;
}
;
// STATE 1
function launchSignIn() {
    resetScreenText(false);
}
;
function launchSignUp() {
    resetScreenText(false);
}
;
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
    if (gameState === 1) {
        gameState--;
        launchDevice();
    }
    else if (gameState === 2 || gameState === 3) {
        gameState = 0;
        loadScreenState = 3;
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
