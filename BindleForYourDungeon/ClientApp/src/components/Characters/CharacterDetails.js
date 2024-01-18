import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    ListGroup,
    ListGroupItem,
    CardLink,
} from 'reactstrap';
import { useLocation } from "react-router-dom";

export async function loader({ params }) {
    console.log(params);
    //const response = await fetch(`character/${params.characterId}`);
    //const character = await response.json();

    return null;
}
export default async function CharacterDetails(props) {
    const { characterId } = useLocation();
    console.log(characterId);
    const response = await fetch(`character/${characterId}`);
    const character = await response.json();
    //async populateCharacterData() {
    //    const params = this.props.params;
    //    console.log(params);
    //    const response = await fetch(`character/${params}`);
    //    const data = await response.json();

    //    this.setState({
    //        character: data,
    //        inventory: data.character.inventory,
    //        spells: data.character.spells,
    //        loading: false
    //    });
    //}
    
    console.log(character);
        return <>
            <Card
                style={{
                    width: '18rem'
                }}
            >                
                <CardBody>
                    <CardTitle tag="h5">
                       
                    </CardTitle>
                    <CardText>
                        This is some text within a card body.
                    </CardText>
                </CardBody>
                <ListGroup flush>
                    <ListGroupItem>
                        An item
                    </ListGroupItem>
                    <ListGroupItem>
                        A second item
                    </ListGroupItem>
                    <ListGroupItem>
                        And a third item
                    </ListGroupItem>
                </ListGroup>
                <CardBody>
                    <CardLink href="#">
                        Card Link
                    </CardLink>
                    <CardLink href="#">
                        Another Card Link
                    </CardLink>
                </CardBody>
            </Card>
        </>;
};