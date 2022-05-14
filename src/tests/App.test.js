import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  test('1a - links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoritesLink = screen.getByRole('link', { name: /favorite pok/i });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  test('1b - URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('1c - URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('1d - URL /favorites, ao clicar no link da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /favorite pok/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('1e - página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/wtfrudoinhere');
    const pageTitle = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(pageTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe('/wtfrudoinhere');
  });
});
