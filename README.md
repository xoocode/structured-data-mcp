# xoocode-structured-data-mcp

MCP server that validates JSON-LD structured data on any URL. Your AI agent gets two tools: one to check a live page, one to check raw markup. Both return findings with fix suggestions.

Works with Claude, Cursor, Windsurf, or anything that speaks [MCP](https://modelcontextprotocol.io).

## Tools

`validate_url` fetches a URL, extracts all JSON-LD blocks, and checks every value against schema.org and Google's requirements. Returns errors, warnings, and a suggested fix for each finding.

`validate_raw` does the same thing but takes raw JSON-LD as input instead of fetching a page.

Both return markdown fix instructions your agent can act on.

## Install

### Claude Code

```bash
claude mcp add xoocode-structured-data -- npx xoocode-structured-data-mcp
```

Set your API key:

```bash
claude mcp update xoocode-structured-data --env XOOCODE_API_KEY=xoo_your_key_here
```

### Other MCP clients

Add to your `.mcp.json`:

```json
{
  "mcpServers": {
    "xoocode-structured-data": {
      "command": "npx",
      "args": ["xoocode-structured-data-mcp"],
      "env": {
        "XOOCODE_API_KEY": "xoo_your_key_here"
      }
    }
  }
}
```

## API key

You need a free XooCode account:

1. Sign up at [xoocode.com/signup](https://xoocode.com/signup)
2. Verify your email
3. Go to [Account > API Keys](https://xoocode.com/account/api-keys)
4. Create a key and copy it (shown once)

Free tier gives you 50 requests/month. Pro ($19.99/month) gives 500/day.

## What it checks

- Absolute URLs and correct protocol
- ISO 8601 dates and durations
- ISO 4217 currency codes
- Schema.org enum values and casing
- Number types (catches quoted numbers like `"29.99"`)
- BreadcrumbList position indexing (1-based, not 0-based)
- Required and recommended fields per Google's rich result spec
- @type validity against the full schema.org hierarchy

## More

- [API docs](https://xoocode.com/api-docs)
- [Web testing tool](https://xoocode.com/structured-data-testing-tool)
- [Claude Code skill](https://xoocode.com/structured-data-testing-tool/claude-code) (alternative to MCP, single file install)
- [Automation guide](https://xoocode.com/guides/automate-structured-data-validation) (CI/CD, monitoring)

## License

MIT
