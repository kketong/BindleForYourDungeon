export function deserializeDice(inputString) {
    // Split the string into individual pairs
    const pairs = inputString.split('],[');
    
    // Map each pair to an object
    const result = pairs.map(pair => {
        // Remove brackets and split into two numbers
        const [str1, str2] = pair.replace(/\[|\]/g, '').split(',');

        const level = parseInt(str1);

        return {
            level: level,
            val: str2
        };
    });

    return result;
}

export default deserializeDice