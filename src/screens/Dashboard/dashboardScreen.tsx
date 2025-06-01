import React, { type JSX } from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography, Paper } from '@mui/material'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import type { RootState } from '../../store'

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff8042',
  '#8dd1e1',
  '#a4de6c'
]

interface PieChartData {
  name: string
  value: number
}

const DashboardScreen: React.FC = () => {
  const producers = useSelector((state: RootState) => state.producer.producers)

  const totalFazendas = producers.reduce(
    (sum, produtor) => sum + produtor.propriedades.length,
    0
  )

  const totalHectares = producers.reduce((sum, produtor) => {
    return sum + produtor.propriedades.reduce((s, p) => s + p.areaTotal, 0)
  }, 0)

  const estadosMap: Record<string, number> = {}
  const culturasMap: Record<string, number> = {}
  let areaAgricultavel = 0
  let areaVegetacao = 0

  producers.forEach((produtor) => {
    produtor.propriedades.forEach((prop) => {
      estadosMap[prop.estado] = (estadosMap[prop.estado] || 0) + 1
      areaAgricultavel += prop.areaAgricultavel
      areaVegetacao += prop.areaVegetacao

      prop.safras.forEach((safra) => {
        safra.culturas.forEach((cultura) => {
          culturasMap[cultura] = (culturasMap[cultura] || 0) + 1
        })
      })
    })
  })

  const estadoData = Object.entries(estadosMap).map(([estado, count]) => ({
    name: estado,
    value: count
  }))

  const culturaData = Object.entries(culturasMap).map(([cultura, count]) => ({
    name: cultura,
    value: count
  }))

  const usoSoloData = [
    { name: 'Área Agricultável', value: areaAgricultavel },
    { name: 'Vegetação', value: areaVegetacao }
  ]

  const isMobile = window.innerWidth < 768

  const renderPieChart = (title: string, data: PieChartData[]): JSX.Element => (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width='100%' height={250}>
        <PieChart>
          <Pie
            dataKey='value'
            data={data}
            cx='50%'
            cy='50%'
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  )

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Dashboard de Produtores
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={isMobile ? 12 : 6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant='h6'>Total de Fazendas</Typography>
            <Typography variant='h4'>{totalFazendas}</Typography>
          </Paper>
        </Grid>
        <Grid size={isMobile ? 12 : 6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant='h6'>Total de Hectares</Typography>
            <Typography variant='h4'>{totalHectares.toFixed(2)} ha</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid size={isMobile ? 12 : 6}>
          {renderPieChart('Distribuição por Estado', estadoData)}
        </Grid>
        <Grid size={isMobile ? 12 : 6}>
          {renderPieChart('Culturas Plantadas', culturaData)}
        </Grid>
        <Grid size={12}>{renderPieChart('Uso do Solo', usoSoloData)}</Grid>
      </Grid>
    </Box>
  )
}

export default DashboardScreen
