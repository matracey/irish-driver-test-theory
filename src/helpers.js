export const shuffleArray = (a) => {
    let counter = a.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter -= 1;
        const temp = a[counter];
        a[counter] = a[index];
        a[index] = temp;
    }

    return a;
};
