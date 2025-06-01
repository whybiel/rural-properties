/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from '@mui/material'
import { render, screen, fireEvent } from '@testing-library/react'

const r = React
describe('Button component', () => {
  it('chama onClick quando clicado', () => {
    r
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Clique aqui</Button>)

    const btn = screen.getByText('Clique aqui')
    fireEvent.click(btn)

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
