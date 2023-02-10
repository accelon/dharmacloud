import {writable } from 'svelte/store';
import {updateSettings,settings} from './savestore.ts'
export const panepos=writable(settings.panepos);
panepos.subscribe((panepos:number)=>updateSettings({panepos}));
export const renderUnits=writable([]);
export const pagestarts=writable([])
export const pagelayout=writable("a4");
export const page=writable(0);
export const bkname=writable('');
export const cmhandle=writable(null);
export const printpagenumber=writable(false);