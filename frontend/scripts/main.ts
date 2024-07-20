// Global variables
let gameState: number = 0; // 0 - boot, 1 - login screen selection, 2 - login/decrypt, 3 - sign up, 4 - main, 5 - log out, 6 - store, 7 -quest, 8 - status
let bootScreenState: number = 0;
let loginScreenState: number = 1;

let usernameLogingState: number = 0; // 0 - off
let cryptonameLoginState: number = 0; // 0 - off
let isUserLoggedIn: boolean = false
let username: string= ''
let creatureName: string = ''

let gameDebugMode: boolean = true; // bool to determine if debug mode is on/off

// Constants
const SELECT_COLOUR: string = '#241f21ff';
const INITIAL_COLOUR: string = '#f1f8d4ff';
const DEFAULT_FONT_SIZE = "3.4vh";
const LOGIN_CHARACTER_LIMIT = 3;

// Initialization
function onStart(): void {
    document.addEventListener('DOMContentLoaded', () => {
        initDebug();
        mapKeyboardShortcuts();
    });
};

onStart();

function initDebug(): void {
    setDebug(window.location.href.indexOf("GitHub") !== -1);
};

function setDebug(gameDebugMode: boolean): void {
    const debugElement = document.getElementById("debug");
    if (debugElement) {
        debugElement.innerText = gameDebugMode ? 'debug on' : '';
    }
};

    // Debugging utility
function updateDebugMessage(message: string): void {
    if (gameDebugMode) {
        const debugElement = document.getElementById("debug");
        if (debugElement) debugElement.innerText = message;
    }
}

    //  Keyboard Mapping 

function mapKeyboardShortcuts(): void {

    window.addEventListener('keydown', (event: KeyboardEvent) => {
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

    window.addEventListener('keyup', (event: KeyboardEvent) => {
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

    window.addEventListener('mousedown', (event: MouseEvent) => {
        const targetId = (event.target as HTMLElement)?.id;
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

    window.addEventListener('mouseup', () => {
        setBackgroundColor('a', SELECT_COLOUR);
        setBackgroundColor('b', SELECT_COLOUR);
        setBackgroundColor('c', SELECT_COLOUR);
    });
};

// UI Manipulation
function setBackgroundColor(elementId: string, color: string): void {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.backgroundColor = color;
    }
};

function setText(elementId: string, text: string): void {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerText = text;
    }
};

function resetScreenText(setToBootScreen: boolean): void {

    const uiScreenTextL1 = document.getElementById("ui_screen_text_l1");
    const uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    const uiScreenTextL3 = document.getElementById("ui_screen_text_l3");

    if (uiScreenTextL1) {uiScreenTextL1.style.color = SELECT_COLOUR; uiScreenTextL1.style.backgroundColor = INITIAL_COLOUR; uiScreenTextL1.style.fontSize = DEFAULT_FONT_SIZE}
    if (uiScreenTextL2) {uiScreenTextL2.style.color = SELECT_COLOUR; uiScreenTextL2.style.backgroundColor = INITIAL_COLOUR; uiScreenTextL2.style.fontSize = DEFAULT_FONT_SIZE}
    if (uiScreenTextL3) {uiScreenTextL3.style.color = SELECT_COLOUR; uiScreenTextL3.style.backgroundColor = INITIAL_COLOUR; uiScreenTextL3.style.fontSize = DEFAULT_FONT_SIZE}

    if (setToBootScreen) {
        if (uiScreenTextL1) uiScreenTextL1.innerText = 'e7a7e6';
        if (uiScreenTextL2) uiScreenTextL2.innerText = 'a7e6c0';
        if (uiScreenTextL3) uiScreenTextL3.innerText = '13e389';
    } else {
        if (uiScreenTextL1) uiScreenTextL1.innerText = '';
        if (uiScreenTextL2) uiScreenTextL2.innerText = '';
        if (uiScreenTextL3) uiScreenTextL3.innerText = '';
    }
};

// UI State Management

function launchDevice(): void {
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
};

function loginScreenSelector(): void {
    const currentLoginScreenText = document.getElementById("ui_screen_text_l" + String(loginScreenState));
    if (currentLoginScreenText) {
        currentLoginScreenText.style.color = SELECT_COLOUR; // light
        currentLoginScreenText.style.backgroundColor = INITIAL_COLOUR // dark
    }
    
    loginScreenState = loginScreenState === 1 ? 2 : 1;
    const newLoginScreenText = document.getElementById("ui_screen_text_l" + String(loginScreenState));
    if (newLoginScreenText) {
        newLoginScreenText.style.color = INITIAL_COLOUR; // dark
        newLoginScreenText.style.backgroundColor = SELECT_COLOUR; // light
    }
};

function updateSelector(selector: number, minValue: number, maxValue: number): number {
    return selector < maxValue ? selector + 1 : minValue;
};

function buttonA(): void {
    if (gameState === 1) {
        loginScreenSelector();
    } else if (gameState === 2 || gameState === 3){
        if (!isUserLoggedIn){
            usernameLogingState = inputLetters('a',usernameLogingState)
        } else{
            console.log(cryptonameLoginState)
            cryptonameLoginState = inputLetters('a',cryptonameLoginState);
         }
    }

    setBackgroundColor('a', '#f1f8d4ff');
};

async function buttonB(): Promise<void> {
    if (gameState === 0) {
        launchDevice();
    } else if (gameState === 1) {
        if (loginScreenState === 1) {
            gameState = 2;
            enterUser(true);
        } else if (loginScreenState === 2) {
            gameState = 3;
            enterUser(true);
        }
    } else if (gameState === 2 || gameState === 3) {
        if (!isUserLoggedIn){
            usernameLogingState = inputLetters('b',usernameLogingState) // Sign in menu
            if (usernameLogingState > LOGIN_CHARACTER_LIMIT){
                if (await checkUserLogin()){}
                else{usernameLogingState--;}}
            }   
        else {
            cryptonameLoginState = inputLetters('b',cryptonameLoginState) // Sign in menu
            if (cryptonameLoginState > LOGIN_CHARACTER_LIMIT){
                cryptonameLoginState--;
                console.log('crypto check')//checkUserLogin()}
            }
    } }
    setBackgroundColor('b', '#f1f8d4ff');
};

function buttonC(): void {
    if(gameState === 0){
        bootScreenState --;
        bootScreenState --;
        launchDevice();
    }else if (gameState === 1) {
        gameState--;
        bootScreenState = 0;
        launchDevice();
    } else if (gameState === 2 || gameState === 3) {
        if (!isUserLoggedIn){
            if (usernameLogingState != 0){
                usernameLogingState = inputLetters('c',usernameLogingState)
            } else {
                gameState --;
                bootScreenState = 4;
                launchDevice();
            }
        } else {
            if (cryptonameLoginState != 0){
                cryptonameLoginState = inputLetters('c',cryptonameLoginState)
            } else {
            }//gameState --; }
        }

    } else if(gameState === 3) {
        gameState --;
        bootScreenState = 4;
        launchDevice();
    }

    setBackgroundColor('c', '#f1f8d4ff');
};

// STATE 1 - Login 

function enterUser(isUsername:boolean): void {
    resetScreenText(false);

    let formType:string = 'username';
    if (!isUsername) formType = 'cryptoname';
    setText('ui_screen_text_l1', formType);
    setText('ui_screen_text_l2', 'a');
    setText('ui_screen_text_l3', '');

    const uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    if (uiScreenTextL2){
        uiScreenTextL2.style.fontSize = '5.5vh';
    }
};

// STATE 2 - User Login / 'Decrypt'

async function checkUserLogin(): Promise<boolean>{
    const uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    if (uiScreenTextL2) {
        if (await fetchUserByUsername(uiScreenTextL2.innerText)){
            enterUser(false)
            isUserLoggedIn = true
            return true
        } else{
            return false
        }
    };
    return false;
}

async function checkPetLogin(): Promise<void>{
    const uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    if (uiScreenTextL2) {
        if (await fetchUserByUsername(uiScreenTextL2.innerText)){
            enterUser(false)
            isUserLoggedIn = true
        }};
}


function inputLetters(buttonType:string,inputState:number): number {
    const uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    if (uiScreenTextL2) {
        if (buttonType === 'a'){
            let newChar = uiScreenTextL2.innerText[inputState];
            console.log('newChar',newChar)
            uiScreenTextL2.innerText = uiScreenTextL2.innerText.substring(0, uiScreenTextL2.innerText.length - 1)
            uiScreenTextL2.innerText += circularCharacter(newChar,'forward')
        } else if (buttonType === 'b'){
            if (inputState < LOGIN_CHARACTER_LIMIT) {
                inputState ++;
                uiScreenTextL2.innerText = uiScreenTextL2.innerText + 'a'}
            else {
                inputState++;
                return inputState // break code
            }
        } else if (buttonType === 'c'){
            inputState --;
            uiScreenTextL2.innerText = uiScreenTextL2.innerText.substring(0, uiScreenTextL2.innerText.length - 1)
        };
    }
    return inputState; 
}

function circularCharacter(char: string, direction: 'forward' | 'backward'): string {
    const validCharacters: string[] = [...Array(26)].map((_, i) => String.fromCharCode('a'.charCodeAt(0) + i))
        .concat([...Array(10)].map((_, i) => String.fromCharCode('0'.charCodeAt(0) + i)));
    const lowerChar = char.toLowerCase();

    let currentIndex = -1;

    for (let i = 0; i < validCharacters.length; i++) {
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
    } else if (direction === 'backward') {
        currentIndex = (currentIndex - 1 + validCharacters.length) % validCharacters.length;
    }

    return validCharacters[currentIndex];
}

// STATE 3 - User Sign Up 

function decryptData(): void {
    console.log('decrypt');
    resetScreenText(false);
};

function generateNewEgg(): void {
    console.log('generate new egg');
    resetScreenText(false);
};

// STATE 4 - Main (Includes creature sub-states)
let petMetamorphosisStage = 0; // currently global but if code base is split up, this variable would not be exported


// STATE 5 - Log Out confirm

// STATE 6 - Store

// STATE 7 - Quest

// STATE 7 - Status


// REST API FUNCTIONS

function fetchUsers(): void {
    fetch('/api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('All Users:', data);
        })
        .catch(error => console.error('Error fetching users:', error));
};

// Define a function to toggle background color with flashing effect
function flashBackgroundColor(element: HTMLElement, color: string, duration: number, flashes: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        let count = 0;
        const interval = setInterval(() => {
            if (count >= flashes * 2) {
                clearInterval(interval);
                resolve();
            } else {
                element.style.backgroundColor = (count % 2 === 0) ? color : '';
                count++;
            }
        }, duration);
    });
}

// Example usage within your fetch function
function fetchUserByUsername(username: string): Promise<boolean> {
    // Select the antenna element based on your HTML structure
    const antennaElement = document.querySelector('.antenna') as HTMLElement;

    // Flash colors based on response status
    const statusBasedColors: { [key: number]: string } = {
        200: '#00FF00',  // Green for 2xx
        400: '#FF0000',  // Red for 4xx (Client errors)
        500: '#FF0000'   // Red for 5xx (Server errors)
        // Add more status codes as needed
    };

    // Perform the API call
    return fetch(`/api/users/${btoa(username)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Determine the color based on response status
            const status = response.status;
            const color = statusBasedColors[status] || '#FFFFFF';  // Default to white if status not in map

            // Flash the determined color three times
            return flashBackgroundColor(antennaElement, color, 150, 3)
                .then(() => {
                    return response.json();
                });
        })
        .then(data => {
            console.log('User:', data);
            return true;  // Return true indicating success
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            // Flash red for error
            const errorColor = statusBasedColors[400] || '#FF0000';  // Default to red if 400 not in map
            return flashBackgroundColor(antennaElement, errorColor, 150, 3)
                .then(() => {
                    return false;  // Return false indicating failure
                });
        });
}

function fetchPetbyName(creatureName: string): Promise<boolean> {
    return fetch(`/api/creatures/${btoa(creatureName)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } 
            return response.json();
        })
        .then(data => {
            console.log('User:', data);
            return true;  // Return true indicating success
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            return false;  // Return false indicating failure
        });
}

function createUser(username: string): void {
    fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: btoa(username) })
    })
        .then(res => {
            return res.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('ERROR', error));
};