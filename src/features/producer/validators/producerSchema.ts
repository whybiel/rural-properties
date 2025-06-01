import { z } from 'zod'
import { isValidCNPJ, isValidCPF } from './validateDocument'

const safraSchema = z.object({
  id: z.any().optional(),
  ano: z
    .string()
    .min(4, 'Ano deve ter 4 dígitos')
    .max(4, 'Ano deve ter 4 dígitos'),
  culturas: z
    .array(z.string().min(1, 'Cultura não pode estar vazia'))
    .nonempty('Deve ter pelo menos uma cultura')
})

const propriedadeSchema = z
  .object({
    id: z.any().optional(),
    nomeFazenda: z.string().min(1, 'Nome da fazenda é obrigatório'),
    cidade: z.string().min(1, 'Cidade é obrigatória'),
    estado: z.string().min(2, 'Estado deve ter pelo menos 2 caracteres'),
    areaTotal: z.number().positive('Área total deve ser positiva'),
    areaAgricultavel: z
      .number()
      .nonnegative('Área agricultável não pode ser negativa'),
    areaVegetacao: z
      .number()
      .nonnegative('Área de vegetação não pode ser negativa'),
    safras: z.array(safraSchema)
  })
  .superRefine((data, ctx) => {
    if (data.areaAgricultavel + data.areaVegetacao > data.areaTotal) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total da fazenda',
        path: ['areaAgricultavel']
      })
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total da fazenda',
        path: ['areaVegetacao']
      })
    }
  })

export const producerSchema = z.object({
  id: z.any().optional(),
  cpfCnpj: z
    .string()
    .min(11, 'CPF/CNPJ inválido')
    .refine(
      (val) => {
        const numeric = val.replace(/\D/g, '')
        return isValidCPF(numeric) || isValidCNPJ(numeric)
      },
      {
        message: 'CPF ou CNPJ inválido'
      }
    ),
  nomeProdutor: z.string().min(1, 'Nome do produtor é obrigatório'),
  propriedades: z.array(propriedadeSchema)
})
