import IwebCache from '../src/main';

describe('1.基本使用', () => {
    const cache = IwebCache();
    test('1.01 存储数据 , 不设置有效期(代表一直有效) ', () => {
        expect(cache.save('name', '张三')).toBeTruthy();
    });
    test('1.02 存储数据 , 设置缓存五秒过期', () => {
        expect(cache.save('token', '123456', 1000 * 5)).toBeTruthy();
    });
    test('1.03 读根据 KEY 取数据 ', () => {
        expect(cache.get('name')).toBe('张三');
    });
    test('1.04 读取不存在的数据', () => {
        expect(cache.get('name1')).toBeFalsy();
    });
    test('1.05 根据 KEY 删除数据 ', () => {
        expect(cache.del('name')).toBeTruthy();
    });
    test('1.06 使用不存在的 KEY 删除数据 ', () => {
        expect(cache.del('name1')).toBeFalsy();
    });
    test('1.07 不更新过期时间 覆盖原有的值 ', () => {
        cache.save('age', 18, 1000 * 30);
        const oldTime = cache.appData.age.expires;

        expect(cache.cover('age', '19')).toBeTruthy();
        const newTime = cache.appData.age.expires;
        const newValue = cache.appData.age.value;

        expect(newValue).toBe('19');
        expect(oldTime).toBe(newTime);
    });
    test('1.08 一次获取多条数据 ', () => {
        const userInfo = {
            name: '张三',
            color: 'red',
            age: 18
        };
        cache.save('userInfo', userInfo);
        cache.save('name01', '张三');

        expect(cache.getAll('userInfo', 'name0', 'name01')).toMatchObject([
            {
                name: '张三',
                color: 'red',
                age: 18
            },
            false,
            '张三'
        ]);
    });
    test('1.09 删除全部数据', () => {
        expect(cache.clear()).toBeTruthy();
        expect(JSON.stringify(cache.appData)).toBe('{}');
    });
});

describe('2. 存储各种数据类型', () => {
    const cache = IwebCache();
    const getType = (data: any) => {
        return Object.prototype.toString
            .call(data)
            .toLocaleLowerCase()
            .substring(8)
            .replace(']', '');
    };
    test('2.01 Number ', () => {
        cache.save('appType', 123);
        const appType = cache.get('appType');
        expect(getType(appType)).toBe('number');
    });
    test('2.02 String', () => {
        cache.save('appType', '123');
        const appType = cache.get('appType');
        expect(getType(appType)).toBe('string');
    });
    test('2.03 Null ', () => {
        cache.save('appType', null);
        const appType = cache.get('appType');
        expect(getType(appType)).toBe('null');
    });
    test('2.04 Undefined', () => {
        cache.save('appType', undefined);
        const appType = cache.get('appType');
        expect(getType(appType)).toBe('undefined');
    });
    test('2.05 Object ', () => {
        cache.save('appType', { name: '张三' });
        const appType = cache.get('appType');
        expect(getType(appType)).toBe('object');
    });
    test('2.06 Array ', () => {
        cache.save('appType', [{ name: 123 }, 15]);
        const appType = cache.get('appType');
        expect(getType(appType)).toBe('array');
    });
    test('2.07 RegExp ', () => {
        cache.save('appType', /[]/g);
        const appType = cache.get('appType');
        expect(getType(appType)).toBe('regexp');
    });
    test('2.08 Boolean ', () => {
        cache.save('appType', true);
        const appType = cache.get('appType');
        expect(getType(appType)).toBe('boolean');
    });

    describe('2.09 传入不能识别的类型', () => {
        const throwMs =
            'Check whether the stored value can be serialized by JSON.stringify()';
        test('2.09-1 Symbol', () => {
            expect(() => cache.save('appType', Symbol(1))).toThrow(throwMs);
        });
        test('2.09-2 BigInt', () => {
            expect(() => cache.save('appType', 1n)).toThrow(throwMs);
        });
        test('2.09-3 Function', () => {
            const getName = () => {};
            expect(() => cache.save('appType', getName)).toThrow(throwMs);
        });
    });
});
