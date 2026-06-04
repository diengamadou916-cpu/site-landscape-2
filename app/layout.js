import './globals.css'

export const metadata = {
  title: 'Cypress & Stone Landscape Co. — Premium landscaping in Tampa Bay',
  description:
    'Award-winning landscape design, hardscaping, and grounds care for Tampa Bay\'s finest homes and properties. Licensed, insured, and built on craftsmanship. Get a free quote.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
