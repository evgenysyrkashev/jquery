module("support", { teardown: moduleTeardown });

var computedSupport = getComputedSupport( jQuery.support );

function getComputedSupport( support ) {
	var prop,
		result = {};

	for ( prop in support ) {
		if ( typeof support[ prop ] === "function" ) {
			result[ prop ] = support[ prop ]();
		} else {
			result[ prop ] = support[ prop ];
		}
	}

	return result;
}

if ( jQuery.css ) {
	testIframeWithCallback( "body background is not lost if set prior to loading jQuery (#9239)", "support/bodyBackground.html", function( color, support ) {
		expect( 2 );
		var okValue = {
			"#000000": true,
			"rgb(0, 0, 0)": true
		};
		ok( okValue[ color ], "color was not reset (" + color + ")" );

		deepEqual( jQuery.extend( {}, support ), computedSupport, "Same support properties" );
	});
}

(function() {
	var expected,
		userAgent = window.navigator.userAgent;

	if ( /chrome/i.test( userAgent ) ) {
		expected = {
			"ajax": true,
			"boxSizingReliable": true,
			"checkClone": true,
			"checkOn": true,
			"clearCloneStyle": true,
			"cors": true,
			"focusinBubbles": false,
			"noCloneChecked": true,
			"optDisabled": true,
			"optSelected": true,
			"pixelPosition": true,
			"radioValue": true,
			"reliableMarginRight": true
		};
	} else if ( /opera.*version\/12\.1/i.test( userAgent ) ) {
		expected = {
			"ajax": true,
			"boxSizingReliable": true,
			"checkClone": true,
			"checkOn": true,
			"clearCloneStyle": true,
			"cors": true,
			"focusinBubbles": false,
			"noCloneChecked": true,
			"optDisabled": true,
			"optSelected": true,
			"pixelPosition": true,
			"radioValue": false,
			"reliableMarginRight": true
		};
	} else if ( /msie 10\.0/i.test( userAgent ) ) {
		expected = {
			"ajax": true,
			"boxSizingReliable": false,
			"checkClone": true,
			"checkOn": true,
			"clearCloneStyle": false,
			"cors": true,
			"focusinBubbles": true,
			"noCloneChecked": false,
			"optDisabled": true,
			"optSelected": false,
			"pixelPosition": true,
			"radioValue": false,
			"reliableMarginRight": true
		};
	} else if ( /msie 9\.0/i.test( userAgent ) ) {
		expected = {
			"ajax": true,
			"boxSizingReliable": false,
			"checkClone": true,
			"checkOn": true,
			"clearCloneStyle": false,
			"cors": false,
			"focusinBubbles": true,
			"noCloneChecked": false,
			"optDisabled": true,
			"optSelected": false,
			"pixelPosition": true,
			"radioValue": false,
			"reliableMarginRight": true
		};
	} else if ( /6\.0\.\d+ safari/i.test( userAgent ) ) {
		expected = {
			"ajax": true,
			"boxSizingReliable": true,
			"checkClone": true,
			"checkOn": true,
			"clearCloneStyle": true,
			"cors": true,
			"focusinBubbles": false,
			"noCloneChecked": true,
			"optDisabled": true,
			"optSelected": true,
			"pixelPosition": false,
			"radioValue": true,
			"reliableMarginRight": true
		};
	} else if ( /firefox/i.test( userAgent ) ) {
		expected = {
			"ajax": true,
			"boxSizingReliable": true,
			"checkClone": true,
			"checkOn": true,
			"clearCloneStyle": true,
			"cors": true,
			"focusinBubbles": false,
			"noCloneChecked": true,
			"optDisabled": true,
			"optSelected": true,
			"pixelPosition": true,
			"radioValue": true,
			"reliableMarginRight": true
		};
	}

	if ( expected ) {
		test("Verify that the support tests resolve as expected per browser", function() {
			var i, prop,
				j = 0;

			for ( prop in computedSupport ) {
				j++;
			}

			expect( j );

			for ( i in expected ) {
				// TODO check for all modules containing support properties
				if ( jQuery.ajax || i !== "ajax" && i !== "cors" ) {
					equal( computedSupport[ i ], expected[ i ],
						"jQuery.support['" + i + "']: " + computedSupport[ i ] +
							", expected['" + i + "']: " + expected[ i ]);
				} else {
					ok( true, "no ajax; skipping jQuery.support[' " + i + " ']" );
				}
			}
		});
	}

})();

testIframeWithCallback( "Check CSP (https://developer.mozilla.org/en-US/docs/Security/CSP) restrictions",
	"support/csp.php",
	function( support ) {
		expect( 1 );
		deepEqual( jQuery.extend( {}, support ), computedSupport, "No violations of CSP polices" );
	}
);
