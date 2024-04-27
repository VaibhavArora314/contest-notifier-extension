import axios from "axios";
import * as cheerio from "cheerio";
import { CONTEST_INTERFACE, PLATFORM } from "../types";

const ATCODER_BASE_URL = "https://atcoder.jp"; // for generating contest url
const ATCODER_CONTESTS_PAGE = "https://atcoder.jp/contests/";

const parseTable = ($:cheerio.CheerioAPI,tbody:cheerio.Cheerio<cheerio.Element>) => {
    const contests: CONTEST_INTERFACE[] = [];

    tbody.find('tr').each((index, element) => {
        const trElement = $(element);

        const startTimeHref = trElement.find('td').eq(0).find('a').attr('href');
        const startTimeIso = startTimeHref ? startTimeHref.split('=')[1].split('&')[0] : '';
        const formattedStartTimeIso = `${startTimeIso.substring(0, 4)}-${startTimeIso.substring(4, 6)}-${startTimeIso.substring(6, 8)}T${startTimeIso.substring(9, 11)}:${startTimeIso.substring(11)}`;
        
        const contestLink = trElement.find('td').eq(1).find('a').attr('href');
        const contestName = trElement.find('td').eq(1).text().replace('Ⓐ', '').replace('◉', '').replace('Ⓗ', '').trim();
        const duration = trElement.find('td').eq(2).text().trim();
        
        const [hours, minutes] = duration.split(':');
        const durationMinutes = Number(hours) * 60 + Number(minutes);
        
        const startTimeJST = new Date(formattedStartTimeIso);
        const startTime = new Date(startTimeJST.getTime() - (3.5 * 60 * 60 * 1000)).getTime(); // JST is IST+3.5

        const endTime = startTime + durationMinutes * 60 * 1000;
        
        contests.push({
            site: PLATFORM.ATCODER,
            title: contestName,
            startTime,
            endTime,
            duration: durationMinutes,
            url: ATCODER_BASE_URL + (contestLink ? contestLink : "")
        });
    });

    return contests;
}

export const getAtcoderContests = async () => {
    try {
        let contests: CONTEST_INTERFACE[] = [];

        const { data: markup } = await axios.get(ATCODER_CONTESTS_PAGE);
        const $ = cheerio.load(markup);

        const tBodyActive = $('#contest-table-action').find('tbody');;
        contests = [...contests, ...parseTable($,tBodyActive)];

        const tbodyUpcoming = $('#contest-table-upcoming').find('tbody');
        contests = [...contests, ...parseTable($,tbodyUpcoming)];        

        console.log('Fetched data from atcoder!', contests.length);

        return contests;
    } catch (error) {
        console.error(`Error fetching contests: ${error}`);
        return [];
    }
};
