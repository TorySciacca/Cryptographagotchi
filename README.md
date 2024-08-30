# Cryptographagotchi
literally: coded egg watch

A virtual pet inspired by Tamagotchi that aims to merges those UX ideas into a functional web-app. This enviroment is connected to a back-end database that aims to simulate a living ecology. 

Users will be able to generate virtual pets that exist within the ecosystem.

## Features

### UX
The app is designed to have a similar look and feel to a vintage Tamagotchi, with three buttons:

* A: Switches between options
* B: Selects an option
* C: Goes back or cancels an action

### User Management
- Users can sign up and login
- Sessions are maintained server-side
- User data is stored in a SQLite database

### Virtual Pets
- Users can generate virtual pets
- Virtual pets have a simple state machine:
  - Hunting (to decrease hunger)
  - Resting (to decrease fatigue)
- Virtual pets have attributes:
  - Mass (equivalent to pet level/score)
  - Hunger 
  - Fatigue
  - Health
- Users must balance their pet's hunger and fatigue levels to keep them alive.

### Frontend
- Written in Typescript
- Uses the Typescript DOM library for rendering
- Supports keyboard and mouse input
- Uses a state machine to manage the UI

### Backend
- Written in Typescript
- Uses Node.js
- Uses SQLite for the database
- Has a REST API for user management and virtual pets
