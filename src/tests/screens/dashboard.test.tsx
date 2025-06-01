/* eslint-disable no-unused-vars */
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as reactRedux from 'react-redux'
import DashboardScreen from '../../screens/Dashboard/dashboardScreen'

const r = React
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}))

const mockProducers = [
  {
    propriedades: [
      {
        estado: 'SP',
        areaTotal: 100,
        areaAgricultavel: 70,
        areaVegetacao: 30,
        safras: [{ culturas: ['Soja', 'Milho'] }]
      }
    ]
  },
  {
    propriedades: [
      {
        estado: 'MG',
        areaTotal: 200,
        areaAgricultavel: 120,
        areaVegetacao: 80,
        safras: [{ culturas: ['Café'] }]
      }
    ]
  }
]

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('DashboardScreen', () => {
  r
  beforeEach(() => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockImplementation(
      (callback) => callback({ producer: { producers: mockProducers } })
    )

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    })

    window.dispatchEvent(new Event('resize'))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza totais corretamente', () => {
    render(<DashboardScreen />)

    expect(screen.getByText('Total de Fazendas')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()

    expect(screen.getByText('Total de Hectares')).toBeInTheDocument()
    expect(screen.getByText('300.00 ha')).toBeInTheDocument()
  })

  it('renderiza os gráficos com os títulos corretos', () => {
    render(<DashboardScreen />)

    expect(screen.getByText('Distribuição por Estado')).toBeInTheDocument()
    expect(screen.getByText('Culturas Plantadas')).toBeInTheDocument()
    expect(screen.getByText('Uso do Solo')).toBeInTheDocument()
  })
})
