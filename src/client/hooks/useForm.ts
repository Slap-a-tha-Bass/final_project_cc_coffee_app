import React, { useState } from "react"

export const useForm = () => {
    const [values, setValues] = useState<{ [key: string]: string }>({});
    const handleChanges = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const populate = (pValues: { [key: string]: string }) => setValues(pValues);
    return {
        values,
        handleChanges,
        populate
    }
}