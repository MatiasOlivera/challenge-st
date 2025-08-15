import './globals.css'

export const metadata = {
    title: 'React & Next.js Updates',
    description: 'React 18 and Next.js 15 features',
  }
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }
  