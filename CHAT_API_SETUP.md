# Environment Setup for Chat API

## Required Environment Variables

To fix the Chat API error, you need to create a `.env.local` file in the root directory with the following variables:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_URL=https://api.openai.com/v1

# Optional: Specify the model to use (defaults to gpt-4o-mini)
# OPENAI_MODEL=gpt-4o-mini
```

## How to Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in or create an account
3. Navigate to the API section
4. Create a new API key
5. Copy the key and replace `your_openai_api_key_here` in the `.env.local` file

## Alternative OpenAI-Compatible Services

If you're using a different OpenAI-compatible service (like Azure OpenAI, Anthropic Claude, or a local model), update the `OPENAI_URL` accordingly:

- **Azure OpenAI**: `https://your-resource.openai.azure.com/openai/deployments/your-deployment-name`
- **Anthropic Claude**: `https://api.anthropic.com/v1` (requires different client setup)
- **Local model**: `http://localhost:11434/v1` (for Ollama)

## After Setting Up

1. Restart your development server (`npm run dev` or `yarn dev`)
2. The chat functionality should now work properly
3. Check the browser console for more detailed error messages if issues persist

## Troubleshooting

- Make sure the `.env.local` file is in the root directory (same level as `package.json`)
- Ensure there are no spaces around the `=` sign in the environment variables
- Restart your development server after making changes to environment variables
- Check the browser console for detailed error messages
