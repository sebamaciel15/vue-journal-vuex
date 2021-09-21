import {shallowMount} from '@vue/test-utils'
import Fab from '@/modules/daybook/components/Fab.vue';

describe('Pruebas en el fab component', () => {
    test('debe mostrar el icono por defecto.', () => {
        
        const wrapper = shallowMount(Fab)
        const iTag= wrapper.find('i')

        expect(iTag.classes('fa-plus')).toBeTruthy()
        //fa-plus
        

    })

    test('debe mostrar el icono por argumento: fa-circle', () => {
        
        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'fa-circle'    
            }
        })
        const iTag= wrapper.find('i')

        expect(iTag.classes('fa-circle')).toBeTruthy()
        //fa-circle

    })

    test('debe emitir el evento on:click cuando se hace click', () => {

        //wrapper.emitter('on:click)

        const wrapper = shallowMount(Fab)

        wrapper.find('button').trigger('click');

        expect(wrapper.emitted('on:click')).toHaveLength(1);

    })  
})
