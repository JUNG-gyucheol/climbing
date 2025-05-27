'use client'

import { VFXProvider } from 'react-vfx'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VFXProvider>
      <div className="flex justify-center">{children}</div>
    </VFXProvider>
  )
}

export default Layout
