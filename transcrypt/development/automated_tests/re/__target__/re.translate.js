// Transcrypt'ed from Python, 2018-04-05 23:20:04
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var re = {};
var __name__ = 're.translate';
import * as __module_re__ from './re.js';
__nest__ (re, '', __module_re__);
export var VERBOSE = false;
export var MAX_SHIFTREDUCE_LOOPS = 1000;
export var stringFlags = 'aiLmsux';

export var Group =  __class__ ('Group', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, start, end, klass) {
		self.start = start;
		self.end = end;
		self.klass = klass;
	});},
	get __repr__ () {return __get__ (this, function (self) {
		return str (tuple ([self.start, self.end, self.klass]));
	});}
});
export var generateGroupSpans = function (tokens) {
	var groupInfo = list ([]);
	var idx = 0;
	for (var token of tokens) {
		if (__t__ (token.py_name.startswith ('('))) {
			groupInfo.append (Group (idx, null, token.py_name));
		}
		else if (__t__ (token.py_name == ')')) {
			for (var group of py_reversed (groupInfo)) {
				if (__t__ (group.end === null)) {
					group.end = idx;
				}
			}
		}
		idx++;
	}
	return groupInfo;
};
export var countCaptureGroups = function (tokens) {
	var groupInfo = generateGroupSpans (tokens);
	var count = 0;
	for (var token of tokens) {
		if (__t__ (token.py_name == '(')) {
			count++;
		}
	}
	return count;
};
export var getCaptureGroup = function (groupInfo, namedGroups, groupRef) {
	try {
		var id = int (groupRef);
	}
	catch (__except0__) {
		var id = namedGroups [groupRef];
	}
	var search = 0;
	for (var group of groupInfo) {
		if (__t__ (group.klass == '(')) {
			search++;
			if (__t__ (search == id)) {
				return group;
			}
		}
	}
};
export var splitIfElse = function (tokens, namedGroups) {
	var variants = list ([]);
	var groupInfo = generateGroupSpans (tokens);
	for (var group of groupInfo) {
		if (__t__ (group.klass == '(?<')) {
			var iff = tokens.__getslice__ (0, null, 1);
			var els = tokens.__getslice__ (0, null, 1);
			var conStart = group.start;
			var conEnd = group.end;
			var ref = tokens [conStart + 1].py_name;
			var captureGroup = getCaptureGroup (groupInfo, namedGroups, ref);
			var captureGroupModifier = tokens [captureGroup.end + 1];
			if (__t__ (__t__ (__in__ (captureGroupModifier.py_name, list (['?', '*']))) || captureGroupModifier.py_name.startswith ('{0,'))) {
				if (__t__ (captureGroupModifier.py_name == '?')) {
					iff [captureGroup.end + 1] = null;
				}
				else if (__t__ (captureGroupModifier.py_name == '*')) {
					iff [captureGroup.end + 1] = Token ('+');
				}
				else if (__t__ (captureGroupModifier.py_name.startswith ('{0,'))) {
					iff [captureGroup.end + 1].py_name.__setslice__ (0, 3, null, '{1,');
				}
				els [captureGroup.end + 1] = null;
				var hasElse = false;
				for (var idx = conStart; idx < conEnd; idx++) {
					if (__t__ (tokens [idx].py_name == '|')) {
						var hasElse = true;
						els.py_pop (conEnd);
						iff.__setslice__ (idx, conEnd + 1, null, list ([]));
						els.__setslice__ (conStart, idx + 1, null, list ([]));
						break;
					}
				}
				if (__t__ (!__t__ ((hasElse)))) {
					els.__setslice__ (conStart, conEnd + 1, null, list ([]));
					iff.py_pop (conEnd);
				}
				iff.__setslice__ (conStart, conStart + 3, null, list ([]));
				els.__setslice__ (captureGroup.start, captureGroup.end + 1, null, list ([Token ('('), Token (')')]));
				iff.remove (null);
				els.remove (null);
				variants.append (iff);
				variants.append (els);
			}
			else {
				var pastIff = false;
				for (var idx = conStart; idx < conEnd; idx++) {
					if (__t__ (iff [idx].py_name == '|')) {
						var iff = tokens.__getslice__ (0, idx, 1);
						iff.extend (tokens.__getslice__ (conEnd + 1, null, 1));
						break;
					}
				}
				iff.__setslice__ (conStart, conStart + 3, null, list ([]));
				variants.append (iff);
			}
			break;
		}
	}
	if (__t__ (!__t__ ((variants)))) {
		return list ([tokens]);
	}
	var allVariants = list ([]);
	for (var variant of variants) {
		allVariants.extend (splitIfElse (variant, namedGroups));
	}
	return allVariants;
};

export var Token =  __class__ ('Token', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, py_name, paras, pure) {
		if (typeof paras == 'undefined' || (paras != null && paras .hasOwnProperty ("__kwargtrans__"))) {;
			var paras = null;
		};
		if (typeof pure == 'undefined' || (pure != null && pure .hasOwnProperty ("__kwargtrans__"))) {;
			var pure = false;
		};
		if (__t__ (paras === null)) {
			var paras = list ([]);
		}
		self.py_name = py_name;
		self.paras = paras;
		self.pure = pure;
		self.isModeGroup = false;
	});},
	get __repr__ () {return __get__ (this, function (self) {
		return self.py_name;
	});},
	get resolve () {return __get__ (this, function (self) {
		var paras = '';
		for (var para of self.paras) {
			paras += str (para);
		}
		return self.py_name + paras;
	});}
});
export var shift = function (stack, queue) {
	var done = !__t__ ((bool (queue)));
	if (__t__ (!__t__ ((done)))) {
		stack.append (Token (queue [0], list ([]), true));
		var queue = queue.__getslice__ (1, null, 1);
	}
	return tuple ([stack, queue, done]);
};
export var shiftReduce = function (stack, queue, namedGroups, flags) {
	var done = false;
	var high = len (stack) - 1;
	if (__t__ (len (stack) < 2)) {
		var __left0__ = shift (stack, queue);
		var stack = __left0__ [0];
		var queue = __left0__ [1];
		var done = __left0__ [2];
		return tuple ([stack, queue, flags, done]);
	}
	var s0 = (__t__ (len (stack) > 0) ? stack [high] : Token (''));
	var s1 = (__t__ (len (stack) > 1) ? stack [high - 1] : Token (''));
	if (__t__ (VERBOSE)) {
		for (var token of stack) {
			console.log (token.resolve (), '\t', __kwargtrans__ ({end: ''}));
		}
		console.log ('');
	}
	if (__t__ (s1.py_name == '\\')) {
		if (__t__ (s0.py_name == 'A')) {
			stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('^')]));
		}
		else if (__t__ (s0.py_name == 'a')) {
			stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('\\07')]));
		}
		else if (__t__ (s0.py_name == 'Z')) {
			stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('$')]));
		}
		else {
			stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('\\' + s0.py_name)]));
		}
	}
	else if (__t__ (__t__ (s0.py_name == '$') && s0.pure)) {
		stack.py_pop ();
		stack.extend (list ([Token ('(?='), Token ('\\n'), Token ('?'), Token ('$'), Token (')')]));
	}
	else if (__t__ (s1.py_name == '{')) {
		if (__t__ (__t__ (s0.py_name == ',') && len (s1.paras) == 0)) {
			s1.paras.append ('0');
			s1.paras.append (',');
		}
		else if (__t__ (s0.py_name == '}')) {
			s1.paras.append ('}');
			s1.py_name = s1.resolve ();
			s1.paras = list ([]);
		}
		else {
			s1.paras.append (s0.py_name);
		}
		var stack = stack.__getslice__ (0, -__t__ ((1)), 1);
	}
	else if (__t__ (__t__ (s1.py_name == '[') && s0.py_name == '^')) {
		stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('[^')]));
	}
	else if (__t__ (__t__ (s1.py_name == '(') && s0.py_name == '?')) {
		stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('(?')]));
	}
	else if (__t__ (__t__ (__in__ (s1.py_name, list (['*', '+', '?']))) && s0.py_name == '?')) {
		stack.__setslice__ (-__t__ ((2)), null, null, list ([Token (s1.py_name + '?')]));
	}
	else if (__t__ (__t__ (s1.isModeGroup) && s0.py_name == ')')) {
		var stack = stack.__getslice__ (0, -__t__ ((2)), 1);
	}
	else if (__t__ (s1.py_name == '(?')) {
		if (__t__ (__in__ (s0.py_name, stringFlags))) {
			if (__t__ (s0.py_name == 'i')) {
				flags |= re.IGNORECASE;
			}
			else if (__t__ (s0.py_name == 'L')) {
				flags |= re.LOCALE;
			}
			else if (__t__ (s0.py_name == 'm')) {
				flags |= re.MULTILINE;
			}
			else if (__t__ (s0.py_name == 's')) {
				flags |= re.DOTALL;
			}
			else if (__t__ (s0.py_name == 'u')) {
				flags |= re.UNICODE;
			}
			else if (__t__ (s0.py_name == 'x')) {
				flags |= re.VERBOSE;
			}
			else if (__t__ (s0.py_name == 'a')) {
				flags |= re.ASCII;
			}
			stack.py_pop ();
			s1.isModeGroup = true;
		}
		else {
			if (__t__ (s0.py_name == '(')) {
				s0.py_name = '<';
			}
			var newToken = Token ('(?' + s0.py_name);
			stack.__setslice__ (-__t__ ((2)), null, null, list ([newToken]));
		}
	}
	else if (__t__ (s1.py_name == '(?<')) {
		if (__t__ (s0.py_name == ')')) {
			stack.__setslice__ (-__t__ ((1)), null, null, list ([Token (''.join (s1.paras)), Token ('>')]));
			s1.paras = list ([]);
		}
		else {
			s1.paras.append (s0.py_name);
			stack.py_pop ();
		}
	}
	else if (__t__ (s1.py_name == '(?P')) {
		stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('(?P' + s0.py_name)]));
	}
	else if (__t__ (s1.py_name == '(?P<')) {
		if (__t__ (s0.py_name == '>')) {
			namedGroups [''.join (s1.paras)] = countCaptureGroups (stack) + 1;
			stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('(')]));
		}
		else {
			s1.paras.append (s0.py_name);
			stack.py_pop ();
		}
	}
	else if (__t__ (s1.py_name == '(?P=')) {
		if (__t__ (s0.py_name == ')')) {
			stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('\\' + str (namedGroups [s1.paras [0]]))]));
		}
		else if (__t__ (!__t__ ((s1.paras)))) {
			s1.paras.append (s0.py_name);
			stack.py_pop ();
		}
		else {
			s1.paras [0] += s0.py_name;
			stack.py_pop ();
		}
	}
	else if (__t__ (s1.py_name == '(?#')) {
		if (__t__ (s0.py_name == ')')) {
			var stack = stack.__getslice__ (0, -__t__ ((2)), 1);
		}
		else {
			var stack = stack.__getslice__ (0, -__t__ ((1)), 1);
		}
	}
	else {
		var __left0__ = shift (stack, queue);
		var stack = __left0__ [0];
		var queue = __left0__ [1];
		var done = __left0__ [2];
	}
	return tuple ([stack, queue, flags, done]);
};
export var translate = function (rgx) {
	var stack = list ([]);
	var queue = list (rgx);
	var flags = 0;
	var namedGroups = dict ();
	var nloop = 0;
	while (__t__ (true)) {
		nloop++;
		if (__t__ (nloop > MAX_SHIFTREDUCE_LOOPS)) {
			var __except0__ = Exception ();
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var __left0__ = shiftReduce (stack, queue, namedGroups, flags);
		var stack = __left0__ [0];
		var queue = __left0__ [1];
		var flags = __left0__ [2];
		var done = __left0__ [3];
		if (__t__ (done)) {
			break;
		}
	}
	var variants = splitIfElse (stack, namedGroups);
	var n_splits = len (variants);
	var final = list ([]);
	for (var i = 0; i < len (variants); i++) {
		final.extend (variants [i]);
		if (__t__ (i < len (variants) - 1)) {
			final.append (Token ('|'));
		}
	}
	var stack = final;
	var groupInfo = generateGroupSpans (stack);
	var resolvedTokens = list ([]);
	for (var token of stack) {
		var stringed = token.resolve ();
		if (__t__ (__t__ (flags & re.DOTALL) && stringed == '.')) {
			var stringed = '[\\s\\S]';
		}
		resolvedTokens.append (stringed);
	}
	return tuple ([resolvedTokens, flags, namedGroups, countCaptureGroups (stack), n_splits]);
};

//# sourceMappingURL=re.translate.map