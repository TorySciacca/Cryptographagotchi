let gameDebugMode: boolean = true; // bool to determine if debug mode is on/off

function setDebug(gameDebugMode: boolean): void {
    const debugElement = document.getElementById("debug");
    if (debugElement) {
        debugElement.innerText = gameDebugMode ? 'debug on' : '';
    }
};

function initDebug(): void {
    if (window.location.href.indexOf("GitHub") !== -1) { // Check for GitHub in the URL
        setDebug(true);
    } else {
        setDebug(false);
    }
};

// Init and mapping functions
const SELECT_COLOUR: string = '#241f21ff';
const INITIAL_COLOUR: string = '#f1f8d4ff';

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

function setBackgroundColor(elementId: string, color: string): void {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.backgroundColor = color;
    }
};

function onStart(): void {
    document.addEventListener('DOMContentLoaded', () => {
        initDebug();
        mapKeyboardShortcuts();
    });
};

onStart();

//

let gameState: number = 0; // 0 - boot, 1 - login, 2 - decrypt, 3 - generate
let loadScreenState: number = 0;
let loginScreenState: number = 1;

function resetScreenText(setToBootScreen: boolean): void {
    const uiScreenTextL1 = document.getElementById("ui_screen_text_l1");
    const uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    const uiScreenTextL3 = document.getElementById("ui_screen_text_l3");

    if (uiScreenTextL1) uiScreenTextL1.style.textDecoration = 'none';
    if (uiScreenTextL2) uiScreenTextL2.style.textDecoration = 'none';
    if (uiScreenTextL3) uiScreenTextL3.style.textDecoration = 'none';

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

function launchDevice(): void {
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
            resetScreenText(false);
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

// STATE 1

function launchSignIn(): void {
    resetScreenText(false);
};

function launchSignUp(): void {
    resetScreenText(false);
};

// STATE 2

function decryptData(): void {
    console.log('decrypt');
    resetScreenText(false);
};

function generateNewEgg(): void {
    console.log('generate new egg');
    resetScreenText(false);
};

// Button functions

function buttonA(): void {
    if (gameState === 1) {
        loginScreenSelector();
    }

    setBackgroundColor('a', '#f1f8d4ff');

    if (gameDebugMode) {
        const debugElement = document.getElementById("debug");
        if (debugElement) debugElement.innerText = `select - ${gameState.toString()}`;
    }
};

function buttonB(): void {
    if (gameState === 0) {
        launchDevice();
    } else if (gameState === 1) {
        if (loginScreenState === 1) {
            gameState = 2;
            launchSignIn();
        } else if (loginScreenState === 2) {
            gameState = 3;
            launchSignUp();
        }
    } else if (gameState === 2) {
        // Sign in menu
    }

    setBackgroundColor('b', '#f1f8d4ff');

    if (gameDebugMode) {
        const debugElement = document.getElementById("debug");
        if (debugElement) debugElement.innerText = `execute - ${gameState.toString()}`;
    }
};

function buttonC(): void {
    if (gameState === 1) {
        gameState--;
        launchDevice();
    } else if (gameState === 2 || gameState === 3) {
        gameState = 0;
        loadScreenState = 3;
        launchDevice();
    }

    setBackgroundColor('c', '#f1f8d4ff');

    if (gameDebugMode) {
        const debugElement = document.getElementById("debug");
        if (debugElement) debugElement.innerText = `cancel - ${gameState.toString()}`;
    }
};

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

function fetchUserByUsername(username: string): void {
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
};

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

function setText(elementId: string, text: string): void {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerText = text;
    }
};