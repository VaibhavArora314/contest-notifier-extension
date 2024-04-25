import axios from "axios";
import * as cheerio from "cheerio";
import { CONTEST_INTERFACE, PLATFORM } from "../types";

const ATCODER_BASE_URL = "https://atcoder.jp"; // for generating contest url
const ATCODER_CONTESTS_PAGE = "https://atcoder.jp/contests/";

export const getAtcoderContests = async () => {
    try {
        const contests: CONTEST_INTERFACE[] = [];

        const { data: markup } = await axios.get(ATCODER_CONTESTS_PAGE);
        const $ = cheerio.load(markup);

        const tbody = $('#contest-table-upcoming').find('tbody');

        // Iterate over each tr element
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
            
            const startTime = new Date(formattedStartTimeIso).getTime();
            const endTime = new Date(formattedStartTimeIso).getTime() + durationMinutes * 60 * 1000;
            
            contests.push({
                site: PLATFORM.ATCODER,
                startTime,
                title: contestName,
                duration: durationMinutes,
                endTime,
                url: ATCODER_BASE_URL + (contestLink ? contestLink : "")
            });
        });

        console.log('Fetched data from atcoder!', contests.length);

        return contests;
    } catch (error) {
        console.error(`Error fetching contests: ${error}`);
        return [];
    }
};
