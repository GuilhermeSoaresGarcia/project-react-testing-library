import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('6. Teste o componente <Pokemon.js />', () => {
  test('6a - se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('6b - se contém um link de navegação para exibir detalhes deste pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const url = screen.getByRole('link', { name: 'More details' });
    userEvent.click(url);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('6c - teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/143');
    const favPokemon = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(favPokemon);
    const favStar = screen.getByRole('img', { name: /is marked as favorite/i });
    if (favPokemon) {
      expect(favStar).toHaveAttribute('src', '/star-icon.svg');
    }
  });
});
