import iwebCache from '../src/main';

const cache = iwebCache({
    prefix: 'asd'
});

cache.save('token', 55);

cache.save('userInfo', {
    userName: '张三',
    age: 18
});

interface IUserInfo  {
	name:string,
	age:number
}

function getName<T = any> (text:string ) : T | boolean {
	return false;
}

console.log(getName('token').name)

const userInfo = cache.get<IUserInfo>('userI1nfo');
if (userInfo) {
if (userInfo && userInfo.name) {
}

type name1 = {
    name: '张三';
    age: 13;
};

type name2 = {
    name: '张三';
    name1: '张三';
    age: 13;
};

type name3 = name1 & name2;

