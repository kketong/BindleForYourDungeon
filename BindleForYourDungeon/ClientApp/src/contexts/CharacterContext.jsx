import { createContext, useContext, useReducer } from 'react';

const CharacterContext = createContext();

const CharacterDispatchContext = createContext(null);

export function CharacterProvider({ children, loadedCharacter }) {
    const [character, dispatch] = useReducer(
        characterReducer,
        loadedCharacter
    );

    return (
        <CharacterContext.Provider value={character}>
            <CharacterDispatchContext.Provider value={dispatch}>
                {children}
            </CharacterDispatchContext.Provider>
        </CharacterContext.Provider>
    );
}

export function useCharacter() {
    return useContext(CharacterContext);
}

export function useCharacterDispatch() {
    return useContext(CharacterDispatchContext);
}

function characterReducer(character, action) {
    switch (action.type) {
        case 'spellAdded': {
            return {
                ...character, 
                learntSpells: [
                    ...character.learntSpells,
                    action.id
                ]
            };
        }
        case 'changed': {
            return action.character;
        }
        case 'spellRemoved': {
            return character.learntSpells.filter(spell => spell.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}