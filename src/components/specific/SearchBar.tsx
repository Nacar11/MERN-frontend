import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = query.trim()
        if (trimmed.length > 0) {
            navigate(`/search?q=${encodeURIComponent(trimmed)}`)
            setQuery('')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                sx={{ fontSize: 20 }}
            />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search posts or people..."
                className="w-full bg-[#1A1A1A] border border-white/10 text-white placeholder:text-gray-600 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-200"
            />
        </form>
    )
}

export default SearchBar
