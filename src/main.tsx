import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
// Create a new router instance
const router = createRouter({ routeTree })
// TypeScript module augmentation magic. Types all our routes.
declare module '@tanstack/react-router' {
 interface Register {
 router: typeof router
 }
}
// Render the app
ReactDOM.createRoot(document.getElementById('root')!)
.render(<RouterProvider router={router} />)