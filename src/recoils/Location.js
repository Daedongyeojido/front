// recoil/atoms.js
import { atom } from 'recoil';

export const RouteDataState = atom({
    key: 'RouteDataState',
    default: {
        places: [],
        map_pins: [],
        startPoint: null,
        endPoint: null,
      },
});

