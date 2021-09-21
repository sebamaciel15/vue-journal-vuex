import {shallowMount} from '@vue/test-utils';
import Entry from '@/modules/daybook/components/Entry.vue'
import {journalState} from '../../../mock-data/test-journal-state'


describe('pruebas en entry component', () => {
    //mockRouter
    const mockRouter = {
        push: jest.fn(),
    }
    //const wrapper = shallowMount(Entry, {... ...props ...global})
    const wrapper = shallowMount(Entry, {
        props: {
            entry:journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })
    test('debe hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('debe redireccionar al hacer click en el entry-container', () => {
        const entryContainer = wrapper.find('.entry-container')
        entryContainer.trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith({
            name: 'entry',
            params: {
                id: journalState.entries[0].id
            }
        })
    })
    test('pruebas en las propiedades computadas', () => {
        //wrapper.vm. <---- ver las propiedades computadas
        //day:23
        //month: julio
        //yearDay: '2021, viernes'
        expect(wrapper.vm.day).toBe(3)
        expect(wrapper.vm.month).toBe('Septiembre')
        expect(wrapper.vm.yearDay).toBe('2021, Miércoles ')
    })
    
    
        
})
