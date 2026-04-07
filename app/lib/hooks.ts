import React from "react";
import { ExperimentalGetTinaClient } from "~/../tina/__generated__/types";

export function useAdminTinaClient() {
    const [client, setClient] = React.useState<ReturnType<typeof ExperimentalGetTinaClient> | null>(null);
    React.useEffect(() => {
        try {
            setClient(ExperimentalGetTinaClient());
        } catch (error) {
            console.log("Tina client was not initialized: ", error);
        }
    }, []);
    return client;
}