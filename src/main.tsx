import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './output.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TokenBuilder from './pages/TokenBuilder.tsx'
import TokenPreviewPage from './pages/TokenPreviewPage.tsx'
import ContractBuilderPage from './pages/ContractBuilder.tsx'
import PageWrapper from './components/PageWrapper.tsx'

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
        element: (
            <PageWrapper>
                <ContractBuilderPage />
            </PageWrapper>
        ),
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className="h-fit w-full">
        <RouterProvider router={router} />
    </div>
)
