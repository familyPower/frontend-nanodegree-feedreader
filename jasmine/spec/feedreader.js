/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$( function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe( 'RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it( 'are defined', function() {
      expect( allFeeds ).toBeDefined();
      expect( allFeeds.length ).not.toBe( 0 );
    } );

    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    function test_feed_url( feed ) {
      it( 'url exists', function() {
        expect( feed.url ).toBeDefined();
        expect( feed.url.length ).not.toBe( 0 );
      } );
    }

    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    function test_feed_name( feed ) {
      it( 'name exists', function() {
        expect( feed.name ).toBeDefined();
        expect( feed.name.length ).not.toBe( 0 );
      } );
    }

    // Loop through each feed and pass to test.
    for ( var ndx = 0; ndx < allFeeds.length; ndx++ ) {
      test_feed_url( allFeeds[ ndx ] );
      test_feed_name( allFeeds[ ndx ] );
    }
  } );


  /* TODO: Write a new test suite named "The menu" */
  describe( 'The menu', function() {

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it( "menu is hidden", function() {
      expect( $( 'body' ).hasClass( 'menu-hidden' ) ).toBe( true );
    } );

    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    var menuIcon = $( '.menu-icon-link' );
    var spyEvent;

    it( "should open menu when menu icon clicked", function() {
      spyEvent = spyOnEvent( menuIcon, 'click' );

      menuIcon.trigger( "click" );

      expect( "click" ).toHaveBeenTriggeredOn( menuIcon );
      expect( spyEvent ).toHaveBeenTriggered();

      expect( $( 'body' ).hasClass( 'menu-hidden' ) ).not.toBeTruthy();
    } );

    it( "should close menu when menu icon clicked", function() {
      spyEvent = spyOnEvent( menuIcon, 'click' );

      menuIcon.trigger( "click" );

      expect( "click" ).toHaveBeenTriggeredOn( menuIcon );
      expect( spyEvent ).toHaveBeenTriggered();

      expect( $( 'body' ).hasClass( 'menu-hidden' ) ).toBeTruthy();
    } );


    /* TODO: Write a new test suite named "Initial Entries" */
    describe( 'Initial Entries', function() {

      // run the async call before each test
      beforeEach( function( done ) {
        loadFeed( 0, function() {
          done();
        } );
      } );

      /*
       * TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      it( ".feed has at least one .entry", function() {
        expect( $( '.feed' ).children().length > 0 ).toBeTruthy();
        //      waitFor( null, null, 5000 );
      } );

    } ); //  describe



    /* TODO: Write a new test suite named "New Feed Selection" */
    describe( 'New Feed Selection', function() {

      // Make the menu visible so the menu title can be read.
      //      $( 'body' ).toggleClass( 'menu-hidden' )

      var feedName;

      // Remember the title of the current feed.
      beforeEach( function( done ) {
        feedName = $( '.header-title' ).html();

        // change the feed.
        loadFeed( 1, function() {
          done();
        } ); // loadFeed
      } ); // beforeEach

      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      it( "Menu content changes when loadFeed called", function() {
        // Each feed has a unique name. Therefor it is safe to assume
        // that if the feed title changes, then the feed has changed.
        var newFeedName = $( '.header-title' ).html();
        expect( newFeedName === feedName ).not.toBeTruthy();

      } ); // it

    } ); //   describe
  } );
}() );
