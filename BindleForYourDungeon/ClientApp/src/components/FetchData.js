import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { characters: [], loading: true };
  }

  componentDidMount() {
    this.populateCharacterData();
  }

  static renderCharacterTable(characters) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
            <th>Level</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character =>
            <tr key={character.name}>
              <td>{character.id}</td>
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
      : FetchData.renderCharacterTable(this.state.characters);

    return (
      <div>
        <h1 id="tableLabel">Characters</h1>
        <p>Characters in your party</p>
        {contents}
      </div>
    );
  }

  async populateCharacterData() {
    const response = await fetch('character');
    const data = await response.json();
    this.setState({ character: data, loading: false });
  }
}
