/**
 * Throughline Puzzle Data
 *
 * Each puzzle has:
 * - id: unique puzzle number
 * - week: ISO date string for the puzzle week
 * - groups: array of 3 groups, each with a theme, description, and 4 audiobook titles
 *
 * Cover images use Audible's CDN (m.media-amazon.com).
 * difficulty: 0 = easy, 1 = medium, 2 = hard
 */

const PUZZLES = [
    {
        id: 1,
        week: "2026-03-30",
        groups: [
            {
                theme: "In Their Own Voices",
                description: "The author reads the text",
                difficulty: 0,
                color: 0,
                titles: [
                    {
                        title: "Born a Crime",
                        author: "Trevor Noah",
                        image: "https://m.media-amazon.com/images/I/51Mc--F6zGL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Born-a-Crime-Audiobook/B01IW9TQPK"
                    },
                    {
                        title: "Becoming",
                        author: "Michelle Obama",
                        image: "https://m.media-amazon.com/images/I/414JfiBCutL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Becoming-Audiobook/B07B3BCZ9S"
                    },
                    {
                        title: "Greenlights",
                        author: "Matthew McConaughey",
                        image: "https://m.media-amazon.com/images/I/51m+AA2gNaL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Greenlights-Audiobook/0593294181"
                    },
                    {
                        title: "I Am Malala",
                        author: "Malala Yousafzai",
                        image: "https://m.media-amazon.com/images/I/51qGvwaPcsL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/I-Am-Malala-Audiobook/B00F9F8K8K"
                    }
                ]
            },
            {
                theme: "The Ending Rewrites Everything",
                description: "Endings that make you revisit the entire story",
                difficulty: 1,
                color: 1,
                titles: [
                    {
                        title: "The Girl on the Train",
                        author: "Paula Hawkins",
                        image: "https://m.media-amazon.com/images/I/51sKhh+VEML._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-Girl-on-the-Train-Audiobook/B00QXW5GYY"
                    },
                    {
                        title: "The Silent Patient",
                        author: "Alex Michaelides",
                        image: "https://m.media-amazon.com/images/I/515SxVllQJS._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-Silent-Patient-Audiobook/1250317533"
                    },
                    {
                        title: "Shutter Island",
                        author: "Dennis Lehane",
                        image: "https://m.media-amazon.com/images/I/41qtcYIf9VL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Shutter-Island-Audiobook/B002V08GGC"
                    },
                    {
                        title: "Behind Her Eyes",
                        author: "Sarah Pinborough",
                        image: "https://m.media-amazon.com/images/I/61WPXVLvJ7L._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Behind-Her-Eyes-Audiobook/B01N0BGPO9"
                    }
                ]
            },
            {
                theme: "Spiritual Quest in Disguise",
                description: "Each title is about leaving ordinary life to find something they can\u2019t name yet",
                difficulty: 2,
                color: 2,
                titles: [
                    {
                        title: "The Alchemist",
                        author: "Paulo Coelho",
                        image: "https://m.media-amazon.com/images/I/517pfctTa9L._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-Alchemist-Audiobook/B002V0Q4LG"
                    },
                    {
                        title: "Siddhartha",
                        author: "Hermann Hesse",
                        image: "https://m.media-amazon.com/images/I/51E1HxbZhqL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Siddhartha-Audiobook/B002UZYX4C"
                    },
                    {
                        title: "Eat Pray Love",
                        author: "Elizabeth Gilbert",
                        image: "https://m.media-amazon.com/images/I/41IvOuuNGlL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Eat-Pray-Love-Audiobook/B0036GIMS2"
                    },
                    {
                        title: "The Celestine Prophecy",
                        author: "James Redfield",
                        image: "https://m.media-amazon.com/images/I/416kmgTpD3L._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-Celestine-Prophecy-Audiobook/1549148427"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        week: "2026-04-06",
        groups: [
            {
                theme: "Number in the Title",
                description: "Each title contains a numeral — look past the words",
                difficulty: 0,
                color: 0,
                titles: [
                    {
                        title: "The 5 Second Rule",
                        author: "Mel Robbins",
                        image: "https://m.media-amazon.com/images/I/51dc79x8jsL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-5-Second-Rule-Audiobook/B06VX22V89"
                    },
                    {
                        title: "The 48 Laws of Power",
                        author: "Robert Greene",
                        image: "https://m.media-amazon.com/images/I/41PfHefFq1L._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-48-Laws-of-Power-Audiobook/B00WYDJ2YQ"
                    },
                    {
                        title: "The 7 Habits of Highly Effective People",
                        author: "Stephen R. Covey",
                        image: "https://m.media-amazon.com/images/I/51OuvCFwyZL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-7-Habits-of-Highly-Effective-People-Audiobook/B002V5HAL4"
                    },
                    {
                        title: "The 5AM Club",
                        author: "Robin Sharma",
                        image: "https://m.media-amazon.com/images/I/519azHGsnGL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-5-AM-Club-Audiobook/B07KRKJ8W8"
                    }
                ]
            },
            {
                theme: "Money or Wealth in the Title",
                description: "Each title literally contains a money-related word",
                difficulty: 1,
                color: 1,
                titles: [
                    {
                        title: "Rich Dad Poor Dad",
                        author: "Robert T. Kiyosaki",
                        image: "https://m.media-amazon.com/images/I/51NuMV9SJ8L._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Rich-Dad-Poor-Dad-Audiobook/B008BT3C1Q"
                    },
                    {
                        title: "The Psychology of Money",
                        author: "Morgan Housel",
                        image: "https://m.media-amazon.com/images/I/51JbmSSWlUL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-Psychology-of-Money-Audiobook/B08D9TXF3H"
                    },
                    {
                        title: "Think and Grow Rich",
                        author: "Napoleon Hill",
                        image: "https://m.media-amazon.com/images/I/61atv8Q26iL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Think-and-Grow-Rich-Audiobook/B002V5D950"
                    },
                    {
                        title: "The Millionaire Next Door",
                        author: "Thomas J. Stanley",
                        image: "https://m.media-amazon.com/images/I/61vmuiXAbWL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-Millionaire-Next-Door-Audiobook/B002UZKJSG"
                    }
                ]
            },
            {
                theme: "Title Contains 'You' or 'Yourself'",
                description: "The word 'you' hides in each title — even when the genre differs",
                difficulty: 2,
                color: 2,
                titles: [
                    {
                        title: "The Mountain Is You",
                        author: "Brianna Wiest",
                        image: "https://m.media-amazon.com/images/I/41jiySKmibL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-Mountain-Is-You-Audiobook/B09WY6Z8KD"
                    },
                    {
                        title: "Unfuck Yourself",
                        author: "Gary John Bishop",
                        image: "https://m.media-amazon.com/images/I/51l9kZheEAL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Unfu-k-Yourself-Audiobook/B0731R4RFX"
                    },
                    {
                        title: "Breaking the Habit of Being Yourself",
                        author: "Dr. Joe Dispenza",
                        image: "https://m.media-amazon.com/images/I/51RRcIBg93L._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Breaking-the-Habit-of-Being-Yourself-Audiobook/B0868ZFF7X"
                    },
                    {
                        title: "I Will Teach You to Be Rich",
                        author: "Ramit Sethi",
                        image: "https://m.media-amazon.com/images/I/51R5o-WAyjL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/I-Will-Teach-You-to-Be-Rich-Audiobook/B07QSC29JT"
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        week: "2026-04-13",
        groups: [
            {
                theme: "Ancient Wisdom & Philosophy",
                description: "Timeless teachings that predate the self-help aisle",
                difficulty: 0,
                color: 0,
                titles: [
                    {
                        title: "Meditations",
                        author: "Marcus Aurelius",
                        image: "https://m.media-amazon.com/images/I/51E2LCvj1ZL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Meditations-Audiobook/B004IBRMZS"
                    },
                    {
                        title: "The Daily Stoic",
                        author: "Ryan Holiday",
                        image: "https://m.media-amazon.com/images/I/514WgltUohL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-Daily-Stoic-Audiobook/B01M4IDLAG"
                    },
                    {
                        title: "The Four Agreements",
                        author: "Don Miguel Ruiz",
                        image: "https://m.media-amazon.com/images/I/61bzSxyLLlL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-Four-Agreements-Audiobook/B002VA3GJO"
                    },
                    {
                        title: "The Power of Now",
                        author: "Eckhart Tolle",
                        image: "https://m.media-amazon.com/images/I/51wk62SpJaL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-Power-of-Now-Audiobook/B002V0PN36"
                    }
                ]
            },
            {
                theme: "About the Natural World",
                description: "Each book listens to what the earth has been saying all along",
                difficulty: 1,
                color: 1,
                titles: [
                    {
                        title: "The Hidden Life of Trees",
                        author: "Peter Wohlleben",
                        image: "https://m.media-amazon.com/images/I/51iXOhWU5JL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/The-Hidden-Life-of-Trees-Audiobook/B01LW9E5GY"
                    },
                    {
                        title: "Braiding Sweetgrass",
                        author: "Robin Wall Kimmerer",
                        image: "https://m.media-amazon.com/images/I/61nD2KiCA5L._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Braiding-Sweetgrass-Audiobook/B01H478VR0"
                    },
                    {
                        title: "Entangled Life",
                        author: "Merlin Sheldrake",
                        image: "https://m.media-amazon.com/images/I/61cn02mMKOL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Entangled-Life-Audiobook/059320980X"
                    },
                    {
                        title: "American Buffalo",
                        author: "Steven Rinella",
                        image: "https://m.media-amazon.com/images/I/51RU-740bwL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/American-Buffalo-Audiobook/0593150953"
                    }
                ]
            },
            {
                theme: "Title References Death or Harm",
                description: "A dark word hides in plain sight in each title",
                difficulty: 2,
                color: 2,
                titles: [
                    {
                        title: "I'm Glad My Mom Died",
                        author: "Jennette McCurdy",
                        image: "https://m.media-amazon.com/images/I/41clGmWQP6L._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Im-Glad-My-Mom-Died-Audiobook/B09VHWHJS2"
                    },
                    {
                        title: "Can't Hurt Me",
                        author: "David Goggins",
                        image: "https://m.media-amazon.com/images/I/51c4H3VBciL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Cant-Hurt-Me-Audiobook/B07KKMNZCH"
                    },
                    {
                        title: "Die with Zero",
                        author: "Bill Perkins",
                        image: "https://m.media-amazon.com/images/I/513+dJrbw6L._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Die-with-Zero-Audiobook/0358310369"
                    },
                    {
                        title: "Slaughterhouse-Five",
                        author: "Kurt Vonnegut",
                        image: "https://m.media-amazon.com/images/I/51AyV7rsScL._SL500_.jpg",
                        audibleUrl: "https://www.audible.com/pd/Slaughterhouse-Five-Audiobook/B015ELUYL4"
                    }
                ]
            }
        ]
    }
];

/**
 * Get the current puzzle based on the week, or puzzle #1 as default.
 */
function getCurrentPuzzle() {
    const now = new Date();
    let currentPuzzle = PUZZLES[0];
    for (const puzzle of PUZZLES) {
        const puzzleDate = new Date(puzzle.week);
        if (puzzleDate <= now) {
            currentPuzzle = puzzle;
        }
    }
    return currentPuzzle;
}

/**
 * Shuffle an array using Fisher-Yates with a seeded random for consistency.
 * Seed is based on puzzle ID so the same puzzle always shuffles the same way.
 */
function seededShuffle(array, seed) {
    const arr = [...array];
    let s = seed;
    function random() {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
    }
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Build a flat list of all tiles for a puzzle, shuffled.
 */
function getPuzzleTiles(puzzle) {
    const tiles = [];
    puzzle.groups.forEach((group, groupIndex) => {
        group.titles.forEach(title => {
            tiles.push({
                ...title,
                groupIndex,
                theme: group.theme,
                description: group.description,
                groupColor: group.color,
                difficulty: group.difficulty
            });
        });
    });
    const shuffled = seededShuffle(tiles, puzzle.id * 12345 + 67890);
    // Assign stable indices after shuffle
    shuffled.forEach((tile, i) => { tile.idx = i; });
    return shuffled;
}
