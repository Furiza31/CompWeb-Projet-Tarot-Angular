import { Player } from "./player";
import { Time } from "./time";

export class Game {
    constructor(
        public id: number = 0,
        public time: Time = new Time(),
        public players: Player[] = []
    ) {}
}
