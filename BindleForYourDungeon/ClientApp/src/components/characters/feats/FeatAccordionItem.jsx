import React from 'react'
import AccordionItem from 'react-bootstrap/esm/AccordionItem'
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader'
import AccordionBody from 'react-bootstrap/esm/AccordionBody'

function FeatAccordionItem({feat, ...props}) {
  return (
    <AccordionItem {...props}>
      <AccordionHeader>{feat.name}</AccordionHeader>
      <AccordionBody>
        {feat.prerequisite}
        {feat.desc}
        {feat.effects.join('\n ')}
        </AccordionBody>
    </AccordionItem>
  )
}

export default FeatAccordionItem
