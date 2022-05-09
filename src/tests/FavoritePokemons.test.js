import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Favorites from '../components/FavoritePokemons';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  test('3a - No favorite pokemon found, caso não tenha pokémons favoritos', () => {
    renderWithRouter(<Favorites />);
    const noFavPokemon = screen.getByText(/No favorite pokemon found/i);

    expect(noFavPokemon).toBeInTheDocument();
  });

  test('3b - se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });

    userEvent.click(linkMoreDetails);

    const pikaCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(pikaCheckbox);

    history.push('/favorites');

    const pika = screen.getByText(/pikachu/i);

    expect(pika).toBeInTheDocument();
  });
});
