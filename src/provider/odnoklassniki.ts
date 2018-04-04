import { OAuthProvider, IOAuthOptions } from "../provider";
import { utils } from '../utility';

/*
 * Configuration options for using Odnoklassniki oauth
 * @deprecated
 */
export interface IOdnoklassnikiOptions extends IOAuthOptions {
    v?: string;
    display?: string;
    revoke?: string;
}

export class Odnoklassniki extends OAuthProvider {
    options: IOdnoklassnikiOptions;
    protected authUrl: string = 'https://connect.ok.ru/oauth/authorize';
    protected defaults: Object = {
        responseType: 'token',
        redirectUri: 'https://api.ok.ru/blank.html'
    };

    constructor(options: IOdnoklassnikiOptions = {}) {
        super(options);

        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error(`A ${this.name} app scope must exist`);
        }
    }

    protected optionsToDialogUrl(options: any): string {
        utils.defaults(options, this.defaults);
        let url = super.optionsToDialogUrl(options);

        if (options.display) {
            url += `&display=${options.display}`;
        }

        if (options.v) {
            url += `&v=${options.v}`;
        }

        if (options.revoke) {
            url += `&revoke=${options.revoke}`;
        }
        return url;
    }
}
