/* eslint-disable no-unused-vars */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import ProducerFormScreen from '../../screens/Form/producerForm'
import { configureStore } from '@reduxjs/toolkit'
import * as producerSlice from '../../features/producer/slice'

jest.mock('../../features/producer/slice', () => ({
  addProducer: jest.fn(() => ({ type: 'ADD_PRODUCER' })),
  updateProducer: jest.fn(() => ({ type: 'UPDATE_PRODUCER' }))
}))

const mockReducer = (state = {}) => state
const r = React
describe('ProducerFormScreen', () => {
  r
  let store: ReturnType<typeof configureStore>

  beforeEach(() => {
    store = configureStore({ reducer: mockReducer })
    store.dispatch = jest.fn()
  })

  const renderComponent = (props = {}) =>
    render(
      <Provider store={store}>
        <ProducerFormScreen onCancel={jest.fn()} {...props} />
      </Provider>
    )

  it('deve renderizar os campos básicos', () => {
    renderComponent()

    expect(screen.getByLabelText(/CPF ou CNPJ/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Nome do Produtor/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Adicionar Propriedade/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Salvar Produtor/i })
    ).toBeInTheDocument()
  })

  it('deve adicionar uma propriedade ao clicar em "Adicionar Propriedade"', () => {
    renderComponent()

    const addButton = screen.getByRole('button', {
      name: /Adicionar Propriedade/i
    })
    fireEvent.click(addButton)

    expect(screen.getByText(/Propriedade #1/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Nome da Fazenda/i)).toBeInTheDocument()
  })

  it('deve validar e enviar o formulário com dados corretos', async () => {
    renderComponent()

    fireEvent.change(screen.getByLabelText(/CPF ou CNPJ/i), {
      target: { value: '12345678901' }
    })
    fireEvent.change(screen.getByLabelText(/Nome do Produtor/i), {
      target: { value: 'João da Fazenda' }
    })

    fireEvent.click(
      screen.getByRole('button', { name: /Adicionar Propriedade/i })
    )

    fireEvent.change(screen.getByLabelText(/Nome da Fazenda/i), {
      target: { value: 'Fazenda Teste' }
    })
    fireEvent.change(screen.getByLabelText(/Cidade/i), {
      target: { value: 'Santa Cruz' }
    })
    fireEvent.change(screen.getByLabelText(/Estado/i), {
      target: { value: 'RJ' }
    })

    fireEvent.change(screen.getByLabelText(/Área Total/i), {
      target: { value: '100' }
    })
    fireEvent.change(screen.getByLabelText(/Área Agricultável/i), {
      target: { value: '60' }
    })
    fireEvent.change(screen.getByLabelText(/Área de Vegetação/i), {
      target: { value: '30' }
    })

    fireEvent.change(screen.getByLabelText(/Ano/i), {
      target: { value: '2024' }
    })
    fireEvent.change(screen.getByLabelText(/Cultura/i), {
      target: { value: 'Soja' }
    })

    fireEvent.click(screen.getByRole('button', { name: /Salvar Produtor/i }))

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled()
      expect(producerSlice.addProducer).toHaveBeenCalled()
    })
  })

  it('deve exibir erro se áreas forem inconsistentes', async () => {
    renderComponent()

    fireEvent.change(screen.getByLabelText(/CPF ou CNPJ/i), {
      target: { value: '12345678901' }
    })
    fireEvent.change(screen.getByLabelText(/Nome do Produtor/i), {
      target: { value: 'João da Fazenda' }
    })

    fireEvent.click(
      screen.getByRole('button', { name: /Adicionar Propriedade/i })
    )

    fireEvent.change(screen.getByLabelText(/Área Total/i), {
      target: { value: '50' }
    })
    fireEvent.change(screen.getByLabelText(/Área Agricultável/i), {
      target: { value: '30' }
    })
    fireEvent.change(screen.getByLabelText(/Área de Vegetação/i), {
      target: { value: '30' }
    })

    fireEvent.click(screen.getByRole('button', { name: /Salvar Produtor/i }))

    await waitFor(() => {
      expect(store.dispatch).not.toHaveBeenCalled()
    })
  })
})
