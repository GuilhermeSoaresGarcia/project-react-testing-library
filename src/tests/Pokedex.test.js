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
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const nextPokeButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokeButton);
    expect(pikachu.textContent).toBe('Charmander');
    userEvent.click(nextPokeButton);
    expect(pikachu.textContent).toBe('Caterpie');
    userEvent.click(nextPokeButton);
    expect(pikachu.textContent).toBe('Ekans');
    userEvent.click(nextPokeButton);
    expect(pikachu.textContent).toBe('Alakazam');
    userEvent.click(nextPokeButton);
    expect(pikachu.textContent).toBe('Mew');
    userEvent.click(nextPokeButton);
    expect(pikachu.textContent).toBe('Rapidash');
    userEvent.click(nextPokeButton);
    expect(pikachu.textContent).toBe('Snorlax');
    userEvent.click(nextPokeButton);
    expect(pikachu.textContent).toBe('Dragonair');
    userEvent.click(nextPokeButton);
    expect(pikachu.textContent).toBe('Pikachu');
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
});
