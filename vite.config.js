import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';


let config = {
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),

    ]
};

if(process?.env?.DDEV_PRIMARY_URL){

    config.server = {
        // respond to all network requests (same as '0.0.0.0')
        host: '0.0.0.0',
        // we need a strict port to match on PHP side
        strictPort: true,
        port: 5173,
        https: false,
        hmr: {
            // TODO: Is this the best way to achieve that? 🤔
            // Force the Vite client to connect via SSL
            // This will also force a "https://" URL in the public/hot file
            protocol: 'wss',
            // The host where the Vite dev server can be accessed
            // This will also force this host to be written to the public/hot file
            host: `${process.env.DDEV_HOSTNAME}`,
            clientPort: 5173,
        }
    };
}

export default defineConfig(config);
