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

3. The compiled JavaScript code will be generated in the same directory with the same filename but with a `.js` extension.

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

Please note that Algo is still in its early stages of development, and the conversion capabilities are limited. Use it with caution and report any bugs or issues you encounter.

## Contact

For any inquiries or support, feel free to contact the project maintainer at [naveenrameshcud@gmail.com](mailto:naveenrameshcud@gmail.com).

---

_Algo - Short for algorithm._
