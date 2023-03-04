export class Time {
    constructor(
        public date: string = "",
        public hour: string = ""
    ) {}

    public static getTime(): Time {
        let today = new Date();
        let day = today.getDate().toString();
        let month = today.getMonth().toString();
        let year = today.getFullYear();
        let hour = today.getHours().toString();
        let minute = today.getMinutes().toString();

        if (Number(day) < 10) day = '0' + day;
        if (Number(month) < 10) month = '0' + month;
        if (Number(hour) < 10) hour = '0' + hour;
        if (Number(minute) < 10) minute = '0' + minute;

        return new Time(`${day}/${month}/${year}`, `${hour}:${minute}`)
    }
}
