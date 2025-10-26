import React from 'react'
import './PhoneMock.css'

const PhoneMock = ({ children }) => {
  return (
    <div className="phone-mock-wrapper">
      <div className="phone-mock">
        <div className="phone-top-notch" />
        <div className="phone-screen">{children}</div>
        <div className="phone-bottom" />
      </div>
    </div>
  )
}

export default PhoneMock
