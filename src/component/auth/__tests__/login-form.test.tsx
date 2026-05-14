import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '../login-form'

// Mock the action client to avoid ESM import issues
jest.mock('../../../lib/safe-action-client', () => ({
  actionClient: {
    metadata: jest.fn(),
  },
}))

// Mock the controller to avoid deep imports
jest.mock('../../../controller/app/AuthController', () => ({
  Register: jest.fn(),
}))

// Mock next-safe-action
jest.mock('next-safe-action/hooks', () => ({
  useAction: jest.fn(),
}))

// Mock Next.js Link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
})

// Mock Input component
jest.mock('../../ui/form/Input', () => {
  const MockInput = function ({ label, name, type, required, errors }: { label?: string; name?: string; type?: string; required?: boolean; errors?: string[] }) {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input 
          id={name} 
          name={name} 
          type={type} 
          required={required}
          data-testid={name}
        />
        {errors && errors.map((error: string, index: number) => (
          <span key={index} className="error">{error}</span>
        ))}
      </div>
    )
  }
  MockInput.displayName = 'MockInput';
  return MockInput;
})

// Mock FormButton component
jest.mock('../../ui/btn/form-button', () => ({
  FormButton: ({ children, ...props }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{children}</button>,
}))

import { useAction } from 'next-safe-action/hooks'
jest.mock('next-safe-action/hooks')

describe('LoginForm', () => {
  const mockExecuteAsync = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAction as jest.Mock).mockReturnValue({
      executeAsync: mockExecuteAsync,
      hasErrored: false,
      result: {
        validationErrors: {},
      },
    })
  })

  it('should render login form with all fields', () => {
    render(<LoginForm />)

    expect(screen.getByText('Connexion à mon espace')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument()
  })

  it('should render forgot password link', () => {
    render(<LoginForm />)

    const forgotPasswordLink = screen.getByText('Mot de passe oublié ?')
    expect(forgotPasswordLink).toBeInTheDocument()
    expect(forgotPasswordLink.closest('a')).toHaveAttribute('href', '/forgot-password')
  })

  it('should call executeAsync with email and password on submit', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Mot de passe')
    const submitButton = screen.getByRole('button', { name: /Se connecter/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockExecuteAsync).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })

  it('should display validation errors for email', () => {
    (useAction as jest.Mock).mockReturnValue({
      executeAsync: mockExecuteAsync,
      hasErrored: false,
      result: {
        validationErrors: {
          email: ['Email invalide'],
        },
      },
    })

    render(<LoginForm />)

    expect(screen.getByText('Email invalide')).toBeInTheDocument()
  })

  it('should display validation errors for password', () => {
    (useAction as jest.Mock).mockReturnValue({
      executeAsync: mockExecuteAsync,
      hasErrored: false,
      result: {
        validationErrors: {
          password: ['Le mot de passe est requis'],
        },
      },
    })

    render(<LoginForm />)

    expect(screen.getByText('Le mot de passe est requis')).toBeInTheDocument()
  })

  it('should display server error when hasErrored is true', () => {
    (useAction as jest.Mock).mockReturnValue({
      executeAsync: mockExecuteAsync,
      hasErrored: true,
      result: {
        serverError: 'Identifiants incorrects',
        validationErrors: {},
      },
    })

    render(<LoginForm />)

    expect(screen.getByText('Identifiants incorrects')).toBeInTheDocument()
  })

  it('should not display server error when hasErrored is false', () => {
    (useAction as jest.Mock).mockReturnValue({
      executeAsync: mockExecuteAsync,
      hasErrored: false,
      result: {
        serverError: 'Some error',
        validationErrors: {},
      },
    })

    render(<LoginForm />)

    expect(screen.queryByText('Some error')).not.toBeInTheDocument()
  })

  it('should have required attributes on inputs', () => {
    render(<LoginForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Mot de passe')

    expect(emailInput).toHaveAttribute('required')
    expect(passwordInput).toHaveAttribute('required')
  })

  it('should have correct input types', () => {
    render(<LoginForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Mot de passe')

    expect(emailInput).toHaveAttribute('type', 'text')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should display helper text', () => {
    render(<LoginForm />)

    expect(
      screen.getByText("Entrez vos identifiants afin d'accéder à votre compte")
    ).toBeInTheDocument()
  })
})
