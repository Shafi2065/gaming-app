import {QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import Provider from "./utils/Providers";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><Provider>{children}</Provider></body>
    </html>
  )
}