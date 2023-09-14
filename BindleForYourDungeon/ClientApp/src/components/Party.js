import React, { Component } from 'react';

export class Party extends Component {
  static displayName = Party.name;

  constructor(props) {
    super(props);
    this.state = { characters: [], loading: true };
  }

  componentDidMount() {
    this.populateCharacterData();
  }

  static renderPartyTable(characters) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
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
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Party.renderPartyTable(this.state.characters);

    return (
      <div>
        <h1 id="tableLabel">Party Members</h1>
        <p>Characters in your party</p>
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
