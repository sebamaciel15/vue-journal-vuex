import journalApi from '@/api/journalApi';
/* export const myAction = async({commit}) => {
    las ACTIONS pueden ser acciones asincronas que pueden llamar una mutacion
} */


export const loadEntries = async({commit}) => {
   const {data}= await journalApi.get('/entries.json')
    if(!data){
        commit('setEntries', [])
        return
    }

   const entries = []
   for(let id of Object.keys(data)){
       entries.push({
           id,
           ...data[id]
       })
   }
   commit('setEntries', entries)
}

export const updateEntry = async({commit}, entry) => { //entry debe de ser un parametro
    
    const {date, picture, text} = entry

    const dataToSave = {date, picture, text}

    const resp=  await journalApi.put(`/entries/${entry.id}.json`, dataToSave)

    dataToSave.id = entry.id

    commit('updateEntry', {...dataToSave})
    //extraer solo lo que se necesita //-id

    //awai journalApi.put( PATH .json, dataToSave)

    //commit de una mutation -> UpdateEntry
}

export const createEntry = async({commit}, entry) => {
    
    //dataToSave
    const {date, picture, text} = entry
    const dataToSave = {date, picture, text}

    const {data}=  await journalApi.post(`entries.json`, dataToSave)

    // data = {"name": "-MicDRRZDuEiUL-YJNdg"}
    dataToSave.id = data.name
    //commit  -> addEntry
    commit('addEntry', dataToSave)

    return data.name    
}

export const deleteEntry = async({commit}, id) => {
    await journalApi.delete(`/entries/${id}.json`)
    commit('deleteEntry', id)

    return id
}