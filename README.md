# Algo

Algo is a compiler designed to translate pseudo code written in a custom language to JavaScript. Currently, it's in its budding stage and supports limited conversion to JavaScript.

## Features

- Converts pseudo code written in `.alg` files to JavaScript.
- Simple and easy-to-understand syntax for writing pseudo code.
- Intuitive and minimalistic interface.

## Prerequisites

Before using Algo, ensure you have Node.js installed on your system. You can download and install Node.js from the official website: [Node.js](https://nodejs.org/)

## Getting Started

To get started with Algo, follow these steps:

For users, simply install the `algo-compiler` package via npm and start using it:

```bash
npm i algo-compiler
```

For developers,

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Naveen2070/algo-compiler.git
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start using Algo to convert your pseudo code to JavaScript!

Happy coding!

## Configuration

The algorithm reads configuration from a `config.lang` file in the project directory. If no config file is found, default values are used. Configuration options include:

- `Language`: The target language for conversion (e.g., JavaScript).
- `Format`: The target language format for file creation (e.g., js for JavaScript).
- `Version`: The version of the target language (optional).
- `OutFolder`: Specifies the output folder name for converted files.
- `EntryPoint`: Specifies the root path for converting or running files using the `run` and `convert` commands.
- `Mode`: Specifies the mode of operation (e.g., Development).

**Note:** The `EntryPoint` file must always be at the root of the project directory. This configuration option `Mode` is only for developers who clone and use the algo for development.

## Usage

1. Write your pseudo code in a `.alg` file.
2. Run the Algo compiler with the following command:

   ```bash
   algo your_file.alg
   ```

3. Follow the prompts:

   - Select the mode:
     - `Convert`: Only convert pseudo code to JavaScript.
     - `Run`: Immediately execute the code.
   - If `Convert` mode is selected, optionally provide a custom output file name.
   - If no custom output file name is provided, the default name (output.js) is used.

4. The compiled JavaScript code will be generated according to your selections.

```bash
Usage: algo [options] <file>

Options:
  -v, --version  output the version number
  -h, --help     display usage information

Commands:
  run            Compile and execute the .alg files.
  convert        Compile and convert the .alg files.
  clean          clean log and temp folders in compilers directory

Examples:
  algo your_file.alg        Compile and execute the .alg file
  algo clean                Clean log and temp folders in compilers directory
  algo --version            To get the algo version
  algo -h                   To get help
```

## Example

**Pseudo Code (example.alg):**

```
Start greet(name)
Print ("Hello, " + name + "!")
End
```

**Compiled JavaScript (example.js):**

```javascript
function greet(name) {
  console.log('Hello, ' + name + '!');
}
```

## License

Algo is licensed under the BSD 3-Clause License. See [LICENSE](LICENSE) for more details.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Documentation

For detailed syntax guidelines, refer to [Documentation.md](Documentation.md).

## Disclaimer

**_Please note that Algo is still in its early stages of development, and the conversion capabilities are limited. There might be breaking changes in future updates. Use it with caution and report any bugs or issues you encounter._**

## Contact

For any inquiries or support, feel free to contact the project maintainer at [Gmail](mailto:naveenrameshcud@gmail.com).

---

_Algo - Short for algorithm._

For a detailed list of changes, see [changelog.md](changelog.md).
