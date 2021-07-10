const isValidId = (id: string | number) => {
    return Number.isInteger(+id)
}

export { isValidId }