import * as cheerio from 'cheerio'
import { futbin } from '../api';
import { LowPlayerInvestor, LowPlayerInvestorProps } from './invest-jobs';

export namespace investService {
  let lowPlayerInvestJob: LowPlayerInvestor

  export async function getTargets (query: futbin.PlayersQuery): Promise<number[]> {
    const defaultQuery = {
      page: 1,
      pc_price:'1000-2500',
      sort: 'likes',
      order: 'desc'
    }
    const html = await futbin.getPlayers({
      ...defaultQuery,
      ...query
    })

    const $ = cheerio.load(html)
    const players = $('#repTb tbody tr')
      .map((i, elm) => {
        const player = $(elm)
        const imgSource = player.find('td img.player_img').data('original')
        const assetId = /players\/([0-9]+)\.png/.exec(imgSource)[1]
        return parseInt(assetId, 10)
      })

    return players.get() as any
  }

  export function startLowPlayerInvvest (props: LowPlayerInvestorProps) {
    if (!lowPlayerInvestJob) lowPlayerInvestJob = new LowPlayerInvestor(props)

    return {
      timesTargetBought: lowPlayerInvestJob.execTime,
      report: lowPlayerInvestJob.report()
    }
  }
}
