import { useState } from 'react'
import Footer from '../components/Footer'

interface DetailStruct {
    title: string
    artist: string
    desc?: string
    fundsReceiver: string
    royaltyBps: string
}

const EditContract = () => {
    const [form, setForm] = useState<DetailStruct>({
        title: '',
        artist: '',
        desc: '',
        fundsReceiver: '',
        royaltyBps: '',
    })
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }))
    }

    const inputClass = 'flex-1 p-3 border-2 bg-bgcol border-textcol rounded-lg'

    return (
        <div className="mint-h-[100svh] flex h-fit w-full flex-col items-center bg-bgcol p-24 font-satoshi text-textcol">
            <h1 className="mt-5 w-full text-5xl font-bold">
                Token Metadata Builder
            </h1>
            <p className="text-md mb-10 mt-5 w-full">
                Use this form to generate the JSON for your tokenURI metadata
                object. Use complete URLs, and avoid special characters.
            </p>
            <form className="flex w-full flex-col gap-5">
                <div className="flex w-full gap-5">
                    <input
                        className={inputClass}
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                    />
                    <input
                        className={inputClass}
                        name="artist"
                        placeholder="Artist"
                        value={form.artist}
                        onChange={handleChange}
                    />
                </div>
                <textarea
                    className={`${inputClass} h-[40svh] w-full rounded-lg border-2 border-textcol p-3`}
                    name="description"
                    placeholder="Token Description"
                    value={form.desc}
                    onChange={handleChange}
                />
                <div className="mb-8 flex gap-5">
                    <input
                        className={inputClass}
                        name="image"
                        placeholder="Image URL"
                        value={form.fundsReceiver}
                        onChange={handleChange}
                    />
                    <input
                        className={inputClass}
                        name="animation_url"
                        placeholder="Animation or HTML URL (optional)"
                        value={form.royaltyBps}
                        onChange={handleChange}
                    />
                </div>
            </form>
            <h1 className="mb-6 mt-5 w-full text-5xl font-bold">
                Metadata Output
            </h1>
            <Footer />
        </div>
    )
}

export default EditContract
