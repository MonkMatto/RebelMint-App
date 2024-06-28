import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './output.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ContractBuilderPage from './pages/ContractBuilder.tsx'
import { Web3ModalProvider } from './components/Web3ModalProvider.tsx'
import TokenManager from './pages/TokenManager.tsx'
import ConfigureContract from './pages/ConfigureContract.tsx'
import MetadataPreviewPage from './pages/MetadataPreviewPage.tsx'
import MetadataBuilder from './pages/MetadataBuilder.tsx'
import { About } from './pages/About.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/metadatabuilder',
        element: <MetadataBuilder />,
    },
    {
        path: '/metadatapreviewer',
        element: <MetadataPreviewPage />,
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
    {
        path: '/about',
        element: <About />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className="h-fit w-full">
        <Web3ModalProvider>
            <RouterProvider router={router} />
        </Web3ModalProvider>
    </div>
)
