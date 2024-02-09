import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import TaskFlow from './main/TaskFlow'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root')!)
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
})

root.render(
  <ApolloProvider client={client}>
    <StrictMode>
      <TaskFlow />
    </StrictMode>
  </ApolloProvider>
)

/*
 * If you want to start measuring performance in your app, pass a function
 * to log results (for example: reportWebVitals(console.log))
 * or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 */
reportWebVitals()
