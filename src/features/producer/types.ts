export interface Producer {
  id: string
  nomeProdutor: string
  cpfCnpj: string
  propriedades: {
    id: string
    nomeFazenda: string
    cidade: string
    estado: string
    areaTotal: number
    areaAgricultavel: number
    areaVegetacao: number
    safras: {
      id: string
      ano: string
      culturas: string[]
    }[]
  }[]
}

export interface ProducerFormScreenProps {
  initialData?: Producer
  isEditing?: boolean
  onSubmit?: (producer: Producer) => void
  onCancel: () => void
}
