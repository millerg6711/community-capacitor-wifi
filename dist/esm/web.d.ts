import { WebPlugin } from '@capacitor/core';
import { WifiPlugin } from './definitions';
export declare class WifiWeb extends WebPlugin implements WifiPlugin {
    constructor();
    getIP(): Promise<{
        ip: string | null;
    }>;
    getSSID(): Promise<{
        ssid: string | null;
    }>;
    connect(options: {
        ssid: string;
        password?: string;
        authType?: string;
    }): Promise<{
        ssid: string | null;
    }>;
    connectPrefix(options: {
        ssid: string;
        password?: string;
        authType?: string;
    }): Promise<{
        ssid: string | null;
    }>;
    disconnect(): Promise<{
        ssid: string | null;
    }>;
}
declare const Wifi: WifiWeb;
export { Wifi };
