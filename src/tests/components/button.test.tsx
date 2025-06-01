import React from 'react'
import { Button } from '@mui/material'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Button component', () => {
  it('chama onClick quando clicado', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Clique aqui</Button>)

    const btn = screen.getByText('Clique aqui')
    fireEvent.click(btn)

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
