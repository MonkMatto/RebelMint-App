import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './output.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TokenBuilder from './pages/TokenBuilder.tsx'
import TokenPreviewPage from './pages/TokenPreviewPage.tsx'
import ContractBuilderPage from './pages/ContractBuilder.tsx'
import { Web3ModalProvider } from './components/Web3ModalProvider.tsx'
import TokenManager from './pages/TokenManager.tsx'
import ConfigureContract from './pages/ConfigureContract.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/tokenbuilder',
        element: <TokenBuilder />,
    },
    {
        path: '/tokenpreviewer',
        element: <TokenPreviewPage />,
    },
    {
        path: '/createcontract',
        element: <ContractBuilderPage />,
    },
    {
        path: '/tokenmanager',
        element: <TokenManager />,
    },
    {
        path: '/editcontract',
        element: <ConfigureContract />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className="h-fit w-full">
        <Web3ModalProvider>
            <RouterProvider router={router} />
        </Web3ModalProvider>
    </div>
)
