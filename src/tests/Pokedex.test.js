import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('5. Teste o componente <Pokedex.js />', () => {
  test('5a - contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const pokedexHeader = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(pokedexHeader).toBeInTheDocument();
  });

  test('5b - exibido o próximo pokémon quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const pokemonsByName = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const nextPokeButton = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemonsByName.forEach((pokemon) => {
      userEvent.click(nextPokeButton);
      expect(pikachu.textContent).toBe(pokemon);
    });
  });

  test('5c - se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const imgPokemon = screen.getAllByRole('img');
    expect(imgPokemon).toHaveLength(1);
  });

  test('5d - se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const elements = [
      'All',
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const countAllButtons = screen.getAllByTestId('pokemon-type-button');
    const condition = 7;
    elements.forEach((element) => {
      const buttons = screen.getByRole('button', { name: element });
      expect(buttons).toBeInTheDocument();
    });
    expect(countAllButtons).toHaveLength(condition);
  });

  test('5e - se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
