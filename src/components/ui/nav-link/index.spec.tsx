import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { NavLink } from '.'

describe('NavLink', () => {
  it('should highlight the nav link when is the current page link', () => {
    const { getByText } = render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
          )
        },
      },
    )

    expect(getByText('Home').dataset.current).toEqual('false')
    expect(getByText('About').dataset.current).toEqual('true')
  })
})
