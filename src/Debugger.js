Debugger = function(namespace) {

    this.enabled = false; // This is for global debug. Should remain false for most cases
    this.debugNamespace = namespace;
    this.options = {}; // Holds the individual settings for each instance of the debugger

    this.addOptions = function(options) {
        console.log("addOptions called with the following: ", options);
        if (Object.keys(options).length > 0) {
            for (var prop in options) {
                this.options[prop] = options[prop];
            }
        }
    };

    this.log = function(option, method) {
        // First, check if the option exists and is active
        if (!this.options.hasOwnProperty(option)) {
            // Throw an exception for missing properties
            throw "Debugger Exception: Option '" + option + "' is undefined. All debugger options must be initialized before use.";
        }

        // Now check if the option is enabled
        if (this.options[option] === true || this.enabled === true) {
            // When the option is true, output all passed data via console.log
            // However, we need to get the value of all arguments and push them as an array
            var argumentsArray = [];

            // The first argument should be the class and function the message originates from
            argumentsArray.push("%c %c %c Debugger: " + "%c" + this.debugNamespace + "%c." + method + ":");

            // Add style arguments
            argumentsArray.push("font-weight: bold; font-size: 15px; background: #B3B3B3;"); // Swag fade 1
            argumentsArray.push("font-weight: bold; font-size: 15px; background: #595959;"); // Swag fade 2
            argumentsArray.push("color: #BADA55; font-weight: bold; font-size: 15px; background: #222;"); // Debugger
            argumentsArray.push("color: #00CCFF; font-weight: bold; font-size: 15px; background: #222;"); // Namespace
            argumentsArray.push("color: #FFFF66; font-weight: bold; font-size: 15px; background: #222;"); // Method

            // Now sort the rest of the arguments.
            // Start at 2 because the first 3 are known
            for (var i = 2; i < arguments.length; i++) {
                argumentsArray.push(arguments[i]);
            }

            // Finally before output, add debugger colors to the arugments array
            
            console.log.apply(console, argumentsArray);
        }
    }
}