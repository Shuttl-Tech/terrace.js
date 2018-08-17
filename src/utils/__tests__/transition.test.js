import { parametrizePath } from '../transition';

it('parses paths and params correctly', () => {
	expect(parametrizePath('/path/:param1/subpath/:param2', 'p1', 'p2')).toEqual('/path/p1/subpath/p2');
	expect(parametrizePath('/path/:param1', 'p1', 'p2')).toEqual('/path/p1');
	expect(parametrizePath('/path/:param1/subpath/:param2', 'p1')).toEqual('/path/p1/subpath/:param2');
	expect(parametrizePath('/path/:param1/subpath/:param2')).toEqual('/path/:param1/subpath/:param2');
	expect(parametrizePath('/path/:param1/subpath/:param2', 'p1', 'p2', 'p3', 'p4')).toEqual('/path/p1/subpath/p2');
	expect(parametrizePath('/path/subpath', 'p1', 'p2')).toEqual('/path/subpath');
	expect(parametrizePath('/path/subpath/:param2', 'p1', 'p2', 'p3', 'p4')).toEqual('/path/subpath/p1');
	expect(parametrizePath('path/subpath/:param2', 'p1', 'p2')).toEqual('path/subpath/p1');
	expect(parametrizePath('/path/sub:path/:param2', 'p1', 'p2', 'p3', 'p4')).toEqual('/path/subp1/p2');
	expect(parametrizePath('/path/sub:path:name/:param2', 'p1', 'p2', 'p3', 'p4')).toEqual('/path/subp1p2/p3');
	expect(parametrizePath('/article/:id/comment/:dd:mm:yy#:hashparam', '6969', '01', '04', '1970', 'comment-hash')).toEqual('/article/6969/comment/01041970#comment-hash');
});
