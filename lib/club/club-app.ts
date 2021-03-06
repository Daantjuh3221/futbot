import * as express from 'express';
import { fut } from '../api';
import { club } from './club-service';
import { playerService } from '../player';

export const clubApp = express();

clubApp.get('/players', async function(req, res) {
  const players: fut.ItemData[] = await fut.getClubPlayers(req.query.page);
  res.send(players);
});

clubApp.get('/players-to-sell', async function(req, res) {
  try {
    let players: any = await club.getPlayersToSell();
    players = players.map(p => playerService.readable(p))
    res.send(players)
  } catch (e) {
    res.status(500).send(e.message)
  }
})