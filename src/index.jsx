import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Online, Offline } from 'react-detect-offline'
import { Alert } from 'antd'

import store from './Redux/Store/Store'
import App from './Components/App/App'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <>
      <Online>
        <App className="app" />
      </Online>
      <Offline>
        <div className="offline">
          <Alert
            type="error"
            message="Сайт недоступен из-за проблем с подключением к интернету. Пожалуйста, проверьте ваше интернет-соединение и попробуйте обновить страницу."
          />
        </div>
      </Offline>
    </>
  </Provider>
)
