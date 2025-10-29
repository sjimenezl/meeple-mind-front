export type Game = {
    id: string;
    title: string;
    goal: string;
    rulesSummary: string;
    minPlayers: number;
    maxPlayers: number;
    playtime: number;
    setup?: {
        playerCount: number;
        components: { name: string; quantity: number }[];
    }[];
    setupInstructions?: { description: string }[];
    turnStructure?: { steps: string[] }[];
    scoringRules?: { description: string; points?: number; dynamic?: string }[];
    variants?: { title: string; description: string }[];
    winCondition?: string;
    drawCondition?: string;
    endCondition?: string;
};