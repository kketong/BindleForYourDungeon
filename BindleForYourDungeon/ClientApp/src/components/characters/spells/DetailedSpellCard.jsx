import {
    Button,
    Card,
    Row,
    Col
} from 'react-bootstrap';
export default function DetailedSpellCard({ spell, onBack }) {

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Button onClick={onBack}>Back</Button>
                    {spell.name}
                </Card.Title>
                <Card.Subtitle>
                    {spell.level > 0 && `Level ${spell.level} `}
                    {spell.school.name}
                    {spell.level === 0 && " cantrip"}
                </Card.Subtitle>
                <Card.Text>
                    <Row>
                        <Col>Casting Time</Col>
                        <Col>{spell.casting_time}</Col>
                    </Row>
                    <Row>
                        <Col>Range</Col>
                        <Col>{spell.range}</Col>
                    </Row>
                    <Row>
                        <Col>Components</Col>
                        <Col>{spell.components}</Col>
                    </Row>
                    <Row>
                        <Col>Duration</Col>
                        <Col>{spell.duration}</Col>
                    </Row>
                </Card.Text>

            </Card.Body>
        </Card>
    );
}