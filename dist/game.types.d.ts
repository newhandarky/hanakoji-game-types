export type PlayerId = 'player1' | 'player2';
export interface Geisha {
    id: number;
    name: string;
    charmPoints: number;
    controlledBy: PlayerId | null;
}
export interface ItemCard {
    id: string;
    geishaId: number;
    type: string;
}
export type ActionType = 'secret' | 'trade-off' | 'gift' | 'competition';
export type GamePhase = 'waiting' | 'deciding_order' | 'playing' | 'scoring' | 'ended';
export interface ActionToken {
    type: ActionType;
    used: boolean;
}
export interface Player {
    id: string;
    name: string;
    hand: ItemCard[];
    playedCards: ItemCard[];
    secretCards: ItemCard[];
    discardedCards: ItemCard[];
    actionTokens: ActionToken[];
}
export interface OrderDecision {
    isOpen: boolean;
    phase: 'deciding' | 'result' | 'waiting_confirmation';
    players: string[];
    result?: {
        firstPlayer: string;
        secondPlayer: string;
        order: string[];
    };
    confirmations: string[];
    waitingFor: string[];
    currentPlayer: string;
    onConfirm: () => void;
}
export interface GameState {
    gameId: string;
    players: Player[];
    geishas: Geisha[];
    currentPlayer: number;
    phase: GamePhase;
    round: number;
    winner?: string;
    orderDecision: OrderDecision;
}
export type GameAction = {
    type: 'INIT_GAME';
    payload: {
        gameId: string;
        players: Player[];
    };
} | {
    type: 'DRAW_CARD';
    payload: {
        playerId: string;
        card: ItemCard;
    };
} | {
    type: 'PLAY_ACTION';
    payload: {
        playerId: string;
        action: ActionToken;
        cards: ItemCard[];
    };
} | {
    type: 'SCORE_ROUND';
    payload: {
        scores: {
            playerId: string;
            points: number;
        }[];
    };
} | {
    type: 'END_TURN';
} | {
    type: 'END_GAME';
    payload: {
        winner: string;
    };
} | {
    type: 'START_ORDER_DECISION';
    payload: {
        players: string[];
    };
} | {
    type: 'ORDER_DECISION_RESULT';
    payload: {
        firstPlayer: string;
        secondPlayer: string;
        order: string[];
    };
} | {
    type: 'UPDATE_ORDER_CONFIRMATIONS';
    payload: {
        confirmations: string[];
        waitingFor: string[];
    };
};
export interface RoomInfo {
    roomId: string;
    players: string[];
    maxPlayers: number;
    gameState: 'waiting' | 'playing' | 'ended';
}
