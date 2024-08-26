"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var gameState = 0; // 0 - boot, 1 - login screen selection, 2 - login/decrypt, 3 - sign up, 4 - main
var bootScreenState = 0;
var loginScreenState = 1;
var usernameLoginState = 0; // 0 - off
var cryptonameLoginState = 0; // 0 - off
var isUserLoggedIn = false;
var username = '';
var creatureName = '';
var creatureData = null; // the json data of the creature, assgined after login
var gameDebugMode = true; // bool to determine if debug mode is on/off
// Constants
var SELECT_COLOUR = '#241f21ff';
var INITIAL_COLOUR = '#f1f8d4ff';
var DEFAULT_FONT_SIZE = "3.4vh";
var LOGIN_CHARACTER_LIMIT = 3;
// Initialization
function onStart() {
    document.addEventListener('DOMContentLoaded', function () {
        mapKeyboardShortcuts();
    });
}
;
onStart();
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
//  Keyboard Mapping 
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
// UI State Management
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
            setText('ui_screen_text_l1', 'log in');
            setText('ui_screen_text_l2', 'new user');
            setText('ui_screen_text_l3', ' ');
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
        if (!isUserLoggedIn) {
            usernameLoginState = inputLetters('a', usernameLoginState);
        }
        else {
            console.log(cryptonameLoginState);
            cryptonameLoginState = inputLetters('a', cryptonameLoginState);
        }
    }
    else if (gameState === 4) {
        updateDisplayedCreatureStat(true);
    }
    setBackgroundColor('a', INITIAL_COLOUR);
}
;
function buttonB() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(gameState === 0)) return [3 /*break*/, 1];
                    launchDevice();
                    return [3 /*break*/, 9];
                case 1:
                    if (!(gameState === 1)) return [3 /*break*/, 2];
                    if (loginScreenState === 1) {
                        gameState = 2;
                        enterUser(true);
                    }
                    else if (loginScreenState === 2) {
                        gameState = 3;
                        enterUser(true);
                    }
                    return [3 /*break*/, 9];
                case 2:
                    if (!(gameState === 2 || gameState === 3)) return [3 /*break*/, 8];
                    if (!!isUserLoggedIn) return [3 /*break*/, 5];
                    usernameLoginState = inputLetters('b', usernameLoginState); // Sign in menu - username
                    if (!(usernameLoginState > LOGIN_CHARACTER_LIMIT)) return [3 /*break*/, 4];
                    return [4 /*yield*/, checkUserLogin()];
                case 3:
                    if (_a.sent()) {
                    }
                    else {
                        usernameLoginState--;
                    }
                    _a.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5:
                    cryptonameLoginState = inputLetters('b', cryptonameLoginState); // Sign in menu - creature
                    if (!(cryptonameLoginState > LOGIN_CHARACTER_LIMIT)) return [3 /*break*/, 7];
                    return [4 /*yield*/, checkCreatureLogin()];
                case 6:
                    if (_a.sent()) {
                        gameState = 4;
                        loadMain();
                    }
                    else {
                        cryptonameLoginState--;
                    }
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    if (gameState === 4) {
                        isHunting = !isHunting;
                    }
                    else if (gameState === 5) {
                        logOut();
                    }
                    _a.label = 9;
                case 9:
                    setBackgroundColor('b', INITIAL_COLOUR);
                    return [2 /*return*/];
            }
        });
    });
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
        if (!isUserLoggedIn) {
            if (usernameLoginState != 0) {
                usernameLoginState = inputLetters('c', usernameLoginState);
            }
            else {
                logOut();
            }
        }
        else {
            if (cryptonameLoginState != 0) {
                cryptonameLoginState = inputLetters('c', cryptonameLoginState);
            }
            else {
                logOut();
            } //gameState --; }
        }
    }
    else if (gameState === 3) {
        gameState--;
        bootScreenState = 4;
        launchDevice();
    }
    else if (gameState === 4) {
        gameState++;
        askToLogOut();
    }
    else if (gameState === 5) {
        gameState--;
        loadMain();
    }
    setBackgroundColor('c', INITIAL_COLOUR);
}
;
// STATE 1 - Login 
function enterUser(isUsername) {
    resetScreenText(false);
    var formType = 'username';
    if (!isUsername)
        formType = 'cryptoname';
    setText('ui_screen_text_l1', formType);
    setText('ui_screen_text_l2', 'a');
    setText('ui_screen_text_l3', '');
    var uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    if (uiScreenTextL2) {
        uiScreenTextL2.style.fontSize = '5.5vh';
    }
}
;
// STATE 2 - User Login / 'Decrypt' / STATE 3 - User Sign Up 
function checkUserLogin() {
    return __awaiter(this, void 0, void 0, function () {
        var uiScreenTextL2, usernameEntered, loginSuccess;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
                    if (!uiScreenTextL2) return [3 /*break*/, 4];
                    usernameEntered = uiScreenTextL2.innerText;
                    return [4 /*yield*/, fetchUserByName(usernameEntered)];
                case 1:
                    loginSuccess = _a.sent();
                    if (!(!loginSuccess && gameState === 3)) return [3 /*break*/, 3];
                    return [4 /*yield*/, createUser(usernameEntered)];
                case 2:
                    loginSuccess = _a.sent();
                    _a.label = 3;
                case 3:
                    if (loginSuccess) {
                        username = usernameEntered;
                        enterUser(false);
                        isUserLoggedIn = true;
                        return [2 /*return*/, true];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/, false];
            }
        });
    });
}
function checkCreatureLogin() {
    return __awaiter(this, void 0, void 0, function () {
        var uiScreenTextL2, creatureName, loginSuccess, valueInput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
                    if (!uiScreenTextL2)
                        return [2 /*return*/, false];
                    creatureName = uiScreenTextL2.innerText;
                    loginSuccess = false;
                    if (!(gameState === 3)) return [3 /*break*/, 2];
                    return [4 /*yield*/, createCreature(creatureName)];
                case 1:
                    valueInput = _a.sent();
                    if (!valueInput) {
                        return [2 /*return*/, false];
                    }
                    _a.label = 2;
                case 2: return [4 /*yield*/, fetchCreatureByName(creatureName)];
                case 3:
                    loginSuccess = _a.sent();
                    if (loginSuccess) {
                        resetScreenText(false);
                        isUserLoggedIn = true;
                        return [2 /*return*/, true];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function inputLetters(buttonType, inputState) {
    var uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    if (uiScreenTextL2) {
        if (buttonType === 'a') {
            var newChar = uiScreenTextL2.innerText[inputState];
            uiScreenTextL2.innerText = uiScreenTextL2.innerText.substring(0, uiScreenTextL2.innerText.length - 1);
            uiScreenTextL2.innerText += circularCharacter(newChar, 'forward');
        }
        else if (buttonType === 'b') {
            if (inputState < LOGIN_CHARACTER_LIMIT) {
                inputState++;
                uiScreenTextL2.innerText = uiScreenTextL2.innerText + 'a';
            }
            else {
                inputState++;
                return inputState; // break code
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
// STATE 4 - Main (Includes creature sub-states)
//Pet Stats and Status, currently global but if code base is split up, this variable would not be exported.
// mass = creatureData.mass
// health = creatureData.health
// hunger = creatureData.hunger
// fatigue = creatureData.fatigue
// isHunting = creatureData.isHunting
var isHunting = false;
var creatureStateUITick = 0;
var creatureGrowthRate = 0;
var creatureRiskFactor = 0;
var creatureHealRate = 0;
var displayedCreatureStat = 0;
// Creature Loop
function setCreatureMode(isHunting) {
    if (isHunting) {
        isHunting = true;
    }
    else {
        isHunting = false;
    }
}
setInterval(function () {
    creatureGrowthRate = 2;
    creatureRiskFactor = 1;
    creatureHealRate = 1;
    if (gameState === 4) {
        creatureData.mass += creatureGrowthRate;
        if (isHunting) {
            //gain fatigue at growth rate
            creatureData.fatigue = Math.max(0, Math.round(creatureData.fatigue + creatureGrowthRate));
        }
        else { //is resting
            //gain health at half growth rate
            creatureData.health = Math.min(100, Math.round(creatureData.health + creatureHealRate / 2));
            //lose fatigue at growth rate
            creatureData.fatigue = Math.max(0, Math.round(creatureData.fatigue - creatureGrowthRate));
        }
        //always gain hunger at half of growth rate
        creatureData.hunger = Math.min(100, Math.round(creatureData.hunger + (creatureGrowthRate / 2)));
        var uiScreenTextL1 = document.getElementById("ui_screen_text_l1");
        var uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
        var uiScreenTextL3 = document.getElementById("ui_screen_text_l3");
        if (uiScreenTextL1 != null && uiScreenTextL2 != null && uiScreenTextL3 != null) {
            uiScreenTextL1.innerText = (isHunting ? 'hunting' : 'resting') + tickCurrentCreatureState();
            updateCreatureImage();
            uiScreenTextL2.innerText = ' . '; // leaves space for image
            uiScreenTextL3.innerText = updateDisplayedCreatureStat(false);
            //save creature data to database
            var creatureDataString = JSON.stringify(creatureData);
            updateCreature(creatureDataString);
        }
    }
}, 1000);
setInterval(function () {
    if (gameState > 3 && isHunting) {
        var generateFight = function () {
            // randomly select either a or b. In future, more complex fights can be implemented by comparing creatures mass and creatureRiskFactor.
            var select = Math.random() >= 0.5 ? 'win' : 'loss';
            switch (select) {
                case 'win':
                    creatureData.hunger = Math.max(0, creatureData.hunger - creatureGrowthRate * 25);
                    flashLED(document.getElementById("green"), 'green', 100, 5);
                    break;
                case 'loss':
                    creatureData.health = Math.max(0, creatureData.health - creatureHealRate * 12);
                    flashLED(document.getElementById("red"), 'red', 100, 5);
                    break;
            }
        };
        generateFight();
    }
}, 10000);
function updateDisplayedCreatureStat(swap) {
    // 0 = mass, 1 = health, 2 = hunger, 3 = fatigue
    if (swap) {
        displayedCreatureStat = (displayedCreatureStat + 1) % 3;
    }
    if (displayedCreatureStat === 1) {
        return 'hea: ' + String(creatureData.health) + '%';
    }
    else if (displayedCreatureStat === 2) {
        return 'hgr: ' + String(creatureData.hunger) + '%';
    }
    else if (displayedCreatureStat === 3) {
        return 'ftg: ' + String(creatureData.fatigue) + '%';
    }
    else {
        return scaleToMetric(creatureData.mass);
    }
}
function scaleToMetric(input) {
    var outputString = String(input).padStart(7, ' ') + 'g';
    if (input > 1000) {
        outputString = (input / 1000).toFixed(2).padStart(7, ' ') + 'kg';
    }
    else if (input > 100000) {
        outputString = (input / 100000).toFixed(2).padStart(7, ' ') + 'tg';
    }
    else if (input > 1000000000) {
        outputString = (input / 1000000000).toFixed(2).padStart(7, ' ') + 'bg';
    }
    return outputString;
}
function updateCreatureImage() {
    var creatureImage = document.getElementById("creature");
    if (creatureImage) {
        creatureImage.src = "images/creature-" + getImageScale(creatureData.mass) + ".svg";
        creatureImage.style.visibility = "visible";
    }
}
function getImageScale(mass) {
    return Math.min(6, Math.floor(Math.log10(mass))) + '';
}
function tickCurrentCreatureState() {
    creatureStateUITick++;
    if (creatureStateUITick > 3) {
        creatureStateUITick = 0;
    }
    return '.'.repeat(creatureStateUITick);
}
function loadMain() {
    try {
        if (creatureData === null) {
            throw new Error('creatureData is null');
        }
        else {
            resetScreenText(false);
            var creatureDataText = document.getElementById("ui_screen_text_l2");
            if (creatureDataText != null) {
                creatureDataText.innerText === String(creatureData.mass);
            }
        }
    }
    catch (error) {
        console.error('Error loading creature data:', error);
    }
}
// STATE 5 - User Logout
function askToLogOut() {
    resetScreenText(false);
    var creatureImage = document.getElementById("creature");
    if (creatureImage) {
        creatureImage.style.visibility = "hidden";
    }
    var uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    if (uiScreenTextL2) {
        uiScreenTextL2.innerText = 'log out?';
        uiScreenTextL2.style.color = INITIAL_COLOUR; // light
        uiScreenTextL2.style.backgroundColor = SELECT_COLOUR; // dark
    }
}
function logOut() {
    isUserLoggedIn = false;
    resetScreenText(false);
    username = '';
    creatureName = '';
    creatureData = null;
    gameState = 0;
    bootScreenState = 0;
    loginScreenState = 1;
    usernameLoginState = 0;
    cryptonameLoginState = 0;
}
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
function flashLED(element, color, duration, flashes) {
    return new Promise(function (resolve, reject) {
        var count = 0;
        var interval = setInterval(function () {
            if (count >= flashes * 2) {
                clearInterval(interval);
                resolve();
            }
            else {
                element.style.backgroundColor = (count % 2 === 0) ? color : '';
                count++;
            }
        }, duration);
    });
}
function displayAPIResponseToLED(apiReponseStatus) {
    return __awaiter(this, void 0, void 0, function () {
        var redAntennaElement, greenAntennaElement, statusBasedColors, color, antennaElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    redAntennaElement = document.getElementById("red");
                    greenAntennaElement = document.getElementById("green");
                    statusBasedColors = {
                        200: '#00FF00', // Green for 2xx
                        404: '#FF0000', // Red for 4xx (Client errors)
                        500: '#FF0000' // Red for 5xx (Server errors)
                        // Add more status codes as needed
                    };
                    color = statusBasedColors[apiReponseStatus] || '#FFFFFF';
                    antennaElement = color === '#00FF00' ? greenAntennaElement : redAntennaElement;
                    return [4 /*yield*/, flashLED(antennaElement, color, 150, 3)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function fetchUserByName(usernameInput) {
    return fetch("/api/users/".concat(btoa(usernameInput)))
        .then(function (response) {
        displayAPIResponseToLED(response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(function (data) {
        return true; // Return true indicating success
    })
        .catch(function (error) {
        console.error('Error fetching user:', error);
        return false; // Return false indicating failure
    });
}
function fetchCreatureByName(creatureNameInput) {
    return fetch("/api/creatures/".concat(btoa(creatureNameInput), "/").concat(btoa(username)))
        .then(function (response) {
        displayAPIResponseToLED(response.status);
        if (!response.ok) {
            throw new Error("Network response was not ok - Status: ".concat(response.status));
        }
        return response.json();
    })
        .then(function (data) {
        console.log('Creature:', data);
        creatureData = data;
        return true; // Return true indicating success
    })
        .catch(function (error) {
        console.error('Error fetching creature:', error);
        return false; // Return false indicating failure
    });
}
function createUser(usernameInput) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: btoa(usernameInput) })
            })
                .then(function (res) {
                displayAPIResponseToLED(res.status);
                return true; //res.json();
            })
                .then(function (data) { return console.log(data); })
                .catch(function (error) { return console.error('ERROR', error); });
            return [2 /*return*/, false];
        });
    });
}
;
function createCreature(creatureInput) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetch('/api/creatures/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: btoa(creatureInput), owner: btoa(username) })
                })
                    .then(function (res) {
                    //console.log('Response received:', res);
                    displayAPIResponseToLED(res.status);
                    return res.ok; // Return true if the response is OK, false otherwise
                })
                    .catch(function (error) {
                    //console.error('ERROR', error);
                    return false;
                })];
        });
    });
}
function updateCreature(creatureData) {
    fetch('/api/creatures/' + btoa(creatureName) + '/' + btoa(username), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: creatureData
    })
        .then(function (res) {
        //displayAPIResponseToLED(res.status)
        return res.json();
    })
        .then(function (data) { return console.log(data); })
        .catch(function (error) { return console.error('ERROR', error); });
}
