/**
 * Throughline Puzzle Data
 *
 * Each puzzle has:
 * - id: unique puzzle number
 * - week: ISO date string for the puzzle week
 * - groups: array of 3 groups, each with a theme and 4 audiobook titles
 *
 * Cover images use Audible's CDN (m.media-amazon.com).
 * difficulty: 0 = easiest group to spot, 2 = hardest
 */

const PUZZLES = [
    {
        id: 1,
        week: "2026-03-30",
        groups: [
            {
                theme: "Title Contains a Color",
                difficulty: 0,
                color: 0, // orange group
                titles: [
                    {
                        title: "The Color Purple",
                        author: "Alice Walker",
                        image: "https://m.media-amazon.com/images/I/518GWRP3jyL._SL500_.jpg",
                        asin: "B002V1NGA4"
                    },
                    {
                        title: "A Clockwork Orange",
                        author: "Anthony Burgess",
                        image: "https://m.media-amazon.com/images/I/41kfXjERBiL._SL500_.jpg",
                        asin: "B002V5BQJC"
                    },
                    {
                        title: "The Scarlet Letter",
                        author: "Nathaniel Hawthorne",
                        image: "https://m.media-amazon.com/images/I/51F2bFv+HqL._SL500_.jpg",
                        asin: "B002V0PVHY"
                    },
                    {
                        title: "The Goldfinch",
                        author: "Donna Tartt",
                        image: "https://m.media-amazon.com/images/I/51IjBs4-URL._SL500_.jpg",
                        asin: "B00FJ376TG"
                    }
                ]
            },
            {
                theme: "Number in the Title",
                difficulty: 1,
                color: 1, // blue group
                titles: [
                    {
                        title: "1984",
                        author: "George Orwell",
                        image: "https://m.media-amazon.com/images/I/51K84pomCRL._SL500_.jpg",
                        asin: "B003JTHWKU"
                    },
                    {
                        title: "Catch-22",
                        author: "Joseph Heller",
                        image: "https://m.media-amazon.com/images/I/51EoaOr3ULL._SL500_.jpg",
                        asin: "B0036GQMEK"
                    },
                    {
                        title: "Fahrenheit 451",
                        author: "Ray Bradbury",
                        image: "https://m.media-amazon.com/images/I/51lg5MQv+0L._SL500_.jpg",
                        asin: "B00M4MII42"
                    },
                    {
                        title: "Slaughterhouse-Five",
                        author: "Kurt Vonnegut",
                        image: "https://m.media-amazon.com/images/I/51bfi1VGJBL._SL500_.jpg",
                        asin: "B003IWZRBU"
                    }
                ]
            },
            {
                theme: "Written by Stephen King",
                difficulty: 2,
                color: 2, // purple group
                titles: [
                    {
                        title: "The Shining",
                        author: "Stephen King",
                        image: "https://m.media-amazon.com/images/I/51xFhJHjR7L._SL500_.jpg",
                        asin: "B00ARFNQ54"
                    },
                    {
                        title: "It",
                        author: "Stephen King",
                        image: "https://m.media-amazon.com/images/I/51pyHDjzLsL._SL500_.jpg",
                        asin: "B019WR3DRO"
                    },
                    {
                        title: "Pet Sematary",
                        author: "Stephen King",
                        image: "https://m.media-amazon.com/images/I/51aQOJjhCPL._SL500_.jpg",
                        asin: "B016L1C63Y"
                    },
                    {
                        title: "Misery",
                        author: "Stephen King",
                        image: "https://m.media-amazon.com/images/I/51DA6RLJWOL._SL500_.jpg",
                        asin: "B019S4FLGY"
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
                theme: "One-Word Title",
                difficulty: 0,
                color: 0,
                titles: [
                    {
                        title: "Educated",
                        author: "Tara Westover",
                        image: "https://m.media-amazon.com/images/I/41kIFKJfSuL._SL500_.jpg",
                        asin: "B075F68GFV"
                    },
                    {
                        title: "Becoming",
                        author: "Michelle Obama",
                        image: "https://m.media-amazon.com/images/I/414JfiBCutL._SL500_.jpg",
                        asin: "B07B3JQZCL"
                    },
                    {
                        title: "Dune",
                        author: "Frank Herbert",
                        image: "https://m.media-amazon.com/images/I/51ZNPweFqfL._SL500_.jpg",
                        asin: "B000R34YKC"
                    },
                    {
                        title: "Circe",
                        author: "Madeline Miller",
                        image: "https://m.media-amazon.com/images/I/51dEReiRCTL._SL500_.jpg",
                        asin: "B07B47NM7T"
                    }
                ]
            },
            {
                theme: "Narrated by the Author",
                difficulty: 1,
                color: 1,
                titles: [
                    {
                        title: "Born a Crime",
                        author: "Trevor Noah",
                        image: "https://m.media-amazon.com/images/I/51mVFdqJHBL._SL500_.jpg",
                        asin: "B01IW9TQPK"
                    },
                    {
                        title: "Year of Yes",
                        author: "Shonda Rhimes",
                        image: "https://m.media-amazon.com/images/I/41T+9yMn2GL._SL500_.jpg",
                        asin: "B016IOZHUC"
                    },
                    {
                        title: "Greenlights",
                        author: "Matthew McConaughey",
                        image: "https://m.media-amazon.com/images/I/41hJWfj3SQL._SL500_.jpg",
                        asin: "059340073X"
                    },
                    {
                        title: "Can't Hurt Me",
                        author: "David Goggins",
                        image: "https://m.media-amazon.com/images/I/41MqXkGNnNL._SL500_.jpg",
                        asin: "B07KKMNZCH"
                    }
                ]
            },
            {
                theme: "Title is a Question",
                difficulty: 2,
                color: 2,
                titles: [
                    {
                        title: "Why We Sleep",
                        author: "Matthew Walker",
                        image: "https://m.media-amazon.com/images/I/51PLhVBeAxL._SL500_.jpg",
                        asin: "B0752XRB5F"
                    },
                    {
                        title: "Who Moved My Cheese?",
                        author: "Spencer Johnson",
                        image: "https://m.media-amazon.com/images/I/51JWJ5Y8CHL._SL500_.jpg",
                        asin: "B002DHLBVI"
                    },
                    {
                        title: "What If?",
                        author: "Randall Munroe",
                        image: "https://m.media-amazon.com/images/I/41NaFY-MWIL._SL500_.jpg",
                        asin: "B00LV2F1ZA"
                    },
                    {
                        title: "Are We Smart Enough to Know How Smart Animals Are?",
                        author: "Frans de Waal",
                        image: "https://m.media-amazon.com/images/I/51Kt1s5f6tL._SL500_.jpg",
                        asin: "B01DFMCRZ0"
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
    // Find the puzzle whose week is closest to (but not after) today
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
                groupColor: group.color,
                difficulty: group.difficulty
            });
        });
    });
    return seededShuffle(tiles, puzzle.id * 12345 + 67890);
}
