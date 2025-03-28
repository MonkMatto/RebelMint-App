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
                className="flex items-center gap-2 px-4 py-2 text-base-400 transition-all hover:cursor-pointer hover:text-base-950 dark:hover:text-base-50"
            >
                {title}
                <ChevronDown
                    className={`duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    size={16}
                />
            </button>
            {isOpen && (
                <div className="absolute left-0 top-[110%] z-50 flex w-fit min-w-64 flex-col rounded-md border bg-base-50 p-1 shadow-md dark:bg-base-950">
                    {options.map((option) => (
                        <a
                            className="dark:hover:bg-base-750 hover:bg-base-150 flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-4 py-2 text-base-400 hover:bg-base-100 hover:text-base-800 dark:text-base-50 dark:hover:text-base-50"
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
