import React from 'react'
import { Alert } from 'react-bootstrap'

const Alerting = ({variant,children}) => {
  return (
    <>
    <Alert variant={variant}>
        {children}
    </Alert>
    </>
  )
}

Alerting.defaultProps ={
    variant:'info'
}

export default Alerting