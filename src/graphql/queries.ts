import { gql } from "@urql/core";

export const GAMES = gql`
    query Games {
        games {
            id
            title
            minPlayers
            maxPlayers
            playtime
        }
    }
`;


export const GAME_BY_ID = gql`
    query($id: String!) {
        findById(id: $id) {
            id
            title
            goal
            minPlayers
            maxPlayers
            playtime
            rulesSummary
            setup {
                playerCount
                components {
                    name
                    quantity
                }
            }
        }
    }
`;