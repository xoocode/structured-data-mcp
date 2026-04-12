import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
const API_BASE = "https://xoocode.com/api/v1";
function getApiKey() {
    return process.env.XOOCODE_API_KEY || null;
}
function formatUsage(usage) {
    if (usage.period === "unlimited")
        return "API usage: unlimited (admin)";
    return `API usage: ${usage.used} / ${usage.limit} requests this ${usage.period}.`;
}
async function callApi(endpoint, body) {
    const apiKey = getApiKey();
    if (!apiKey) {
        return {
            ok: false,
            data: {
                error: "XOOCODE_API_KEY environment variable is not set. " +
                    "Sign up at https://xoocode.com/signup and create a key at https://xoocode.com/account/api-keys",
                code: "MISSING_API_KEY",
            },
        };
    }
    const res = await fetch(`${API_BASE}/${endpoint}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": apiKey,
        },
        body: JSON.stringify(body),
    });
    const data = await res.json();
    return { ok: res.ok, data };
}
export function createServer() {
    const server = new McpServer({
        name: "xoocode-structured-data",
        version: "1.0.0",
    });
    server.tool("validate_url", "Validate JSON-LD structured data on a URL. Fetches the page, finds all JSON-LD blocks, and checks values against schema.org and Google requirements. Returns errors, warnings, and fix suggestions for each block.", { url: z.string().describe("The URL to fetch and validate") }, async ({ url }) => {
        const { ok, data } = await callApi("validate/url", { url });
        if (!ok) {
            const err = data;
            return {
                content: [{ type: "text", text: `Error: ${err.error} (${err.code})` }],
                isError: true,
            };
        }
        const result = data;
        return {
            content: [
                { type: "text", text: result.prompt },
                { type: "text", text: `\n\n---\n${formatUsage(result.usage)}` },
            ],
        };
    });
    server.tool("validate_raw", "Validate raw JSON-LD markup directly. Parses the input, finds all JSON-LD blocks, and checks values against schema.org and Google requirements. Returns errors, warnings, and fix suggestions.", { jsonld: z.string().describe("The raw JSON-LD markup to validate") }, async ({ jsonld }) => {
        const { ok, data } = await callApi("validate/raw", { jsonld });
        if (!ok) {
            const err = data;
            return {
                content: [{ type: "text", text: `Error: ${err.error} (${err.code})` }],
                isError: true,
            };
        }
        const result = data;
        return {
            content: [
                { type: "text", text: result.prompt },
                { type: "text", text: `\n\n---\n${formatUsage(result.usage)}` },
            ],
        };
    });
    return server;
}
