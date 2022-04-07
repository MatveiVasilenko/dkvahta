import React from 'react'
import Text from './cells/Text';
import Check from './cells/Check';
import Buttons from './cells/Buttons';
import Image from './cells/Image';

const GridSwitcher = ({
    type,
    idRow,
    value,
    width,
    name,
    net,
    styles,
    customStyles,
    gridHandlers,
    elem
}) => {
    const config = {
        idRow,
        value,
        name,
        styles,
        width,
        net,
        customStyles: customStyles || {},
        gridHandlers: gridHandlers || {},
        elem
    }

    switch(type) {
        case 'text':
            return (
                <Text {...config}/>
            );
        case 'buttons':
            return (
                <Buttons {...config}/>
            )
        case 'check':
            return (
                <Check {...config}/>
            );
        case 'image':
            return (
                <Image {...config}/>
            );
        default: return
    }
}
export default GridSwitcher