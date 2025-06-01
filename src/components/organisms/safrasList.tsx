// components/SafrasFields.tsx
import React from 'react'
import {
  useFieldArray,
  type Control,
  type UseFormRegister,
  type FieldErrors
} from 'react-hook-form'
import { Button } from '@mui/material'
import type { ProducerFormData } from '../../screens/Form/producerForm'
import { Input } from '../atoms/input'

interface SafrasFieldsProps {
  propriedadeIndex: number
  control: Control<ProducerFormData>
  register: UseFormRegister<ProducerFormData>
  errors: FieldErrors<ProducerFormData>
}

const SafrasFields: React.FC<SafrasFieldsProps> = ({
  propriedadeIndex,
  control,
  register,
  errors
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `propriedades.${propriedadeIndex}.safras`
  })

  return (
    <div
      style={{
        marginTop: '1rem',
        padding: '1rem',
        borderTop: '1px dashed gray'
      }}
    >
      <h5>Safras</h5>
      {fields.map((safra, idx) => (
        <div key={safra.id} style={{ marginBottom: '1rem' }}>
          <Input
            label='Ano'
            {...register(
              `propriedades.${propriedadeIndex}.safras.${idx}.ano` as const
            )}
            error={
              !!errors.propriedades?.[propriedadeIndex]?.safras?.[idx]?.ano
            }
            helperText={
              errors.propriedades?.[propriedadeIndex]?.safras?.[idx]?.ano
                ?.message
            }
          />

          <Input
            label='Tipo de Safra / Cultura'
            {...register(
              `propriedades.${propriedadeIndex}.safras.${idx}.culturas.0` as const
            )}
            error={
              !!errors.propriedades?.[propriedadeIndex]?.safras?.[idx]
                ?.culturas?.[0]
            }
            helperText={
              errors.propriedades?.[propriedadeIndex]?.safras?.[idx]
                ?.culturas?.[0]?.message
            }
          />

          <Button
            variant='outlined'
            color='error'
            type='button'
            onClick={() => remove(idx)}
            sx={{ mt: 1 }}
          >
            Remover Safra
          </Button>
        </div>
      ))}

      <Button
        variant='outlined'
        type='button'
        onClick={() => append({ ano: '', culturas: [''] })}
      >
        Adicionar Safra
      </Button>
    </div>
  )
}

export default SafrasFields
