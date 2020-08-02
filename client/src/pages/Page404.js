import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function NoMatch () {
  return (
    <Container fluid>
      <Row>
        <h1>404 Page Not Found</h1>
        <p><span role='img' aria-label='Face With Rolling Eyes Emoji'>🙄</span></p>
      </Row>
    </Container>
  )
}

export default NoMatch
