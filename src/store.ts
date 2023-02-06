import {writable } from 'svelte/store';
import {updateSettings,settings} from './savestore.ts'
export const panepos=writable(settings.panepos);
panepos.subscribe((panepos:number)=>updateSettings({panepos}));
export const renderUnits=writable([]);
export const pagestarts=writable([])
export const pagesetting=writable({layout:"a4",unit_h:10,unit_v:19,font:'36px DFKai-SB'});
export const page=writable(0);