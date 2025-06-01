/* eslint-disable no-unused-vars */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { updateProducer } from '../../features/producer/slice'
import type { RootState } from '../../store'
import ProducerListScreen from '../../screens/ListProducers/producerListScreen'

jest.mock('../../features/producer/slice', () => ({
  updateProducer: jest.fn()
}))

const r = React

const mockProducers = [
  {
    id: '1',
    nomeProdutor: 'Produtor Teste',
    cpfCnpj: '12345678901',
    propriedades: [
      {
        id: 'p1',
        nomeFazenda: 'Fazenda Teste',
        cidade: 'Santa Cruz',
        estado: 'RJ',
        areaTotal: 100,
        areaAgricultavel: 60,
        areaVegetacao: 30,
        safras: [
          {
            id: 's1',
            ano: '2024',
            culturas: ['Soja']
          }
        ]
      }
    ]
  }
]

const renderWithStore = (preloadedState: Partial<RootState> = {}) => {
  r
  const store = configureStore({
    reducer: (state = preloadedState) => state as RootState
  })

  store.dispatch = jest.fn()

  render(
    <Provider store={store}>
      <ProducerListScreen />
    </Provider>
  )

  return store
}

describe('ProducerListScreen - Edição Inline', () => {
  it('deve permitir editar um produtor diretamente na lista', async () => {
    const store = renderWithStore({
      producer: { producers: mockProducers }
    })
    expect(screen.getByText(/Produtor Teste/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Editar/i }))

    expect(screen.getByLabelText(/Nome do Produtor/i)).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/Nome do Produtor/i), {
      target: { value: 'Novo Nome do Produtor' }
    })

    fireEvent.click(screen.getByRole('button', { name: /Salvar Produtor/i }))

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled()
      expect(updateProducer).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          nomeProdutor: 'Novo Nome do Produtor'
        })
      )
    })
  })
})
