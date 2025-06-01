import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Card, CardContent, Typography, Divider, Button } from '@mui/material'
import type { RootState } from '../../store'
import type { Producer } from '../../features/producer/types'
import { removeProducer, updateProducer } from '../../features/producer/slice'
import ProducerFormScreen from '../Form/producerForm'
import * as Styled from './style'

const ProducerListScreen = () => {
  const dispatch = useDispatch()
  const producers = useSelector(
    (state: RootState): Producer[] => state?.producer?.producers
  )
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleUpdate = (updatedProducer: Producer) => {
    dispatch(updateProducer(updatedProducer))
    setEditingId(null)
  }

  if (!producers || producers.length === 0) {
    return <Typography>Nenhum produtor cadastrado.</Typography>
  }

  return (
    <Styled.Container>
      <Typography variant='h4' gutterBottom>
        Lista de Produtores
      </Typography>

      {producers.map((producer: Producer) => {
        const isEditing = editingId === producer.id

        return (
          <Card key={producer.id} style={{ marginBottom: '1.5rem' }}>
            <CardContent>
              {isEditing ? (
                <ProducerFormScreen
                  initialData={{
                    id: producer.id,
                    nomeProdutor: producer.nomeProdutor,
                    cpfCnpj: producer.cpfCnpj,
                    propriedades:
                      producer.propriedades.length > 0
                        ? producer.propriedades.map((property) => ({
                            id: property.id,
                            nomeFazenda: property.nomeFazenda,
                            cidade: property.cidade,
                            estado: property.estado,
                            areaTotal: property.areaTotal,
                            areaAgricultavel: property.areaAgricultavel,
                            areaVegetacao: property.areaVegetacao,
                            safras: property.safras.map((h) => ({
                              id: h.id,
                              ano: h.ano,
                              culturas: h.culturas.map((c) => c)
                            }))
                          }))
                        : []
                  }}
                  isEditing
                  onSubmit={handleUpdate}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <Typography variant='h6'>{producer.nomeProdutor}</Typography>
                  <Typography variant='body2'>
                    CPF/CNPJ: {producer.cpfCnpj}
                  </Typography>

                  <Divider style={{ margin: '1rem 0' }} />

                  {producer?.propriedades?.length === 0 ? (
                    <Typography variant='body2'>
                      Nenhuma propriedade cadastrada.
                    </Typography>
                  ) : (
                    producer?.propriedades?.map((property) => (
                      <Styled.WrapperFazenda key={property.nomeFazenda}>
                        <Typography variant='subtitle1'>
                          {property.nomeFazenda} - {property.cidade}/
                          {property.estado}
                        </Typography>
                        <Typography variant='body2'>
                          Área Total: {property.areaTotal} ha | Agricultável:{' '}
                          {property.areaAgricultavel} ha | Vegetação:{' '}
                          {property.areaVegetacao} ha
                        </Typography>

                        {property.safras.length === 0 ? (
                          <Typography
                            variant='body2'
                            style={{ marginLeft: '1rem' }}
                          >
                            Nenhuma safra cadastrada.
                          </Typography>
                        ) : (
                          property.safras.map((harvest) => (
                            <Styled.WrapperSafra key={harvest.id}>
                              <Typography variant='body2'>
                                Safra {harvest.ano}:{' '}
                                {harvest.culturas
                                  .map((crop) => crop)
                                  .join(', ')}
                              </Typography>
                            </Styled.WrapperSafra>
                          ))
                        )}
                      </Styled.WrapperFazenda>
                    ))
                  )}

                  <Styled.WrapperBtn>
                    <Button
                      variant='contained'
                      onClick={() => setEditingId(producer.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => dispatch(removeProducer(producer.id))}
                    >
                      Excluir
                    </Button>
                  </Styled.WrapperBtn>
                </>
              )}
            </CardContent>
          </Card>
        )
      })}
    </Styled.Container>
  )
}

export default ProducerListScreen
