
/* export const myMutation = (state) => {
las mutaciones son sincronas y hacen la modificacion del state. el state es reactivo y cuando cambia notifica a todos los componentes que escuchen este cambio.
} */


export const setEntries = (state, entries ) => {
    state.entries = [...state.entries, ...entries]
    state.isLoading = false
    
}

export const updateEntry = (state, entry ) => { //entry actualizado
    
    const idx = state.entries.map(e => e.id ).indexOf(entry.id)
    state.entries[idx] = entry
    //state.entries = ... entry

}

export const addEntry = ( state, entry ) => {
    //state -> entries -> la nueva entrada debe ser la primera
    state.entries = [entry, ...state.entries]
}

export const deleteEntry= (state, id) => {
    //remover del state.entries borrar la entrada por ese id
    state.entries = state.entries.filter(entry => entry.id !== id)

}