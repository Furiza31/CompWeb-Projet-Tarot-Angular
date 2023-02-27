export class Round {
    constructor(
        public id: number,
        public gameId: number,
        public roundNumber: number,
        public scores: number[]
    ) { }
}
