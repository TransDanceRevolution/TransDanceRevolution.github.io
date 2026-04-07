import React from "react";
import { ExperimentalGetTinaClient } from "~/../tina/__generated__/types";

export function useAdminTinaClient() {
    const [client] = React.useState(() => ExperimentalGetTinaClient());
    return client;
}