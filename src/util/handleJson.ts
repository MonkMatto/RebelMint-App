export const removeSpaces = (input: string) => {
    const sanitized = input.replace(/[^a-zA-Z]/g, '')
    return sanitized
}

export const downloadJSON = (data: string, filename: string) => {
    // Convert the data string to a Blob
    const blob = new Blob([data], { type: 'application/json' })

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create an anchor element and set the download attribute
    const a = document.createElement('a')
    a.href = url
    a.download = filename

    // Append the anchor to the body (required for Firefox)
    document.body.appendChild(a)

    // Trigger the download by clicking the anchor
    a.click()

    // Remove the anchor from the body
    document.body.removeChild(a)

    // Release the URL
    URL.revokeObjectURL(url)
}
