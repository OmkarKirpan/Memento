# Memento Game - React.js + Vite.js

This project is a memory matching game built with React.js and Vite.js, incorporating audio effects and confetti for a fun user experience.

## Features

- **Memory Matching:** Users match pairs of cards with identical images.
- **Sound Effects:** Plays sounds when cards are flipped or matched.
- **Dynamic Backgrounds:** Background gradient changes with each match.
- **App Badge:** Displays the number of wins on supported devices.
- **Confetti Effect:** Confetti animation celebrates successful matches.
- **Local Storage Support:** The number of wins is saved and retrieved on page reload.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/OmkarKirpan/Memento.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Memento
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## How to Play

- Start a new game using the **New Game** button in the header.
- Click on any card to reveal it. If two selected cards match, they will remain visible; otherwise, they will flip back over.
- The game continues until all cards are matched.
- Wins are tracked and stored locally, and a badge shows the number of wins (if supported by the device).

## Key Technologies

- **React.js:** A JavaScript library for building user interfaces.
- **Vite.js:** A fast front-end build tool and development environment.
- **Hooks:** Custom hooks like `useAppBadge` to manage application badges, `useState` and `useEffect` for state management, and `useSound` for handling sound effects.
- **Confetti.js:** Used to create celebratory confetti animations.
- **Local Storage:** Used to persist the number of wins between sessions.

## Code Overview

### App Component
The `App` component manages the game logic, including:

- **State management:**
  - `wins`: Tracks the number of wins.
  - `cards`: Holds the shuffled cards for the game.
  - `pickOne`, `pickTwo`: Tracks the two selected cards.
  - `disabled`: Disables card clicks while checking for a match.
  - `volume`: Controls the volume of the sound effects.
  - `currentGradient`: Tracks the background gradient index.
  
- **Effects:**
  - On component mount, retrieves the number of wins from `localStorage`.
  - Checks for card matches and triggers confetti animations, sound effects, and background changes when a match is found.
  - Detects a win when all cards are matched and increments the win count.
  
### Utilities

- **`shuffle.js`:** A utility function to shuffle the cards for each new game.

### Components

- **Card Component:** Renders individual cards and handles click events.
- **Header Component:** Displays the number of wins and provides the "New Game" button.

### Hooks

- **useAppBadge:** A custom hook to handle the setting and clearing of app badges.

## Sound Effects

The project includes two sound effects:
- `card.mp3`: Plays when a card is flipped.
- `cardMatch.mp3`: Plays when two cards are successfully matched.

## Confetti

Confetti animation is triggered whenever a pair of cards is matched. This adds a celebratory effect to the game.

## Background Gradients

The game features dynamic background gradients that change each time a match is found. Gradients are randomly shuffled from a predefined list.

## Future Improvements

- Add more card decks/themes.
- Add difficulty levels (varying grid sizes).
- Implement multiplayer mode.
