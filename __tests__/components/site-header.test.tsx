import { render, screen } from '@testing-library/react'
import { SiteHeader } from '@/components/site-header'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
  }
})

// Mock nested components to keep tests focused on SiteHeader
jest.mock('@/components/responsive-logo', () => ({
  ResponsiveLogo: () => <div data-testid="responsive-logo" />,
}))

jest.mock('@/components/mobile-menu', () => ({
  MobileMenu: () => <div data-testid="mobile-menu" />,
}))

jest.mock('@/components/main-navigation', () => ({
  MainNavigation: () => <nav data-testid="main-navigation" />,
}))

jest.mock('@/components/responsive-container', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
}))

describe('SiteHeader', () => {
  test('renders login and register links when user is not logged in', () => {
    render(<SiteHeader isLoggedIn={false} />)

    expect(screen.getByRole('link', { name: /connexion/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /s'inscrire/i })).toBeInTheDocument()
  })

  test('shows user avatar when user is logged in', () => {
    render(<SiteHeader isLoggedIn userName="Jane Doe" userInitials="JD" />)

    // AvatarFallback contains the initials
    expect(screen.getByText('JD')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /connexion/i })).not.toBeInTheDocument()
  })
})
