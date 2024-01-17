import React, { Component } from 'react';
import {
    Button,
    Table,
} from 'reactstrap';

import CreateCharacterModal from './CreateCharacterModal';
import CharacterDropdownButton from './CharacterDropdownButton';

class Characters extends Component {
    constructor(props) {
        super(props);
        console.log('im in characters!');
        this.state = { characters: [], loading: true , showCreateCharacter: false};
    }
    static propTypes = {
        
    };
    componentDidMount() {

        this.populateCharacterData();
    }
    
    static renderCharactersTable(characters) {
        return (
            <Table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Level</th>
                        <th>Description</th>
                        <th>Inventory weight</th>
                    </tr>
                </thead>
                <tbody>
                    {characters.map(character =>
                        <tr key={character.characterId}>
                            <td>{character.name}</td>
                            <td>{character.characterClass}</td>
                            <td>{character.level}</td>
                            <td>{character.description}</td>
                            {character.inventory !== null ?
                                <td>{character.inventory}</td> :
                                <td>TODO</td>
                            }
                            <CharacterDropdownButton
                                direction="down"
                                character={character}
                            />
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Characters.renderCharactersTable(this.state.characters);
        return (
            <div>
                <Button variant="primary" onClick={()=>this.setState({ showCreateCharacter: true })}>
                Create new character
            </Button>
                {this.state.showCreateCharacter && <CreateCharacterModal />}
                <h1 id="tableLabel">Characters</h1>
                {contents}
            </div>
        );
    }

    async populateCharacterData() {
        const response = await fetch('character');
        const data = await response.json();
        this.setState({ characters: data, loading: false });
    }
}

export default Characters;