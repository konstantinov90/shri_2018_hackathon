function arrayToObj(arr) {
    const obj = {};
    console.log(arr)
    arr.reduce((o, el) => {
        o[el.name] = el.value;
        return o;
    }, obj);
    return obj;
}

const testData = [
    {name: 'b', value: 11},
    {name: 'a', value: 10},
    {name: 'c', value: 12},
    {name: 'd', value: 13},
    {name: 'e', value: 'val'},
    {name: 'g', value: '10'},
    {name: 'h', value: '1231'},
    {name: 'z', value: 'adaasd'},
    {name: 'zf', value: 'adaasd'},
    {name: 't', value: () => 'test'},
    {name: 'rasd', value: 10},
    {name: 'asd', value: 10},
    {name: 'asd', value: 10},
];

console.log(arrayToObj(testData));
