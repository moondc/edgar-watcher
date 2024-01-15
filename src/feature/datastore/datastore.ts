const datastoreGenerator = (ticker: string): Store => function () {
    let storedVal: any = null;
    let name: string = ticker;

    function store(val: any): void {
        storedVal = val;
    }

    function compare(newObj: any): boolean {
        if (!newObj || !storedVal) return true
        return JSON.stringify(newObj) === JSON.stringify(storedVal);
    }

    function getName(): string {
        return name
    }

    return {
        store,
        compare,
        getName
    };
}();

export interface Store {
    store: Function,
    compare: Function,
    getName: Function
}

export default datastoreGenerator;