class MyClass {
    text = 'initial text';

    constructor (text) {
        if (text) this.text = text;
    }

    printText () {
        console.log(this.text);
    }
}

const myClass = new MyClass('my text');
myClass.printText();
