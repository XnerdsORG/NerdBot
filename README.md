# Xnerds AI Chatbot

A modern, interactive AI chatbot interface for Xnerds, built with Next.js and powered by Anthropic's Claude AI.

## Features

- 🤖 AI-powered responses using Claude 3 Opus
- 💬 Real-time chat interface with typing indicators
- 🎨 Modern, responsive UI with dark theme
- 📱 Mobile-friendly design
- 🔄 Context-aware conversations
- 📝 Markdown support for messages

## Tech Stack

- **Framework**: Next.js 14
- **UI Components**: Shadcn UI
- **AI Integration**: Anthropic Claude 3 Opus
- **Styling**: Tailwind CSS
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/xnerdsbot.git
cd xnerdsbot
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Anthropic API key:
```env
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
xnerdsbot/
├── app/
│   ├── components/     # React components
│   ├── lib/           # Utility functions and AI integration
│   └── page.js        # Main application page
├── public/            # Static assets
└── styles/            # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Customization

### Modifying the Knowledge Base

The chatbot's knowledge base is defined in `app/lib/knowledge-base.js`. You can update this file to modify the information the chatbot has access to.

### Styling

The application uses Tailwind CSS for styling. You can modify the styles in:
- `app/globals.css` for global styles
- Component-specific styles in their respective files

## Example Questions

Here are some example questions you can ask the chatbot:

1. About the Company:
   - "What is Xnerds?"
   - "When was Xnerds founded?"
   - "What is Xnerds' mission?"

2. About Services:
   - "What services does Xnerds offer?"
   - "Tell me about Xnerds' AI Development services"
   - "What are the features of Xnerds' Software Development services?"

3. About Expertise:
   - "What are Xnerds' areas of expertise?"
   - "What technologies does Xnerds work with?"

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Anthropic](https://www.anthropic.com/) for the Claude AI API
- [Next.js](https://nextjs.org/) for the framework
- [Shadcn UI](https://ui.shadcn.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for styling
