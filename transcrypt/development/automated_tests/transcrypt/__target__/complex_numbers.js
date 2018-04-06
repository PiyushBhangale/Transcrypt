// Transcrypt'ed from Python, 2018-04-05 23:19:47
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = 'complex_numbers';
export var run = function (autoTester) {
	var x = 567;
	var y = -(3);
	var z = 5 * x + 2 * y;
	autoTester.check (__conj__ (x).real, __conj__ (x).imag);
	autoTester.check (x, y, z);
	var a = __add__ (234, complex (0, 3.0));
	var b = __sub__ (4, complex (0, 5.0));
	var c = __call__ (complex, null, __neg__ (6), 7);
	var d = 1;
	__call__ (autoTester.check, autoTester, a, b, c);
	__call__ (autoTester.check, autoTester, __call__ (__conj__, null, d).real, __call__ (__conj__, null, d).imag);
	var t = __add__ (__sub__ (__mul__ (6, x), __mul__ (3, y)), 7);
	__call__ (autoTester.check, autoTester, t);
	var d = __mul__ (2, a);
	var e = __mul__ (x, b);
	var f = __add__ (__add__ (z, d), e);
	var g = __truediv__ (a, b);
	var h = __sub__ (a, b);
	var i = __sub__ (x, c);
	var j = __sub__ (a, x);
	var k = __add__ (b, y);
	__call__ (autoTester.check, autoTester, d, e, f, __call__ (round, null, g.real, 2), __call__ (round, null, g.imag, 2), h, i, j, k);
};

//# sourceMappingURL=complex_numbers.map