import { ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface DropdownOption {
    label: string
    destination: string
    icon?: React.ReactNode
}
interface NavDropdownProps {
    title: string
    options: DropdownOption[]
}

const NavDropdown: React.FC<NavDropdownProps> = ({ title, options }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleOpen = () => setIsOpen(!isOpen)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={toggleOpen}
                className="flex items-center gap-2 px-4 py-2 text-base-500 transition-all hover:cursor-pointer hover:text-base-200"
            >
                {title}
                <ChevronDown
                    className={`duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    size={16}
                />
            </button>
            {isOpen && (
                <div className="absolute left-0 top-[110%] z-50 flex w-fit min-w-64 flex-col rounded-md border border-base-800 bg-base-850 p-1 shadow-md">
                    {options.map((option) => (
                        <a
                            className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-4 py-2 text-base-500 hover:bg-base-800 hover:text-base-200"
                            href={option.destination}
                            key={option.label}
                        >
                            {option.label} {option.icon && option.icon}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NavDropdown
