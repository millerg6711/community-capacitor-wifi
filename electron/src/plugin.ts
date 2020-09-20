import { WebPlugin } from '@capacitor/core';
import { WifiPlugin } from './definitions';
const { remote } = require('electron');
export class WifiWebElectron extends WebPlugin implements WifiPlugin {
    Path: any = null;
    NodeFs: any = null;
    RemoteRef: any = null;
    Os: any = null;
    Wifi: any = null;

    constructor() {
        super({
            name: 'Wifi',
            platforms: ['electron'],
        });
        console.log('Wifi');
        this.RemoteRef = remote;
        this.Path = require('path');
        this.NodeFs = require('fs');
        this.Os = require('os');
        this.Wifi = require('node-wifi');
        this.Wifi.init({
            iface: null, // network interface, choose a random wifi interface if set to null
        })

    }

    async getIP(): Promise<{ ip: string }> {
        var ifs = this.Os.networkInterfaces();
        console.log(ifs)
        var ip = Object.keys(ifs)
            .map(x => ifs[x].filter((x: any) => x.family === 'IPv4' && !x.internal)[0])
            .filter(x => x)[0].address;
        return { ip };
    }

    async getSSID(): Promise<{ssid: string | null}> {
        
        const currentConnections: {
            ssid: string,
            bssid: string,
            mac: string, // equals to bssid (for retrocompatibility)
            channel: number,
            frequency: number, // in MHz
            signal_level: number, // in dB
            quality: number, // same as signal level but in %
            security: string, // format depending on locale for open networks in Windows
            security_flags: string // encryption protocols (format currently depending of the OS)
            mode: string // network mode like Infra (format currently depending of the OS)
          }[] = await this.Wifi.getCurrentConnections();
        if (currentConnections && currentConnections[0]) {
            return { ssid: currentConnections[0].ssid };
        }
    }

}
const Wifi = new WifiWebElectron();
export { Wifi };
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(Wifi);
