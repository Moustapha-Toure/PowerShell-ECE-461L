import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import styles from '@/styles/login-signup.module.css'
import { RectButton, Results, NewName } from '../components/Components'
import Link from 'next/link';

export default function TestingFront() {
  const [msg, setMsg] = useState()


  useEffect(() => {
    fetch('http://localhost:5000/user').then((response) => {
      console.log('bruh')
      response.json().then((data) => {
        console.log(data)
        setMsg(data.msg)
      })
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.status)
        console.log(error.headers)
      }
    })
  })

  return (
    <>
      <div style={{ color: 'white' }}>
        <h1 >Come on</h1>
        {msg &&
          <>
            <p>{msg}</p>
          </>
        }
      </div>
    </>
  )
}