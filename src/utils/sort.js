export const sortItems = (items , column, direction)=>{

    if(!column) return items

    return [...items].sort((a,b)=>{
        const valA = (a[column] ?? '').toString().toLowerCase()
        const valB = (b[column] ?? '').toString().toLowerCase()

        if(valA < valB) return direction === 'asc' ? -1 : 1
        if(valA > valB) return direction === 'asc' ?  1 : -1

        return 0
    })
}