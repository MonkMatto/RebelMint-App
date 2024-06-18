import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './output.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TokenBuilder from './pages/TokenBuilder.tsx'
import TokenPreviewPage from './pages/TokenPreviewPage.tsx'

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
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className="h-fit w-full">
        <RouterProvider router={router} />
    </div>
)
