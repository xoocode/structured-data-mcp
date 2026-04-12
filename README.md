# xoocode-structured-data-mcp

MCP server for validating JSON-LD structured data via the [XooCode API](https://xoocode.com/api-docs).

Works with Claude, Cursor, Windsurf, and any [MCP](https://modelcontextprotocol.io)-compatible AI agent.

## What it does

Two tools for your AI agent:

- **validate_url**: Fetch a URL and validate all JSON-LD blocks found on the page
- **validate_raw**: Validate raw JSON-LD markup directly

Each tool returns per-block errors and warnings with fix suggestions, plus markdown instructions your agent can use to apply fixes.

## Installation

### Claude Code

```bash
claude mcp add xoocode-structured-data -- npx xoocode-structured-data-mcp
```

Then set your API key:

```bash
claude mcp update xoocode-structured-data --env XOOCODE_API_KEY=xoo_your_key_here
```

### Manual configuration

Add to your `.mcp.json` or MCP client config:

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

## Getting an API key

1. Sign up at [xoocode.com/signup](https://xoocode.com/signup)
2. Verify your email
3. Go to [Account > API Keys](https://xoocode.com/account/api-keys)
4. Create a key and copy it (shown once)

**Free tier**: 50 requests/month. **Pro** ($19.99/month): 500 requests/day.

## What gets validated

- URL formats (absolute URLs, correct protocol)
- ISO 8601 dates and durations
- ISO 4217 currency codes
- Schema.org enum values and casing
- Number types (string vs numeric)
- Position indexing (1-based for BreadcrumbList)
- Required and recommended fields per Google's rich result spec
- @type validity against the schema.org hierarchy

## Links

- [API Documentation](https://xoocode.com/api-docs)
- [Web Testing Tool](https://xoocode.com/structured-data-testing-tool)
- [Claude Code Skill](https://xoocode.com/structured-data-testing-tool/claude-code)
- [Automation Guide](https://xoocode.com/guides/automate-structured-data-validation)

## License

MIT
