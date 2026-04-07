import { createClient } from "tinacms/dist/client";
import { queries } from "~/../tina/__generated__/types";
import React from "react";

export function useAdminTinaClient() {
    const apiURL =
        import.meta.env.VITE_TINA_CLIENT_ID
            ? `https://content.tinajs.io/content/${import.meta.env.VITE_TINA_CLIENT_ID}/github/master`
            : 'http://localhost:4001/graphql';
    const [accessToken, setAccessToken] = React.useState<string | null>(null);
    React.useEffect(() => {
        if (!("window" in globalThis)) {
            return;
        }
        const auth = globalThis.window.localStorage.getItem("tinacms-auth");
        if (!auth) {
            return;
        }
        const { access_token: accessToken_ } = JSON.parse(auth);
        if (!accessToken_) {
            return;
        }
        setAccessToken(accessToken_);
    }, []);
    const client = React.useMemo(() => accessToken ? createClient({ url: apiURL, queries, token: accessToken }) : null, [accessToken]);
    return client;
}