import {shallowMount} from '@vue/test-utils'
import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import EntryList from '@/modules/daybook/components/EntryList.vue'
import {journalState} from '../../../mock-data/test-journal-state'

const createVuexStore= (initialState) => 
        createStore({
            modules: {
                journal: {
                ...journal,
                state: {...initialState}
                }
            }
        })
describe('Pruebas en el entryList', () => {
    /*Forma numero uno de hacer esto, pero se puede simplificar. arriba (fuera del describe) y sin comentar, la simplificacion
     const journalMockModule = {
        namespaced: true,
        getters: {
            //getEntriesByTerm: jest.fn()
            getEntriesByTerm
        },
        state: () => ({
            isLoading: false,
            entries: journalState.entries
        })
    }
    const store = createStore({
        modules: {
            journal: {...journalMockModule}
        }
    }) */    
    const store= createVuexStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                     $router: mockRouter
                },
                plugins: [store]
            }
        })
    })
    test('debe llamar el getEntriesByTerm sin termino y mostrar 2 entradas', () => {
        expect(wrapper.findAll('entry-stub').length).toBe(2)       
        expect(wrapper.html()).toMatchSnapshot()       
    })
    test('debe llamar el getEntriesByTerm y filtrar las entradas', async() => {
        const input = wrapper.find('input')
        await input.setValue('segunda')
        expect(wrapper.findAll('entry-stub').length).toBe(1)
    })
    test('el boton de nuevo debe redireccionar a /new', () => {
        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'entry', params: {id: 'new'}})
    })
    
})
