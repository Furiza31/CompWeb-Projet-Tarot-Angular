import { Player } from "./player";

export class Game {
    constructor(
        public id: number = 0,
        public desc: string = "",
        public players: Player[] = [],
        public scores: number[] = []
    ) {}
}
