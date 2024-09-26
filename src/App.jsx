/** 
 * Nikhil Sharma
 */

import React, { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [uppercaseAllowed, setUppercaseAllowed] = useState(true)
  const [password, setPassword] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyz"
    if (uppercaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, uppercaseAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 999)
    window.navigator.clipboard.writeText(password)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 2000)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, uppercaseAllowed, passwordGenerator])

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]+/)) strength++
    if (password.match(/[A-Z]+/)) strength++
    if (password.match(/[0-9]+/)) strength++
    if (password.match(/[$@#&!]+/)) strength++
    return strength
  }

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 2) return 'bg-red-500'
    if (strength <= 4) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const passwordStrength = calculatePasswordStrength(password)
  const strengthColor = getPasswordStrengthColor(passwordStrength)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md p-8 rounded-xl bg-gray-800 shadow-2xl relative">
        {showAlert && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md transition-opacity duration-300 shadow-lg">
            Password copied!
          </div>
        )}
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-400">Password Generator</h1>
        
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            className="w-full px-4 py-3 pr-20 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
            placeholder="Your secure password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-200"
          >
            Copy
          </button>
        </div>

        <div className="mb-4">
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className={`h-2.5 rounded-full ${strengthColor}`} style={{width: `${(passwordStrength / 5) * 100}%`}}></div>
          </div>
          <p className="text-gray-300 text-sm mt-1">Password Strength: {['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][passwordStrength - 1]}</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300 mb-1">Password Length: {length}</label>
            <input 
              type="range"
              min={6}
              max={30}
              value={length}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={uppercaseAllowed}
              id="uppercaseInput"
              onChange={() => setUppercaseAllowed(prev => !prev)}
              className="w-4 h-4 text-purple-600 bg-gray-700 rounded border-gray-600 focus:ring-purple-500"
            />
            <label htmlFor="uppercaseInput" className="text-sm font-medium text-gray-300">Include Uppercase Letters</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed(prev => !prev)}
              className="w-4 h-4 text-purple-600 bg-gray-700 rounded border-gray-600 focus:ring-purple-500"
            />
            <label htmlFor="numberInput" className="text-sm font-medium text-gray-300">Include Numbers</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed(prev => !prev)}
              className="w-4 h-4 text-purple-600 bg-gray-700 rounded border-gray-600 focus:ring-purple-500"
            />
            <label htmlFor="characterInput" className="text-sm font-medium text-gray-300">Include Special Characters</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showPassword}
              id="showPasswordInput"
              onChange={() => setShowPassword(prev => !prev)}
              className="w-4 h-4 text-purple-600 bg-gray-700 rounded border-gray-600 focus:ring-purple-500"
            />
            <label htmlFor="showPasswordInput" className="text-sm font-medium text-gray-300">Show Password</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App