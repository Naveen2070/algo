# Change Log

## Version 1.0.0

- Added support for variables and basic arithmetic operations.

## Version 1.0.1

- Added support for `for` and `while` loops.

## Version 1.0.2

- Added support for `if`, `else`, `else if`, and `switch case` statements.
- Included example code snippets.
- Documented syntax guide.

## Version 1.0.3

- Added support for built-in functions (in testing stage; currently supports a few built-in functions).
- Added changelog.
- Updated examples.

## Version 1.0.4

- Updated built-in functions to include new functionalities.
- Improved support for Immediately Invoked Function Expressions (IIFE).
- Updated documentation accordingly.

## Version 1.0.5

- Updated built-in functions to include all string methods from JavaScript.
- Re-wrote the logic for handling built-in functions.
- Updated documentation accordingly.

## Version 1.0.6

- Updated built-in functions to include array methods from JavaScript.
- Added Algo specific feature `Link`, allowing users to store values using a reference and access them anywhere in the code.
- Now supports exporting and importing of files.
- Added `OutFolder` in config to specify the output folder name.
- Added `EntryPoint` in config.
  - Now all `.alg` files in subdirectories of the entry point will be converted.
- Added logger and temporary logic for execution and conversion.
- Added `--version` (`-v`) to check version, `--help` (`-h`) for help, and `clean` command to clean the log and temp.
- Updated documentation accordingly.

## Version 1.0.8

- Implemented Async support to enhance performance and responsiveness.
- Enhanced Link functionality to enable connection and data transfer between multiple files.
- Updated documentation to reflect the new features and usage instructions accurately.

## Version 1.0.9

- **Added support for Immutable Advanced Data Structures (ADS):**

  - Included Immutable Stack, Immutable Queue, Immutable Linked List, Immutable Map, and Immutable Set.
  - These data structures provide safe and efficient manipulation of data without altering the original structure.

- **Introduced `Use` keyword for importing core features:**

  - Users can now import essential Algo functionalities using `Use` followed by feature names separated by commas.
  - This enhances modularity and code organization by allowing selective feature imports.

- **Stabilized `Link` feature:**

  - Improved stability and performance of the `Link` feature, enabling seamless creation, assignment, retrieval, and removal of named links to values and functions across Algo programs.
  - Enhances code flexibility and reusability by facilitating dynamic referencing and data sharing.

- **Experimental Threads feature:**

  - Introduced experimental support for Threads to enhance concurrent programming capabilities.
  - Allows asynchronous execution of tasks to improve performance and responsiveness in multi-threaded environments.

- **Updated documentation:**
  - Expanded the syntax guide and examples to include Immutable ADS usage, `Use` keyword usage, advanced `Link` operations, and experimental Threads feature.
  - Ensured [Documentation](Documentation.md) reflects the latest features and provides comprehensive usage instructions.

This version introduces experimental support for Threads alongside improvements to data structures, import capabilities with `Use`, and stabilization of the `Link` feature for broader use in Algo programming.
