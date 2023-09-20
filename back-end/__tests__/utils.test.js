const {createRefSet, findIdByRef} = require("../utils");

describe('createRefSet', () => {
    it('should return an empty object when passed an empty array', () => {
        expect(createRefSet([], "customer")).toEqual({})
    });
    it('should return an empty object when passed no key', () => {
        expect(createRefSet([{key1: 1, key2: 2}])).toEqual({})
    });
    it('should return an object with the key matching the parameter key and the value matching the _id', () => {
        expect(createRefSet([{name: "unga", rock: "stone", _id: 1}], "rock")).toEqual({stone: 1})
    });
    it('should return an object with multiple keys matching the parameter key and the value matching the respective _id', () => {
        expect(createRefSet([{name: "unga", rock: "stone", _id: 1}, {name: "bunga", rock: "pebble", _id: 2}], "rock")).toEqual({stone: 1, pebble: 2})
    });
    it('should not mutate the original array', () => {
        const input1 = [{name: "unga", rock: "stone", _id: 1}, {name: "bunga", rock: "pebble", _id: 2}]
        const input2 = [{name: "unga", rock: "stone", _id: 1}, {name: "bunga", rock: "pebble", _id: 2}]
        createRefSet(input1, "rock")
        expect(input1).toEqual(input2)
    });
});

describe('findIdByRef', () => {
    it('should return an empty array when the input array is empty', () => {
        expect(findIdByRef({bob: 1, sam: 2, fred: 3}, {"friedChicken101": 1, "samburger": 2, "freedombeef": 3}, [])).toEqual([])
    });
    it('should return a new array', () => {
        const inp1 = []
        const output = findIdByRef({bob: 1, sam: 2, fred: 3}, {"friedChicken101": 1, "samburger": 2, "freedombeef": 3}, inp1)
        expect(output).not.toBe(inp1)
    });
    it('should return an array with a single object of newly formatted customer and business keys with the correct ids', () => {
        const inpArr = [{customer: "bob", business: "samburger"}]
        expect(findIdByRef({bob: 1, sam: 2, fred: 3}, {"friedChicken101": 1, "samburger": 2, "freedombeef": 3}, inpArr))
            .toEqual([{customer: 1, business: 2}])
    });
    it('should return an array with multiple objects with new formatted customer and business keys with the correct ids', () => {
        const inpArr = [{customer: "bob", business: "samburger"}, {customer: "fred", business: "freedombeef"}]
        expect(findIdByRef({bob: 1, sam: 2, fred: 3}, {"friedChicken101": 1, "samburger": 2, "freedombeef": 3}, inpArr))
            .toEqual([{customer: 1, business: 2}, {customer: 3, business: 3}])
    });
    it('should not mutate the original array', () => {
        const inp1 = [{customer: "bob", business: "samburger"}, {customer: "fred", business: "freedombeef"}]
        const inp2 = [{customer: "bob", business: "samburger"}, {customer: "fred", business: "freedombeef"}]
        findIdByRef({bob: 1, sam: 2, fred: 3}, {"friedChicken101": 1, "samburger": 2, "freedombeef": 3}, inp1)
        expect(inp1).toEqual(inp2)
    });
});
