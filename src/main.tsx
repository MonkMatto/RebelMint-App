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
import TOS from './pages/TOS.tsx'

const router = createBrowserRouter([
    {
        path: '/:chain?/:contractAddress?',
        element: (
            <Web3ModalProvider>
                <App />
            </Web3ModalProvider>
        ),
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
        path: '/createcontract/:chain?',
        element: (
            <Web3ModalProvider>
                <ContractBuilderPage />
            </Web3ModalProvider>
        ),
    },
    {
        path: '/tokenmanager/:chain?/:contractAddress?',
        element: (
            <Web3ModalProvider>
                <TokenManager />
            </Web3ModalProvider>
        ),
    },
    {
        path: '/editcontract/:chain/:contractAddress?',
        element: (
            <Web3ModalProvider>
                <ConfigureContract />
            </Web3ModalProvider>
        ),
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/tos',
        element: <TOS />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className="h-fit w-full">
        <RouterProvider router={router} />
    </div>
)
