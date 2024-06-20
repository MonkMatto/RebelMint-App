import { Web3ModalProvider } from './Web3ModalProvider'
import { ReactNode } from 'react'
interface Web3ModalProviderProps {
    children: ReactNode
}

export default function PageWrapper({ children }: Web3ModalProviderProps) {
    return <Web3ModalProvider>{children}</Web3ModalProvider>
}
