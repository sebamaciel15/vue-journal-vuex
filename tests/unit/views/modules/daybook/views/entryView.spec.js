import {shallowMount} from '@vue/test-utils'
import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import {journalState} from '../../../mock-data/test-journal-state'
import EntryView from '@/modules/daybook/views/EntryView.vue';
import Swal from 'sweetalert2'

const createVuexStore= (initialState) => 
        createStore({
            modules: {
                journal: {
                ...journal,
                state: {...initialState}
                }
            }
        })
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))
describe('Pruebas en el EntryView', () => {
    const store= createVuexStore(journalState)
    store.dispatch = jest.fn()
    const mockRouter = {
        push: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryView, {
            props: {
                id: '-MimEuhIuzcMLq3uy_8T'
            },
            global: {
                mocks: {
                     $router: mockRouter
                },
                plugins: [store]
            }
        })
    })    
    test('debe sacar al usuario porque el ID no existe', () => {
        const wrapper = shallowMount(EntryView, {
            props: {
                id: 'Este ID no existe en el STORE'
            },
            global: {
                mocks: {
                     $router: mockRouter
                },
                plugins: [store]
            }
        })
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'})
    })    
    test('debe mostrar la entrada correctamente', () => {
        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalled()
    })  
    test('debe borrar entrada y salir', (done) => {
        Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed:true}))
        wrapper.find('.btn-danger').trigger('click')
        expect(Swal.fire).toHaveBeenCalledWith({
            title: '¿Estas seguro?',
            text: 'Una vez borrado, no se puede recuperar.',
            showDenyButton: true,
            confirmButtonText: 'Si, estoy seguro'
        })
        setTimeout( () => {
            expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-MimEuhIuzcMLq3uy_8T')
            expect(mockRouter.push).toHaveBeenCalled()    
            done()        
        }, 1)
    })
      
})
