import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './routes/Router'
import Root from './Root'
import { Provider } from 'react-redux'
import persistedStore from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  const { store, persistor } = persistedStore()
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Root>
            <Router />
          </Root>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
