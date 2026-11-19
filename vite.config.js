import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Local dev middleware so the chatbot works seamlessly on http://localhost:5173
function localChatDevMiddleware() {
  return {
    name: 'local-chat-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/.netlify/functions/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method Not Allowed' }))
          return
        }

        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', async () => {
          try {
            const chatModule = await import('./netlify/functions/chat.js')
            const mockReq = new Request('http://localhost/.netlify/functions/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: body || '{}',
            })
            const funcRes = await chatModule.default(mockReq)
            const data = await funcRes.json()
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = funcRes.status
            res.end(JSON.stringify(data))
          } catch (err) {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 500
            res.end(JSON.stringify({ error: err?.message || 'Server Error' }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localChatDevMiddleware(),
  ],
})
