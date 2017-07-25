/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*! JSON Editor v0.7.28 - JSON Schema -> HTML Editor
 * By Jeremy Dorn - https://github.com/jdorn/json-editor/
 * Released under the MIT license
 *
 * Date: 2016-08-07
 */
/**
 * See README.md for requirements and usage info
 */

!function(){/*jshint loopfunc: true */
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
var a;!function(){var b=!1,c=/xyz/.test(function(){window.postMessage("xyz")})?/\b_super\b/:/.*/;
// The base Class implementation (does nothing)
// Create a new Class that inherits from this class
return a=function(){},a.extend=function d(a){
// The dummy class constructor
function e(){
// All construction is actually done in the init method
!b&&this.init&&this.init.apply(this,arguments)}var f=this.prototype;
// Instantiate a base class (but only create the instance,
// don't run the init constructor)
b=!0;var g=new this;b=!1;
// Copy the properties over onto the new prototype
for(var h in a)
// Check if we're overwriting an existing function
g[h]="function"==typeof a[h]&&"function"==typeof f[h]&&c.test(a[h])?function(a,b){return function(){var c=this._super;
// Add a new ._super() method that is the same method
// but on the super-class
this._super=f[a];
// The method only need to be bound temporarily, so we
// remove it when we're done executing
var d=b.apply(this,arguments);return this._super=c,d}}(h,a[h]):a[h];
// Populate our constructed prototype object
// Enforce the constructor to be what we expect
// And make this class extendable
return e.prototype=g,e.prototype.constructor=e,e.extend=d,e},a}(),
// CustomEvent constructor polyfill
// From MDN
function(){function a(a,b){b=b||{bubbles:!1,cancelable:!1,detail:void 0};var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}a.prototype=window.Event.prototype,window.CustomEvent=a}(),
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b,c){var d=(new Date).getTime(),e=Math.max(0,16-(d-a)),f=window.setTimeout(function(){b(d+e)},e);return a=d+e,f}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}(),
// Array.isArray polyfill
// From MDN
function(){Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)})}();/**
 * Taken from jQuery 2.1.3
 *
 * @param obj
 * @returns {boolean}
 */
var b=function(a){
// Not plain objects:
// - Any object or value whose internal [[Class]] property is not "[object Object]"
// - DOM nodes
// - window
// Not plain objects:
// - Any object or value whose internal [[Class]] property is not "[object Object]"
// - DOM nodes
// - window
return!("object"!=typeof a||a.nodeType||null!==a&&a===a.window)&&!(a.constructor&&!Object.prototype.hasOwnProperty.call(a.constructor.prototype,"isPrototypeOf"))},c=function(a){var d,e,f;for(e=1;e<arguments.length;e++){d=arguments[e];for(f in d)d.hasOwnProperty(f)&&(d[f]&&b(d[f])?(a.hasOwnProperty(f)||(a[f]={}),c(a[f],d[f])):a[f]=d[f])}return a},d=function(a,b){if(a&&"object"==typeof a){var c;if(Array.isArray(a)||"number"==typeof a.length&&a.length>0&&a.length-1 in a){for(c=0;c<a.length;c++)if(b(c,a[c])===!1)return}else if(Object.keys){var d=Object.keys(a);for(c=0;c<d.length;c++)if(b(d[c],a[d[c]])===!1)return}else for(c in a)if(a.hasOwnProperty(c)&&b(c,a[c])===!1)return}},e=function(a,b){var c=document.createEvent("HTMLEvents");c.initEvent(b,!0,!0),a.dispatchEvent(c)},f=function(a,b){if(!(a instanceof Element))throw new Error("element should be an instance of Element");b=c({},f.defaults.options,b||{}),this.element=a,this.options=b,this.init()};f.prototype={
// necessary since we remove the ctor property by doing a literal assignment. Without this
// the $isplainobject function will think that this is a plain object.
constructor:f,init:function(){var a=this;this.ready=!1;var b=f.defaults.themes[this.options.theme||f.defaults.theme];if(!b)throw"Unknown theme "+(this.options.theme||f.defaults.theme);this.schema=this.options.schema,this.theme=new b,this.template=this.options.template,this.refs=this.options.refs||{},this.uuid=0,this.__data={};var c=f.defaults.iconlibs[this.options.iconlib||f.defaults.iconlib];c&&(this.iconlib=new c),this.root_container=this.theme.getContainer(),this.element.appendChild(this.root_container),this.translate=this.options.translate||f.defaults.translate,
// Fetch all external refs via ajax
this._loadExternalRefs(this.schema,function(){a._getDefinitions(a.schema);
// Validator options
var b={};a.options.custom_validators&&(b.custom_validators=a.options.custom_validators),a.validator=new f.Validator(a,null,b);
// Create the root editor
var c=a.getEditorClass(a.schema);a.root=a.createEditor(c,{jsoneditor:a,schema:a.schema,required:!0,container:a.root_container}),a.root.preBuild(),a.root.build(),a.root.postBuild(),
// Starting data
a.options.startval&&a.root.setValue(a.options.startval),a.validation_results=a.validator.validate(a.root.getValue()),a.root.showValidationErrors(a.validation_results),a.ready=!0,
// Fire ready event asynchronously
window.requestAnimationFrame(function(){a.ready&&(a.validation_results=a.validator.validate(a.root.getValue()),a.root.showValidationErrors(a.validation_results),a.trigger("ready"),a.trigger("change"))})})},getValue:function(){if(!this.ready)throw"JSON Editor not ready yet.  Listen for 'ready' event before getting the value";return this.root.getValue()},setValue:function(a){if(!this.ready)throw"JSON Editor not ready yet.  Listen for 'ready' event before setting the value";return this.root.setValue(a),this},validate:function(a){if(!this.ready)throw"JSON Editor not ready yet.  Listen for 'ready' event before validating";
// Custom value
// Custom value
return 1===arguments.length?this.validator.validate(a):this.validation_results},destroy:function(){this.destroyed||this.ready&&(this.schema=null,this.options=null,this.root.destroy(),this.root=null,this.root_container=null,this.validator=null,this.validation_results=null,this.theme=null,this.iconlib=null,this.template=null,this.__data=null,this.ready=!1,this.element.innerHTML="",this.destroyed=!0)},on:function(a,b){return this.callbacks=this.callbacks||{},this.callbacks[a]=this.callbacks[a]||[],this.callbacks[a].push(b),this},off:function(a,b){
// Specific callback
if(a&&b){this.callbacks=this.callbacks||{},this.callbacks[a]=this.callbacks[a]||[];for(var c=[],d=0;d<this.callbacks[a].length;d++)this.callbacks[a][d]!==b&&c.push(this.callbacks[a][d]);this.callbacks[a]=c}else a?(this.callbacks=this.callbacks||{},this.callbacks[a]=[]):this.callbacks={};return this},trigger:function(a){if(this.callbacks&&this.callbacks[a]&&this.callbacks[a].length)for(var b=0;b<this.callbacks[a].length;b++)this.callbacks[a][b]();return this},setOption:function(a,b){if("show_errors"!==a)throw"Option "+a+" must be set during instantiation and cannot be changed later";return this.options.show_errors=b,this.onChange(),this},getEditorClass:function(a){var b;if(a=this.expandSchema(a),d(f.defaults.resolvers,function(c,d){var e=d(a);if(e&&f.defaults.editors[e])return b=e,!1}),!b)throw"Unknown editor for schema "+JSON.stringify(a);if(!f.defaults.editors[b])throw"Unknown editor "+b;return f.defaults.editors[b]},createEditor:function(a,b){return b=c({},a.options||{},b),new a(b)},onChange:function(){if(this.ready&&!this.firing_change){this.firing_change=!0;var a=this;return window.requestAnimationFrame(function(){a.firing_change=!1,a.ready&&(
// Validate and cache results
a.validation_results=a.validator.validate(a.root.getValue()),"never"!==a.options.show_errors?a.root.showValidationErrors(a.validation_results):a.root.showValidationErrors([]),
// Fire change event
a.trigger("change"))}),this}},compileTemplate:function(a,b){b=b||f.defaults.template;var c;
// Specifying a preset engine
if("string"==typeof b){if(!f.defaults.templates[b])throw"Unknown template engine "+b;if(c=f.defaults.templates[b](),!c)throw"Template engine "+b+" missing required library."}else c=b;if(!c)throw"No template engine set";if(!c.compile)throw"Invalid template engine set";return c.compile(a)},_data:function(a,b,c){
// Setting data
if(3!==arguments.length)
// No data stored
// No data stored
return a.hasAttribute("data-jsoneditor-"+b)?this.__data[a.getAttribute("data-jsoneditor-"+b)]:null;var d;a.hasAttribute("data-jsoneditor-"+b)?d=a.getAttribute("data-jsoneditor-"+b):(d=this.uuid++,a.setAttribute("data-jsoneditor-"+b,d)),this.__data[d]=c},registerEditor:function(a){return this.editors=this.editors||{},this.editors[a.path]=a,this},unregisterEditor:function(a){return this.editors=this.editors||{},this.editors[a.path]=null,this},getEditor:function(a){if(this.editors)return this.editors[a]},watch:function(a,b){return this.watchlist=this.watchlist||{},this.watchlist[a]=this.watchlist[a]||[],this.watchlist[a].push(b),this},unwatch:function(a,b){if(!this.watchlist||!this.watchlist[a])return this;
// If removing all callbacks for a path
if(!b)return this.watchlist[a]=null,this;for(var c=[],d=0;d<this.watchlist[a].length;d++)this.watchlist[a][d]!==b&&c.push(this.watchlist[a][d]);return this.watchlist[a]=c.length?c:null,this},notifyWatchers:function(a){if(!this.watchlist||!this.watchlist[a])return this;for(var b=0;b<this.watchlist[a].length;b++)this.watchlist[a][b]()},isEnabled:function(){return!this.root||this.root.isEnabled()},enable:function(){this.root.enable()},disable:function(){this.root.disable()},_getDefinitions:function(a,b){if(b=b||"#/definitions/",a.definitions)for(var c in a.definitions)a.definitions.hasOwnProperty(c)&&(this.refs[b+c]=a.definitions[c],a.definitions[c].definitions&&this._getDefinitions(a.definitions[c],b+c+"/definitions/"))},_getExternalRefs:function(a){var b={},c=function(a){for(var c in a)a.hasOwnProperty(c)&&(b[c]=!0)};a.$ref&&"object"!=typeof a.$ref&&"#"!==a.$ref.substr(0,1)&&!this.refs[a.$ref]&&(b[a.$ref]=!0);for(var d in a)if(a.hasOwnProperty(d))if(a[d]&&"object"==typeof a[d]&&Array.isArray(a[d]))for(var e=0;e<a[d].length;e++)"object"==typeof a[d][e]&&c(this._getExternalRefs(a[d][e]));else a[d]&&"object"==typeof a[d]&&c(this._getExternalRefs(a[d]));return b},_loadExternalRefs:function(a,b){var c=this,e=this._getExternalRefs(a),f=0,g=0,h=!1;d(e,function(a){if(!c.refs[a]){if(!c.options.ajax)throw"Must set ajax option to true to load external ref "+a;c.refs[a]="loading",g++;var d=new XMLHttpRequest;d.open("GET",a,!0),d.onreadystatechange=function(){if(4==d.readyState){
// Request succeeded
if(200!==d.status)throw window.console.log(d),"Failed to fetch ref via ajax- "+a;var e;try{e=JSON.parse(d.responseText)}catch(i){throw window.console.log(i),"Failed to parse external ref "+a}if(!e||"object"!=typeof e)throw"External ref does not contain a valid schema - "+a;c.refs[a]=e,c._loadExternalRefs(e,function(){f++,f>=g&&!h&&(h=!0,b())})}},d.send()}}),g||b()},expandRefs:function(a){for(a=c({},a);a.$ref;){var b=a.$ref;delete a.$ref,this.refs[b]||(b=decodeURIComponent(b)),a=this.extendSchemas(a,this.refs[b])}return a},expandSchema:function(a){var b,e=this,f=c({},a);
// allOf schemas should be merged into the parent
if(
// Version 3 `type`
"object"==typeof a.type&&(
// Array of types
Array.isArray(a.type)?d(a.type,function(b,c){
// Schema
"object"==typeof c&&(a.type[b]=e.expandSchema(c))}):a.type=e.expandSchema(a.type)),
// Version 3 `disallow`
"object"==typeof a.disallow&&(
// Array of types
Array.isArray(a.disallow)?d(a.disallow,function(b,c){
// Schema
"object"==typeof c&&(a.disallow[b]=e.expandSchema(c))}):a.disallow=e.expandSchema(a.disallow)),
// Version 4 `anyOf`
a.anyOf&&d(a.anyOf,function(b,c){a.anyOf[b]=e.expandSchema(c)}),
// Version 4 `dependencies` (schema dependencies)
a.dependencies&&d(a.dependencies,function(b,c){"object"!=typeof c||Array.isArray(c)||(a.dependencies[b]=e.expandSchema(c))}),
// Version 4 `not`
a.not&&(a.not=this.expandSchema(a.not)),a.allOf){for(b=0;b<a.allOf.length;b++)f=this.extendSchemas(f,this.expandSchema(a.allOf[b]));delete f.allOf}
// extends schemas should be merged into parent
if(a["extends"]){
// If extends is a schema
if(Array.isArray(a["extends"]))for(b=0;b<a["extends"].length;b++)f=this.extendSchemas(f,this.expandSchema(a["extends"][b]));else f=this.extendSchemas(f,this.expandSchema(a["extends"]));delete f["extends"]}
// parent should be merged into oneOf schemas
if(a.oneOf){var g=c({},f);for(delete g.oneOf,b=0;b<a.oneOf.length;b++)f.oneOf[b]=this.extendSchemas(this.expandSchema(a.oneOf[b]),g)}return this.expandRefs(f)},extendSchemas:function(a,b){a=c({},a),b=c({},b);var e=this,f={};
// Properties in obj2 that aren't in obj1
return d(a,function(a,c){
// If this key is also defined in obj2, merge them
"undefined"!=typeof b[a]?
// Required and defaultProperties arrays should be unioned together
"required"!==a&&"defaultProperties"!==a||"object"!=typeof c||!Array.isArray(c)?"type"!==a||"string"!=typeof c&&!Array.isArray(c)?"object"==typeof c&&Array.isArray(c)?f[a]=c.filter(function(c){return b[a].indexOf(c)!==-1}):"object"==typeof c&&null!==c?f[a]=e.extendSchemas(c,b[a]):f[a]=c:(
// Make sure we're dealing with arrays
"string"==typeof c&&(c=[c]),"string"==typeof b.type&&(b.type=[b.type]),
// If type is only defined in the first schema, keep it
b.type&&b.type.length?f.type=c.filter(function(a){return b.type.indexOf(a)!==-1}):f.type=c,
// If there's only 1 type and it's a primitive, use a string instead of array
1===f.type.length&&"string"==typeof f.type[0]?f.type=f.type[0]:0===f.type.length&&delete f.type):
// Union arrays and unique
f[a]=c.concat(b[a]).reduce(function(a,b){return a.indexOf(b)<0&&a.push(b),a},[]):f[a]=c}),d(b,function(b,c){"undefined"==typeof a[b]&&(f[b]=c)}),f}},f.defaults={themes:{},templates:{},iconlibs:{},editors:{},languages:{},resolvers:[],custom_validators:[]},f.Validator=a.extend({init:function(a,b,c){this.jsoneditor=a,this.schema=b||this.jsoneditor.schema,this.options=c||{},this.translate=this.jsoneditor.translate||f.defaults.translate},validate:function(a){return this._validateSchema(this.schema,a)},_validateSchema:function(a,b,e){var g,h,i,j=this,k=[],l=JSON.stringify(b);/*
     * Type Agnostic Validation
     */
// Version 3 `required`
if(e=e||"root",
// Work on a copy of the schema
a=c({},this.jsoneditor.expandRefs(a)),a.required&&a.required===!0){if("undefined"==typeof b)
// Can't do any more validation at this point
return k.push({path:e,property:"required",message:this.translate("error_notset")}),k}else if("undefined"==typeof b){
// If required_by_default is set, all fields are required
if(!this.jsoneditor.options.required_by_default)return k;k.push({path:e,property:"required",message:this.translate("error_notset")})}
// `enum`
if(a["enum"]){for(g=!1,h=0;h<a["enum"].length;h++)l===JSON.stringify(a["enum"][h])&&(g=!0);g||k.push({path:e,property:"enum",message:this.translate("error_enum")})}
// `extends` (version 3)
if(a["extends"])for(h=0;h<a["extends"].length;h++)k=k.concat(this._validateSchema(a["extends"][h],b,e));
// `allOf`
if(a.allOf)for(h=0;h<a.allOf.length;h++)k=k.concat(this._validateSchema(a.allOf[h],b,e));
// `anyOf`
if(a.anyOf){for(g=!1,h=0;h<a.anyOf.length;h++)if(!this._validateSchema(a.anyOf[h],b,e).length){g=!0;break}g||k.push({path:e,property:"anyOf",message:this.translate("error_anyOf")})}
// `oneOf`
if(a.oneOf){g=0;var m=[];for(h=0;h<a.oneOf.length;h++){
// Set the error paths to be path.oneOf[i].rest.of.path
var n=this._validateSchema(a.oneOf[h],b,e);for(n.length||g++,i=0;i<n.length;i++)n[i].path=e+".oneOf["+h+"]"+n[i].path.substr(e.length);m=m.concat(n)}1!==g&&(k.push({path:e,property:"oneOf",message:this.translate("error_oneOf",[g])}),k=k.concat(m))}
// `type` (both Version 3 and Version 4 support)
if(
// `not`
a.not&&(this._validateSchema(a.not,b,e).length||k.push({path:e,property:"not",message:this.translate("error_not")})),a.type)
// Union type
if(Array.isArray(a.type)){for(g=!1,h=0;h<a.type.length;h++)if(this._checkType(a.type[h],b)){g=!0;break}g||k.push({path:e,property:"type",message:this.translate("error_type_union")})}else this._checkType(a.type,b)||k.push({path:e,property:"type",message:this.translate("error_type",[a.type])});
// `disallow` (version 3)
if(a.disallow)
// Union type
if(Array.isArray(a.disallow)){for(g=!0,h=0;h<a.disallow.length;h++)if(this._checkType(a.disallow[h],b)){g=!1;break}g||k.push({path:e,property:"disallow",message:this.translate("error_disallow_union")})}else this._checkType(a.disallow,b)&&k.push({path:e,property:"disallow",message:this.translate("error_disallow",[a.disallow])});/*
     * Type Specific Validation
     */
// Number Specific Validation
if("number"==typeof b){
// `multipleOf` and `divisibleBy`
if(a.multipleOf||a.divisibleBy){var o=a.multipleOf||a.divisibleBy;
// Vanilla JS, prone to floating point rounding errors (e.g. 1.14 / .01 == 113.99999)
g=b/o===Math.floor(b/o),
// Use math.js is available
window.math?g=window.math.mod(window.math.bignumber(b),window.math.bignumber(o)).equals(0):window.Decimal&&(g=new window.Decimal(b).mod(new window.Decimal(o)).equals(0)),g||k.push({path:e,property:a.multipleOf?"multipleOf":"divisibleBy",message:this.translate("error_multipleOf",[o])})}
// `maximum`
a.hasOwnProperty("maximum")&&(
// Vanilla JS, prone to floating point rounding errors (e.g. .999999999999999 == 1)
g=a.exclusiveMaximum?b<a.maximum:b<=a.maximum,
// Use math.js is available
window.math?g=window.math[a.exclusiveMaximum?"smaller":"smallerEq"](window.math.bignumber(b),window.math.bignumber(a.maximum)):window.Decimal&&(g=new window.Decimal(b)[a.exclusiveMaximum?"lt":"lte"](new window.Decimal(a.maximum))),g||k.push({path:e,property:"maximum",message:this.translate(a.exclusiveMaximum?"error_maximum_excl":"error_maximum_incl",[a.maximum])})),
// `minimum`
a.hasOwnProperty("minimum")&&(
// Vanilla JS, prone to floating point rounding errors (e.g. .999999999999999 == 1)
g=a.exclusiveMinimum?b>a.minimum:b>=a.minimum,
// Use math.js is available
window.math?g=window.math[a.exclusiveMinimum?"larger":"largerEq"](window.math.bignumber(b),window.math.bignumber(a.minimum)):window.Decimal&&(g=new window.Decimal(b)[a.exclusiveMinimum?"gt":"gte"](new window.Decimal(a.minimum))),g||k.push({path:e,property:"minimum",message:this.translate(a.exclusiveMinimum?"error_minimum_excl":"error_minimum_incl",[a.minimum])}))}else if("string"==typeof b)
// `maxLength`
a.maxLength&&(b+"").length>a.maxLength&&k.push({path:e,property:"maxLength",message:this.translate("error_maxLength",[a.maxLength])}),
// `minLength`
a.minLength&&(b+"").length<a.minLength&&k.push({path:e,property:"minLength",message:this.translate(1===a.minLength?"error_notempty":"error_minLength",[a.minLength])}),
// `pattern`
a.pattern&&(new RegExp(a.pattern).test(b)||k.push({path:e,property:"pattern",message:this.translate("error_pattern",[a.pattern])}));else if("object"==typeof b&&null!==b&&Array.isArray(b)){
// `items` and `additionalItems`
if(a.items)
// `items` is an array
if(Array.isArray(a.items))for(h=0;h<b.length;h++)
// If this item has a specific schema tied to it
// Validate against it
if(a.items[h])k=k.concat(this._validateSchema(a.items[h],b[h],e+"."+h));else{if(a.additionalItems===!0)break;if(!a.additionalItems){if(a.additionalItems===!1){k.push({path:e,property:"additionalItems",message:this.translate("error_additionalItems")});break}break}k=k.concat(this._validateSchema(a.additionalItems,b[h],e+"."+h))}else
// Each item in the array must validate against the schema
for(h=0;h<b.length;h++)k=k.concat(this._validateSchema(a.items,b[h],e+"."+h));
// `uniqueItems`
if(
// `maxItems`
a.maxItems&&b.length>a.maxItems&&k.push({path:e,property:"maxItems",message:this.translate("error_maxItems",[a.maxItems])}),
// `minItems`
a.minItems&&b.length<a.minItems&&k.push({path:e,property:"minItems",message:this.translate("error_minItems",[a.minItems])}),a.uniqueItems){var p={};for(h=0;h<b.length;h++){if(g=JSON.stringify(b[h]),p[g]){k.push({path:e,property:"uniqueItems",message:this.translate("error_uniqueItems")});break}p[g]=!0}}}else if("object"==typeof b&&null!==b){
// `maxProperties`
if(a.maxProperties){g=0;for(h in b)b.hasOwnProperty(h)&&g++;g>a.maxProperties&&k.push({path:e,property:"maxProperties",message:this.translate("error_maxProperties",[a.maxProperties])})}
// `minProperties`
if(a.minProperties){g=0;for(h in b)b.hasOwnProperty(h)&&g++;g<a.minProperties&&k.push({path:e,property:"minProperties",message:this.translate("error_minProperties",[a.minProperties])})}
// Version 4 `required`
if(a.required&&Array.isArray(a.required))for(h=0;h<a.required.length;h++)"undefined"==typeof b[a.required[h]]&&k.push({path:e,property:"required",message:this.translate("error_required",[a.required[h]])});
// `properties`
var q={};if(a.properties)for(h in a.properties)a.properties.hasOwnProperty(h)&&(q[h]=!0,k=k.concat(this._validateSchema(a.properties[h],b[h],e+"."+h)));
// `patternProperties`
if(a.patternProperties)for(h in a.patternProperties)if(a.patternProperties.hasOwnProperty(h)){var r=new RegExp(h);
// Check which properties match
for(i in b)b.hasOwnProperty(i)&&r.test(i)&&(q[i]=!0,k=k.concat(this._validateSchema(a.patternProperties[h],b[i],e+"."+i)))}
// `additionalProperties`
if(
// The no_additional_properties option currently doesn't work with extended schemas that use oneOf or anyOf
"undefined"!=typeof a.additionalProperties||!this.jsoneditor.options.no_additional_properties||a.oneOf||a.anyOf||(a.additionalProperties=!1),"undefined"!=typeof a.additionalProperties)for(h in b)if(b.hasOwnProperty(h)&&!q[h]){
// No extra properties allowed
if(!a.additionalProperties){k.push({path:e,property:"additionalProperties",message:this.translate("error_additional_properties",[h])});break}if(a.additionalProperties===!0)break;k=k.concat(this._validateSchema(a.additionalProperties,b[h],e+"."+h))}
// `dependencies`
if(a.dependencies)for(h in a.dependencies)if(a.dependencies.hasOwnProperty(h)&&"undefined"!=typeof b[h])
// Property dependency
if(Array.isArray(a.dependencies[h]))for(i=0;i<a.dependencies[h].length;i++)"undefined"==typeof b[a.dependencies[h][i]]&&k.push({path:e,property:"dependencies",message:this.translate("error_dependency",[a.dependencies[h][i]])});else k=k.concat(this._validateSchema(a.dependencies[h],b,e))}
// Custom type validation (global)
// Custom type validation (instance specific)
return d(f.defaults.custom_validators,function(c,d){k=k.concat(d.call(j,a,b,e))}),this.options.custom_validators&&d(this.options.custom_validators,function(c,d){k=k.concat(d.call(j,a,b,e))}),k},_checkType:function(a,b){
// Simple types
// Simple types
return"string"==typeof a?"string"===a?"string"==typeof b:"number"===a?"number"==typeof b:"integer"===a?"number"==typeof b&&b===Math.floor(b):"boolean"===a?"boolean"==typeof b:"array"===a?Array.isArray(b):"object"===a?null!==b&&!Array.isArray(b)&&"object"==typeof b:"null"!==a||null===b:!this._validateSchema(a,b).length}}),/**
 * All editors should extend from this class
 */
f.AbstractEditor=a.extend({onChildEditorChange:function(a){this.onChange(!0)},notify:function(){this.jsoneditor.notifyWatchers(this.path)},change:function(){this.parent?this.parent.onChildEditorChange(this):this.jsoneditor.onChange()},onChange:function(a){this.notify(),this.watch_listener&&this.watch_listener(),a&&this.change()},register:function(){this.jsoneditor.registerEditor(this),this.onChange()},unregister:function(){this.jsoneditor&&this.jsoneditor.unregisterEditor(this)},getNumColumns:function(){return 12},init:function(a){this.jsoneditor=a.jsoneditor,this.theme=this.jsoneditor.theme,this.template_engine=this.jsoneditor.template,this.iconlib=this.jsoneditor.iconlib,this.translate=this.jsoneditor.translate||f.defaults.translate,this.original_schema=a.schema,this.schema=this.jsoneditor.expandSchema(this.original_schema),this.options=c({},this.options||{},a.schema.options||{},a),a.path||this.schema.id||(this.schema.id="root"),this.path=a.path||"root",this.formname=a.formname||this.path.replace(/\.([^.]+)/g,"[$1]"),this.jsoneditor.options.form_name_root&&(this.formname=this.formname.replace(/^root\[/,this.jsoneditor.options.form_name_root+"[")),this.key=this.path.split(".").pop(),this.parent=a.parent,this.link_watchers=[],a.container&&this.setContainer(a.container)},setContainer:function(a){this.container=a,this.schema.id&&this.container.setAttribute("data-schemaid",this.schema.id),this.schema.type&&"string"==typeof this.schema.type&&this.container.setAttribute("data-schematype",this.schema.type),this.container.setAttribute("data-schemapath",this.path)},preBuild:function(){},build:function(){},postBuild:function(){this.setupWatchListeners(),this.addLinks(),this.setValue(this.getDefault(),!0),this.updateHeaderText(),this.register(),this.onWatchedFieldChange()},setupWatchListeners:function(){var a=this;if(
// Watched fields
this.watched={},this.schema.vars&&(this.schema.watch=this.schema.vars),this.watched_values={},this.watch_listener=function(){a.refreshWatchedFieldValues()&&a.onWatchedFieldChange()},this.register(),this.schema.hasOwnProperty("watch")){var b,c,d,e,f;for(var g in this.schema.watch)if(this.schema.watch.hasOwnProperty(g)){if(b=this.schema.watch[g],Array.isArray(b)){if(b.length<2)continue;c=[b[0]].concat(b[1].split("."))}else c=b.split("."),a.theme.closest(a.container,'[data-schemaid="'+c[0]+'"]')||c.unshift("#");if(d=c.shift(),"#"===d&&(d=a.jsoneditor.schema.id||"root"),
// Find the root node for this template variable
e=a.theme.closest(a.container,'[data-schemaid="'+d+'"]'),!e)throw"Could not find ancestor node with id "+d;
// Keep track of the root node and path for use when rendering the template
f=e.getAttribute("data-schemapath")+"."+c.join("."),a.jsoneditor.watch(f,a.watch_listener),a.watched[g]=f}}
// Dynamic header
this.schema.headerTemplate&&(this.header_template=this.jsoneditor.compileTemplate(this.schema.headerTemplate,this.template_engine))},addLinks:function(){
// Add links
if(!this.no_link_holder&&(this.link_holder=this.theme.getLinksHolder(),this.container.appendChild(this.link_holder),this.schema.links))for(var a=0;a<this.schema.links.length;a++)this.addLink(this.getLink(this.schema.links[a]))},getButton:function(a,b,c){var d="json-editor-btn-"+b;b=this.iconlib?this.iconlib.getIcon(b):null,!b&&c&&(a=c,c=null);var e=this.theme.getButton(a,b,c);return e.className+=" "+d+" ",e},setButtonText:function(a,b,c,d){return c=this.iconlib?this.iconlib.getIcon(c):null,!c&&d&&(b=d,d=null),this.theme.setButtonText(a,b,c,d)},addLink:function(a){this.link_holder&&this.link_holder.appendChild(a)},getLink:function(a){var b,c,d=a.mediaType||"application/javascript",e=d.split("/")[0],f=this.jsoneditor.compileTemplate(a.href,this.template_engine),g=null;
// Image links
if(a.download&&(g=a.download),g&&g!==!0&&(g=this.jsoneditor.compileTemplate(g,this.template_engine)),"image"===e){b=this.theme.getBlockLinkHolder(),c=document.createElement("a"),c.setAttribute("target","_blank");var h=document.createElement("img");this.theme.createImageLink(b,c,h),
// When a watched field changes, update the url  
this.link_watchers.push(function(b){var d=f(b);c.setAttribute("href",d),c.setAttribute("title",a.rel||d),h.setAttribute("src",d)})}else if(["audio","video"].indexOf(e)>=0){b=this.theme.getBlockLinkHolder(),c=this.theme.getBlockLink(),c.setAttribute("target","_blank");var i=document.createElement(e);i.setAttribute("controls","controls"),this.theme.createMediaLink(b,c,i),
// When a watched field changes, update the url  
this.link_watchers.push(function(b){var d=f(b);c.setAttribute("href",d),c.textContent=a.rel||d,i.setAttribute("src",d)})}else c=b=this.theme.getBlockLink(),b.setAttribute("target","_blank"),b.textContent=a.rel,
// When a watched field changes, update the url
this.link_watchers.push(function(c){var d=f(c);b.setAttribute("href",d),b.textContent=a.rel||d});return g&&c&&(g===!0?c.setAttribute("download",""):this.link_watchers.push(function(a){c.setAttribute("download",g(a))})),a["class"]&&(c.className=c.className+" "+a["class"]),b},refreshWatchedFieldValues:function(){if(this.watched_values){var a={},b=!1,c=this;if(this.watched){var d,e;for(var f in this.watched)this.watched.hasOwnProperty(f)&&(e=c.jsoneditor.getEditor(this.watched[f]),d=e?e.getValue():null,c.watched_values[f]!==d&&(b=!0),a[f]=d)}return a.self=this.getValue(),this.watched_values.self!==a.self&&(b=!0),this.watched_values=a,b}},getWatchedFieldValues:function(){return this.watched_values},updateHeaderText:function(){if(this.header)
// If the header has children, only update the text node's value
if(this.header.children.length){for(var a=0;a<this.header.childNodes.length;a++)if(3===this.header.childNodes[a].nodeType){this.header.childNodes[a].nodeValue=this.getHeaderText();break}}else this.header.textContent=this.getHeaderText()},getHeaderText:function(a){return this.header_text?this.header_text:a?this.schema.title:this.getTitle()},onWatchedFieldChange:function(){var a;if(this.header_template){a=c(this.getWatchedFieldValues(),{key:this.key,i:this.key,i0:1*this.key,i1:1*this.key+1,title:this.getTitle()});var b=this.header_template(a);b!==this.header_text&&(this.header_text=b,this.updateHeaderText(),this.notify())}if(this.link_watchers.length){a=this.getWatchedFieldValues();for(var d=0;d<this.link_watchers.length;d++)this.link_watchers[d](a)}},setValue:function(a){this.value=a},getValue:function(){return this.value},refreshValue:function(){},getChildEditors:function(){return!1},destroy:function(){var a=this;this.unregister(this),d(this.watched,function(b,c){a.jsoneditor.unwatch(c,a.watch_listener)}),this.watched=null,this.watched_values=null,this.watch_listener=null,this.header_text=null,this.header_template=null,this.value=null,this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container),this.container=null,this.jsoneditor=null,this.schema=null,this.path=null,this.key=null,this.parent=null},getDefault:function(){if(this.schema["default"])return this.schema["default"];if(this.schema["enum"])return this.schema["enum"][0];var a=this.schema.type||this.schema.oneOf;if(a&&Array.isArray(a)&&(a=a[0]),a&&"object"==typeof a&&(a=a.type),a&&Array.isArray(a)&&(a=a[0]),"string"==typeof a){if("number"===a)return 0;if("boolean"===a)return!1;if("integer"===a)return 0;if("string"===a)return"";if("object"===a)return{};if("array"===a)return[]}return null},getTitle:function(){return this.schema.title||this.key},enable:function(){this.disabled=!1},disable:function(){this.disabled=!0},isEnabled:function(){return!this.disabled},isRequired:function(){return"boolean"==typeof this.schema.required?this.schema.required:this.parent&&this.parent.schema&&Array.isArray(this.parent.schema.required)?this.parent.schema.required.indexOf(this.key)>-1:!!this.jsoneditor.options.required_by_default},getDisplayText:function(a){var b=[],c={};
// Determine how many times each attribute name is used.
// This helps us pick the most distinct display text for the schemas.
d(a,function(a,b){b.title&&(c[b.title]=c[b.title]||0,c[b.title]++),b.description&&(c[b.description]=c[b.description]||0,c[b.description]++),b.format&&(c[b.format]=c[b.format]||0,c[b.format]++),b.type&&(c[b.type]=c[b.type]||0,c[b.type]++)}),
// Determine display text for each element of the array
d(a,function(a,d){var e;
// If it's a simple string
e="string"==typeof d?d:d.title&&c[d.title]<=1?d.title:d.format&&c[d.format]<=1?d.format:d.type&&c[d.type]<=1?d.type:d.description&&c[d.description]<=1?d.descripton:d.title?d.title:d.format?d.format:d.type?d.type:d.description?d.description:JSON.stringify(d).length<50?JSON.stringify(d):"type",b.push(e)});
// Replace identical display text with "text 1", "text 2", etc.
var e={};return d(b,function(a,d){e[d]=e[d]||0,e[d]++,c[d]>1&&(b[a]=d+" "+e[d])}),b},getOption:function(a){try{throw"getOption is deprecated"}catch(b){window.console.error(b)}return this.options[a]},showValidationErrors:function(a){}}),f.defaults.editors["null"]=f.AbstractEditor.extend({getValue:function(){return null},setValue:function(){this.onChange()},getNumColumns:function(){return 2}}),f.defaults.editors.string=f.AbstractEditor.extend({register:function(){this._super(),this.input&&this.input.setAttribute("name",this.formname)},unregister:function(){this._super(),this.input&&this.input.removeAttribute("name")},setValue:function(a,b,c){if((!this.template||c)&&(null===a||"undefined"==typeof a?a="":"object"==typeof a?a=JSON.stringify(a):"string"!=typeof a&&(a=""+a),a!==this.serialized)){
// Sanitize value before setting it
var d=this.sanitize(a);if(this.input.value!==d){this.input.value=d,
// If using SCEditor, update the WYSIWYG
this.sceditor_instance?this.sceditor_instance.val(d):this.epiceditor?this.epiceditor.importFile(null,d):this.ace_editor&&this.ace_editor.setValue(d);var e=c||this.getValue()!==a;this.refreshValue(),b?this.is_dirty=!1:"change"===this.jsoneditor.options.show_errors&&(this.is_dirty=!0),this.adjust_height&&this.adjust_height(this.input),
// Bubble this setValue to parents if the value changed
this.onChange(e)}}},getNumColumns:function(){var a,b=Math.ceil(Math.max(this.getTitle().length,this.schema.maxLength||0,this.schema.minLength||0)/5);return a="textarea"===this.input_type?6:["text","email"].indexOf(this.input_type)>=0?4:2,Math.min(12,Math.max(b,a))},build:function(){var a=this;
// Specific format
if(this.options.compact||(this.header=this.label=this.theme.getFormInputLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description)),this.format=this.schema.format,!this.format&&this.schema.media&&this.schema.media.type&&(this.format=this.schema.media.type.replace(/(^(application|text)\/(x-)?(script\.)?)|(-source$)/g,"")),!this.format&&this.options.default_format&&(this.format=this.options.default_format),this.options.format&&(this.format=this.options.format),this.format)
// Text Area
if("textarea"===this.format)this.input_type="textarea",this.input=this.theme.getTextareaInput();else if("range"===this.format){this.input_type="range";var b=this.schema.minimum||0,c=this.schema.maximum||Math.max(100,b+1),d=1;this.schema.multipleOf&&(b%this.schema.multipleOf&&(b=Math.ceil(b/this.schema.multipleOf)*this.schema.multipleOf),c%this.schema.multipleOf&&(c=Math.floor(c/this.schema.multipleOf)*this.schema.multipleOf),d=this.schema.multipleOf),this.input=this.theme.getRangeInput(b,c,d)}else["actionscript","batchfile","bbcode","c","c++","cpp","coffee","csharp","css","dart","django","ejs","erlang","golang","groovy","handlebars","haskell","haxe","html","ini","jade","java","javascript","json","less","lisp","lua","makefile","markdown","matlab","mysql","objectivec","pascal","perl","pgsql","php","python","r","ruby","sass","scala","scss","smarty","sql","stylus","svg","twig","vbscript","xml","yaml"].indexOf(this.format)>=0?(this.input_type=this.format,this.source_code=!0,this.input=this.theme.getTextareaInput()):(this.input_type=this.format,this.input=this.theme.getFormInputField(this.input_type));else this.input_type="text",this.input=this.theme.getFormInputField(this.input_type);
// minLength, maxLength, and pattern
"undefined"!=typeof this.schema.maxLength&&this.input.setAttribute("maxlength",this.schema.maxLength),"undefined"!=typeof this.schema.pattern?this.input.setAttribute("pattern",this.schema.pattern):"undefined"!=typeof this.schema.minLength&&this.input.setAttribute("pattern",".{"+this.schema.minLength+",}"),this.options.compact?this.container.className+=" compact":this.options.input_width&&(this.input.style.width=this.options.input_width),(this.schema.readOnly||this.schema.readonly||this.schema.template)&&(this.always_disabled=!0,this.input.disabled=!0),this.input.addEventListener("change",function(b){
// Don't allow changing if this field is a template
if(b.preventDefault(),b.stopPropagation(),a.schema.template)return void(this.value=a.value);var c=this.value,d=a.sanitize(c);c!==d&&(this.value=d),a.is_dirty=!0,a.refreshValue(),a.onChange(!0)}),this.options.input_height&&(this.input.style.height=this.options.input_height),this.options.expand_height&&(this.adjust_height=function(a){if(a){var b,c=a.offsetHeight;
// Input too short
if(a.offsetHeight<a.scrollHeight)for(b=0;a.offsetHeight<a.scrollHeight+3&&!(b>100);)b++,c++,a.style.height=c+"px";else{for(b=0;a.offsetHeight>=a.scrollHeight+3&&!(b>100);)b++,c--,a.style.height=c+"px";a.style.height=c+1+"px"}}},this.input.addEventListener("keyup",function(b){a.adjust_height(this)}),this.input.addEventListener("change",function(b){a.adjust_height(this)}),this.adjust_height()),this.format&&this.input.setAttribute("data-schemaformat",this.format),this.control=this.theme.getFormControl(this.label,this.input,this.description),this.container.appendChild(this.control),
// Any special formatting that needs to happen after the input is added to the dom
window.requestAnimationFrame(function(){
// Skip in case the input is only a temporary editor,
// otherwise, in the case of an ace_editor creation,
// it will generate an error trying to append it to the missing parentNode
a.input.parentNode&&a.afterInputReady(),a.adjust_height&&a.adjust_height(a.input)}),
// Compile and store the template
this.schema.template?(this.template=this.jsoneditor.compileTemplate(this.schema.template,this.template_engine),this.refreshValue()):this.refreshValue()},enable:function(){this.always_disabled||(this.input.disabled=!1),this._super()},disable:function(){this.input.disabled=!0,
// TODO: WYSIWYG and Markdown editors
this._super()},afterInputReady:function(){var a,b=this;
// Code editor
if(this.source_code)
// WYSIWYG html and bbcode editor
if(this.options.wysiwyg&&["html","bbcode"].indexOf(this.input_type)>=0&&window.jQuery&&window.jQuery.fn&&window.jQuery.fn.sceditor)a=c({},{plugins:"html"===b.input_type?"xhtml":"bbcode",emoticonsEnabled:!1,width:"100%",height:300},f.plugins.sceditor,b.options.sceditor_options||{}),window.jQuery(b.input).sceditor(a),b.sceditor_instance=window.jQuery(b.input).sceditor("instance"),b.sceditor_instance.blur(function(){
// Get editor's value
var a=window.jQuery("<div>"+b.sceditor_instance.val()+"</div>");
// Remove sceditor spans/divs
window.jQuery("#sceditor-start-marker,#sceditor-end-marker,.sceditor-nlf",a).remove(),
// Set the value and update
b.input.value=a.html(),b.value=b.input.value,b.is_dirty=!0,b.onChange(!0)});else if("markdown"===this.input_type&&window.EpicEditor)this.epiceditor_container=document.createElement("div"),this.input.parentNode.insertBefore(this.epiceditor_container,this.input),this.input.style.display="none",a=c({},f.plugins.epiceditor,{container:this.epiceditor_container,clientSideStorage:!1}),this.epiceditor=new window.EpicEditor(a).load(),this.epiceditor.importFile(null,this.getValue()),this.epiceditor.on("update",function(){var a=b.epiceditor.exportFile();b.input.value=a,b.value=a,b.is_dirty=!0,b.onChange(!0)});else if(window.ace){var d=this.input_type;
// aliases for c/cpp
"cpp"!==d&&"c++"!==d&&"c"!==d||(d="c_cpp"),this.ace_container=document.createElement("div"),this.ace_container.style.width="100%",this.ace_container.style.position="relative",this.ace_container.style.height="400px",this.input.parentNode.insertBefore(this.ace_container,this.input),this.input.style.display="none",this.ace_editor=window.ace.edit(this.ace_container),this.ace_editor.setValue(this.getValue()),
// The theme
f.plugins.ace.theme&&this.ace_editor.setTheme("ace/theme/"+f.plugins.ace.theme),
// The mode
d=window.ace.require("ace/mode/"+d),d&&this.ace_editor.getSession().setMode(new d.Mode),
// Listen for changes
this.ace_editor.on("change",function(){var a=b.ace_editor.getValue();b.input.value=a,b.refreshValue(),b.is_dirty=!0,b.onChange(!0)})}b.theme.afterInputReady(b.input)},refreshValue:function(){this.value=this.input.value,"string"!=typeof this.value&&(this.value=""),this.serialized=this.value},destroy:function(){
// If using SCEditor, destroy the editor instance
this.sceditor_instance?this.sceditor_instance.destroy():this.epiceditor?this.epiceditor.unload():this.ace_editor&&this.ace_editor.destroy(),this.template=null,this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this.label&&this.label.parentNode&&this.label.parentNode.removeChild(this.label),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this._super()},/**
   * This is overridden in derivative editors
   */
sanitize:function(a){return a},/**
   * Re-calculates the value if needed
   */
onWatchedFieldChange:function(){var a;
// If this editor needs to be rendered by a macro template
this.template&&(a=this.getWatchedFieldValues(),this.setValue(this.template(a),!1,!0)),this._super()},showValidationErrors:function(a){var b=this;if("always"===this.jsoneditor.options.show_errors);else if(!this.is_dirty&&this.previous_error_setting===this.jsoneditor.options.show_errors)return;this.previous_error_setting=this.jsoneditor.options.show_errors;var c=[];d(a,function(a,d){d.path===b.path&&c.push(d.message)}),c.length?this.theme.addInputError(this.input,c.join(". ")+"."):this.theme.removeInputError(this.input)}}),f.defaults.editors.number=f.defaults.editors.string.extend({sanitize:function(a){return(a+"").replace(/[^0-9\.\-eE]/g,"")},getNumColumns:function(){return 2},getValue:function(){return 1*this.value}}),f.defaults.editors.integer=f.defaults.editors.number.extend({sanitize:function(a){return a+="",a.replace(/[^0-9\-]/g,"")},getNumColumns:function(){return 2}}),f.defaults.editors.object=f.AbstractEditor.extend({getDefault:function(){return c({},this.schema["default"]||{})},getChildEditors:function(){return this.editors},register:function(){if(this._super(),this.editors)for(var a in this.editors)this.editors.hasOwnProperty(a)&&this.editors[a].register()},unregister:function(){if(this._super(),this.editors)for(var a in this.editors)this.editors.hasOwnProperty(a)&&this.editors[a].unregister()},getNumColumns:function(){return Math.max(Math.min(12,this.maxwidth),3)},enable:function(){if(this.editjson_button&&(this.editjson_button.disabled=!1),this.addproperty_button&&(this.addproperty_button.disabled=!1),this._super(),this.editors)for(var a in this.editors)this.editors.hasOwnProperty(a)&&this.editors[a].enable()},disable:function(){if(this.editjson_button&&(this.editjson_button.disabled=!0),this.addproperty_button&&(this.addproperty_button.disabled=!0),this.hideEditJSON(),this._super(),this.editors)for(var a in this.editors)this.editors.hasOwnProperty(a)&&this.editors[a].disable()},layoutEditors:function(){var a,b,c=this;if(this.row_container){
// Sort editors by propertyOrder
this.property_order=Object.keys(this.editors),this.property_order=this.property_order.sort(function(a,b){var d=c.editors[a].schema.propertyOrder,e=c.editors[b].schema.propertyOrder;return"number"!=typeof d&&(d=1e3),"number"!=typeof e&&(e=1e3),d-e});var e;if("grid"===this.format){var f=[];
// Make almost full rows width 12
// Do this by increasing all editors' sizes proprotionately
// Any left over space goes to the biggest editor
// Don't touch rows with a width of 6 or less
for(d(this.property_order,function(a,b){var d=c.editors[b];if(!d.property_removed){
// See if the editor will fit in any of the existing rows first
for(var e=!1,g=d.options.hidden?0:d.options.grid_columns||d.getNumColumns(),h=d.options.hidden?0:d.container.offsetHeight,i=0;i<f.length;i++)
// If the editor will fit in the row horizontally
f[i].width+g<=12&&(!h||.5*f[i].minh<h&&2*f[i].maxh>h)&&(e=i);
// If there isn't a spot in any of the existing rows, start a new row
e===!1&&(f.push({width:0,minh:999999,maxh:0,editors:[]}),e=f.length-1),f[e].editors.push({key:b,
//editor: editor,
width:g,height:h}),f[e].width+=g,f[e].minh=Math.min(f[e].minh,h),f[e].maxh=Math.max(f[e].maxh,h)}}),a=0;a<f.length;a++)if(f[a].width<12){var g=!1,h=0;for(b=0;b<f[a].editors.length;b++)g===!1?g=b:f[a].editors[b].width>f[a].editors[g].width&&(g=b),f[a].editors[b].width*=12/f[a].width,f[a].editors[b].width=Math.floor(f[a].editors[b].width),h+=f[a].editors[b].width;h<12&&(f[a].editors[g].width+=12-h),f[a].width=12}
// layout hasn't changed
if(this.layout===JSON.stringify(f))return!1;for(this.layout=JSON.stringify(f),
// Layout the form
e=document.createElement("div"),a=0;a<f.length;a++){var i=this.theme.getGridRow();for(e.appendChild(i),b=0;b<f[a].editors.length;b++){var j=f[a].editors[b].key,k=this.editors[j];k.options.hidden?k.container.style.display="none":this.theme.setGridColumnSize(k.container,f[a].editors[b].width),i.appendChild(k.container)}}}else e=document.createElement("div"),d(this.property_order,function(a,b){var d=c.editors[b];if(!d.property_removed){var f=c.theme.getGridRow();e.appendChild(f),d.options.hidden?d.container.style.display="none":c.theme.setGridColumnSize(d.container,12),f.appendChild(d.container)}});this.row_container.innerHTML="",this.row_container.appendChild(e)}},getPropertySchema:function(a){
// Schema declared directly in properties
var b=this.schema.properties[a]||{};b=c({},b);var d=!!this.schema.properties[a];
// Any matching patternProperties should be merged in
if(this.schema.patternProperties)for(var e in this.schema.patternProperties)if(this.schema.patternProperties.hasOwnProperty(e)){var f=new RegExp(e);f.test(a)&&(b.allOf=b.allOf||[],b.allOf.push(this.schema.patternProperties[e]),d=!0)}
// Hasn't matched other rules, use additionalProperties schema
return!d&&this.schema.additionalProperties&&"object"==typeof this.schema.additionalProperties&&(b=c({},this.schema.additionalProperties)),b},preBuild:function(){this._super(),this.editors={},this.cached_editors={};var a=this;
// If the object should be rendered as a table row
if(this.format=this.options.layout||this.options.object_layout||this.schema.format||this.jsoneditor.options.object_layout||"normal",this.schema.properties=this.schema.properties||{},this.minwidth=0,this.maxwidth=0,this.options.table_row)d(this.schema.properties,function(b,c){var d=a.jsoneditor.getEditorClass(c);a.editors[b]=a.jsoneditor.createEditor(d,{jsoneditor:a.jsoneditor,schema:c,path:a.path+"."+b,parent:a,compact:!0,required:!0}),a.editors[b].preBuild();var e=a.editors[b].options.hidden?0:a.editors[b].options.grid_columns||a.editors[b].getNumColumns();a.minwidth+=e,a.maxwidth+=e}),this.no_link_holder=!0;else{if(this.options.table)
// TODO: table display format
throw"Not supported yet";this.schema.defaultProperties||(this.jsoneditor.options.display_required_only||this.options.display_required_only?(this.schema.defaultProperties=[],d(this.schema.properties,function(b,c){a.isRequired({key:b,schema:c})&&a.schema.defaultProperties.push(b)})):a.schema.defaultProperties=Object.keys(a.schema.properties)),
// Increase the grid width to account for padding
a.maxwidth+=1,d(this.schema.defaultProperties,function(b,c){a.addObjectProperty(c,!0),a.editors[c]&&(a.minwidth=Math.max(a.minwidth,a.editors[c].options.grid_columns||a.editors[c].getNumColumns()),a.maxwidth+=a.editors[c].options.grid_columns||a.editors[c].getNumColumns())})}
// Sort editors by propertyOrder
this.property_order=Object.keys(this.editors),this.property_order=this.property_order.sort(function(b,c){var d=a.editors[b].schema.propertyOrder,e=a.editors[c].schema.propertyOrder;return"number"!=typeof d&&(d=1e3),"number"!=typeof e&&(e=1e3),d-e})},build:function(){var a=this;
// If the object should be rendered as a table row
if(this.options.table_row)this.editor_holder=this.container,d(this.editors,function(b,c){var d=a.theme.getTableCell();a.editor_holder.appendChild(d),c.setContainer(d),c.build(),c.postBuild(),a.editors[b].options.hidden&&(d.style.display="none"),a.editors[b].options.input_width&&(d.style.width=a.editors[b].options.input_width)});else{if(this.options.table)
// TODO: table display format
throw"Not supported yet";this.header=document.createElement("span"),this.header.textContent=this.getTitle(),this.title=this.theme.getHeader(this.header),this.container.appendChild(this.title),this.container.style.position="relative",
// Edit JSON modal
this.editjson_holder=this.theme.getModal(),this.editjson_textarea=this.theme.getTextareaInput(),this.editjson_textarea.style.height="170px",this.editjson_textarea.style.width="300px",this.editjson_textarea.style.display="block",this.editjson_save=this.getButton("Save","save","Save"),this.editjson_save.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.saveJSON()}),this.editjson_cancel=this.getButton("Cancel","cancel","Cancel"),this.editjson_cancel.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.hideEditJSON()}),this.editjson_holder.appendChild(this.editjson_textarea),this.editjson_holder.appendChild(this.editjson_save),this.editjson_holder.appendChild(this.editjson_cancel),
// Manage Properties modal
this.addproperty_holder=this.theme.getModal(),this.addproperty_list=document.createElement("div"),this.addproperty_list.style.width="295px",this.addproperty_list.style.maxHeight="160px",this.addproperty_list.style.padding="5px 0",this.addproperty_list.style.overflowY="auto",this.addproperty_list.style.overflowX="hidden",this.addproperty_list.style.paddingLeft="5px",this.addproperty_list.setAttribute("class","property-selector"),this.addproperty_add=this.getButton("add","add","add"),this.addproperty_input=this.theme.getFormInputField("text"),this.addproperty_input.setAttribute("placeholder","Property name..."),this.addproperty_input.style.width="220px",this.addproperty_input.style.marginBottom="0",this.addproperty_input.style.display="inline-block",this.addproperty_add.addEventListener("click",function(b){if(b.preventDefault(),b.stopPropagation(),a.addproperty_input.value){if(a.editors[a.addproperty_input.value])return void window.alert("there is already a property with that name");a.addObjectProperty(a.addproperty_input.value),a.editors[a.addproperty_input.value]&&a.editors[a.addproperty_input.value].disable(),a.onChange(!0)}}),this.addproperty_holder.appendChild(this.addproperty_list),this.addproperty_holder.appendChild(this.addproperty_input),this.addproperty_holder.appendChild(this.addproperty_add);var b=document.createElement("div");b.style.clear="both",this.addproperty_holder.appendChild(b),
// Description
this.schema.description&&(this.description=this.theme.getDescription(this.schema.description),this.container.appendChild(this.description)),
// Validation error placeholder area
this.error_holder=document.createElement("div"),this.container.appendChild(this.error_holder),
// Container for child editor area
this.editor_holder=this.theme.getIndentedPanel(),this.container.appendChild(this.editor_holder),
// Container for rows of child editors
this.row_container=this.theme.getGridContainer(),this.editor_holder.appendChild(this.row_container),d(this.editors,function(b,c){var d=a.theme.getGridColumn();a.row_container.appendChild(d),c.setContainer(d),c.build(),c.postBuild()}),
// Control buttons
this.title_controls=this.theme.getHeaderButtonHolder(),this.editjson_controls=this.theme.getHeaderButtonHolder(),this.addproperty_controls=this.theme.getHeaderButtonHolder(),this.title.appendChild(this.title_controls),this.title.appendChild(this.editjson_controls),this.title.appendChild(this.addproperty_controls),
// Show/Hide button
this.collapsed=!1,this.toggle_button=this.getButton("","collapse",this.translate("button_collapse")),this.title_controls.appendChild(this.toggle_button),this.toggle_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.collapsed?(a.editor_holder.style.display="",a.collapsed=!1,a.setButtonText(a.toggle_button,"","collapse",a.translate("button_collapse"))):(a.editor_holder.style.display="none",a.collapsed=!0,a.setButtonText(a.toggle_button,"","expand",a.translate("button_expand")))}),
// If it should start collapsed
this.options.collapsed&&e(this.toggle_button,"click"),
// Collapse button disabled
this.schema.options&&"undefined"!=typeof this.schema.options.disable_collapse?this.schema.options.disable_collapse&&(this.toggle_button.style.display="none"):this.jsoneditor.options.disable_collapse&&(this.toggle_button.style.display="none"),
// Edit JSON Button
this.editjson_button=this.getButton("JSON","edit","Edit JSON"),this.editjson_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.toggleEditJSON()}),this.editjson_controls.appendChild(this.editjson_button),this.editjson_controls.appendChild(this.editjson_holder),
// Edit JSON Buttton disabled
this.schema.options&&"undefined"!=typeof this.schema.options.disable_edit_json?this.schema.options.disable_edit_json&&(this.editjson_button.style.display="none"):this.jsoneditor.options.disable_edit_json&&(this.editjson_button.style.display="none"),
// Object Properties Button
this.addproperty_button=this.getButton("Properties","edit","Object Properties"),this.addproperty_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.toggleAddProperty()}),this.addproperty_controls.appendChild(this.addproperty_button),this.addproperty_controls.appendChild(this.addproperty_holder),this.refreshAddProperties()}
// Fix table cell ordering
this.options.table_row?(this.editor_holder=this.container,d(this.property_order,function(b,c){a.editor_holder.appendChild(a.editors[c].container)})):(
// Initial layout
this.layoutEditors(),
// Do it again now that we know the approximate heights of elements
this.layoutEditors())},showEditJSON:function(){this.editjson_holder&&(this.hideAddProperty(),
// Position the form directly beneath the button
// TODO: edge detection
this.editjson_holder.style.left=this.editjson_button.offsetLeft+"px",this.editjson_holder.style.top=this.editjson_button.offsetTop+this.editjson_button.offsetHeight+"px",
// Start the textarea with the current value
this.editjson_textarea.value=JSON.stringify(this.getValue(),null,2),
// Disable the rest of the form while editing JSON
this.disable(),this.editjson_holder.style.display="",this.editjson_button.disabled=!1,this.editing_json=!0)},hideEditJSON:function(){this.editjson_holder&&this.editing_json&&(this.editjson_holder.style.display="none",this.enable(),this.editing_json=!1)},saveJSON:function(){if(this.editjson_holder)try{var a=JSON.parse(this.editjson_textarea.value);this.setValue(a),this.hideEditJSON()}catch(b){throw window.alert("invalid JSON"),b}},toggleEditJSON:function(){this.editing_json?this.hideEditJSON():this.showEditJSON()},insertPropertyControlUsingPropertyOrder:function(a,b,c){var d;this.schema.properties[a]&&(d=this.schema.properties[a].propertyOrder),"number"!=typeof d&&(d=1e3),b.propertyOrder=d;for(var e=0;e<c.childNodes.length;e++){var f=c.childNodes[e];if(b.propertyOrder<f.propertyOrder){this.addproperty_list.insertBefore(b,f),b=null;break}}b&&this.addproperty_list.appendChild(b)},addPropertyCheckbox:function(a){var b,c,d,e,f=this;
//control.style.overflowY = 'hidden';
return b=f.theme.getCheckbox(),b.style.width="auto",d=this.schema.properties[a]&&this.schema.properties[a].title?this.schema.properties[a].title:a,c=f.theme.getCheckboxLabel(d),e=f.theme.getFormControl(c,b),e.style.paddingBottom=e.style.marginBottom=e.style.paddingTop=e.style.marginTop=0,e.style.height="auto",this.insertPropertyControlUsingPropertyOrder(a,e,this.addproperty_list),b.checked=a in this.editors,b.addEventListener("change",function(){b.checked?f.addObjectProperty(a):f.removeObjectProperty(a),f.onChange(!0)}),f.addproperty_checkboxes[a]=b,b},showAddProperty:function(){this.addproperty_holder&&(this.hideEditJSON(),
// Position the form directly beneath the button
// TODO: edge detection
this.addproperty_holder.style.left=this.addproperty_button.offsetLeft+"px",this.addproperty_holder.style.top=this.addproperty_button.offsetTop+this.addproperty_button.offsetHeight+"px",
// Disable the rest of the form while editing JSON
this.disable(),this.adding_property=!0,this.addproperty_button.disabled=!1,this.addproperty_holder.style.display="",this.refreshAddProperties())},hideAddProperty:function(){this.addproperty_holder&&this.adding_property&&(this.addproperty_holder.style.display="none",this.enable(),this.adding_property=!1)},toggleAddProperty:function(){this.adding_property?this.hideAddProperty():this.showAddProperty()},removeObjectProperty:function(a){this.editors[a]&&(this.editors[a].unregister(),delete this.editors[a],this.refreshValue(),this.layoutEditors())},addObjectProperty:function(a,b){var c=this;
// Property is already added
if(!this.editors[a]){
// Property was added before and is cached
if(this.cached_editors[a]){if(this.editors[a]=this.cached_editors[a],b)return;this.editors[a].register()}else{if(!(this.canHaveAdditionalProperties()||this.schema.properties&&this.schema.properties[a]))return;var d=c.getPropertySchema(a),e=c.jsoneditor.getEditorClass(d);if(c.editors[a]=c.jsoneditor.createEditor(e,{jsoneditor:c.jsoneditor,schema:d,path:c.path+"."+a,parent:c}),c.editors[a].preBuild(),!b){var f=c.theme.getChildEditorHolder();c.editor_holder.appendChild(f),c.editors[a].setContainer(f),c.editors[a].build(),c.editors[a].postBuild()}c.cached_editors[a]=c.editors[a]}
// If we're only prebuilding the editors, don't refresh values
b||(c.refreshValue(),c.layoutEditors())}},onChildEditorChange:function(a){this.refreshValue(),this._super(a)},canHaveAdditionalProperties:function(){return"boolean"==typeof this.schema.additionalProperties?this.schema.additionalProperties:!this.jsoneditor.options.no_additional_properties},destroy:function(){d(this.cached_editors,function(a,b){b.destroy()}),this.editor_holder&&(this.editor_holder.innerHTML=""),this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.error_holder&&this.error_holder.parentNode&&this.error_holder.parentNode.removeChild(this.error_holder),this.editors=null,this.cached_editors=null,this.editor_holder&&this.editor_holder.parentNode&&this.editor_holder.parentNode.removeChild(this.editor_holder),this.editor_holder=null,this._super()},getValue:function(){var a=this._super();if(this.jsoneditor.options.remove_empty_properties||this.options.remove_empty_properties)for(var b in a)a.hasOwnProperty(b)&&(a[b]||delete a[b]);return a},refreshValue:function(){this.value={};for(var a in this.editors)this.editors.hasOwnProperty(a)&&(this.value[a]=this.editors[a].getValue());this.adding_property&&this.refreshAddProperties()},refreshAddProperties:function(){if(this.options.disable_properties||this.options.disable_properties!==!1&&this.jsoneditor.options.disable_properties)return void(this.addproperty_controls.style.display="none");var a,b=!1,c=!1,d=0,e=!1;
// Get number of editors
for(a in this.editors)this.editors.hasOwnProperty(a)&&d++;
// Determine if we can add back removed properties
b=this.canHaveAdditionalProperties()&&!("undefined"!=typeof this.schema.maxProperties&&d>=this.schema.maxProperties),this.addproperty_checkboxes&&(this.addproperty_list.innerHTML=""),this.addproperty_checkboxes={};
// Check for which editors can't be removed or added back
for(a in this.cached_editors)this.cached_editors.hasOwnProperty(a)&&(this.addPropertyCheckbox(a),this.isRequired(this.cached_editors[a])&&a in this.editors&&(this.addproperty_checkboxes[a].disabled=!0),"undefined"!=typeof this.schema.minProperties&&d<=this.schema.minProperties?(this.addproperty_checkboxes[a].disabled=this.addproperty_checkboxes[a].checked,this.addproperty_checkboxes[a].checked||(e=!0)):a in this.editors?(e=!0,c=!0):b||this.schema.properties.hasOwnProperty(a)?(this.addproperty_checkboxes[a].disabled=!1,e=!0):this.addproperty_checkboxes[a].disabled=!0);this.canHaveAdditionalProperties()&&(e=!0);
// Additional addproperty checkboxes not tied to a current editor
for(a in this.schema.properties)this.schema.properties.hasOwnProperty(a)&&(this.cached_editors[a]||(e=!0,this.addPropertyCheckbox(a)));
// If no editors can be added or removed, hide the modal button
e?this.canHaveAdditionalProperties()?b?this.addproperty_add.disabled=!1:this.addproperty_add.disabled=!0:(this.addproperty_add.style.display="none",this.addproperty_input.style.display="none"):(this.hideAddProperty(),this.addproperty_controls.style.display="none")},isRequired:function(a){return"boolean"==typeof a.schema.required?a.schema.required:Array.isArray(this.schema.required)?this.schema.required.indexOf(a.key)>-1:!!this.jsoneditor.options.required_by_default},setValue:function(a,b){var c=this;a=a||{},("object"!=typeof a||Array.isArray(a))&&(a={}),
// First, set the values for all of the defined properties
d(this.cached_editors,function(d,e){
// Value explicitly set
"undefined"!=typeof a[d]?(c.addObjectProperty(d),e.setValue(a[d],b)):b||c.isRequired(e)?e.setValue(e.getDefault(),b):c.removeObjectProperty(d)}),d(a,function(a,d){c.cached_editors[a]||(c.addObjectProperty(a),c.editors[a]&&c.editors[a].setValue(d,b))}),this.refreshValue(),this.layoutEditors(),this.onChange()},showValidationErrors:function(a){var b=this,c=[],e=[];
// Show errors for this editor
if(d(a,function(a,d){d.path===b.path?c.push(d):e.push(d)}),this.error_holder)if(c.length){this.error_holder.innerHTML="",this.error_holder.style.display="",d(c,function(a,c){b.error_holder.appendChild(b.theme.getErrorMessage(c.message))})}else this.error_holder.style.display="none";
// Show error for the table row if this is inside a table
this.options.table_row&&(c.length?this.theme.addTableRowError(this.container):this.theme.removeTableRowError(this.container)),
// Show errors for child editors
d(this.editors,function(a,b){b.showValidationErrors(e)})}}),f.defaults.editors.array=f.AbstractEditor.extend({getDefault:function(){return this.schema["default"]||[]},register:function(){if(this._super(),this.rows)for(var a=0;a<this.rows.length;a++)this.rows[a].register()},unregister:function(){if(this._super(),this.rows)for(var a=0;a<this.rows.length;a++)this.rows[a].unregister()},getNumColumns:function(){var a=this.getItemInfo(0);
// Tabs require extra horizontal space
// Tabs require extra horizontal space
return this.tabs_holder?Math.max(Math.min(12,a.width+2),4):a.width},enable:function(){if(this.add_row_button&&(this.add_row_button.disabled=!1),this.remove_all_rows_button&&(this.remove_all_rows_button.disabled=!1),this.delete_last_row_button&&(this.delete_last_row_button.disabled=!1),this.rows)for(var a=0;a<this.rows.length;a++)this.rows[a].enable(),this.rows[a].moveup_button&&(this.rows[a].moveup_button.disabled=!1),this.rows[a].movedown_button&&(this.rows[a].movedown_button.disabled=!1),this.rows[a].delete_button&&(this.rows[a].delete_button.disabled=!1);this._super()},disable:function(){if(this.add_row_button&&(this.add_row_button.disabled=!0),this.remove_all_rows_button&&(this.remove_all_rows_button.disabled=!0),this.delete_last_row_button&&(this.delete_last_row_button.disabled=!0),this.rows)for(var a=0;a<this.rows.length;a++)this.rows[a].disable(),this.rows[a].moveup_button&&(this.rows[a].moveup_button.disabled=!0),this.rows[a].movedown_button&&(this.rows[a].movedown_button.disabled=!0),this.rows[a].delete_button&&(this.rows[a].delete_button.disabled=!0);this._super()},preBuild:function(){this._super(),this.rows=[],this.row_cache=[],this.hide_delete_buttons=this.options.disable_array_delete||this.jsoneditor.options.disable_array_delete,this.hide_delete_all_rows_buttons=this.hide_delete_buttons||this.options.disable_array_delete_all_rows||this.jsoneditor.options.disable_array_delete_all_rows,this.hide_delete_last_row_buttons=this.hide_delete_buttons||this.options.disable_array_delete_last_row||this.jsoneditor.options.disable_array_delete_last_row,this.hide_move_buttons=this.options.disable_array_reorder||this.jsoneditor.options.disable_array_reorder,this.hide_add_button=this.options.disable_array_add||this.jsoneditor.options.disable_array_add},build:function(){this.options.compact?(this.panel=this.theme.getIndentedPanel(),this.container.appendChild(this.panel),this.controls=this.theme.getButtonHolder(),this.panel.appendChild(this.controls),this.row_holder=document.createElement("div"),this.panel.appendChild(this.row_holder)):(this.header=document.createElement("span"),this.header.textContent=this.getTitle(),this.title=this.theme.getHeader(this.header),this.container.appendChild(this.title),this.title_controls=this.theme.getHeaderButtonHolder(),this.title.appendChild(this.title_controls),this.schema.description&&(this.description=this.theme.getDescription(this.schema.description),this.container.appendChild(this.description)),this.error_holder=document.createElement("div"),this.container.appendChild(this.error_holder),"tabs"===this.schema.format?(this.controls=this.theme.getHeaderButtonHolder(),this.title.appendChild(this.controls),this.tabs_holder=this.theme.getTabHolder(),this.container.appendChild(this.tabs_holder),this.row_holder=this.theme.getTabContentHolder(this.tabs_holder),this.active_tab=null):(this.panel=this.theme.getIndentedPanel(),this.container.appendChild(this.panel),this.row_holder=document.createElement("div"),this.panel.appendChild(this.row_holder),this.controls=this.theme.getButtonHolder(),this.panel.appendChild(this.controls))),
// Add controls
this.addControls()},onChildEditorChange:function(a){this.refreshValue(),this.refreshTabs(!0),this._super(a)},getItemTitle:function(){if(!this.item_title)if(this.schema.items&&!Array.isArray(this.schema.items)){var a=this.jsoneditor.expandRefs(this.schema.items);this.item_title=a.title||"item"}else this.item_title="item";return this.item_title},getItemSchema:function(a){return Array.isArray(this.schema.items)?a>=this.schema.items.length?this.schema.additionalItems===!0?{}:this.schema.additionalItems?c({},this.schema.additionalItems):void 0:c({},this.schema.items[a]):this.schema.items?c({},this.schema.items):{}},getItemInfo:function(a){var b=this.getItemSchema(a);
// Check if it's cached
this.item_info=this.item_info||{};var c=JSON.stringify(b);
// Get the schema for this item
return"undefined"!=typeof this.item_info[c]?this.item_info[c]:(b=this.jsoneditor.expandRefs(b),this.item_info[c]={title:b.title||"item","default":b["default"],width:12,child_editors:b.properties||b.items},this.item_info[c])},getElementEditor:function(a){var b=this.getItemInfo(a),c=this.getItemSchema(a);c=this.jsoneditor.expandRefs(c),c.title=b.title+" "+(a+1);var d,e=this.jsoneditor.getEditorClass(c);d=this.tabs_holder?this.theme.getTabContent():b.child_editors?this.theme.getChildEditorHolder():this.theme.getIndentedPanel(),this.row_holder.appendChild(d);var f=this.jsoneditor.createEditor(e,{jsoneditor:this.jsoneditor,schema:c,container:d,path:this.path+"."+a,parent:this,required:!0});return f.preBuild(),f.build(),f.postBuild(),f.title_controls||(f.array_controls=this.theme.getButtonHolder(),d.appendChild(f.array_controls)),f},destroy:function(){this.empty(!0),this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this.row_holder&&this.row_holder.parentNode&&this.row_holder.parentNode.removeChild(this.row_holder),this.controls&&this.controls.parentNode&&this.controls.parentNode.removeChild(this.controls),this.panel&&this.panel.parentNode&&this.panel.parentNode.removeChild(this.panel),this.rows=this.row_cache=this.title=this.description=this.row_holder=this.panel=this.controls=null,this._super()},empty:function(a){if(this.rows){var b=this;d(this.rows,function(c,d){a&&(d.tab&&d.tab.parentNode&&d.tab.parentNode.removeChild(d.tab),b.destroyRow(d,!0),b.row_cache[c]=null),b.rows[c]=null}),b.rows=[],a&&(b.row_cache=[])}},destroyRow:function(a,b){var c=a.container;b?(a.destroy(),c.parentNode&&c.parentNode.removeChild(c),a.tab&&a.tab.parentNode&&a.tab.parentNode.removeChild(a.tab)):(a.tab&&(a.tab.style.display="none"),c.style.display="none",a.unregister())},getMax:function(){return Array.isArray(this.schema.items)&&this.schema.additionalItems===!1?Math.min(this.schema.items.length,this.schema.maxItems||1/0):this.schema.maxItems||1/0},refreshTabs:function(a){var b=this;d(this.rows,function(c,d){d.tab&&(a?d.tab_text.textContent=d.getHeaderText():d.tab===b.active_tab?(b.theme.markTabActive(d.tab),d.container.style.display=""):(b.theme.markTabInactive(d.tab),d.container.style.display="none"))})},setValue:function(a,b){
// Update the array's value, adding/removing rows when necessary
a=a||[],Array.isArray(a)||(a=[a]);var c=JSON.stringify(a);if(c!==this.serialized){
// Make sure value has between minItems and maxItems items in it
if(this.schema.minItems)for(;a.length<this.schema.minItems;)a.push(this.getItemInfo(a.length)["default"]);this.getMax()&&a.length>this.getMax()&&(a=a.slice(0,this.getMax()));var e=this;d(a,function(a,c){e.rows[a]?
// TODO: don't set the row's value if it hasn't changed
e.rows[a].setValue(c,b):e.row_cache[a]?(e.rows[a]=e.row_cache[a],e.rows[a].setValue(c,b),e.rows[a].container.style.display="",e.rows[a].tab&&(e.rows[a].tab.style.display=""),e.rows[a].register()):e.addRow(c,b)});for(var f=a.length;f<e.rows.length;f++)e.destroyRow(e.rows[f]),e.rows[f]=null;e.rows=e.rows.slice(0,a.length);
// Set the active tab
var g=null;d(e.rows,function(a,b){if(b.tab===e.active_tab)return g=b.tab,!1}),!g&&e.rows.length&&(g=e.rows[0].tab),e.active_tab=g,e.refreshValue(b),e.refreshTabs(!0),e.refreshTabs(),e.onChange()}},refreshValue:function(a){var b=this,c=this.value?this.value.length:0;if(this.value=[],d(this.rows,function(a,c){
// Get the value for this editor
b.value[a]=c.getValue()}),c!==this.value.length||a){
// If we currently have minItems items in the array
var e=this.schema.minItems&&this.schema.minItems>=this.rows.length;d(this.rows,function(a,c){
// Hide the move down button for the last row
c.movedown_button&&(a===b.rows.length-1?c.movedown_button.style.display="none":c.movedown_button.style.display=""),
// Hide the delete button if we have minItems items
c.delete_button&&(e?c.delete_button.style.display="none":c.delete_button.style.display=""),
// Get the value for this editor
b.value[a]=c.getValue()});var f=!1;this.value.length?1===this.value.length?(this.remove_all_rows_button.style.display="none",
// If there are minItems items in the array, or configured to hide the delete_last_row button, hide the delete button beneath the rows
e||this.hide_delete_last_row_buttons?this.delete_last_row_button.style.display="none":(this.delete_last_row_button.style.display="",f=!0)):(e||this.hide_delete_last_row_buttons?this.delete_last_row_button.style.display="none":(this.delete_last_row_button.style.display="",f=!0),e||this.hide_delete_all_rows_buttons?this.remove_all_rows_button.style.display="none":(this.remove_all_rows_button.style.display="",f=!0)):(this.delete_last_row_button.style.display="none",this.remove_all_rows_button.style.display="none"),
// If there are maxItems in the array, hide the add button beneath the rows
this.getMax()&&this.getMax()<=this.rows.length||this.hide_add_button?this.add_row_button.style.display="none":(this.add_row_button.style.display="",f=!0),!this.collapsed&&f?this.controls.style.display="inline-block":this.controls.style.display="none"}},addRow:function(a,b){var c=this,e=this.rows.length;c.rows[e]=this.getElementEditor(e),c.row_cache[e]=c.rows[e],c.tabs_holder&&(c.rows[e].tab_text=document.createElement("span"),c.rows[e].tab_text.textContent=c.rows[e].getHeaderText(),c.rows[e].tab=c.theme.getTab(c.rows[e].tab_text),c.rows[e].tab.addEventListener("click",function(a){c.active_tab=c.rows[e].tab,c.refreshTabs(),a.preventDefault(),a.stopPropagation()}),c.theme.addTab(c.tabs_holder,c.rows[e].tab));var f=c.rows[e].title_controls||c.rows[e].array_controls;
// Buttons to delete row, move row up, and move row down
c.hide_delete_buttons||(c.rows[e].delete_button=this.getButton(c.getItemTitle(),"delete",this.translate("button_delete_row_title",[c.getItemTitle()])),c.rows[e].delete_button.className+=" delete",c.rows[e].delete_button.setAttribute("data-i",e),c.rows[e].delete_button.addEventListener("click",function(a){a.preventDefault(),a.stopPropagation();var b=1*this.getAttribute("data-i"),e=c.getValue(),f=[],g=null;d(e,function(a,d){
// If the one we're deleting is the active tab
// Make the next tab active if there is one
// Note: the next tab is going to be the current tab after deletion
return a===b?void(c.rows[a].tab===c.active_tab&&(c.rows[a+1]?g=c.rows[a].tab:a&&(g=c.rows[a-1].tab))):void f.push(d)}),c.setValue(f),g&&(c.active_tab=g,c.refreshTabs()),c.onChange(!0)}),f&&f.appendChild(c.rows[e].delete_button)),e&&!c.hide_move_buttons&&(c.rows[e].moveup_button=this.getButton("","moveup",this.translate("button_move_up_title")),c.rows[e].moveup_button.className+=" moveup",c.rows[e].moveup_button.setAttribute("data-i",e),c.rows[e].moveup_button.addEventListener("click",function(a){a.preventDefault(),a.stopPropagation();var b=1*this.getAttribute("data-i");if(!(b<=0)){var d=c.getValue(),e=d[b-1];d[b-1]=d[b],d[b]=e,c.setValue(d),c.active_tab=c.rows[b-1].tab,c.refreshTabs(),c.onChange(!0)}}),f&&f.appendChild(c.rows[e].moveup_button)),c.hide_move_buttons||(c.rows[e].movedown_button=this.getButton("","movedown",this.translate("button_move_down_title")),c.rows[e].movedown_button.className+=" movedown",c.rows[e].movedown_button.setAttribute("data-i",e),c.rows[e].movedown_button.addEventListener("click",function(a){a.preventDefault(),a.stopPropagation();var b=1*this.getAttribute("data-i"),d=c.getValue();if(!(b>=d.length-1)){var e=d[b+1];d[b+1]=d[b],d[b]=e,c.setValue(d),c.active_tab=c.rows[b+1].tab,c.refreshTabs(),c.onChange(!0)}}),f&&f.appendChild(c.rows[e].movedown_button)),a&&c.rows[e].setValue(a,b),c.refreshTabs()},addControls:function(){var a=this;this.collapsed=!1,this.toggle_button=this.getButton("","collapse",this.translate("button_collapse")),this.title_controls.appendChild(this.toggle_button);var b=a.row_holder.style.display,c=a.controls.style.display;this.toggle_button.addEventListener("click",function(d){d.preventDefault(),d.stopPropagation(),a.collapsed?(a.collapsed=!1,a.panel&&(a.panel.style.display=""),a.row_holder.style.display=b,a.tabs_holder&&(a.tabs_holder.style.display=""),a.controls.style.display=c,a.setButtonText(this,"","collapse",a.translate("button_collapse"))):(a.collapsed=!0,a.row_holder.style.display="none",a.tabs_holder&&(a.tabs_holder.style.display="none"),a.controls.style.display="none",a.panel&&(a.panel.style.display="none"),a.setButtonText(this,"","expand",a.translate("button_expand")))}),
// If it should start collapsed
this.options.collapsed&&e(this.toggle_button,"click"),
// Collapse button disabled
this.schema.options&&"undefined"!=typeof this.schema.options.disable_collapse?this.schema.options.disable_collapse&&(this.toggle_button.style.display="none"):this.jsoneditor.options.disable_collapse&&(this.toggle_button.style.display="none"),
// Add "new row" and "delete last" buttons below editor
this.add_row_button=this.getButton(this.getItemTitle(),"add",this.translate("button_add_row_title",[this.getItemTitle()])),this.add_row_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation();var c=a.rows.length;a.row_cache[c]?(a.rows[c]=a.row_cache[c],a.rows[c].setValue(a.rows[c].getDefault(),!0),a.rows[c].container.style.display="",a.rows[c].tab&&(a.rows[c].tab.style.display=""),a.rows[c].register()):a.addRow(),a.active_tab=a.rows[c].tab,a.refreshTabs(),a.refreshValue(),a.onChange(!0)}),a.controls.appendChild(this.add_row_button),this.delete_last_row_button=this.getButton(this.translate("button_delete_last",[this.getItemTitle()]),"delete",this.translate("button_delete_last_title",[this.getItemTitle()])),this.delete_last_row_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation();var c=a.getValue(),d=null;a.rows.length>1&&a.rows[a.rows.length-1].tab===a.active_tab&&(d=a.rows[a.rows.length-2].tab),c.pop(),a.setValue(c),d&&(a.active_tab=d,a.refreshTabs()),a.onChange(!0)}),a.controls.appendChild(this.delete_last_row_button),this.remove_all_rows_button=this.getButton(this.translate("button_delete_all"),"delete",this.translate("button_delete_all_title")),this.remove_all_rows_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.setValue([]),a.onChange(!0)}),a.controls.appendChild(this.remove_all_rows_button),a.tabs&&(this.add_row_button.style.width="100%",this.add_row_button.style.textAlign="left",this.add_row_button.style.marginBottom="3px",this.delete_last_row_button.style.width="100%",this.delete_last_row_button.style.textAlign="left",this.delete_last_row_button.style.marginBottom="3px",this.remove_all_rows_button.style.width="100%",this.remove_all_rows_button.style.textAlign="left",this.remove_all_rows_button.style.marginBottom="3px")},showValidationErrors:function(a){var b=this,c=[],e=[];
// Show errors for this editor
if(d(a,function(a,d){d.path===b.path?c.push(d):e.push(d)}),this.error_holder)if(c.length){this.error_holder.innerHTML="",this.error_holder.style.display="",d(c,function(a,c){b.error_holder.appendChild(b.theme.getErrorMessage(c.message))})}else this.error_holder.style.display="none";
// Show errors for child editors
d(this.rows,function(a,b){b.showValidationErrors(e)})}}),f.defaults.editors.table=f.defaults.editors.array.extend({register:function(){if(this._super(),this.rows)for(var a=0;a<this.rows.length;a++)this.rows[a].register()},unregister:function(){if(this._super(),this.rows)for(var a=0;a<this.rows.length;a++)this.rows[a].unregister()},getNumColumns:function(){return Math.max(Math.min(12,this.width),3)},preBuild:function(){var a=this.jsoneditor.expandRefs(this.schema.items||{});this.item_title=a.title||"row",this.item_default=a["default"]||null,this.item_has_child_editors=a.properties||a.items,this.width=12,this._super()},build:function(){var a=this;this.table=this.theme.getTable(),this.container.appendChild(this.table),this.thead=this.theme.getTableHead(),this.table.appendChild(this.thead),this.header_row=this.theme.getTableRow(),this.thead.appendChild(this.header_row),this.row_holder=this.theme.getTableBody(),this.table.appendChild(this.row_holder);
// Determine the default value of array element
var b=this.getElementEditor(0,!0);if(this.item_default=b.getDefault(),this.width=b.getNumColumns()+2,this.options.compact?(this.panel=document.createElement("div"),this.container.appendChild(this.panel)):(this.title=this.theme.getHeader(this.getTitle()),this.container.appendChild(this.title),this.title_controls=this.theme.getHeaderButtonHolder(),this.title.appendChild(this.title_controls),this.schema.description&&(this.description=this.theme.getDescription(this.schema.description),this.container.appendChild(this.description)),this.panel=this.theme.getIndentedPanel(),this.container.appendChild(this.panel),this.error_holder=document.createElement("div"),this.panel.appendChild(this.error_holder)),this.panel.appendChild(this.table),this.controls=this.theme.getButtonHolder(),this.panel.appendChild(this.controls),this.item_has_child_editors)for(var c=b.getChildEditors(),d=b.property_order||Object.keys(c),e=0;e<d.length;e++){var f=a.theme.getTableHeaderCell(c[d[e]].getTitle());c[d[e]].options.hidden&&(f.style.display="none"),a.header_row.appendChild(f)}else a.header_row.appendChild(a.theme.getTableHeaderCell(this.item_title));b.destroy(),this.row_holder.innerHTML="",
// Row Controls column
this.controls_header_cell=a.theme.getTableHeaderCell(" "),a.header_row.appendChild(this.controls_header_cell),
// Add controls
this.addControls()},onChildEditorChange:function(a){this.refreshValue(),this._super()},getItemDefault:function(){return c({},{"default":this.item_default})["default"]},getItemTitle:function(){return this.item_title},getElementEditor:function(a,b){var d=c({},this.schema.items),e=this.jsoneditor.getEditorClass(d,this.jsoneditor),f=this.row_holder.appendChild(this.theme.getTableRow()),g=f;this.item_has_child_editors||(g=this.theme.getTableCell(),f.appendChild(g));var h=this.jsoneditor.createEditor(e,{jsoneditor:this.jsoneditor,schema:d,container:g,path:this.path+"."+a,parent:this,compact:!0,table_row:!0});return h.preBuild(),b||(h.build(),h.postBuild(),h.controls_cell=f.appendChild(this.theme.getTableCell()),h.row=f,h.table_controls=this.theme.getButtonHolder(),h.controls_cell.appendChild(h.table_controls),h.table_controls.style.margin=0,h.table_controls.style.padding=0),h},destroy:function(){this.innerHTML="",this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this.row_holder&&this.row_holder.parentNode&&this.row_holder.parentNode.removeChild(this.row_holder),this.table&&this.table.parentNode&&this.table.parentNode.removeChild(this.table),this.panel&&this.panel.parentNode&&this.panel.parentNode.removeChild(this.panel),this.rows=this.title=this.description=this.row_holder=this.table=this.panel=null,this._super()},setValue:function(a,b){
// Make sure value has between minItems and maxItems items in it
if(
// Update the array's value, adding/removing rows when necessary
a=a||[],this.schema.minItems)for(;a.length<this.schema.minItems;)a.push(this.getItemDefault());this.schema.maxItems&&a.length>this.schema.maxItems&&(a=a.slice(0,this.schema.maxItems));var c=JSON.stringify(a);if(c!==this.serialized){var e=!1,f=this;d(a,function(a,b){f.rows[a]?
// TODO: don't set the row's value if it hasn't changed
f.rows[a].setValue(b):(f.addRow(b),e=!0)});for(var g=a.length;g<f.rows.length;g++){var h=f.rows[g].container;f.item_has_child_editors||f.rows[g].row.parentNode.removeChild(f.rows[g].row),f.rows[g].destroy(),h.parentNode&&h.parentNode.removeChild(h),f.rows[g]=null,e=!0}f.rows=f.rows.slice(0,a.length),f.refreshValue(),(e||b)&&f.refreshRowButtons(),f.onChange()}},refreshRowButtons:function(){var a=this,b=this.schema.minItems&&this.schema.minItems>=this.rows.length,c=!1;d(this.rows,function(d,e){
// Hide the move down button for the last row
e.movedown_button&&(d===a.rows.length-1?e.movedown_button.style.display="none":(c=!0,e.movedown_button.style.display="")),
// Hide the delete button if we have minItems items
e.delete_button&&(b?e.delete_button.style.display="none":(c=!0,e.delete_button.style.display="")),e.moveup_button&&(c=!0)}),
// Show/hide controls column in table
d(this.rows,function(a,b){c?b.controls_cell.style.display="":b.controls_cell.style.display="none"}),c?this.controls_header_cell.style.display="":this.controls_header_cell.style.display="none";var e=!1;this.value.length?1===this.value.length?(this.table.style.display="",this.remove_all_rows_button.style.display="none",
// If there are minItems items in the array, or configured to hide the delete_last_row button, hide the delete button beneath the rows
b||this.hide_delete_last_row_buttons?this.delete_last_row_button.style.display="none":(this.delete_last_row_button.style.display="",e=!0)):(this.table.style.display="",b||this.hide_delete_last_row_buttons?this.delete_last_row_button.style.display="none":(this.delete_last_row_button.style.display="",e=!0),b||this.hide_delete_all_rows_buttons?this.remove_all_rows_button.style.display="none":(this.remove_all_rows_button.style.display="",e=!0)):(this.delete_last_row_button.style.display="none",this.remove_all_rows_button.style.display="none",this.table.style.display="none"),
// If there are maxItems in the array, hide the add button beneath the rows
this.schema.maxItems&&this.schema.maxItems<=this.rows.length||this.hide_add_button?this.add_row_button.style.display="none":(this.add_row_button.style.display="",e=!0),e?this.controls.style.display="":this.controls.style.display="none"},refreshValue:function(){var a=this;this.value=[],d(this.rows,function(b,c){
// Get the value for this editor
a.value[b]=c.getValue()}),this.serialized=JSON.stringify(this.value)},addRow:function(a){var b=this,c=this.rows.length;b.rows[c]=this.getElementEditor(c);var e=b.rows[c].table_controls;
// Buttons to delete row, move row up, and move row down
this.hide_delete_buttons||(b.rows[c].delete_button=this.getButton("","delete",this.translate("button_delete_row_title_short")),b.rows[c].delete_button.className+=" delete",b.rows[c].delete_button.setAttribute("data-i",c),b.rows[c].delete_button.addEventListener("click",function(a){a.preventDefault(),a.stopPropagation();var c=1*this.getAttribute("data-i"),e=b.getValue(),f=[];d(e,function(a,b){a!==c&&// If this is the one we're deleting
f.push(b)}),b.setValue(f),b.onChange(!0)}),e.appendChild(b.rows[c].delete_button)),c&&!this.hide_move_buttons&&(b.rows[c].moveup_button=this.getButton("","moveup",this.translate("button_move_up_title")),b.rows[c].moveup_button.className+=" moveup",b.rows[c].moveup_button.setAttribute("data-i",c),b.rows[c].moveup_button.addEventListener("click",function(a){a.preventDefault(),a.stopPropagation();var c=1*this.getAttribute("data-i");if(!(c<=0)){var d=b.getValue(),e=d[c-1];d[c-1]=d[c],d[c]=e,b.setValue(d),b.onChange(!0)}}),e.appendChild(b.rows[c].moveup_button)),this.hide_move_buttons||(b.rows[c].movedown_button=this.getButton("","movedown",this.translate("button_move_down_title")),b.rows[c].movedown_button.className+=" movedown",b.rows[c].movedown_button.setAttribute("data-i",c),b.rows[c].movedown_button.addEventListener("click",function(a){a.preventDefault(),a.stopPropagation();var c=1*this.getAttribute("data-i"),d=b.getValue();if(!(c>=d.length-1)){var e=d[c+1];d[c+1]=d[c],d[c]=e,b.setValue(d),b.onChange(!0)}}),e.appendChild(b.rows[c].movedown_button)),a&&b.rows[c].setValue(a)},addControls:function(){var a=this;this.collapsed=!1,this.toggle_button=this.getButton("","collapse",this.translate("button_collapse")),this.title_controls&&(this.title_controls.appendChild(this.toggle_button),this.toggle_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.collapsed?(a.collapsed=!1,a.panel.style.display="",a.setButtonText(this,"","collapse",a.translate("button_collapse"))):(a.collapsed=!0,a.panel.style.display="none",a.setButtonText(this,"","expand",a.translate("button_expand")))}),
// If it should start collapsed
this.options.collapsed&&e(this.toggle_button,"click"),
// Collapse button disabled
this.schema.options&&"undefined"!=typeof this.schema.options.disable_collapse?this.schema.options.disable_collapse&&(this.toggle_button.style.display="none"):this.jsoneditor.options.disable_collapse&&(this.toggle_button.style.display="none")),
// Add "new row" and "delete last" buttons below editor
this.add_row_button=this.getButton(this.getItemTitle(),"add",this.translate("button_add_row_title",[this.getItemTitle()])),this.add_row_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.addRow(),a.refreshValue(),a.refreshRowButtons(),a.onChange(!0)}),a.controls.appendChild(this.add_row_button),this.delete_last_row_button=this.getButton(this.translate("button_delete_last",[this.getItemTitle()]),"delete",this.translate("button_delete_last_title",[this.getItemTitle()])),this.delete_last_row_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation();var c=a.getValue();c.pop(),a.setValue(c),a.onChange(!0)}),a.controls.appendChild(this.delete_last_row_button),this.remove_all_rows_button=this.getButton(this.translate("button_delete_all"),"delete",this.translate("button_delete_all_title")),this.remove_all_rows_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.setValue([]),a.onChange(!0)}),a.controls.appendChild(this.remove_all_rows_button)}}),
// Multiple Editor (for when `type` is an array)
f.defaults.editors.multiple=f.AbstractEditor.extend({register:function(){if(this.editors){for(var a=0;a<this.editors.length;a++)this.editors[a]&&this.editors[a].unregister();this.editors[this.type]&&this.editors[this.type].register()}this._super()},unregister:function(){if(this._super(),this.editors)for(var a=0;a<this.editors.length;a++)this.editors[a]&&this.editors[a].unregister()},getNumColumns:function(){return this.editors[this.type]?Math.max(this.editors[this.type].getNumColumns(),4):4},enable:function(){if(this.editors)for(var a=0;a<this.editors.length;a++)this.editors[a]&&this.editors[a].enable();this.switcher.disabled=!1,this._super()},disable:function(){if(this.editors)for(var a=0;a<this.editors.length;a++)this.editors[a]&&this.editors[a].disable();this.switcher.disabled=!0,this._super()},switchEditor:function(a){var b=this;this.editors[a]||this.buildChildEditor(a);var c=b.getValue();b.type=a,b.register(),d(b.editors,function(a,d){d&&(b.type===a?(b.keep_values&&d.setValue(c,!0),d.container.style.display=""):d.container.style.display="none")}),b.refreshValue(),b.refreshHeaderText()},buildChildEditor:function(a){var b=this,d=this.types[a],e=b.theme.getChildEditorHolder();b.editor_holder.appendChild(e);var f;"string"==typeof d?(f=c({},b.schema),f.type=d):(f=c({},b.schema,d),f=b.jsoneditor.expandRefs(f),
// If we need to merge `required` arrays
d.required&&Array.isArray(d.required)&&b.schema.required&&Array.isArray(b.schema.required)&&(f.required=b.schema.required.concat(d.required)));var g=b.jsoneditor.getEditorClass(f);b.editors[a]=b.jsoneditor.createEditor(g,{jsoneditor:b.jsoneditor,schema:f,container:e,path:b.path,parent:b,required:!0}),b.editors[a].preBuild(),b.editors[a].build(),b.editors[a].postBuild(),b.editors[a].header&&(b.editors[a].header.style.display="none"),b.editors[a].option=b.switcher_options[a],e.addEventListener("change_header_text",function(){b.refreshHeaderText()}),a!==b.type&&(e.style.display="none")},preBuild:function(){if(this.types=[],this.type=0,this.editors=[],this.validators=[],this.keep_values=!0,"undefined"!=typeof this.jsoneditor.options.keep_oneof_values&&(this.keep_values=this.jsoneditor.options.keep_oneof_values),"undefined"!=typeof this.options.keep_oneof_values&&(this.keep_values=this.options.keep_oneof_values),this.schema.oneOf)this.oneOf=!0,this.types=this.schema.oneOf,delete this.schema.oneOf;else if(this.schema.anyOf)this.anyOf=!0,this.types=this.schema.anyOf,delete this.schema.anyOf;else{if(this.schema.type&&"any"!==this.schema.type)Array.isArray(this.schema.type)?this.types=this.schema.type:this.types=[this.schema.type];else
// If any of these primitive types are disallowed
if(this.types=["string","number","integer","boolean","object","array","null"],this.schema.disallow){var a=this.schema.disallow;"object"==typeof a&&Array.isArray(a)||(a=[a]);var b=[];d(this.types,function(c,d){a.indexOf(d)===-1&&b.push(d)}),this.types=b}delete this.schema.type}this.display_text=this.getDisplayText(this.types)},build:function(){var a=this,b=this.container;this.header=this.label=this.theme.getFormInputLabel(this.getTitle()),this.container.appendChild(this.header),this.switcher=this.theme.getSwitcher(this.display_text),b.appendChild(this.switcher),this.switcher.addEventListener("change",function(b){b.preventDefault(),b.stopPropagation(),a.switchEditor(a.display_text.indexOf(this.value)),a.onChange(!0)}),this.editor_holder=document.createElement("div"),b.appendChild(this.editor_holder);var e={};a.jsoneditor.options.custom_validators&&(e.custom_validators=a.jsoneditor.options.custom_validators),this.switcher_options=this.theme.getSwitcherOptions(this.switcher),d(this.types,function(b,d){a.editors[b]=!1;var g;"string"==typeof d?(g=c({},a.schema),g.type=d):(g=c({},a.schema,d),
// If we need to merge `required` arrays
d.required&&Array.isArray(d.required)&&a.schema.required&&Array.isArray(a.schema.required)&&(g.required=a.schema.required.concat(d.required))),a.validators[b]=new f.Validator(a.jsoneditor,g,e)}),this.switchEditor(0)},onChildEditorChange:function(a){this.editors[this.type]&&(this.refreshValue(),this.refreshHeaderText()),this._super()},refreshHeaderText:function(){var a=this.getDisplayText(this.types);d(this.switcher_options,function(b,c){c.textContent=a[b]})},refreshValue:function(){this.value=this.editors[this.type].getValue()},setValue:function(a,b){
// Determine type by getting the first one that validates
var c=this;d(this.validators,function(b,d){if(!d.validate(a).length)return c.type=b,c.switcher.value=c.display_text[b],!1}),this.switchEditor(this.type),this.editors[this.type].setValue(a,b),this.refreshValue(),c.onChange()},destroy:function(){d(this.editors,function(a,b){b&&b.destroy()}),this.editor_holder&&this.editor_holder.parentNode&&this.editor_holder.parentNode.removeChild(this.editor_holder),this.switcher&&this.switcher.parentNode&&this.switcher.parentNode.removeChild(this.switcher),this._super()},showValidationErrors:function(a){var b=this;
// oneOf and anyOf error paths need to remove the oneOf[i] part before passing to child editors
if(this.oneOf||this.anyOf){var e=this.oneOf?"oneOf":"anyOf";d(this.editors,function(f,g){if(g){var h=b.path+"."+e+"["+f+"]",i=[];d(a,function(a,d){if(d.path.substr(0,h.length)===h){var e=c({},d);e.path=b.path+e.path.substr(h.length),i.push(e)}}),g.showValidationErrors(i)}})}else d(this.editors,function(b,c){c&&c.showValidationErrors(a)})}}),
// Enum Editor (used for objects and arrays with enumerated values)
f.defaults.editors["enum"]=f.AbstractEditor.extend({getNumColumns:function(){return 4},build:function(){this.container;this.title=this.header=this.label=this.theme.getFormInputLabel(this.getTitle()),this.container.appendChild(this.title),this.options.enum_titles=this.options.enum_titles||[],this["enum"]=this.schema["enum"],this.selected=0,this.select_options=[],this.html_values=[];for(var a=this,b=0;b<this["enum"].length;b++)this.select_options[b]=this.options.enum_titles[b]||"Value "+(b+1),this.html_values[b]=this.getHTML(this["enum"][b]);
// Switcher
this.switcher=this.theme.getSwitcher(this.select_options),this.container.appendChild(this.switcher),
// Display area
this.display_area=this.theme.getIndentedPanel(),this.container.appendChild(this.display_area),this.options.hide_display&&(this.display_area.style.display="none"),this.switcher.addEventListener("change",function(){a.selected=a.select_options.indexOf(this.value),a.value=a["enum"][a.selected],a.refreshValue(),a.onChange(!0)}),this.value=this["enum"][0],this.refreshValue(),1===this["enum"].length&&(this.switcher.style.display="none")},refreshValue:function(){var a=this;a.selected=-1;var b=JSON.stringify(this.value);return d(this["enum"],function(c,d){if(b===JSON.stringify(d))return a.selected=c,!1}),a.selected<0?void a.setValue(a["enum"][0]):(this.switcher.value=this.select_options[this.selected],void(this.display_area.innerHTML=this.html_values[this.selected]))},enable:function(){this.always_disabled||(this.switcher.disabled=!1),this._super()},disable:function(){this.switcher.disabled=!0,this._super()},getHTML:function(a){var b=this;if(null===a)return"<em>null</em>";if("object"==typeof a){
// TODO: use theme
var c="";return d(a,function(d,e){var f=b.getHTML(e);
// Add the keys to object children
Array.isArray(a)||(
// TODO: use theme
f="<div><em>"+d+"</em>: "+f+"</div>"),
// TODO: use theme
c+="<li>"+f+"</li>"}),c=Array.isArray(a)?"<ol>"+c+"</ol>":"<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>"+c+"</ul>"}return"boolean"==typeof a?a?"true":"false":"string"==typeof a?a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):a},setValue:function(a){this.value!==a&&(this.value=a,this.refreshValue(),this.onChange())},destroy:function(){this.display_area&&this.display_area.parentNode&&this.display_area.parentNode.removeChild(this.display_area),this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.switcher&&this.switcher.parentNode&&this.switcher.parentNode.removeChild(this.switcher),this._super()}}),f.defaults.editors.select=f.AbstractEditor.extend({setValue:function(a,b){a=this.typecast(a||"");
// Sanitize value before setting it
var c=a;this.enum_values.indexOf(c)<0&&(c=this.enum_values[0]),this.value!==c&&(this.input.value=this.enum_options[this.enum_values.indexOf(c)],this.select2&&this.select2.select2("val",this.input.value),this.value=c,this.onChange())},register:function(){this._super(),this.input&&this.input.setAttribute("name",this.formname)},unregister:function(){this._super(),this.input&&this.input.removeAttribute("name")},getNumColumns:function(){if(!this.enum_options)return 3;for(var a=this.getTitle().length,b=0;b<this.enum_options.length;b++)a=Math.max(a,this.enum_options[b].length+4);return Math.min(12,Math.max(a/7,2))},typecast:function(a){return"boolean"===this.schema.type?!!a:"number"===this.schema.type?1*a:"integer"===this.schema.type?Math.floor(1*a):""+a},getValue:function(){return this.value},preBuild:function(){var a=this;this.input_type="select",this.enum_options=[],this.enum_values=[],this.enum_display=[];var b;
// Enum options enumerated
if(this.schema["enum"]){var e=this.schema.options&&this.schema.options.enum_titles||[];d(this.schema["enum"],function(b,c){a.enum_options[b]=""+c,a.enum_display[b]=""+(e[b]||c),a.enum_values[b]=a.typecast(c)}),this.isRequired()||(a.enum_display.unshift(" "),a.enum_options.unshift("undefined"),a.enum_values.unshift(void 0))}else if("boolean"===this.schema.type)a.enum_display=this.schema.options&&this.schema.options.enum_titles||["true","false"],a.enum_options=["1",""],a.enum_values=[!0,!1],this.isRequired()||(a.enum_display.unshift(" "),a.enum_options.unshift("undefined"),a.enum_values.unshift(void 0));else{if(!this.schema.enumSource)throw"'select' editor requires the enum property to be set.";
// Shortcut declaration for using a single array
if(this.enumSource=[],this.enum_display=[],this.enum_options=[],this.enum_values=[],Array.isArray(this.schema.enumSource))for(b=0;b<this.schema.enumSource.length;b++)
// Shorthand for watched variable
"string"==typeof this.schema.enumSource[b]?this.enumSource[b]={source:this.schema.enumSource[b]}:Array.isArray(this.schema.enumSource[b])?this.enumSource[b]=this.schema.enumSource[b]:this.enumSource[b]=c({},this.schema.enumSource[b]);else this.schema.enumValue?this.enumSource=[{source:this.schema.enumSource,value:this.schema.enumValue}]:this.enumSource=[{source:this.schema.enumSource}];
// Now, enumSource is an array of sources
// Walk through this array and fix up the values
for(b=0;b<this.enumSource.length;b++)this.enumSource[b].value&&(this.enumSource[b].value=this.jsoneditor.compileTemplate(this.enumSource[b].value,this.template_engine)),this.enumSource[b].title&&(this.enumSource[b].title=this.jsoneditor.compileTemplate(this.enumSource[b].title,this.template_engine)),this.enumSource[b].filter&&(this.enumSource[b].filter=this.jsoneditor.compileTemplate(this.enumSource[b].filter,this.template_engine))}},build:function(){var a=this;this.options.compact||(this.header=this.label=this.theme.getFormInputLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description)),this.options.compact&&(this.container.className+=" compact"),this.input=this.theme.getSelectInput(this.enum_options),this.theme.setSelectOptions(this.input,this.enum_options,this.enum_display),(this.schema.readOnly||this.schema.readonly)&&(this.always_disabled=!0,this.input.disabled=!0),this.input.addEventListener("change",function(b){b.preventDefault(),b.stopPropagation(),a.onInputChange()}),this.control=this.theme.getFormControl(this.label,this.input,this.description),this.container.appendChild(this.control),this.value=this.enum_values[0]},onInputChange:function(){var a,b=this.input.value;
// Invalid option, use first option instead
a=this.enum_options.indexOf(b)===-1?this.enum_values[0]:this.enum_values[this.enum_options.indexOf(b)],
// If valid hasn't changed
a!==this.value&&(
// Store new value and propogate change event
this.value=a,this.onChange(!0))},setupSelect2:function(){
// If the Select2 library is loaded use it when we have lots of items
if(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2&&(this.enum_options.length>2||this.enum_options.length&&this.enumSource)){var a=c({},f.plugins.select2);this.schema.options&&this.schema.options.select2_options&&(a=c(a,this.schema.options.select2_options)),this.select2=window.jQuery(this.input).select2(a);var b=this;this.select2.on("select2-blur",function(){b.input.value=b.select2.select2("val"),b.onInputChange()}),this.select2.on("change",function(){b.input.value=b.select2.select2("val"),b.onInputChange()})}else this.select2=null},postBuild:function(){this._super(),this.theme.afterInputReady(this.input),this.setupSelect2()},onWatchedFieldChange:function(){var a,b;
// If this editor uses a dynamic select box
if(this.enumSource){a=this.getWatchedFieldValues();for(var c=[],d=[],e=0;e<this.enumSource.length;e++)
// Constant values
if(Array.isArray(this.enumSource[e]))c=c.concat(this.enumSource[e]),d=d.concat(this.enumSource[e]);else{var f=[];if(
// Static list of items
f=Array.isArray(this.enumSource[e].source)?this.enumSource[e].source:a[this.enumSource[e].source]){
// Filter the items
if(
// Only use a predefined part of the array
this.enumSource[e].slice&&(f=Array.prototype.slice.apply(f,this.enumSource[e].slice)),this.enumSource[e].filter){var g=[];for(b=0;b<f.length;b++)this.enumSource[e].filter({i:b,item:f[b],watched:a})&&g.push(f[b]);f=g}var h=[],i=[];for(b=0;b<f.length;b++){var j=f[b];
// Rendered value
this.enumSource[e].value?i[b]=this.enumSource[e].value({i:b,item:j}):i[b]=f[b],
// Rendered title
this.enumSource[e].title?h[b]=this.enumSource[e].title({i:b,item:j}):h[b]=i[b]}
// TODO: sort
c=c.concat(i),d=d.concat(h)}}var k=this.value;this.theme.setSelectOptions(this.input,c,d),this.enum_options=c,this.enum_display=d,this.enum_values=c,this.select2&&this.select2.select2("destroy"),
// If the previous value is still in the new select options, stick with it
c.indexOf(k)!==-1?(this.input.value=k,this.value=k):(this.input.value=c[0],this.value=c[0]||"",this.parent?this.parent.onChildEditorChange(this):this.jsoneditor.onChange(),this.jsoneditor.notifyWatchers(this.path)),this.setupSelect2()}this._super()},enable:function(){this.always_disabled||(this.input.disabled=!1,this.select2&&this.select2.select2("enable",!0)),this._super()},disable:function(){this.input.disabled=!0,this.select2&&this.select2.select2("enable",!1),this._super()},destroy:function(){this.label&&this.label.parentNode&&this.label.parentNode.removeChild(this.label),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this.select2&&(this.select2.select2("destroy"),this.select2=null),this._super()}}),f.defaults.editors.selectize=f.AbstractEditor.extend({setValue:function(a,b){a=this.typecast(a||"");
// Sanitize value before setting it
var c=a;this.enum_values.indexOf(c)<0&&(c=this.enum_values[0]),this.value!==c&&(this.input.value=this.enum_options[this.enum_values.indexOf(c)],this.selectize&&this.selectize[0].selectize.addItem(c),this.value=c,this.onChange())},register:function(){this._super(),this.input&&this.input.setAttribute("name",this.formname)},unregister:function(){this._super(),this.input&&this.input.removeAttribute("name")},getNumColumns:function(){if(!this.enum_options)return 3;for(var a=this.getTitle().length,b=0;b<this.enum_options.length;b++)a=Math.max(a,this.enum_options[b].length+4);return Math.min(12,Math.max(a/7,2))},typecast:function(a){return"boolean"===this.schema.type?!!a:"number"===this.schema.type?1*a:"integer"===this.schema.type?Math.floor(1*a):""+a},getValue:function(){return this.value},preBuild:function(){var a=this;this.input_type="select",this.enum_options=[],this.enum_values=[],this.enum_display=[];var b;
// Enum options enumerated
if(this.schema["enum"]){var e=this.schema.options&&this.schema.options.enum_titles||[];d(this.schema["enum"],function(b,c){a.enum_options[b]=""+c,a.enum_display[b]=""+(e[b]||c),a.enum_values[b]=a.typecast(c)})}else if("boolean"===this.schema.type)a.enum_display=this.schema.options&&this.schema.options.enum_titles||["true","false"],a.enum_options=["1","0"],a.enum_values=[!0,!1];else{if(!this.schema.enumSource)throw"'select' editor requires the enum property to be set.";
// Shortcut declaration for using a single array
if(this.enumSource=[],this.enum_display=[],this.enum_options=[],this.enum_values=[],Array.isArray(this.schema.enumSource))for(b=0;b<this.schema.enumSource.length;b++)
// Shorthand for watched variable
"string"==typeof this.schema.enumSource[b]?this.enumSource[b]={source:this.schema.enumSource[b]}:Array.isArray(this.schema.enumSource[b])?this.enumSource[b]=this.schema.enumSource[b]:this.enumSource[b]=c({},this.schema.enumSource[b]);else this.schema.enumValue?this.enumSource=[{source:this.schema.enumSource,value:this.schema.enumValue}]:this.enumSource=[{source:this.schema.enumSource}];
// Now, enumSource is an array of sources
// Walk through this array and fix up the values
for(b=0;b<this.enumSource.length;b++)this.enumSource[b].value&&(this.enumSource[b].value=this.jsoneditor.compileTemplate(this.enumSource[b].value,this.template_engine)),this.enumSource[b].title&&(this.enumSource[b].title=this.jsoneditor.compileTemplate(this.enumSource[b].title,this.template_engine)),this.enumSource[b].filter&&(this.enumSource[b].filter=this.jsoneditor.compileTemplate(this.enumSource[b].filter,this.template_engine))}},build:function(){var a=this;this.options.compact||(this.header=this.label=this.theme.getFormInputLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description)),this.options.compact&&(this.container.className+=" compact"),this.input=this.theme.getSelectInput(this.enum_options),this.theme.setSelectOptions(this.input,this.enum_options,this.enum_display),(this.schema.readOnly||this.schema.readonly)&&(this.always_disabled=!0,this.input.disabled=!0),this.input.addEventListener("change",function(b){b.preventDefault(),b.stopPropagation(),a.onInputChange()}),this.control=this.theme.getFormControl(this.label,this.input,this.description),this.container.appendChild(this.control),this.value=this.enum_values[0]},onInputChange:function(){var a=this.input.value,b=a;this.enum_options.indexOf(a)===-1&&(b=this.enum_options[0]),this.value=this.enum_values[this.enum_options.indexOf(a)],this.onChange(!0)},setupSelectize:function(){
// If the Selectize library is loaded use it when we have lots of items
var a=this;if(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.selectize&&(this.enum_options.length>=2||this.enum_options.length&&this.enumSource)){var b=c({},f.plugins.selectize);this.schema.options&&this.schema.options.selectize_options&&(b=c(b,this.schema.options.selectize_options)),this.selectize=window.jQuery(this.input).selectize(c(b,{create:!0,onChange:function(){a.onInputChange()}}))}else this.selectize=null},postBuild:function(){this._super(),this.theme.afterInputReady(this.input),this.setupSelectize()},onWatchedFieldChange:function(){var a,b;
// If this editor uses a dynamic select box
if(this.enumSource){a=this.getWatchedFieldValues();for(var c=[],d=[],e=0;e<this.enumSource.length;e++)
// Constant values
if(Array.isArray(this.enumSource[e]))c=c.concat(this.enumSource[e]),d=d.concat(this.enumSource[e]);else if(a[this.enumSource[e].source]){var f=a[this.enumSource[e].source];
// Filter the items
if(
// Only use a predefined part of the array
this.enumSource[e].slice&&(f=Array.prototype.slice.apply(f,this.enumSource[e].slice)),this.enumSource[e].filter){var g=[];for(b=0;b<f.length;b++)this.enumSource[e].filter({i:b,item:f[b]})&&g.push(f[b]);f=g}var h=[],i=[];for(b=0;b<f.length;b++){var j=f[b];
// Rendered value
this.enumSource[e].value?i[b]=this.enumSource[e].value({i:b,item:j}):i[b]=f[b],
// Rendered title
this.enumSource[e].title?h[b]=this.enumSource[e].title({i:b,item:j}):h[b]=i[b]}
// TODO: sort
c=c.concat(i),d=d.concat(h)}var k=this.value;this.theme.setSelectOptions(this.input,c,d),this.enum_options=c,this.enum_display=d,this.enum_values=c,
// If the previous value is still in the new select options, stick with it
c.indexOf(k)!==-1?(this.input.value=k,this.value=k):(this.input.value=c[0],this.value=c[0]||"",this.parent?this.parent.onChildEditorChange(this):this.jsoneditor.onChange(),this.jsoneditor.notifyWatchers(this.path)),this.selectize?
// Update the Selectize options
this.updateSelectizeOptions(c):this.setupSelectize(),this._super()}},updateSelectizeOptions:function(a){var b=this.selectize[0].selectize,c=this;b.off(),b.clearOptions();for(var d in a)b.addOption({value:a[d],text:a[d]});b.addItem(this.value),b.on("change",function(){c.onInputChange()})},enable:function(){this.always_disabled||(this.input.disabled=!1,this.selectize&&this.selectize[0].selectize.unlock()),this._super()},disable:function(){this.input.disabled=!0,this.selectize&&this.selectize[0].selectize.lock(),this._super()},destroy:function(){this.label&&this.label.parentNode&&this.label.parentNode.removeChild(this.label),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this.selectize&&(this.selectize[0].selectize.destroy(),this.selectize=null),this._super()}}),f.defaults.editors.multiselect=f.AbstractEditor.extend({preBuild:function(){this._super();var a;this.select_options={},this.select_values={};var b=this.jsoneditor.expandRefs(this.schema.items||{}),c=b["enum"]||[],d=b.options?b.options.enum_titles||[]:[];for(this.option_keys=[],this.option_titles=[],a=0;a<c.length;a++)
// If the sanitized value is different from the enum value, don't include it
this.sanitize(c[a])===c[a]&&(this.option_keys.push(c[a]+""),this.option_titles.push((d[a]||c[a])+""),this.select_values[c[a]+""]=c[a])},build:function(){var a,b=this;if(this.options.compact||(this.header=this.label=this.theme.getFormInputLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description)),!this.schema.format&&this.option_keys.length<8||"checkbox"===this.schema.format){for(this.input_type="checkboxes",this.inputs={},this.controls={},a=0;a<this.option_keys.length;a++){this.inputs[this.option_keys[a]]=this.theme.getCheckbox(),this.select_options[this.option_keys[a]]=this.inputs[this.option_keys[a]];var c=this.theme.getCheckboxLabel(this.option_titles[a]);this.controls[this.option_keys[a]]=this.theme.getFormControl(c,this.inputs[this.option_keys[a]])}this.control=this.theme.getMultiCheckboxHolder(this.controls,this.label,this.description)}else{for(this.input_type="select",this.input=this.theme.getSelectInput(this.option_keys),this.theme.setSelectOptions(this.input,this.option_keys,this.option_titles),this.input.multiple=!0,this.input.size=Math.min(10,this.option_keys.length),a=0;a<this.option_keys.length;a++)this.select_options[this.option_keys[a]]=this.input.children[a];(this.schema.readOnly||this.schema.readonly)&&(this.always_disabled=!0,this.input.disabled=!0),this.control=this.theme.getFormControl(this.label,this.input,this.description)}this.container.appendChild(this.control),this.control.addEventListener("change",function(c){c.preventDefault(),c.stopPropagation();var d=[];for(a=0;a<b.option_keys.length;a++)(b.select_options[b.option_keys[a]].selected||b.select_options[b.option_keys[a]].checked)&&d.push(b.select_values[b.option_keys[a]]);b.updateValue(d),b.onChange(!0)})},setValue:function(a,b){var c;
// Make sure we are dealing with an array of strings so we can check for strict equality
for(a=a||[],"object"!=typeof a?a=[a]:Array.isArray(a)||(a=[]),c=0;c<a.length;c++)"string"!=typeof a[c]&&(a[c]+="");
// Update selected status of options
for(c in this.select_options)this.select_options.hasOwnProperty(c)&&(this.select_options[c]["select"===this.input_type?"selected":"checked"]=a.indexOf(c)!==-1);this.updateValue(a),this.onChange()},setupSelect2:function(){if(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2){var a=window.jQuery.extend({},f.plugins.select2);this.schema.options&&this.schema.options.select2_options&&(a=c(a,this.schema.options.select2_options)),this.select2=window.jQuery(this.input).select2(a);var b=this;this.select2.on("select2-blur",function(){var a=b.select2.select2("val");b.value=a,b.onChange(!0)})}else this.select2=null},onInputChange:function(){this.value=this.input.value,this.onChange(!0)},postBuild:function(){this._super(),this.setupSelect2()},register:function(){this._super(),this.input&&this.input.setAttribute("name",this.formname)},unregister:function(){this._super(),this.input&&this.input.removeAttribute("name")},getNumColumns:function(){var a=this.getTitle().length;for(var b in this.select_values)this.select_values.hasOwnProperty(b)&&(a=Math.max(a,(this.select_values[b]+"").length+4));return Math.min(12,Math.max(a/7,2))},updateValue:function(a){for(var b=!1,c=[],d=0;d<a.length;d++)if(this.select_options[a[d]+""]){var e=this.sanitize(this.select_values[a[d]]);c.push(e),e!==a[d]&&(b=!0)}else b=!0;return this.value=c,this.select2&&this.select2.select2("val",this.value),b},sanitize:function(a){return"number"===this.schema.items.type?1*a:"integer"===this.schema.items.type?Math.floor(1*a):""+a},enable:function(){if(!this.always_disabled){if(this.input)this.input.disabled=!1;else if(this.inputs)for(var a in this.inputs)this.inputs.hasOwnProperty(a)&&(this.inputs[a].disabled=!1);this.select2&&this.select2.select2("enable",!0)}this._super()},disable:function(){if(this.input)this.input.disabled=!0;else if(this.inputs)for(var a in this.inputs)this.inputs.hasOwnProperty(a)&&(this.inputs[a].disabled=!0);this.select2&&this.select2.select2("enable",!1),this._super()},destroy:function(){this.select2&&(this.select2.select2("destroy"),this.select2=null),this._super()}}),f.defaults.editors.base64=f.AbstractEditor.extend({getNumColumns:function(){return 4},build:function(){var a=this;
// Don't show uploader if this is readonly
if(this.title=this.header=this.label=this.theme.getFormInputLabel(this.getTitle()),
// Input that holds the base64 string
this.input=this.theme.getFormInputField("hidden"),this.container.appendChild(this.input),!this.schema.readOnly&&!this.schema.readonly){if(!window.FileReader)throw"FileReader required for base64 editor";
// File uploader
this.uploader=this.theme.getFormInputField("file"),this.uploader.addEventListener("change",function(b){if(b.preventDefault(),b.stopPropagation(),this.files&&this.files.length){var c=new FileReader;c.onload=function(b){a.value=b.target.result,a.refreshPreview(),a.onChange(!0),c=null},c.readAsDataURL(this.files[0])}})}this.preview=this.theme.getFormInputDescription(this.schema.description),this.container.appendChild(this.preview),this.control=this.theme.getFormControl(this.label,this.uploader||this.input,this.preview),this.container.appendChild(this.control)},refreshPreview:function(){if(this.last_preview!==this.value&&(this.last_preview=this.value,this.preview.innerHTML="",this.value)){var a=this.value.match(/^data:([^;,]+)[;,]/);if(a&&(a=a[1]),a){if(this.preview.innerHTML="<strong>Type:</strong> "+a+", <strong>Size:</strong> "+Math.floor((this.value.length-this.value.split(",")[0].length-1)/1.33333)+" bytes","image"===a.substr(0,5)){this.preview.innerHTML+="<br>";var b=document.createElement("img");b.style.maxWidth="100%",b.style.maxHeight="100px",b.src=this.value,this.preview.appendChild(b)}}else this.preview.innerHTML="<em>Invalid data URI</em>"}},enable:function(){this.uploader&&(this.uploader.disabled=!1),this._super()},disable:function(){this.uploader&&(this.uploader.disabled=!0),this._super()},setValue:function(a){this.value!==a&&(this.value=a,this.input.value=this.value,this.refreshPreview(),this.onChange())},destroy:function(){this.preview&&this.preview.parentNode&&this.preview.parentNode.removeChild(this.preview),this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this.uploader&&this.uploader.parentNode&&this.uploader.parentNode.removeChild(this.uploader),this._super()}}),f.defaults.editors.upload=f.AbstractEditor.extend({getNumColumns:function(){return 4},build:function(){var a=this;
// Don't show uploader if this is readonly
if(this.title=this.header=this.label=this.theme.getFormInputLabel(this.getTitle()),
// Input that holds the base64 string
this.input=this.theme.getFormInputField("hidden"),this.container.appendChild(this.input),!this.schema.readOnly&&!this.schema.readonly){if(!this.jsoneditor.options.upload)throw"Upload handler required for upload editor";
// File uploader
this.uploader=this.theme.getFormInputField("file"),this.uploader.addEventListener("change",function(b){if(b.preventDefault(),b.stopPropagation(),this.files&&this.files.length){var c=new FileReader;c.onload=function(b){a.preview_value=b.target.result,a.refreshPreview(),a.onChange(!0),c=null},c.readAsDataURL(this.files[0])}})}var b=this.schema.description;b||(b=""),this.preview=this.theme.getFormInputDescription(b),this.container.appendChild(this.preview),this.control=this.theme.getFormControl(this.label,this.uploader||this.input,this.preview),this.container.appendChild(this.control)},refreshPreview:function(){if(this.last_preview!==this.preview_value&&(this.last_preview=this.preview_value,this.preview.innerHTML="",this.preview_value)){var a=this,b=this.preview_value.match(/^data:([^;,]+)[;,]/);b&&(b=b[1]),b||(b="unknown");var c=this.uploader.files[0];if(this.preview.innerHTML="<strong>Type:</strong> "+b+", <strong>Size:</strong> "+c.size+" bytes","image"===b.substr(0,5)){this.preview.innerHTML+="<br>";var d=document.createElement("img");d.style.maxWidth="100%",d.style.maxHeight="100px",d.src=this.preview_value,this.preview.appendChild(d)}this.preview.innerHTML+="<br>";var e=this.getButton("Upload","upload","Upload");this.preview.appendChild(e),e.addEventListener("click",function(b){b.preventDefault(),e.setAttribute("disabled","disabled"),a.theme.removeInputError(a.uploader),a.theme.getProgressBar&&(a.progressBar=a.theme.getProgressBar(),a.preview.appendChild(a.progressBar)),a.jsoneditor.options.upload(a.path,c,{success:function(b){a.setValue(b),a.parent?a.parent.onChildEditorChange(a):a.jsoneditor.onChange(),a.progressBar&&a.preview.removeChild(a.progressBar),e.removeAttribute("disabled")},failure:function(b){a.theme.addInputError(a.uploader,b),a.progressBar&&a.preview.removeChild(a.progressBar),e.removeAttribute("disabled")},updateProgress:function(b){a.progressBar&&(b?a.theme.updateProgressBar(a.progressBar,b):a.theme.updateProgressBarUnknown(a.progressBar))}})})}},enable:function(){this.uploader&&(this.uploader.disabled=!1),this._super()},disable:function(){this.uploader&&(this.uploader.disabled=!0),this._super()},setValue:function(a){this.value!==a&&(this.value=a,this.input.value=this.value,this.onChange())},destroy:function(){this.preview&&this.preview.parentNode&&this.preview.parentNode.removeChild(this.preview),this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this.uploader&&this.uploader.parentNode&&this.uploader.parentNode.removeChild(this.uploader),this._super()}}),f.defaults.editors.checkbox=f.AbstractEditor.extend({setValue:function(a,b){this.value=!!a,this.input.checked=this.value,this.onChange()},register:function(){this._super(),this.input&&this.input.setAttribute("name",this.formname)},unregister:function(){this._super(),this.input&&this.input.removeAttribute("name")},getNumColumns:function(){return Math.min(12,Math.max(this.getTitle().length/7,2))},build:function(){var a=this;this.options.compact||(this.label=this.header=this.theme.getCheckboxLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description)),this.options.compact&&(this.container.className+=" compact"),this.input=this.theme.getCheckbox(),this.control=this.theme.getFormControl(this.label,this.input,this.description),(this.schema.readOnly||this.schema.readonly)&&(this.always_disabled=!0,this.input.disabled=!0),this.input.addEventListener("change",function(b){b.preventDefault(),b.stopPropagation(),a.value=this.checked,a.onChange(!0)}),this.container.appendChild(this.control)},enable:function(){this.always_disabled||(this.input.disabled=!1),this._super()},disable:function(){this.input.disabled=!0,this._super()},destroy:function(){this.label&&this.label.parentNode&&this.label.parentNode.removeChild(this.label),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this._super()}}),f.defaults.editors.arraySelectize=f.AbstractEditor.extend({build:function(){this.title=this.theme.getFormInputLabel(this.getTitle()),this.title_controls=this.theme.getHeaderButtonHolder(),this.title.appendChild(this.title_controls),this.error_holder=document.createElement("div"),this.schema.description&&(this.description=this.theme.getDescription(this.schema.description)),this.input=document.createElement("select"),this.input.setAttribute("multiple","multiple");var a=this.theme.getFormControl(this.title,this.input,this.description);this.container.appendChild(a),this.container.appendChild(this.error_holder),window.jQuery(this.input).selectize({delimiter:!1,createOnBlur:!0,create:!0})},postBuild:function(){var a=this;this.input.selectize.on("change",function(b){a.refreshValue(),a.onChange(!0)})},destroy:function(){this.empty(!0),this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this._super()},empty:function(a){},setValue:function(a,b){var c=this;
// Update the array's value, adding/removing rows when necessary
a=a||[],Array.isArray(a)||(a=[a]),this.input.selectize.clearOptions(),this.input.selectize.clear(!0),a.forEach(function(a){c.input.selectize.addOption({text:a,value:a})}),this.input.selectize.setValue(a),this.refreshValue(b)},refreshValue:function(a){this.value=this.input.selectize.getValue()},showValidationErrors:function(a){var b=this,c=[],e=[];
// Show errors for this editor
if(d(a,function(a,d){d.path===b.path?c.push(d):e.push(d)}),this.error_holder)if(c.length){this.error_holder.innerHTML="",this.error_holder.style.display="",d(c,function(a,c){b.error_holder.appendChild(b.theme.getErrorMessage(c.message))})}else this.error_holder.style.display="none"}});var g=function(){var a=document.documentElement;return a.matches?"matches":a.webkitMatchesSelector?"webkitMatchesSelector":a.mozMatchesSelector?"mozMatchesSelector":a.msMatchesSelector?"msMatchesSelector":a.oMatchesSelector?"oMatchesSelector":void 0}();f.AbstractTheme=a.extend({getContainer:function(){return document.createElement("div")},getFloatRightLinkHolder:function(){var a=document.createElement("div");return a.style=a.style||{},a.style.cssFloat="right",a.style.marginLeft="10px",a},getModal:function(){var a=document.createElement("div");return a.style.backgroundColor="white",a.style.border="1px solid black",a.style.boxShadow="3px 3px black",a.style.position="absolute",a.style.zIndex="10",a.style.display="none",a},getGridContainer:function(){var a=document.createElement("div");return a},getGridRow:function(){var a=document.createElement("div");return a.className="row",a},getGridColumn:function(){var a=document.createElement("div");return a},setGridColumnSize:function(a,b){},getLink:function(a){var b=document.createElement("a");return b.setAttribute("href","#"),b.appendChild(document.createTextNode(a)),b},disableHeader:function(a){a.style.color="#ccc"},disableLabel:function(a){a.style.color="#ccc"},enableHeader:function(a){a.style.color=""},enableLabel:function(a){a.style.color=""},getFormInputLabel:function(a){var b=document.createElement("label");return b.appendChild(document.createTextNode(a)),b},getCheckboxLabel:function(a){var b=this.getFormInputLabel(a);return b.style.fontWeight="normal",b},getHeader:function(a){var b=document.createElement("h3");return"string"==typeof a?b.textContent=a:b.appendChild(a),b},getCheckbox:function(){var a=this.getFormInputField("checkbox");return a.style.display="inline-block",a.style.width="auto",a},getMultiCheckboxHolder:function(a,b,c){var d=document.createElement("div");b&&(b.style.display="block",d.appendChild(b));for(var e in a)a.hasOwnProperty(e)&&(a[e].style.display="inline-block",a[e].style.marginRight="20px",d.appendChild(a[e]));return c&&d.appendChild(c),d},getSelectInput:function(a){var b=document.createElement("select");return a&&this.setSelectOptions(b,a),b},getSwitcher:function(a){var b=this.getSelectInput(a);return b.style.backgroundColor="transparent",b.style.display="inline-block",b.style.fontStyle="italic",b.style.fontWeight="normal",b.style.height="auto",b.style.marginBottom=0,b.style.marginLeft="5px",b.style.padding="0 0 0 3px",b.style.width="auto",b},getSwitcherOptions:function(a){return a.getElementsByTagName("option")},setSwitcherOptions:function(a,b,c){this.setSelectOptions(a,b,c)},setSelectOptions:function(a,b,c){c=c||[],a.innerHTML="";for(var d=0;d<b.length;d++){var e=document.createElement("option");e.setAttribute("value",b[d]),e.textContent=c[d]||b[d],a.appendChild(e)}},getTextareaInput:function(){var a=document.createElement("textarea");return a.style=a.style||{},a.style.width="100%",a.style.height="300px",a.style.boxSizing="border-box",a},getRangeInput:function(a,b,c){var d=this.getFormInputField("range");return d.setAttribute("min",a),d.setAttribute("max",b),d.setAttribute("step",c),d},getFormInputField:function(a){var b=document.createElement("input");return b.setAttribute("type",a),b},afterInputReady:function(a){},getFormControl:function(a,b,c){var d=document.createElement("div");return d.className="form-control",a&&d.appendChild(a),"checkbox"===b.type?a.insertBefore(b,a.firstChild):d.appendChild(b),c&&d.appendChild(c),d},getIndentedPanel:function(){var a=document.createElement("div");return a.style=a.style||{},a.style.paddingLeft="10px",a.style.marginLeft="10px",a.style.borderLeft="1px solid #ccc",a},getChildEditorHolder:function(){return document.createElement("div")},getDescription:function(a){var b=document.createElement("p");return b.innerHTML=a,b},getCheckboxDescription:function(a){return this.getDescription(a)},getFormInputDescription:function(a){return this.getDescription(a)},getHeaderButtonHolder:function(){return this.getButtonHolder()},getButtonHolder:function(){return document.createElement("div")},getButton:function(a,b,c){var d=document.createElement("button");return d.type="button",this.setButtonText(d,a,b,c),d},setButtonText:function(a,b,c,d){a.innerHTML="",c&&(a.appendChild(c),a.innerHTML+=" "),a.appendChild(document.createTextNode(b)),d&&a.setAttribute("title",d)},getTable:function(){return document.createElement("table")},getTableRow:function(){return document.createElement("tr")},getTableHead:function(){return document.createElement("thead")},getTableBody:function(){return document.createElement("tbody")},getTableHeaderCell:function(a){var b=document.createElement("th");return b.textContent=a,b},getTableCell:function(){var a=document.createElement("td");return a},getErrorMessage:function(a){var b=document.createElement("p");return b.style=b.style||{},b.style.color="red",b.appendChild(document.createTextNode(a)),b},addInputError:function(a,b){},removeInputError:function(a){},addTableRowError:function(a){},removeTableRowError:function(a){},getTabHolder:function(){var a=document.createElement("div");return a.innerHTML="<div style='float: left; width: 130px;' class='tabs'></div><div class='content' style='margin-left: 130px;'></div><div style='clear:both;'></div>",a},applyStyles:function(a,b){a.style=a.style||{};for(var c in b)b.hasOwnProperty(c)&&(a.style[c]=b[c])},closest:function(a,b){for(;a&&a!==document;){if(!a[g])return!1;if(a[g](b))return a;a=a.parentNode}return!1},getTab:function(a){var b=document.createElement("div");return b.appendChild(a),b.style=b.style||{},this.applyStyles(b,{border:"1px solid #ccc",borderWidth:"1px 0 1px 1px",textAlign:"center",lineHeight:"30px",borderRadius:"5px",borderBottomRightRadius:0,borderTopRightRadius:0,fontWeight:"bold",cursor:"pointer"}),b},getTabContentHolder:function(a){return a.children[1]},getTabContent:function(){return this.getIndentedPanel()},markTabActive:function(a){this.applyStyles(a,{opacity:1,background:"white"})},markTabInactive:function(a){this.applyStyles(a,{opacity:.5,background:""})},addTab:function(a,b){a.children[0].appendChild(b)},getBlockLink:function(){var a=document.createElement("a");return a.style.display="block",a},getBlockLinkHolder:function(){var a=document.createElement("div");return a},getLinksHolder:function(){var a=document.createElement("div");return a},createMediaLink:function(a,b,c){a.appendChild(b),c.style.width="100%",a.appendChild(c)},createImageLink:function(a,b,c){a.appendChild(b),b.appendChild(c)}}),f.defaults.themes.bootstrap2=f.AbstractTheme.extend({getRangeInput:function(a,b,c){
// TODO: use bootstrap slider
return this._super(a,b,c)},getGridContainer:function(){var a=document.createElement("div");return a.className="container-fluid",a},getGridRow:function(){var a=document.createElement("div");return a.className="row-fluid",a},getFormInputLabel:function(a){var b=this._super(a);return b.style.display="inline-block",b.style.fontWeight="bold",b},setGridColumnSize:function(a,b){a.className="span"+b},getSelectInput:function(a){var b=this._super(a);return b.style.width="auto",b.style.maxWidth="98%",b},getFormInputField:function(a){var b=this._super(a);return b.style.width="98%",b},afterInputReady:function(a){a.controlgroup||(a.controlgroup=this.closest(a,".control-group"),a.controls=this.closest(a,".controls"),this.closest(a,".compact")&&(a.controlgroup.className=a.controlgroup.className.replace(/control-group/g,"").replace(/[ ]{2,}/g," "),a.controls.className=a.controlgroup.className.replace(/controls/g,"").replace(/[ ]{2,}/g," "),a.style.marginBottom=0))},getIndentedPanel:function(){var a=document.createElement("div");return a.className="well well-small",a.style.paddingBottom=0,a},getFormInputDescription:function(a){var b=document.createElement("p");return b.className="help-inline",b.textContent=a,b},getFormControl:function(a,b,c){var d=document.createElement("div");d.className="control-group";var e=document.createElement("div");return e.className="controls",a&&"checkbox"===b.getAttribute("type")?(d.appendChild(e),a.className+=" checkbox",a.appendChild(b),e.appendChild(a),e.style.height="30px"):(a&&(a.className+=" control-label",d.appendChild(a)),e.appendChild(b),d.appendChild(e)),c&&e.appendChild(c),d},getHeaderButtonHolder:function(){var a=this.getButtonHolder();return a.style.marginLeft="10px",a},getButtonHolder:function(){var a=document.createElement("div");return a.className="btn-group",a},getButton:function(a,b,c){var d=this._super(a,b,c);return d.className+=" btn btn-default",d},getTable:function(){var a=document.createElement("table");return a.className="table table-bordered",a.style.width="auto",a.style.maxWidth="none",a},addInputError:function(a,b){a.controlgroup&&a.controls&&(a.controlgroup.className+=" error",a.errmsg?a.errmsg.style.display="":(a.errmsg=document.createElement("p"),a.errmsg.className="help-block errormsg",a.controls.appendChild(a.errmsg)),a.errmsg.textContent=b)},removeInputError:function(a){a.errmsg&&(a.errmsg.style.display="none",a.controlgroup.className=a.controlgroup.className.replace(/\s?error/g,""))},getTabHolder:function(){var a=document.createElement("div");return a.className="tabbable tabs-left",a.innerHTML="<ul class='nav nav-tabs span2' style='margin-right: 0;'></ul><div class='tab-content span10' style='overflow:visible;'></div>",a},getTab:function(a){var b=document.createElement("li"),c=document.createElement("a");return c.setAttribute("href","#"),c.appendChild(a),b.appendChild(c),b},getTabContentHolder:function(a){return a.children[1]},getTabContent:function(){var a=document.createElement("div");return a.className="tab-pane active",a},markTabActive:function(a){a.className+=" active"},markTabInactive:function(a){a.className=a.className.replace(/\s?active/g,"")},addTab:function(a,b){a.children[0].appendChild(b)},getProgressBar:function(){var a=document.createElement("div");a.className="progress";var b=document.createElement("div");return b.className="bar",b.style.width="0%",a.appendChild(b),a},updateProgressBar:function(a,b){a&&(a.firstChild.style.width=b+"%")},updateProgressBarUnknown:function(a){a&&(a.className="progress progress-striped active",a.firstChild.style.width="100%")}}),f.defaults.themes.bootstrap3=f.AbstractTheme.extend({getSelectInput:function(a){var b=this._super(a);
//el.style.width = 'auto';
return b.className+="form-control",b},setGridColumnSize:function(a,b){a.className="col-md-"+b},afterInputReady:function(a){a.controlgroup||(a.controlgroup=this.closest(a,".form-group"),this.closest(a,".compact")&&(a.controlgroup.style.marginBottom=0))},getTextareaInput:function(){var a=document.createElement("textarea");return a.className="form-control",a},getRangeInput:function(a,b,c){
// TODO: use better slider
return this._super(a,b,c)},getFormInputField:function(a){var b=this._super(a);return"checkbox"!==a&&(b.className+="form-control"),b},getFormControl:function(a,b,c){var d=document.createElement("div");return a&&"checkbox"===b.type?(d.className+=" checkbox",a.appendChild(b),a.style.fontSize="14px",d.style.marginTop="0",d.appendChild(a),b.style.position="relative",b.style.cssFloat="left"):(d.className+=" form-group",a&&(a.className+=" control-label",d.appendChild(a)),d.appendChild(b)),c&&d.appendChild(c),d},getIndentedPanel:function(){var a=document.createElement("div");return a.className="well well-sm",a.style.paddingBottom=0,a},getFormInputDescription:function(a){var b=document.createElement("p");return b.className="help-block",b.innerHTML=a,b},getHeaderButtonHolder:function(){var a=this.getButtonHolder();return a.style.marginLeft="10px",a},getButtonHolder:function(){var a=document.createElement("div");return a.className="btn-group",a},getButton:function(a,b,c){var d=this._super(a,b,c);return d.className+="btn btn-default",d},getTable:function(){var a=document.createElement("table");return a.className="table table-bordered",a.style.width="auto",a.style.maxWidth="none",a},addInputError:function(a,b){a.controlgroup&&(a.controlgroup.className+=" has-error",a.errmsg?a.errmsg.style.display="":(a.errmsg=document.createElement("p"),a.errmsg.className="help-block errormsg",a.controlgroup.appendChild(a.errmsg)),a.errmsg.textContent=b)},removeInputError:function(a){a.errmsg&&(a.errmsg.style.display="none",a.controlgroup.className=a.controlgroup.className.replace(/\s?has-error/g,""))},getTabHolder:function(){var a=document.createElement("div");return a.innerHTML="<div class='tabs list-group col-md-2'></div><div class='col-md-10'></div>",a.className="rows",a},getTab:function(a){var b=document.createElement("a");return b.className="list-group-item",b.setAttribute("href","#"),b.appendChild(a),b},markTabActive:function(a){a.className+=" active"},markTabInactive:function(a){a.className=a.className.replace(/\s?active/g,"")},getProgressBar:function(){var a=0,b=100,c=0,d=document.createElement("div");d.className="progress";var e=document.createElement("div");return e.className="progress-bar",e.setAttribute("role","progressbar"),e.setAttribute("aria-valuenow",c),e.setAttribute("aria-valuemin",a),e.setAttribute("aria-valuenax",b),e.innerHTML=c+"%",d.appendChild(e),d},updateProgressBar:function(a,b){if(a){var c=a.firstChild,d=b+"%";c.setAttribute("aria-valuenow",b),c.style.width=d,c.innerHTML=d}},updateProgressBarUnknown:function(a){if(a){var b=a.firstChild;a.className="progress progress-striped active",b.removeAttribute("aria-valuenow"),b.style.width="100%",b.innerHTML=""}}}),
// Base Foundation theme
f.defaults.themes.foundation=f.AbstractTheme.extend({getChildEditorHolder:function(){var a=document.createElement("div");return a.style.marginBottom="15px",a},getSelectInput:function(a){var b=this._super(a);return b.style.minWidth="none",b.style.padding="5px",b.style.marginTop="3px",b},getSwitcher:function(a){var b=this._super(a);return b.style.paddingRight="8px",b},afterInputReady:function(a){this.closest(a,".compact")&&(a.style.marginBottom=0),a.group=this.closest(a,".form-control")},getFormInputLabel:function(a){var b=this._super(a);return b.style.display="inline-block",b},getFormInputField:function(a){var b=this._super(a);return b.style.width="100%",b.style.marginBottom="checkbox"===a?"0":"12px",b},getFormInputDescription:function(a){var b=document.createElement("p");return b.textContent=a,b.style.marginTop="-10px",b.style.fontStyle="italic",b},getIndentedPanel:function(){var a=document.createElement("div");return a.className="panel",a.style.paddingBottom=0,a},getHeaderButtonHolder:function(){var a=this.getButtonHolder();return a.style.display="inline-block",a.style.marginLeft="10px",a.style.verticalAlign="middle",a},getButtonHolder:function(){var a=document.createElement("div");return a.className="button-group",a},getButton:function(a,b,c){var d=this._super(a,b,c);return d.className+=" small button",d},addInputError:function(a,b){a.group&&(a.group.className+=" error",a.errmsg?a.errmsg.style.display="":(a.insertAdjacentHTML("afterend",'<small class="error"></small>'),a.errmsg=a.parentNode.getElementsByClassName("error")[0]),a.errmsg.textContent=b)},removeInputError:function(a){a.errmsg&&(a.group.className=a.group.className.replace(/ error/g,""),a.errmsg.style.display="none")},getProgressBar:function(){var a=document.createElement("div");a.className="progress";var b=document.createElement("span");return b.className="meter",b.style.width="0%",a.appendChild(b),a},updateProgressBar:function(a,b){a&&(a.firstChild.style.width=b+"%")},updateProgressBarUnknown:function(a){a&&(a.firstChild.style.width="100%")}}),
// Foundation 3 Specific Theme
f.defaults.themes.foundation3=f.defaults.themes.foundation.extend({getHeaderButtonHolder:function(){var a=this._super();return a.style.fontSize=".6em",a},getFormInputLabel:function(a){var b=this._super(a);return b.style.fontWeight="bold",b},getTabHolder:function(){var a=document.createElement("div");return a.className="row",a.innerHTML="<dl class='tabs vertical two columns'></dl><div class='tabs-content ten columns'></div>",a},setGridColumnSize:function(a,b){var c=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];a.className="columns "+c[b]},getTab:function(a){var b=document.createElement("dd"),c=document.createElement("a");return c.setAttribute("href","#"),c.appendChild(a),b.appendChild(c),b},getTabContentHolder:function(a){return a.children[1]},getTabContent:function(){var a=document.createElement("div");return a.className="content active",a.style.paddingLeft="5px",a},markTabActive:function(a){a.className+=" active"},markTabInactive:function(a){a.className=a.className.replace(/\s*active/g,"")},addTab:function(a,b){a.children[0].appendChild(b)}}),
// Foundation 4 Specific Theme
f.defaults.themes.foundation4=f.defaults.themes.foundation.extend({getHeaderButtonHolder:function(){var a=this._super();return a.style.fontSize=".6em",a},setGridColumnSize:function(a,b){a.className="columns large-"+b},getFormInputDescription:function(a){var b=this._super(a);return b.style.fontSize=".8rem",b},getFormInputLabel:function(a){var b=this._super(a);return b.style.fontWeight="bold",b}}),
// Foundation 5 Specific Theme
f.defaults.themes.foundation5=f.defaults.themes.foundation.extend({getFormInputDescription:function(a){var b=this._super(a);return b.style.fontSize=".8rem",b},setGridColumnSize:function(a,b){a.className="columns medium-"+b},getButton:function(a,b,c){var d=this._super(a,b,c);return d.className=d.className.replace(/\s*small/g,"")+" tiny",d},getTabHolder:function(){var a=document.createElement("div");return a.innerHTML="<dl class='tabs vertical'></dl><div class='tabs-content vertical'></div>",a},getTab:function(a){var b=document.createElement("dd"),c=document.createElement("a");return c.setAttribute("href","#"),c.appendChild(a),b.appendChild(c),b},getTabContentHolder:function(a){return a.children[1]},getTabContent:function(){var a=document.createElement("div");return a.className="content active",a.style.paddingLeft="5px",a},markTabActive:function(a){a.className+=" active"},markTabInactive:function(a){a.className=a.className.replace(/\s*active/g,"")},addTab:function(a,b){a.children[0].appendChild(b)}}),f.defaults.themes.foundation6=f.defaults.themes.foundation5.extend({getIndentedPanel:function(){var a=document.createElement("div");return a.className="callout secondary",a},getButtonHolder:function(){var a=document.createElement("div");return a.className="button-group tiny",a.style.marginBottom=0,a},getFormInputLabel:function(a){var b=this._super(a);return b.style.display="block",b},getFormControl:function(a,b,c){var d=document.createElement("div");return d.className="form-control",a&&d.appendChild(a),"checkbox"===b.type?a.insertBefore(b,a.firstChild):a?a.appendChild(b):d.appendChild(b),c&&a.appendChild(c),d},addInputError:function(a,b){if(a.group){if(a.group.className+=" error",a.errmsg)a.errmsg.style.display="",a.className="";else{var c=document.createElement("span");c.className="form-error is-visible",a.group.getElementsByTagName("label")[0].appendChild(c),a.className=a.className+" is-invalid-input",a.errmsg=c}a.errmsg.textContent=b}},removeInputError:function(a){a.errmsg&&(a.className=a.className.replace(/ is-invalid-input/g,""),a.errmsg.parentNode&&a.errmsg.parentNode.removeChild(a.errmsg))}}),f.defaults.themes.html=f.AbstractTheme.extend({getFormInputLabel:function(a){var b=this._super(a);return b.style.display="block",b.style.marginBottom="3px",b.style.fontWeight="bold",b},getFormInputDescription:function(a){var b=this._super(a);return b.style.fontSize=".8em",b.style.margin=0,b.style.display="inline-block",b.style.fontStyle="italic",b},getIndentedPanel:function(){var a=this._super();return a.style.border="1px solid #ddd",a.style.padding="5px",a.style.margin="5px",a.style.borderRadius="3px",a},getChildEditorHolder:function(){var a=this._super();return a.style.marginBottom="8px",a},getHeaderButtonHolder:function(){var a=this.getButtonHolder();return a.style.display="inline-block",a.style.marginLeft="10px",a.style.fontSize=".8em",a.style.verticalAlign="middle",a},getTable:function(){var a=this._super();return a.style.borderBottom="1px solid #ccc",a.style.marginBottom="5px",a},addInputError:function(a,b){if(a.style.borderColor="red",a.errmsg)a.errmsg.style.display="block";else{var c=this.closest(a,".form-control");a.errmsg=document.createElement("div"),a.errmsg.setAttribute("class","errmsg"),a.errmsg.style=a.errmsg.style||{},a.errmsg.style.color="red",c.appendChild(a.errmsg)}a.errmsg.innerHTML="",a.errmsg.appendChild(document.createTextNode(b))},removeInputError:function(a){a.style.borderColor="",a.errmsg&&(a.errmsg.style.display="none")},getProgressBar:function(){var a=100,b=0,c=document.createElement("progress");return c.setAttribute("max",a),c.setAttribute("value",b),c},updateProgressBar:function(a,b){a&&a.setAttribute("value",b)},updateProgressBarUnknown:function(a){a&&a.removeAttribute("value")}}),f.defaults.themes.jqueryui=f.AbstractTheme.extend({getTable:function(){var a=this._super();return a.setAttribute("cellpadding",5),a.setAttribute("cellspacing",0),a},getTableHeaderCell:function(a){var b=this._super(a);return b.className="ui-state-active",b.style.fontWeight="bold",b},getTableCell:function(){var a=this._super();return a.className="ui-widget-content",a},getHeaderButtonHolder:function(){var a=this.getButtonHolder();return a.style.marginLeft="10px",a.style.fontSize=".6em",a.style.display="inline-block",a},getFormInputDescription:function(a){var b=this.getDescription(a);return b.style.marginLeft="10px",b.style.display="inline-block",b},getFormControl:function(a,b,c){var d=this._super(a,b,c);return"checkbox"===b.type?(d.style.lineHeight="25px",d.style.padding="3px 0"):d.style.padding="4px 0 8px 0",d},getDescription:function(a){var b=document.createElement("span");return b.style.fontSize=".8em",b.style.fontStyle="italic",b.textContent=a,b},getButtonHolder:function(){var a=document.createElement("div");return a.className="ui-buttonset",a.style.fontSize=".7em",a},getFormInputLabel:function(a){var b=document.createElement("label");return b.style.fontWeight="bold",b.style.display="block",b.textContent=a,b},getButton:function(a,b,c){var d=document.createElement("button");d.className="ui-button ui-widget ui-state-default ui-corner-all",
// Icon only
b&&!a?(d.className+=" ui-button-icon-only",b.className+=" ui-button-icon-primary ui-icon-primary",d.appendChild(b)):b?(d.className+=" ui-button-text-icon-primary",b.className+=" ui-button-icon-primary ui-icon-primary",d.appendChild(b)):d.className+=" ui-button-text-only";var e=document.createElement("span");return e.className="ui-button-text",e.textContent=a||c||".",d.appendChild(e),d.setAttribute("title",c),d},setButtonText:function(a,b,c,d){a.innerHTML="",a.className="ui-button ui-widget ui-state-default ui-corner-all",
// Icon only
c&&!b?(a.className+=" ui-button-icon-only",c.className+=" ui-button-icon-primary ui-icon-primary",a.appendChild(c)):c?(a.className+=" ui-button-text-icon-primary",c.className+=" ui-button-icon-primary ui-icon-primary",a.appendChild(c)):a.className+=" ui-button-text-only";var e=document.createElement("span");e.className="ui-button-text",e.textContent=b||d||".",a.appendChild(e),a.setAttribute("title",d)},getIndentedPanel:function(){var a=document.createElement("div");return a.className="ui-widget-content ui-corner-all",a.style.padding="1em 1.4em",a.style.marginBottom="20px",a},afterInputReady:function(a){a.controls||(a.controls=this.closest(a,".form-control"))},addInputError:function(a,b){a.controls&&(a.errmsg?a.errmsg.style.display="":(a.errmsg=document.createElement("div"),a.errmsg.className="ui-state-error",a.controls.appendChild(a.errmsg)),a.errmsg.textContent=b)},removeInputError:function(a){a.errmsg&&(a.errmsg.style.display="none")},markTabActive:function(a){a.className=a.className.replace(/\s*ui-widget-header/g,"")+" ui-state-active"},markTabInactive:function(a){a.className=a.className.replace(/\s*ui-state-active/g,"")+" ui-widget-header"}}),f.defaults.themes.barebones=f.AbstractTheme.extend({getFormInputLabel:function(a){var b=this._super(a);return b},getFormInputDescription:function(a){var b=this._super(a);return b},getIndentedPanel:function(){var a=this._super();return a},getChildEditorHolder:function(){var a=this._super();return a},getHeaderButtonHolder:function(){var a=this.getButtonHolder();return a},getTable:function(){var a=this._super();return a},addInputError:function(a,b){if(a.errmsg)a.errmsg.style.display="block";else{var c=this.closest(a,".form-control");a.errmsg=document.createElement("div"),a.errmsg.setAttribute("class","errmsg"),c.appendChild(a.errmsg)}a.errmsg.innerHTML="",a.errmsg.appendChild(document.createTextNode(b))},removeInputError:function(a){a.style.borderColor="",a.errmsg&&(a.errmsg.style.display="none")},getProgressBar:function(){var a=100,b=0,c=document.createElement("progress");return c.setAttribute("max",a),c.setAttribute("value",b),c},updateProgressBar:function(a,b){a&&a.setAttribute("value",b)},updateProgressBarUnknown:function(a){a&&a.removeAttribute("value")}}),f.AbstractIconLib=a.extend({mapping:{collapse:"",expand:"","delete":"",edit:"",add:"",cancel:"",save:"",moveup:"",movedown:""},icon_prefix:"",getIconClass:function(a){return this.mapping[a]?this.icon_prefix+this.mapping[a]:null},getIcon:function(a){var b=this.getIconClass(a);if(!b)return null;var c=document.createElement("i");return c.className=b,c}}),f.defaults.iconlibs.bootstrap2=f.AbstractIconLib.extend({mapping:{collapse:"chevron-down",expand:"chevron-up","delete":"trash",edit:"pencil",add:"plus",cancel:"ban-circle",save:"ok",moveup:"arrow-up",movedown:"arrow-down"},icon_prefix:"icon-"}),f.defaults.iconlibs.bootstrap3=f.AbstractIconLib.extend({mapping:{collapse:"chevron-down",expand:"chevron-right","delete":"remove",edit:"pencil",add:"plus",cancel:"floppy-remove",save:"floppy-saved",moveup:"arrow-up",movedown:"arrow-down"},icon_prefix:"glyphicon glyphicon-"}),f.defaults.iconlibs.fontawesome3=f.AbstractIconLib.extend({mapping:{collapse:"chevron-down",expand:"chevron-right","delete":"remove",edit:"pencil",add:"plus",cancel:"ban-circle",save:"save",moveup:"arrow-up",movedown:"arrow-down"},icon_prefix:"icon-"}),f.defaults.iconlibs.fontawesome4=f.AbstractIconLib.extend({mapping:{collapse:"caret-square-o-down",expand:"caret-square-o-right","delete":"times",edit:"pencil",add:"plus",cancel:"ban",save:"save",moveup:"arrow-up",movedown:"arrow-down"},icon_prefix:"fa fa-"}),f.defaults.iconlibs.foundation2=f.AbstractIconLib.extend({mapping:{collapse:"minus",expand:"plus","delete":"remove",edit:"edit",add:"add-doc",cancel:"error",save:"checkmark",moveup:"up-arrow",movedown:"down-arrow"},icon_prefix:"foundicon-"}),f.defaults.iconlibs.foundation3=f.AbstractIconLib.extend({mapping:{collapse:"minus",expand:"plus","delete":"x",edit:"pencil",add:"page-add",cancel:"x-circle",save:"save",moveup:"arrow-up",movedown:"arrow-down"},icon_prefix:"fi-"}),f.defaults.iconlibs.jqueryui=f.AbstractIconLib.extend({mapping:{collapse:"triangle-1-s",expand:"triangle-1-e","delete":"trash",edit:"pencil",add:"plusthick",cancel:"closethick",save:"disk",moveup:"arrowthick-1-n",movedown:"arrowthick-1-s"},icon_prefix:"ui-icon ui-icon-"}),f.defaults.templates["default"]=function(){return{compile:function(a){var b=a.match(/{{\s*([a-zA-Z0-9\-_ \.]+)\s*}}/g),c=b&&b.length;
// Shortcut if the template contains no variables
if(!c)return function(){return a};for(var d=[],e=function(a){var c,e=b[a].replace(/[{}]+/g,"").trim().split("."),f=e.length;if(f>1){var g;c=function(b){for(g=b,a=0;a<f&&(g=g[e[a]],g);a++);return g}}else e=e[0],c=function(a){return a[e]};d.push({s:b[a],r:c})},f=0;f<c;f++)e(f);
// The compiled function
return function(b){var e,g=a+"";for(f=0;f<c;f++)e=d[f],g=g.replace(e.s,e.r(b));return g}}}},f.defaults.templates.ejs=function(){return!!window.EJS&&{compile:function(a){var b=new window.EJS({text:a});return function(a){return b.render(a)}}}},f.defaults.templates.handlebars=function(){return window.Handlebars},f.defaults.templates.hogan=function(){return!!window.Hogan&&{compile:function(a){var b=window.Hogan.compile(a);return function(a){return b.render(a)}}}},f.defaults.templates.markup=function(){return!(!window.Mark||!window.Mark.up)&&{compile:function(a){return function(b){return window.Mark.up(a,b)}}}},f.defaults.templates.mustache=function(){return!!window.Mustache&&{compile:function(a){return function(b){return window.Mustache.render(a,b)}}}},f.defaults.templates.swig=function(){return window.swig},f.defaults.templates.underscore=function(){return!!window._&&{compile:function(a){return function(b){return window._.template(a,b)}}}},
// Set the default theme
f.defaults.theme="html",
// Set the default template engine
f.defaults.template="default",
// Default options when initializing JSON Editor
f.defaults.options={},
// String translate function
f.defaults.translate=function(a,b){var c=f.defaults.languages[f.defaults.language];if(!c)throw"Unknown language "+f.defaults.language;var d=c[a]||f.defaults.languages[f.defaults.default_language][a];if("undefined"==typeof d)throw"Unknown translate string "+a;if(b)for(var e=0;e<b.length;e++)d=d.replace(new RegExp("\\{\\{"+e+"}}","g"),b[e]);return d},
// Translation strings and default languages
f.defaults.default_language="en",f.defaults.language=f.defaults.default_language,f.defaults.languages.en={/**
   * When a property is not set
   */
error_notset:"Property must be set",/**
   * When a string must not be empty
   */
error_notempty:"Value required",/**
   * When a value is not one of the enumerated values
   */
error_enum:"Value must be one of the enumerated values",/**
   * When a value doesn't validate any schema of a 'anyOf' combination
   */
error_anyOf:"Value must validate against at least one of the provided schemas",/**
   * When a value doesn't validate
   * @variables This key takes one variable: The number of schemas the value does not validate
   */
error_oneOf:"Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.",/**
   * When a value does not validate a 'not' schema
   */
error_not:"Value must not validate against the provided schema",/**
   * When a value does not match any of the provided types
   */
error_type_union:"Value must be one of the provided types",/**
   * When a value does not match the given type
   * @variables This key takes one variable: The type the value should be of
   */
error_type:"Value must be of type {{0}}",/**
   *  When the value validates one of the disallowed types
   */
error_disallow_union:"Value must not be one of the provided disallowed types",/**
   *  When the value validates a disallowed type
   * @variables This key takes one variable: The type the value should not be of
   */
error_disallow:"Value must not be of type {{0}}",/**
   * When a value is not a multiple of or divisible by a given number
   * @variables This key takes one variable: The number mentioned above
   */
error_multipleOf:"Value must be a multiple of {{0}}",/**
   * When a value is greater than it's supposed to be (exclusive)
   * @variables This key takes one variable: The maximum
   */
error_maximum_excl:"Value must be less than {{0}}",/**
   * When a value is greater than it's supposed to be (inclusive
   * @variables This key takes one variable: The maximum
   */
error_maximum_incl:"Value must be at most {{0}}",/**
   * When a value is lesser than it's supposed to be (exclusive)
   * @variables This key takes one variable: The minimum
   */
error_minimum_excl:"Value must be greater than {{0}}",/**
   * When a value is lesser than it's supposed to be (inclusive)
   * @variables This key takes one variable: The minimum
   */
error_minimum_incl:"Value must be at least {{0}}",/**
   * When a value have too many characters
   * @variables This key takes one variable: The maximum character count
   */
error_maxLength:"Value must be at most {{0}} characters long",/**
   * When a value does not have enough characters
   * @variables This key takes one variable: The minimum character count
   */
error_minLength:"Value must be at least {{0}} characters long",/**
   * When a value does not match a given pattern
   */
error_pattern:"Value must match the pattern {{0}}",/**
   * When an array has additional items whereas it is not supposed to
   */
error_additionalItems:"No additional items allowed in this array",/**
   * When there are to many items in an array
   * @variables This key takes one variable: The maximum item count
   */
error_maxItems:"Value must have at most {{0}} items",/**
   * When there are not enough items in an array
   * @variables This key takes one variable: The minimum item count
   */
error_minItems:"Value must have at least {{0}} items",/**
   * When an array is supposed to have unique items but has duplicates
   */
error_uniqueItems:"Array must have unique items",/**
   * When there are too many properties in an object
   * @variables This key takes one variable: The maximum property count
   */
error_maxProperties:"Object must have at most {{0}} properties",/**
   * When there are not enough properties in an object
   * @variables This key takes one variable: The minimum property count
   */
error_minProperties:"Object must have at least {{0}} properties",/**
   * When a required property is not defined
   * @variables This key takes one variable: The name of the missing property
   */
error_required:"Object is missing the required property '{{0}}'",/**
   * When there is an additional property is set whereas there should be none
   * @variables This key takes one variable: The name of the additional property
   */
error_additional_properties:"No additional properties allowed, but property {{0}} is set",/**
   * When a dependency is not resolved
   * @variables This key takes one variable: The name of the missing property for the dependency
   */
error_dependency:"Must have property {{0}}",/**
   * Text on Delete All buttons
   */
button_delete_all:"All",/**
   * Title on Delete All buttons
   */
button_delete_all_title:"Delete All",/**
    * Text on Delete Last buttons
    * @variable This key takes one variable: The title of object to delete
    */
button_delete_last:"Last {{0}}",/**
    * Title on Delete Last buttons
    * @variable This key takes one variable: The title of object to delete
    */
button_delete_last_title:"Delete Last {{0}}",/**
    * Title on Add Row buttons
    * @variable This key takes one variable: The title of object to add
    */
button_add_row_title:"Add {{0}}",/**
    * Title on Move Down buttons
    */
button_move_down_title:"Move down",/**
    * Title on Move Up buttons
    */
button_move_up_title:"Move up",/**
    * Title on Delete Row buttons
    * @variable This key takes one variable: The title of object to delete
    */
button_delete_row_title:"Delete {{0}}",/**
    * Title on Delete Row buttons, short version (no parameter with the object title)
    */
button_delete_row_title_short:"Delete",/**
    * Title on Collapse buttons
    */
button_collapse:"Collapse",/**
    * Title on Expand buttons
    */
button_expand:"Expand"},
// Miscellaneous Plugin Settings
f.plugins={ace:{theme:""},epiceditor:{},sceditor:{},select2:{},selectize:{}},
// Default per-editor options
d(f.defaults.editors,function(a,b){f.defaults.editors[a].options=b.options||{}}),
// Set the default resolvers
// Use "multiple" as a fall back for everything
f.defaults.resolvers.unshift(function(a){if("string"!=typeof a.type)return"multiple"}),
// If the type is not set but properties are defined, we can infer the type is actually object
f.defaults.resolvers.unshift(function(a){
// If the schema is a simple type
if(!a.type&&a.properties)return"object"}),
// If the type is set and it's a basic type, use the primitive editor
f.defaults.resolvers.unshift(function(a){
// If the schema is a simple type
if("string"==typeof a.type)return a.type}),
// Boolean editors
f.defaults.resolvers.unshift(function(a){if("boolean"===a.type)
// If explicitly set to 'checkbox', use that
// If explicitly set to 'checkbox', use that
return"checkbox"===a.format||a.options&&a.options.checkbox?"checkbox":f.plugins.selectize.enable?"selectize":"select"}),
// Use the multiple editor for schemas where the `type` is set to "any"
f.defaults.resolvers.unshift(function(a){
// If the schema can be of any type
if("any"===a.type)return"multiple"}),
// Editor for base64 encoded files
f.defaults.resolvers.unshift(function(a){
// If the schema can be of any type
if("string"===a.type&&a.media&&"base64"===a.media.binaryEncoding)return"base64"}),
// Editor for uploading files
f.defaults.resolvers.unshift(function(a){if("string"===a.type&&"url"===a.format&&a.options&&a.options.upload===!0&&window.FileReader)return"upload"}),
// Use the table editor for arrays with the format set to `table`
f.defaults.resolvers.unshift(function(a){
// Type `array` with format set to `table`
if("array"==a.type&&"table"==a.format)return"table"}),
// Use the `select` editor for dynamic enumSource enums
f.defaults.resolvers.unshift(function(a){if(a.enumSource)return f.plugins.selectize.enable?"selectize":"select"}),
// Use the `enum` or `select` editors for schemas with enumerated properties
f.defaults.resolvers.unshift(function(a){if(a["enum"]){if("array"===a.type||"object"===a.type)return"enum";if("number"===a.type||"integer"===a.type||"string"===a.type)return f.plugins.selectize.enable?"selectize":"select"}}),
// Specialized editors for arrays of strings
f.defaults.resolvers.unshift(function(a){if("array"===a.type&&a.items&&!Array.isArray(a.items)&&a.uniqueItems&&["string","number","integer"].indexOf(a.items.type)>=0){
// For enumerated strings, number, or integers
if(a.items["enum"])return"multiselect";if(f.plugins.selectize.enable&&"string"===a.items.type)return"arraySelectize"}}),
// Use the multiple editor for schemas with `oneOf` set
f.defaults.resolvers.unshift(function(a){
// If this schema uses `oneOf` or `anyOf`
if(a.oneOf||a.anyOf)return"multiple"}),/**
 * This is a small wrapper for using JSON Editor like a typical jQuery plugin.
 */
function(){if(window.jQuery||window.Zepto){var a=window.jQuery||window.Zepto;a.jsoneditor=f.defaults,a.fn.jsoneditor=function(a){var b=this,c=this.data("jsoneditor");if("value"===a){if(!c)throw"Must initialize jsoneditor before getting/setting the value";
// Set value
if(!(arguments.length>1))return c.getValue();c.setValue(arguments[1])}else{if("validate"===a){if(!c)throw"Must initialize jsoneditor before validating";
// Validate a specific value
// Validate a specific value
return arguments.length>1?c.validate(arguments[1]):c.validate()}"destroy"===a?c&&(c.destroy(),this.data("jsoneditor",null)):(
// Destroy first
c&&c.destroy(),
// Create editor
c=new f(this.get(0),a),this.data("jsoneditor",c),
// Setup event listeners
c.on("change",function(){b.trigger("change")}),c.on("ready",function(){b.trigger("ready")}))}return this}}}(),window.JSONEditor=f}();
//# sourceMappingURL=jsoneditor.min.js.map
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//




;
