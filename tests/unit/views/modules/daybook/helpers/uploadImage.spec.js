import cloudinary from 'cloudinary';

import uploadImage from '@/modules/daybook/helpers/uploadImage';
import axios from 'axios';

cloudinary.config({
    cloud_name: 'dg4dflmtg',
    api_key: '782362561182148',
    api_secret: 'xpyGpn5ljrhKw_y1Xg7WxyyV5FI'
})

describe('prebas en el uploadImage', () => {
    
    test('debe cargar un archivo y retornar un url', async( done ) => {
        
        const {data} = await axios.get('https://res.cloudinary.com/dg4dflmtg/image/upload/v1630783121/wezqsrgrvssaiziswxcx.png', {
            responseType: 'arraybuffer'
        })

        const file = new File([data], 'foto.png')
        
        const url = await uploadImage( file)

        expect(typeof url).toBe('string')

        //tomar el id
        const segment = url.split('/');
        const imageId = segment[segment.length - 1].replace('.png', '')
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done()
        })
    })
    
})
