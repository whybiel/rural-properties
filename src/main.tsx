import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import { StyledEngineProvider } from '@mui/material/styles'
import { GlobalStyle } from './styles/GlobalStyle'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <GlobalStyle />
      <App />
    </StyledEngineProvider>
  </Provider>
)
