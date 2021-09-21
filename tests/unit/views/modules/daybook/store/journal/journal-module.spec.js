import { createStore } from "vuex"
import journal from '@/modules/daybook/store/journal'
import { journalState } from "../../../../mock-data/test-journal-state"
const createVuexStore= (initialState) => 
createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState}
        }
    }
})
describe('Vuex- pruebas en el journal module', () => {
    //basicas
    test('este es el estado inicial, debe de tener este state ', () => {        
        const store = createVuexStore(journalState)
        const {isLoading, entries} = store.state.journal
        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    })
    //mutations
    test('mutation: setEntries', () => {        
        const store = createVuexStore({isLoading: true, entries: []})
        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()
    })
    test('mutation: updateEntry', () => {
        //create store con entries
        const store = createVuexStore(journalState)
        //updatedEntry
        const updatedEntry= {            
                id: '-MifKSw7eijD6W1XyRq5',
                date: 1630667123590,
                text: "Hola mundo desde pruebas"            
        }
        //commit de la mutacion
        store.commit('journal/updateEntry', updatedEntry)
        //expects
        const storeEntries = store.state.journal.entries
        //entries.lenght = 2
        expect(storeEntries.length).toBe(2)
        //entries  tiene que existir updatedEntry (toEqual)
        expect(storeEntries.find(e=> e.id === updatedEntry.id)).toEqual(updatedEntry)
    })
    test('mutation: addEntry y deleteEntry', () => {
        //crear store
        const store = createVuexStore(journalState)
        //addEntry{id: 'ABC-123', text: 'Hola mundo'}  
        store.commit('journal/addEntry', {id: 'ABC-123', text: 'Hola mundo'})
        const storeEntries = store.state.journal.entries
        //expect
        //entradas sean 3
        expect(storeEntries.length).toBe(3)
        //entrada con id ABC123 exista
        expect(storeEntries.find(e=> e.id === 'ABC-123')).toBeTruthy()
        //commit deleteEntry, mandamos como argumento 'ABC-123
        store.commit('journal/deleteEntry', 'ABC-123' )
        //expect nuevos
        //evaluar que las entradas sean 2 
        expect(store.state.journal.entries.length).toBe(2)
        //la entrada con el ID ABC no debe existir 
        expect(store.state.journal.entries.find(e=> e.id === 'ABC-123')).toBeFalsy()
    })
    //getters
    test('getters: getEntriesByTerm y getEntryById', () => {
        const store = createVuexStore(journalState)
        const [entry1, entry2 ] =journalState.entries
        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('segunda').length).toBe(1)
        expect(store.getters['journal/getEntriesByTerm']('segunda')).toEqual([entry2])
        //pruebas sobre getEntryById
        expect(store.getters['journal/getEntryById']('-MifKSw7eijD6W1XyRq5')).toEqual(entry1)
    })
    //actions
    test('actions: loadEntries', async() => {
        const store = createVuexStore({isLoading: true, entries: []})
        await store.dispatch('journal/loadEntries')
        expect(store.state.journal.entries.length).toBe(2)
    })
    test('actions: updateEntry', async() => {
        const store = createVuexStore(journalState)
        const updatedEntry= {
            id: '-MifKSw7eijD6W1XyRq5',
            date: 1630667123590,
            text: "Hola mundo desde Mock data",
            otroCampo: true,
            otroMas: {a:1}
        }
        await store.dispatch('journal/updateEntry', updatedEntry)
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e=> e.id === updatedEntry.id)).toEqual({
            id: '-MifKSw7eijD6W1XyRq5',
            date: 1630667123590,
            text: "Hola mundo desde Mock data"
        })
    })
    test('actions: createEntry, deleteEntry', async() => {
        //creteStore
        const store = createVuexStore(journalState)
        //newEntry= {date: 1630667123590, text: 'nueva entrada desde las pruebas'}
        const newEntry= {    
            date: 1630667123590,
            text: "nueva entrada desde las pruebas",            
        }
        //dispatch de la accion createEntry
        //obtener el id de la nueva entrada (id de firebase)
        const id= await store.dispatch('journal/createEntry', newEntry)        
        //el id de firebase debe ser un string(evaluar)
        expect(typeof id).toBe('string')
        //la nueva entrada debe existir en el state.journal.entries...
        expect(store.state.journal.entries.find(e=> e.id === id)).toBeTruthy()
        //#2
        //dispatch deleteEntry
        await store.dispatch('journal/deleteEntry', id)
        //la nueva entrada NO debe existir en el state.journal.entries...
        expect(store.state.journal.entries.find(e=> e.id === id)).toBeFalsy()        
    })
    
})
