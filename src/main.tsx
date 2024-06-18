import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './output.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TokenBuilder from './pages/TokenBuilder.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/tokenbuilder',
        element: <TokenBuilder />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className="h-fit w-full">
        <RouterProvider router={router} />
    </div>
)
