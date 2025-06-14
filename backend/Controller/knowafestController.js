const axios = require('axios');
const cheerio = require('cheerio');

const KNOWAFEST_URL = 'https://www.knowafest.com/explore/category/Hackathon';

exports.scrapeKnowafestHackathons = async (req, res) => {
    try {
        const response = await axios.get(KNOWAFEST_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 10000 // 10 seconds timeout
        });

        const htmlContent = response.data;

        const $ = cheerio.load(htmlContent);
        const events = [];

        $('table#tablaDatos1 tr[itemscope][itemtype="http://schema.org/Event"]').each((index, element) => {
            const row = $(element);

            const eventName = row.find('td[itemprop="name"]').text().trim();
            const startDate = row.find('td[itemprop="startDate"]').text().trim();
            const collegeName = row.find('td span[itemprop="location"] span[itemprop="name"]').text().trim();
            const city = row.find('td span[itemprop="location"] span[itemprop="address"]').text().trim();

            let eventPageLink = '';
            const onClickAttribute = row.attr('onclick');

            if (onClickAttribute) {
                // Updated regex to be more tolerant of whitespace around quotes and parentheses
                const linkMatch = onClickAttribute.match(/window\.open\(\s*\'([^\']+)\'\s*\)/);
                if (linkMatch && linkMatch[1]) {
                    const relativeUrlFromOnClick = linkMatch[1];
                    try {
                        // Resolve the relative URL against the base URL of the scraped page
                        eventPageLink = new URL(relativeUrlFromOnClick, KNOWAFEST_URL).href;
                    } catch (e) {
                        console.error(`Error constructing URL for: ${relativeUrlFromOnClick} from ${KNOWAFEST_URL}. Error: ${e.message}`);
                        // Fallback logic if URL constructor fails (e.g., invalid relative URL format)
                        if (relativeUrlFromOnClick.startsWith('../')) {
                            // This fallback constructs a URL like https://www.knowafest.com/explore/events/...
                            eventPageLink = `${KNOWAFEST_URL.substring(0, KNOWAFEST_URL.lastIndexOf('/'))}/${relativeUrlFromOnClick.substring(3)}`;
                        } else if (relativeUrlFromOnClick.startsWith('/')) {
                            eventPageLink = `https://www.knowafest.com${relativeUrlFromOnClick}`;
                        } else if (!relativeUrlFromOnClick.match(/^https?:\/\//)) {
                            eventPageLink = `https://www.knowafest.com/${relativeUrlFromOnClick}`; // if it's like 'events/foo'
                        } else {
                            eventPageLink = relativeUrlFromOnClick; // Assume it might be an absolute URL already
                        }
                    }
                }
            }

            if (eventName && startDate && collegeName && city) {
                events.push({
                    name: eventName,
                    startDate: startDate,
                    collegeName: collegeName,
                    city: city,
                    eventPageLink: eventPageLink,
                    source: 'Knowafest'
                });
            }
        });

        res.json({
            success: true,
            message: 'Successfully scraped Knowafest hackathons.',
            count: events.length,
            data: events
        });

    } catch (error) {
        console.error('Error scraping Knowafest:', error);
        // Check if the error is from axios (e.g., network error, timeout)
        if (error.isAxiosError) {
            return res.status(500).json({
                success: false,
                message: `Failed to fetch data from Knowafest: ${error.message}`,
                error: error.code // E.g., 'ETIMEDOUT', 'ENOTFOUND'
            });
        } else if (error.name === 'CheerioError') { // Example if Cheerio had specific errors
            return res.status(500).json({
                success: false,
                message: `Failed to parse HTML content: ${error.message}`,
                error: error.name
            });
        }
        // Generic error for other issues
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred during scraping.',
            error: error.message
        });
    }
};
