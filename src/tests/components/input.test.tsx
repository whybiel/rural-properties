/* eslint-disable no-unused-vars */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../../components/atoms/input'
import '@testing-library/jest-dom'

const r = React
describe('Input component', () => {
  r
  it('renderiza corretamente com label e digitação', () => {
    function Wrapper() {
      return <Input label='Nome' name='nome' />
    }

    render(<Wrapper />)

    const inputElement = screen.getByLabelText('Nome')
    expect(inputElement).toBeInTheDocument()

    fireEvent.change(inputElement, { target: { value: 'João' } })
    expect(inputElement).toHaveValue('João')
  })
})
