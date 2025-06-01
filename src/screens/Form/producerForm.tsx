import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { producerSchema } from '../../features/producer/validators/producerSchema'
import type { z } from 'zod'
import SafrasFields from '../../components/organisms/safrasList'
import { Input } from '../../components/atoms/input'
import { Button, Typography, Box, Divider } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addProducer, updateProducer } from '../../features/producer/slice'
import type { ProducerFormScreenProps } from '../../features/producer/types'

export type ProducerFormData = z.infer<typeof producerSchema>

const ProducerFormScreen: React.FC<ProducerFormScreenProps> = ({
  initialData,
  onCancel
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProducerFormData>({
    resolver: zodResolver(producerSchema),
    defaultValues: {
      cpfCnpj: '',
      nomeProdutor: '',
      propriedades: []
    }
  })

  const {
    fields: propriedadesFields,
    append: appendPropriedade,
    remove: removePropriedade
  } = useFieldArray({
    control,
    name: 'propriedades'
  })

  const dispatch = useDispatch()

  const onSubmit = (data: ProducerFormData) => {
    const isEditing = !!(data as ProducerFormData).id
    const id = isEditing ? (data as ProducerFormData).id : Date.now().toString()

    const produtorPayload = {
      id,
      nomeProdutor: data.nomeProdutor,
      cpfCnpj: data.cpfCnpj,
      propriedades: data.propriedades.map((fazenda) => {
        const totalOk =
          fazenda.areaTotal >= fazenda.areaAgricultavel + fazenda.areaVegetacao

        if (!totalOk) {
          throw new Error(
            `A área total da fazenda "${fazenda.nomeFazenda}" está incorreta.`
          )
        }
        return {
          id: fazenda.id || Date.now().toString(),
          nomeFazenda: fazenda.nomeFazenda,
          cidade: fazenda.cidade,
          estado: fazenda.estado,
          areaTotal: fazenda.areaTotal,
          areaAgricultavel: fazenda.areaAgricultavel,
          areaVegetacao: fazenda.areaVegetacao,
          safras: fazenda.safras.map((safra) => ({
            id: safra.id || Date.now().toString(),
            ano: safra.ano,
            culturas: safra.culturas.filter((c) => c.trim() !== '')
          }))
        }
      })
    }

    if (isEditing) {
      dispatch(updateProducer(produtorPayload))
      reset()
      alert('Produtor atualizado com sucesso!')
      onCancel()
    } else {
      dispatch(addProducer(produtorPayload))
      reset()
      alert('Produtor cadastrado com sucesso!')
    }
  }

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 800, mx: 'auto' }}
    >
      <Typography variant='h5' gutterBottom>
        Cadastro de Produtor
      </Typography>

      <Input
        label='CPF ou CNPJ'
        {...register('cpfCnpj')}
        error={!!errors.cpfCnpj}
        helperText={errors.cpfCnpj?.message}
      />

      <Input
        label='Nome do Produtor'
        {...register('nomeProdutor')}
        error={!!errors.nomeProdutor}
        helperText={errors.nomeProdutor?.message}
      />

      {propriedadesFields.map((prop, idx) => (
        <Box
          key={prop.id}
          sx={{ border: '1px solid #ccc', p: 2, my: 2, borderRadius: 2 }}
        >
          <Typography variant='h6' gutterBottom>
            Propriedade #{idx + 1}
          </Typography>

          <Input
            label='Nome da Fazenda'
            {...register(`propriedades.${idx}.nomeFazenda` as const)}
            error={!!errors.propriedades?.[idx]?.nomeFazenda}
            helperText={errors.propriedades?.[idx]?.nomeFazenda?.message}
          />

          <Input
            label='Cidade'
            {...register(`propriedades.${idx}.cidade` as const)}
            error={!!errors.propriedades?.[idx]?.cidade}
            helperText={errors.propriedades?.[idx]?.cidade?.message}
          />

          <Input
            label='Estado'
            {...register(`propriedades.${idx}.estado` as const)}
            error={!!errors.propriedades?.[idx]?.estado}
            helperText={errors.propriedades?.[idx]?.estado?.message}
          />

          <Input
            label='Área Total (ha)'
            type='number'
            {...register(`propriedades.${idx}.areaTotal` as const, {
              valueAsNumber: true
            })}
            error={!!errors.propriedades?.[idx]?.areaTotal}
            helperText={errors.propriedades?.[idx]?.areaTotal?.message}
          />

          <Input
            label='Área Agricultável (ha)'
            type='number'
            {...register(`propriedades.${idx}.areaAgricultavel` as const, {
              valueAsNumber: true
            })}
            error={!!errors.propriedades?.[idx]?.areaAgricultavel}
            helperText={errors.propriedades?.[idx]?.areaAgricultavel?.message}
          />

          <Input
            label='Área de Vegetação (ha)'
            type='number'
            {...register(`propriedades.${idx}.areaVegetacao` as const, {
              valueAsNumber: true
            })}
            error={!!errors.propriedades?.[idx]?.areaVegetacao}
            helperText={errors.propriedades?.[idx]?.areaVegetacao?.message}
          />

          <SafrasFields
            propriedadeIndex={idx}
            control={control}
            register={register}
            errors={errors}
          />

          <Button
            variant='outlined'
            color='error'
            type='button'
            onClick={() => removePropriedade(idx)}
            sx={{ mt: 2 }}
          >
            Remover Propriedade
          </Button>
        </Box>
      ))}

      <Button
        variant='outlined'
        type='button'
        onClick={() =>
          appendPropriedade({
            nomeFazenda: '',
            cidade: '',
            estado: '',
            areaTotal: 0,
            areaAgricultavel: 0,
            areaVegetacao: 0,
            safras: [{ ano: '', culturas: [''] }]
          })
        }
        sx={{ my: 2 }}
      >
        Adicionar Propriedade
      </Button>

      <Divider sx={{ my: 2 }} />

      <Button variant='contained' type='submit'>
        Salvar Produtor
      </Button>
      {initialData?.id && (
        <Button sx={{ ml: 2 }} onClick={onCancel}>
          Cancelar
        </Button>
      )}
    </Box>
  )
}

export default ProducerFormScreen
