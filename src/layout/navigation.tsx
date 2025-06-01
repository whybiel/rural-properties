import React from 'react'
import type { NavigationProps } from './types'
import * as Styled from './style'

const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onChangeScreen
}) => {
  return (
    <Styled.NavBar>
      <Styled.NavButton
        $active={currentScreen === 'dashboard'}
        onClick={() => onChangeScreen('dashboard')}
      >
        Dashboard
      </Styled.NavButton>
      <Styled.NavButton
        $active={currentScreen === 'form'}
        onClick={() => onChangeScreen('form')}
      >
        Cadastro
      </Styled.NavButton>
      <Styled.NavButton
        $active={currentScreen === 'list'}
        onClick={() => onChangeScreen('list')}
      >
        Lista de Produtores
      </Styled.NavButton>
    </Styled.NavBar>
  )
}

export default Navigation
