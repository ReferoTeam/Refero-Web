import { graphConfig } from "./authconfig";

/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user
 */
export async function callMsGraph(accessToken: any) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
      method: "GET",
      headers: headers
    };
    const graphData = await fetch(graphConfig.graphMeEndpoint, options);
    let data = graphData.json();
    return data;
}