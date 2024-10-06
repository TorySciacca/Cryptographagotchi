// Global variables
let gameState: number = 0; // 0 - boot, 1 - login screen selection, 2 - login/decrypt, 3 - sign up, 4 - main
let bootScreenState: number = 0;
let loginScreenState: number = 1;

let usernameLoginState: number = 0; // 0 - off
let cryptonameLoginState: number = 0; // 0 - off
let isUserLoggedIn: boolean = false
let username: string= ''
let creatureName: string = ''
let creatureData: any = null // the json data of the creature, assgined after login

let gameDebugMode: boolean = true; // bool to determine if debug mode is on/off

// Constants
const SELECT_COLOUR: string = '#241f21ff';
const INITIAL_COLOUR: string = '#f1f8d4ff';
const DEFAULT_FONT_SIZE = "3.4vh";
const LOGIN_CHARACTER_LIMIT = 3;

// Initialization
function onStart(): void {
    document.addEventListener('DOMContentLoaded', () => {
        mapKeyboardShortcuts();
    });
};

onStart();

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
                handleButtonA();
                setBackgroundColor('a', INITIAL_COLOUR);
                break;
            case '2':
                handleButtonB();
                setBackgroundColor('b', INITIAL_COLOUR);
                break;
            case '3':
                handleButtonC();
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
                handleButtonA();
                break;
            case 'b':
                handleButtonB();
                break;
            case 'c':
                handleButtonC();
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

function handleButtonA(): void {
    switch (gameState) {
        case 1:
            updateLoginScreenState();
            break;
        case 2:
        case 3:
            if (!isUserLoggedIn) {
                usernameLoginState = inputLetters('a', usernameLoginState);
            } else {
                cryptonameLoginState = inputLetters('a', cryptonameLoginState);
            }
            break;
        case 4:
            //updateDisplayedCreatureStat(true);
            break;
    }

    setBackgroundColor('a', INITIAL_COLOUR);
}

function updateLoginScreenState(): void {
    const currentLoginScreenText = document.getElementById(`ui_screen_text_l${loginScreenState}`);
    if (currentLoginScreenText) {
        currentLoginScreenText.style.color = SELECT_COLOUR; // light
        currentLoginScreenText.style.backgroundColor = INITIAL_COLOUR; // dark
    }

    loginScreenState = loginScreenState === 1 ? 2 : 1;
    const newLoginScreenText = document.getElementById(`ui_screen_text_l${loginScreenState}`);
    if (newLoginScreenText) {
        newLoginScreenText.style.color = INITIAL_COLOUR; // dark
        newLoginScreenText.style.backgroundColor = SELECT_COLOUR; // light
    }
}

async function handleButtonB(): Promise<void> {
    switch (gameState) {
        case 0:
            launchDevice();
            break;
        case 1:
            gameState = loginScreenState === 1 ? 2 : 3;
            enterUser(true);
            break;
        case 2:
        case 3:
            if (!isUserLoggedIn) {
                usernameLoginState = inputLetters('b', usernameLoginState);
                if (usernameLoginState > LOGIN_CHARACTER_LIMIT) {
                    try {
                        if (await checkUserLogin()) {
                            // TODO: Update the game state to 4 when the user has successfully logged in
                        } else {
                            usernameLoginState--;
                        }
                    } catch (err) {
                        console.error('Error in checkUserLogin:', err);
                    }
                }
            } else {
                cryptonameLoginState = inputLetters('b', cryptonameLoginState);
                if (cryptonameLoginState > LOGIN_CHARACTER_LIMIT) {
                    try {
                        if (await checkCreatureLogin()) {
                            gameState = 4;
                            loadMain();
                        } else {
                            cryptonameLoginState--;
                        }
                    } catch (err) {
                        console.error('Error in checkCreatureLogin:', err);
                    }
                }
            }
            break;
        case 4:
            isHunting = !isHunting;
            break;
        case 5:
            logOut();
            break;
    }
    setBackgroundColor('b', INITIAL_COLOUR);
};

function handleButtonC(): void {
    switch (gameState) {
        case 0:
            bootScreenState -= 2;
            launchDevice();
            break;
        case 1:
            gameState--;
            bootScreenState = 0;
            launchDevice();
            break;
        case 2:
        case 3:
            if (!isUserLoggedIn) {
                if (usernameLoginState !== 0) {
                    usernameLoginState = inputLetters('c', usernameLoginState);
                } else {
                    logOut();
                }
            } else {
                if (cryptonameLoginState !== 0) {
                    cryptonameLoginState = inputLetters('c', cryptonameLoginState);
                } else {
                    logOut();
                }
            }
            break;
        case 3:
            gameState--;
            bootScreenState = 4;
            launchDevice();
            break;
        case 4:
            gameState++;
            askToLogOut();
            break;
        case 5:
            gameState--;
            loadMain();
            break;
    }

    setBackgroundColor('c', INITIAL_COLOUR);
}
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

// STATE 2 - User Login / 'Decrypt' / STATE 3 - User Sign Up 

async function checkUserLogin(): Promise<boolean> {
    const uiScreenTextL2 = document.getElementById("ui_screen_text_l2");

    if (uiScreenTextL2) {
        const usernameEntered = uiScreenTextL2.innerText;

        let loginSuccess = await fetchUserByName(usernameEntered); // check if user exists

        if (!loginSuccess && gameState === 3) { //create user if user doesn't exist if signing up
            loginSuccess = await createUser(usernameEntered);
        }

        if (loginSuccess) {
            username = usernameEntered;
            enterUser(false);
            isUserLoggedIn = true;
            return true;
        } else {
            return false;
        }
    }

    return false;
}

async function checkCreatureLogin(): Promise<boolean> {
    const uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    if (!uiScreenTextL2) return false;

    creatureName = uiScreenTextL2.innerText;
    let loginSuccess = false;

    if (gameState === 3) {
        let valueInput = await createCreature(creatureName);
        
        if (!valueInput) {
            return false
        }
    }

    loginSuccess = await fetchCreatureByName(creatureName);

    if (loginSuccess) {
        resetScreenText(false);
        isUserLoggedIn = true;
        return true;
    } else {
        return false;
    }
}

function inputLetters(buttonType:string,inputState:number): number {
    const uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    if (uiScreenTextL2) {
        if (buttonType === 'a'){
            let newChar = uiScreenTextL2.innerText[inputState];
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

// STATE 4 - Main (Includes creature sub-states)

//Pet Stats and Status, currently global but if code base is split up, this variable would not be exported.

// mass = creatureData.mass
// health = creatureData.health
// hunger = creatureData.hunger
// fatigue = creatureData.fatigue
// isHunting = creatureData.isHunting

let isHunting: boolean = false;
let creatureStateUITick: number = 0;

let creatureGrowthRate: number = 0;
let creatureRiskFactor: number = 0;
let creatureHealRate: number = 0;

let displayedCreatureStat: number = 0;

// Creature Loop

function setCreatureMode(isHunting:boolean) {
    if (isHunting) {
        isHunting = true
    } else {
        isHunting = false
    }
}

setInterval(function(){ // EVERY TICK

    // Test Creature Stats
    creatureGrowthRate = 2
    creatureRiskFactor = 1
    creatureHealRate = 1
    //

    if (gameState === 4) {
        creatureData.mass += creatureGrowthRate;
        if (isHunting) { 
            //gain fatigue at growth rate
            creatureData.fatigue = Math.max(0, Math.round(creatureData.fatigue + creatureGrowthRate));
        } else  { //is resting
            //gain health at half growth rate
            creatureData.health = Math.min(100, Math.round(creatureData.health + creatureHealRate / 2));
            //lose fatigue at growth rate
            creatureData.fatigue = Math.max(0, Math.round(creatureData.fatigue - creatureGrowthRate));
        }
        //always gain hunger at half of growth rate
        creatureData.hunger = Math.min(100, Math.round(creatureData.hunger + (creatureGrowthRate  / 2)));

        const uiScreenTextL1 = document.getElementById("ui_screen_text_l1");
        const uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
        const uiScreenTextL3 = document.getElementById("ui_screen_text_l3");

        if (uiScreenTextL1 != null && uiScreenTextL2 != null && uiScreenTextL3 != null){
            //uiScreenTextL3.innerText = (isHunting ? 'hunting' : 'resting') + tickCurrentCreatureState();
            uiScreenTextL1.innerText = '' + creatureData.hunger + '% ' + creatureData.fatigue + '%';
            //uiScreenTextL1.innerText = updateDisplayedCreatureStat(false)

            updateCreatureImage()
            uiScreenTextL2.innerText = ' . ' // leaves space for creature sprite
            
            uiScreenTextL3.innerText = scaleToMetric(creatureData.mass) + (isHunting ? '(h)' : '(r)');
        
            //save creature data to database
            updateCreature(JSON.stringify(creatureData))
        }
    }
}, 1000);

setInterval(function(){ // EVERY 10 TICKS, FIGHT
    if (gameState > 3 && isHunting) {
        const generateFight = () => {
            // randomly select either a or b. In future, more complex fights can be implemented by comparing creatures mass and creatureRiskFactor.
            const select = Math.random() >= 0.5 ? 'win' : 'loss';
            switch (select) {
                case 'win':
                    creatureData.hunger = Math.max(0, creatureData.hunger - creatureGrowthRate * 25);
                    flashLED(document.getElementById("green")!, 'green', 100, 5);
                    break;
                case 'loss':
                    creatureData.health = Math.max(0, creatureData.health - creatureHealRate * 12); 
                    flashLED(document.getElementById("red")!, 'red', 100, 5);
                    break;
            }
        };
        generateFight();
    }
},10000);

function updateDisplayedCreatureStat(swap:boolean): string {
    // 0 = mass, 1 = health, 2 = hunger, 3 = fatigue
    
    if (swap) {
        displayedCreatureStat = (displayedCreatureStat + 1) % 3;
    }

    if (displayedCreatureStat === 1) {
        return 'hth: ' + String(creatureData.health) + '%';
    } else if (displayedCreatureStat === 2) {
        return 'hgr: ' + String(creatureData.hunger) + '%';
    } else if (displayedCreatureStat === 3) {
        return 'ftg: ' + String(creatureData.fatigue) + '%';
    } else {
        return creatureData.health.toString() + ' ' + creatureData.hunger.toString() + ' ' + creatureData.fatigue.toString();
    }
}

function scaleToMetric(input: number): string {
    let outputString = String(input).padStart(7, ' ') + 'g';

    if (input > 1000) {
        outputString = (input / 1000).toFixed(2).padStart(7, ' ') + 'kg';
    } else if (input > 100000) {
        outputString = (input / 100000).toFixed(2).padStart(7, ' ') + 'tg';
    } else if (input > 1000000000) {
        outputString = (input / 1000000000).toFixed(2).padStart(7, ' ') + 'bg';
    }
    return outputString;
}

function updateCreatureImage() {
    const creatureImage = document.getElementById("creature") as HTMLImageElement | null;
    if (creatureImage) {
        creatureImage.src = "images/creature-" + getImageScale(creatureData.mass) + ".svg";
        creatureImage.style.visibility = "visible";
    }
}

function getImageScale(mass: number): string {
    return Math.min(6, Math.floor(Math.log10(mass))) + '';
}

function tickCurrentCreatureState(): string {
    creatureStateUITick ++;
    if (creatureStateUITick > 3) {
        creatureStateUITick = 0;
    }

    return '.'.repeat(creatureStateUITick);
}

function loadMain():void{
    try {
        if (creatureData === null) {
            throw new Error('creatureData is null');
        } else {
            resetScreenText(false)
            const creatureDataText = document.getElementById("ui_screen_text_l2");

            if (creatureDataText != null) {
                creatureDataText.innerText === String(creatureData.mass)
            }
        }
    } catch (error) {
        console.error('Error loading creature data:', error);
    }
}
// STATE 5 - User Logout

function askToLogOut(): void {
    resetScreenText(false)
    const creatureImage = document.getElementById("creature") as HTMLImageElement | null;
    if (creatureImage) {
        creatureImage.style.visibility = "hidden";
    }

    const uiScreenTextL2 = document.getElementById("ui_screen_text_l2");
    if (uiScreenTextL2) {
        uiScreenTextL2.innerText = 'log out?'
        uiScreenTextL2.style.color = INITIAL_COLOUR; // light
        uiScreenTextL2.style.backgroundColor = SELECT_COLOUR // dark
    }
}

function logOut(): void {
    isUserLoggedIn = false;
    resetScreenText(false)
    username = ''
    creatureName = ''
    creatureData = null
    gameState = 0
    bootScreenState = 0
    loginScreenState = 1
    usernameLoginState = 0
    cryptonameLoginState = 0
}

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

function flashLED(element: any, color: string, duration: number, flashes: number): Promise<void> {
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

async function displayAPIResponseToLED(apiReponseStatus: number): Promise<void> {
    const redAntennaElement = document.getElementById("red");
    const greenAntennaElement = document.getElementById("green");

    // Flash colors based on response status
    const statusBasedColors: { [key: number]: string } = {
        200: '#00FF00',  // Green for 2xx
        404: '#FF0000',  // Red for 4xx (Client errors)
        500: '#FF0000'   // Red for 5xx (Server errors)
        // Add more status codes as needed
    };
    const color = statusBasedColors[apiReponseStatus] || '#FFFFFF'
    const antennaElement = color === '#00FF00' ? greenAntennaElement : redAntennaElement;

    await flashLED(antennaElement, color, 150, 3)

    }

function fetchUserByName(usernameInput: string): Promise<boolean> {
    return fetch(`/api/users/${btoa(usernameInput)}`)
        .then(response => {
            displayAPIResponseToLED(response.status)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } 
            return response.json();
        })
        .then(data => {
            return true;  // Return true indicating success
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            return false;  // Return false indicating failure
        });
}

function fetchCreatureByName(creatureNameInput: string): Promise<boolean> {
    return fetch(`/api/creatures/${btoa(creatureNameInput)}/${btoa(username)}`)
        .then(response => {
            displayAPIResponseToLED(response.status)
            if (!response.ok) {
                throw new Error(`Network response was not ok - Status: ${response.status}`);
            } 
            return response.json();
        })
        .then(data => {
            console.log('Creature:', data);
            creatureData = data
            return true;  // Return true indicating success
        })
        .catch(error => {
            console.error('Error fetching creature:', error);
            return false;  // Return false indicating failure
        });
}

async function createUser(usernameInput: string): Promise<boolean> {
    fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: btoa(usernameInput) })
    })
        .then(res => {
            displayAPIResponseToLED(res.status)
            return true;//res.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('ERROR', error));
    return false
};

async function createCreature(creatureInput: string): Promise<boolean> {
    return fetch('/api/creatures/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: btoa(creatureInput),owner: btoa(username)})
    })
        .then(res => {
            //console.log('Response received:', res);
            displayAPIResponseToLED(res.status)
            return res.ok; // Return true if the response is OK, false otherwise
        })
        .catch(error => {
            //console.error('ERROR', error);
            return false;
        });
}

function updateCreature(creatureData: any): void {
    fetch('/api/creatures/' + btoa(creatureName) + '/' + btoa(username), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: creatureData
    })
        .then(res => {
            if (!res.ok) {
                console.error('ERROR', res);
            }
        })
        .catch(error => console.error('ERROR', error));
}
