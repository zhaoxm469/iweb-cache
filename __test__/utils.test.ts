import { hasStringify } from '../src/utils';

describe('1. 判断是否可以被JSON.string序列化', () => {
    const { s, f, b } = {
        s: Symbol('张三'),
        f: () => {},
        b: 100n
    };

    test('1.6 String', () => {
        expect(hasStringify('obj')).toEqual(true);
    });

    test('1.1 Symbol', () => {
        const name = s;
        expect(hasStringify(name)).toEqual(false);
    });
    test('1.2 Function', () => {
        const name = f;
        expect(hasStringify(name)).toEqual(false);
    });
    test('1.3 BegInt', () => {
        const name = b;
        expect(hasStringify(name)).toEqual(false);
    });
    test('1.4 Object ', () => {
        const obj = {
            b
        };
        expect(hasStringify(obj)).toEqual(true);
        const obj1 = {
            s
        };
        expect(hasStringify(obj1)).toEqual(true);
        const obj2 = {
            f
        };
        expect(hasStringify(obj2)).toEqual(true);
    });
    test('1.5 Array', () => {
        const obj = [s];
        expect(hasStringify(obj)).toEqual(true);
        const obj1 = [f];
        expect(hasStringify(obj1)).toEqual(true);
        const obj2 = [b];
        expect(hasStringify(obj2)).toEqual(true);
    });

    test('1.6 deepObject ', () => {
        const obj = {
            userInfo: {
                name: '123',
                age: 14,
                hobby: {
                    animal: {
                        list: ['狗狗', '猫猫']
                    }
                }
            }
        };
        expect(hasStringify(obj)).toEqual(true);
    });
});
