/**
 * Debugger that can be attached to any class or object. Handles output to the javascript
 * developer console and prepends useful information, such as the class and method the 
 * debug info comes from. 
 *
 * This debugger can either be always on or check against boolean settings for output
 * For most cases, the option-based approach will be better as it allows for tighter control
 * of the output going to the console.
 * 
 * Overrides are also provided. overrideMode may be set to either "always" or "never" that allow
 * for switching between debugger modes on-the-fly
 *
 * @author Eric South <shantred@gmail.com>
 */
Debugger = function(namespace) {

    this.debugNamespace = namespace;
    this.alwaysOn     = false; // When not using options
    this.options      = {}; // Holds the individual settings for each instance of the debugger
    this.override     = false; 
    this.overrideMode = "always"; // "always" or "never"

    this.toggleOverride = function() {
        this.override = !this.override;
    }

    this.validateOverrideMode = function() {
        var validModes = ["always", "never"];
        if (validMode.indexOf(this.overrideMode) == -1) {
            throw "Debugger Exception: Override mode '" + this.overrideMode + "' is not permitted.";
        }
    }

    /**
     * Used to push options to the options object. Access of the object directly should
     * be restricted to only checking values which are known to have been set by this
     * method.
     */
    this.addOptions = function(options) {
        if (Object.keys(options).length > 0) {
            for (var prop in options) {
                this.options[prop] = options[prop];
            }
        }
    };

    /**
     * Outputs the formatted debug information to the console if all requirements are met.
     * When in alwaysOn mode, output will only not show up if override is enabled and the
     *   mode set to ignore.
     * Otherwise, it will check the options object for values. You can temporarily bypass
     *   this check by either changing the setting directly or using toggleOverride with
     *   the default mode "always" and toggling again when done. When using toggleOverride,
     *   the option parameter may be left null
     */
    this.log = function(option, method) {
        // Debugging the debugger
        //console.log("Setting: " + this.options[option] + " alwaysOn: " + this.alwaysOn + " override: " + this.override + " overrideMethod: " + this.overrideMode);
        
        // First, check if the option exists and is active
        if (!this.options.hasOwnProperty(option) && this.alwaysOn === false) {
            // Throw an exception for missing properties
            throw "Debugger Exception: Option '" + option + "' is undefined. All debugger options must be initialized before use.";
        }

        // Now check if the option is enabled
        if (this.options[option] === true || this.alwaysOn === true || (this.override === true && this.overrideMode == "always")) {
            if ((this.override === true && this.overrideMode != "never") || this.override === false) {
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

                // Finally, output all arguments to console
                console.log.apply(console, argumentsArray);
            }
        }
    }
}