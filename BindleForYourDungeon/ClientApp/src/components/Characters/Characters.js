import React, { Component } from 'react';
import CreateCharacterModal from './CreateCharacterModal';
import Table from 'react-bootstrap/Table';

export class Characters extends Component {
    static displayName = Characters.name;

    constructor(props) {
        super(props);
        this.state = { characters: [], loading: true };
    }

    componentDidMount() {
        this.populateCharacterData();
    }

    static renderCharactersTable(characters) {
        return (
            <Table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {characters.map(character =>
                        <tr key={character.id}>
                            <td>{character.name}</td>
                            <td>{character.level}</td>
                            <td>{character.description}</td>
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
                <CreateCharacterModal/>
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
