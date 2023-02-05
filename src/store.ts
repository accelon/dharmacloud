import {writable } from 'svelte/store';
import {updateSettings,settings} from './savestore.ts'
export const panepos=writable(settings.panepos);
panepos.subscribe((panepos:number)=>updateSettings({panepos}));
