import styled from 'styled-components'

export const NavBar = styled.nav`
  display: flex;
  gap: 12px;
  padding: 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
`

export const NavButton = styled.button<{ $active?: boolean }>`
  background: none;
  border: 1px solid #ccc;
  padding: 8px 16px;
  cursor: pointer;
  transition: 1s;
  border-radius: 4px;
  ${({ $active }) =>
    $active &&
    `
    background-color: #ccc;
    border: 1px solid #999;
  `}
`
