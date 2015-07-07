// Andrea Tino
// Initial prototype of the system

/** The exception type. */
var EvtException = function(message, innerException) {
	var _message = message;
	var _innerException = innerException;
	
	this.getMessage = function() {
		return _message;
	};
};

/**
 * The main singleton.
 * TODO: Manage dynamic tree changes. Use of observers?
 */
var Evt = function() {
	/** This class is a singleton. */
	// TODO: Implement it as singleton
	var _instance = null;

	/** Activates the EVT environment. */
	var _enabled = false;
	/** The list of events to subscribe to. TODO: Check when this gets null */
	var _events = ["click"];
	/** The attribute name for marked elements. */
	var _markedAttributeName = "data-evt-marked";
	/** The name of the member for dictionary. */
	var _dictionaryName = "__evt-dict";
	/** The name of the member to inject in events to carry info. */
	var _eventInfoCarrierName = "__evt-e";
	/** Collection result ends here. */
	var _collectResult = null;
	
	var __getId = function() {
		return (Math.random() * 0xffffff << 0).toString(16);
	};
	
	var __buildEventInfoCarrier = function() {
		var carrier = {};
		carrier.id = __getId();
		return carrier;
	};
	
	var __checkEventInfoCarrier = function(infoCarrier) {
	};
	
	/**
	 * The handler for event subscription.
	 * e: The event arguments.
	 */
	var _handler = function(e) {
		var currentTarget = e.currentTarget;
		
		// Initializing event info carrier (if needed)
		// If currentTarget is null or undefined, we perform event carrier initialization 
		// in any case
		e[_eventInfoCarrierName] = e[_eventInfoCarrierName] || __buildEventInfoCarrier();
		
		if (!currentTarget) {
			console.log("Current target null, cannot perform EVT operations!");
			return;
		}
		
		// Retrieving/initializing dictionary for this element
		currentTarget[_dictionaryName] = currentTarget[_dictionaryName] || {};
		var dictionary = currentTarget[_dictionaryName];
		
		var log = _log(e);
		// Retrieving/initializing the dictionary entry for the event
		dictionary[log.eventId] = dictionary[log.eventId] || {};
		// Setting entry
		dictionary[log.eventId][e.eventPhase] = log;
		console.log("Logged: t=" + log.time.toString() + " eid=" + log.eventId + " d=" + log.description);
	};
	
	/**
	 * Returns the object representing the log for an event entry.
	 * event: The event object.
	 */
	var _log = function(event) {
		if (!event) return null;
		
		var log = {};
		log.time = (new Date()).getTime();
		log.eventType = event.type;
		if (event[_eventInfoCarrierName]) {
			log.eventId = event[_eventInfoCarrierName].id;
		} else {
			throw new EvtException("Event carrier info not present");
		}
		log.description = "Occurred at: " + (new Date(log.time)).toUTCString();
		
		return log;
	}
	
	/**
	 * Initializes the EVT environment.
	 * TODO: Handle case where initialize was called already.
	 */
	this.initialize = function() {
		_scanTree(document.body);
	};
	
	/**
	 * Starts the EVT environment.
	 */
	this.start = function() {
		if (!_marked(document.body)) {
			throw new EvtException("Cannot start, EVT has not been initialized!");
		}
	
		_enabled = true;
	};
	
	/**
	 * Stops the EVT environment.
	 */
	this.stop = function() {
		_enabled = false;
	};
	
	/**
	 * Collects all info.
	 * If the EVT environment is enabled, it is disabled and then enabled again.
	 */
	this.collect = function() {
		var oldEnabled = _enabled;
		_enabled = false;
		
		// Resetting previous collection results
		_collectResult = {};
		
		// Collection logic
		// TODO: Add logic
		
		_enabled = oldEnabled;
	};
	
	/**
	 * Disposes the EVT environment.
	 */
	this.dispose = function() {
		// 1. Disable
		_enabled = false;
		// 2. Remove listeners
		_unscanTree(document.body);
		// 3. Remove collected data on elements
		this.cleanAll(document.body);
		// 4. Delete collected data from object
		_collectResult = null;
	};
	
	/**
	 * Sets the events to listen to.
	 */
	this.setEvents = function(value) {
		_events = value;
	};
	
	/**
	 * Gets the events we listen to.
	 */
	this.getEvents = function() {
		return _events;
	};
	
	/**
	 * Cleans all data in DOM elements.
	 */
	this.cleanAll = function(rootElement) {
		if (!rootElement) return;
		
		rootElement[_dictionaryName] = {};
		
		for (var i = 0, l = rootElement.children.length; i < l; i++) {
			this.cleanAll(rootElement.children[i]);
		}
	};
	
	/**
	 * Scans the DOM and attaches handler to all elements.
	 * rootElement: The DOM element to start from.
	 */
	var _scanTree = function(rootElement) {
		if (!rootElement) return;
	
		if (!_marked(rootElement)) {
			_attach(rootElement);
		}
		
		for (var i = 0, l = rootElement.children.length; i < l; i++) {
			_scanTree(rootElement.children[i]);
		}
	};
	
	/**
	 * Scans the DOM and detaches all handlers.
	 * rootElement: The DOM element to start from.
	 */
	var _unscanTree = function(rootElement) {
		if (!rootElement) return;
	
		if (_marked(rootElement)) {
			_detach(rootElement);
		}
		
		for (var i = 0, l = rootElement.children.length; i < l; i++) {
			_unscanTree(rootElement.children[i]);
		}
	};
	
	/**
	 * Attaches event handler.
	 * element: The element to attach the handler.
	 */
	var _attach = function(element) {
		if (!element) return;
		
		for (var i = 0, l = _events.length; i < l; i++) {
			element.addEventListener(_events[i], _handler, false); // For bubble
			element.addEventListener(_events[i], _handler, true); // For capture
		}
		_mark(element);
	};
	
	/**
	 * Detaches event handler.
	 * element: The element to detach the handler.
	 */
	var _detach = function(element) {
		if (!element) return;
		
		for (var i = 0, l = _events.length; i < l; i++) {
			element.removeEventListener(_events[i], _handler, false); // For bubble
			element.removeEventListener(_events[i], _handler, true); // For capture
		}
		_unmark(element);
	};
	
	/**
	 * Marks an element in the DOM as attached to the handler.
	 * element: The element to mark.
	 */
	var _mark = function(element) {
		if (!element) return;
		element.setAttribute(_markedAttributeName, "");
	};
	
	/**
	 * Returns a value indicating whether an element was marked or not.
	 */
	var _marked = function(element) {
		if (!element) return false;
		return element.getAttribute(_markedAttributeName) !== null;
	};
	
	/**
	 * Unmarks an element in the DOM as attached to the handler.
	 * element: The element to unmark.
	 */
	var _unmark = function(element) {
		if (!element) return;
		element.removeAttribute(_markedAttributeName);
	};
	
	//return new Evt();
	// Exporting
	/*return {
		Initialize: this.initialize,
		Start: this.start,
		Stop: this.stop,
		Collect: this.collect,
		Dispose: this.dispose
	};*/
};
