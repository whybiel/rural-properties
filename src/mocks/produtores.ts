import type { Producer } from '../features/producer/types'

export const mockProducers: Producer[] = [
  {
    id: 'prod1',
    nomeProdutor: 'João da Silva',
    cpfCnpj: '123.456.789-00',
    propriedades: [
      {
        id: 'prop1',
        nomeFazenda: 'Fazenda Boa Vista',
        cidade: 'São Paulo',
        estado: 'SP',
        areaTotal: 150,
        areaAgricultavel: 100,
        areaVegetacao: 50,
        safras: [
          {
            id: 'safra1',
            ano: '2021',
            culturas: ['Soja', 'Milho']
          },
          {
            id: 'safra2',
            ano: '2022',
            culturas: ['Café']
          }
        ]
      }
    ]
  },
  {
    id: 'prod2',
    nomeProdutor: 'Maria Oliveira',
    cpfCnpj: '12.345.678/0001-00',
    propriedades: [
      {
        id: 'prop2',
        nomeFazenda: 'Sítio Verde',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        areaTotal: 200,
        areaAgricultavel: 150,
        areaVegetacao: 50,
        safras: [
          {
            id: 'safra3',
            ano: '2021',
            culturas: ['Cana-de-açúcar']
          },
          {
            id: 'safra4',
            ano: '2022',
            culturas: ['Soja', 'Algodão']
          }
        ]
      },
      {
        id: 'prop3',
        nomeFazenda: 'Fazenda Azul',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        areaTotal: 100,
        areaAgricultavel: 70,
        areaVegetacao: 30,
        safras: []
      }
    ]
  },
  {
    id: 'prod3',
    nomeProdutor: 'Carlos Pereira',
    cpfCnpj: '987.654.321-00',
    propriedades: []
  },
  {
    id: 'prod4',
    nomeProdutor: 'Ana Souza',
    cpfCnpj: '111.222.333-44',
    propriedades: [
      {
        id: 'prop4',
        nomeFazenda: 'Chácara do Lago',
        cidade: 'Curitiba',
        estado: 'PR',
        areaTotal: 80,
        areaAgricultavel: 60,
        areaVegetacao: 20,
        safras: [
          {
            id: 'safra5',
            ano: '2023',
            culturas: ['Feijão', 'Trigo']
          }
        ]
      }
    ]
  },
  {
    id: 'prod5',
    nomeProdutor: 'Luiz Fernando',
    cpfCnpj: '22.333.444/0001-55',
    propriedades: [
      {
        id: 'prop5',
        nomeFazenda: 'Estância das Palmeiras',
        cidade: 'Porto Alegre',
        estado: 'RS',
        areaTotal: 300,
        areaAgricultavel: 180,
        areaVegetacao: 120,
        safras: [
          {
            id: 'safra6',
            ano: '2020',
            culturas: ['Uva']
          },
          {
            id: 'safra7',
            ano: '2021',
            culturas: ['Uva', 'Maçã']
          }
        ]
      }
    ]
  }
]
