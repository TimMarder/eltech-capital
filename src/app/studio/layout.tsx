export const metadata = {
  title: 'ELTECH Capital Studio',
  description: 'Sanity Studio for ELTECH Capital',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ height: '100vh' }}>
      {children}
    </div>
  )
}
