import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pikachuURL = '/pokemons/25';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  test('7a - se as infos detalhadas do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    const summaryTitle = screen
      .getByRole('heading', { level: 2, name: /summary/i });
    const pikachuDetailsTitle = screen
      .getByRole('heading', { level: 2, name: /pikachu details/i });
    const pikachuDescription = screen
      .getByText(/This intelligent Pokémon roasts hard berries with electricity to mak/i);
    expect(summaryTitle).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();
    expect(pikachuDetailsTitle).toBeInTheDocument();
    expect(pikachuDescription).toBeInTheDocument();
  });
  test('7b - se existe na página uma seção com os mapas contendo as localizações', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuURL);
    const pikachuLocations = screen
      .getByRole('heading', { level: 2, name: /Game Locations of Pikachu/i });
    const pikachuLocationsNames = screen.getAllByText(/Kanto/i);
    const pikachuMaps = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(pikachuLocations).toBeInTheDocument();
    expect(pikachuLocationsNames).toHaveLength(2);
    expect(pikachuMaps).toHaveLength(2);
    expect(pikachuMaps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuMaps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('7c - se o usuário pode favoritar um pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuURL);
    const pikaCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    userEvent.click(pikaCheckbox);
    history.push('/favorites');
    const pika = screen.getByText(/pikachu/i);
    expect(pika).toBeInTheDocument();
    history.push(pikachuURL);
    userEvent.click(pikaCheckbox);
    history.push('/favorites');
    expect(pika).not.toBeInTheDocument();
  });
});
