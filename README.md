# Algo

Algo is a compiler designed to translate pseudo code written in a custom language to JavaScript. Currently, it's in its budding stage and supports limited conversion to JavaScript.

## Features

- Converts pseudo code written in `.alg` files to JavaScript.
- Simple and easy-to-understand syntax for writing pseudo code.
- Intuitive and minimalistic interface.

## Getting Started

To get started with Algo, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/algo-compiler.git
   ```

2. Install the required dependencies:

   ```bash
   npm install -g
   ```

3. Start using Algo to convert your pseudo code to JavaScript!

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

## Configuration

Algo reads configuration from a `config.lang` file in the project directory. If no config file is found, default values are used. Configuration options include:

- `Language`: The target language for conversion (e.g., JavaScript).
- `Format`: The target language format for file creation (e.g., js for JavaScript).
- `Version`: The version of the target language (optional).

## Disclaimer

**_Please note that Algo is still in its early stages of development, and the conversion capabilities are limited. There might be breaking changes in future updates. Use it with caution and report any bugs or issues you encounter._**

## Contact

For any inquiries or support, feel free to contact the project maintainer at [naveenrameshcud@gmail.com](mailto:naveenrameshcud@gmail.com).

---

_Algo - Short for algorithm._

For a detailed list of changes, see [changelog.md](changelog.md).
