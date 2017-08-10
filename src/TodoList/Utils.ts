export function uuid(): string {
    /*jshint bitwise:false */
    let result = '';

    for (let i = 0; i < 32; i++) {
        // tslint:disable-next-line
        const random = Math.random() * 16 | 0;

        if (i === 8 || i === 12 || i === 16 || i === 20) {
            result += '-';
        }

        // tslint:disable-next-line
        result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16);
    }

    return result;
}