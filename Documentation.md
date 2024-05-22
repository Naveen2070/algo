# Algo: The Pseudo-Language Syntax Guide

This guide outlines the syntax rules and conventions for writing code in the pseudo-language **Algo**.

## Table of Contents

- [1. Comments](#1-comments)
- [2. Functions](#2-functions)
- [3. Variables](#3-variables)
- [4. Control Flow](#4-control-flow)
  - [4.1. Conditionals](#41-conditionals)
  - [4.2. Loops](#42-loops)
  - [4.3. Switch Case](#43-switch-case)
- [5. Printing](#5-printing)
- [6. Indentation](#6-indentation)
- [7. Inbuilt Function Conversion](#7-inbuilt-function-conversion)
- [8. Immediately Invoked Function Expression (IIFE)](#8-immediately-invoked-function-expression-iife)
- [9. Exports and Imports](#9-exports-and-imports)
- [10. Algo Specific Features](#10-algo-specific-features)
  - [10.1. Link](#101-link)
- [11. Example](#11-example)

## 1. Comments

Comments in the algo are denoted by double forward slashes `//`. Anything following `//` on the same line is considered a comment and is ignored by the interpreter.

```

// This is a comment

```

## 2. Functions

Functions are declared using the `Start` keyword followed by the function name and parameters enclosed in parentheses. The function body is defined between `Start` and `End` keywords.

```

Start functionName(param1, param2, ...)
// Function body
End

```

## 3. Variables

Variables can be declared using the `Const` or `Let` keyword followed by the variable name and its initial value.

```

Const variableName = 10
Let anotherVariable = "Hello"

```

## 4. Control Flow

### 4.1. Conditionals

Conditional statements are defined using the `If`, `Else If`, and `Else` keywords.

```

If condition
// Code block executed if condition is true
Else If anotherCondition
// Code block executed if anotherCondition is true
Else
// Code block executed if no previous conditions are true
End Else

```

### 4.2. Loops

Loops can be implemented using the `While` and `For` keywords.

```

While condition
// Code block executed while condition is true
End While

For variable in range
// Code block executed for each value in the range
End For

```

### 4.3. Switch Case

Switch case statements are defined using the `Switch to`, `When`, and `Usually` keywords.

```compileToJs
Switch to variable
    When condition:
        // Code block executed when condition is met
    Usually expression
End Switch
```

## 5. Printing

Output can be printed to the console using the `Print` statement.

```
Print ('Hello, world!');
```

## 6. Indentation

While indentation is recommended for readability, it is not mandatory in the algo. However, consistent indentation is encouraged to enhance code clarity.

## 7. Inbuilt Function Conversion

Inbuilt functions can be converted to their JavaScript equivalents based on their type:

### Unary Functions:

- `Increment` -> `++`
- `Decrement` -> `--`

### Math Functions:

- `Round up` -> `Math.ceil`
- `Round down` -> `Math.floor`
- `Round` -> `Math.round`
- `Absolute value` -> `Math.abs`
- `Exponential` -> `Math.exp`
- `Natural logarithm` -> `Math.log`
- `Base 10 logarithm` -> `Math.log10`
- `Minimum` -> `Math.min`
- `Maximum` -> `Math.max`
- `Root` -> `Math.sqrt`
- `Power of` -> `Math.pow`

### String Functions:

- `To Uppercase` -> `String.toUpperCase()`
- `To Lowercase` -> `String.toLowerCase()`
- `Substring` -> `String.substring()`
- `String Length` -> `String.length`
- `Trim` -> `String.trim()`
- `Index of` -> `String.indexOf()`
- `Last Index of` -> `String.lastIndexOf()`
- `Starts with` -> `String.startsWith()`
- `Ends with` -> `String.endsWith()`
- `Replace` -> `String.replace()`
- `Split` -> `String.split()`
- `Concat` -> `String.concat()`
- `Includes` -> `String.includes()`
- `Slice` -> `String.slice()`
- `Substr` -> `String.substr()`
- `Pad Start` -> `String.padStart()`
- `Pad End` -> `String.padEnd()`
- `Repeat` -> `String.repeat()`
- `Replace All` -> `String.replaceAll()`
- `Trim Start` -> `String.trimStart()`
- `Trim End` -> `String.trimEnd()`

### Array Functions:

- `Push Last` -> `Array.push()`
- `Pop Last` -> `Array.pop()`
- `Pop First` -> `Array.shift()`
- `Push First` -> `Array.unshift()`
- `Slice` -> `Array.slice()`
- `Splice` -> `Array.splice()`
- `Concat` -> `Array.concat()`
- `Join` -> `Array.join()`
- `Reverse` -> `Array.reverse()`
- `Sort` -> `Array.sort()`
- `IndexOf` -> `Array.indexOf()`
- `Last Index Of` -> `Array.lastIndexOf()`
- `Includes` -> `Array.includes()`
- `Every` -> `Array.every()`
- `Some` -> `Array.some()`
- `Filter` -> `Array.filter()`
- `Map` -> `Array.map()`
- `ForEach` -> `Array.forEach()`
- `Reduce` -> `Array.reduce()`
- `Reduce Right` -> `Array.reduceRight()`
- `Find` -> `Array.find()`
- `Find Index` -> `Array.findIndex()`

## 8. Immediately Invoked Function Expression (IIFE)

Algo supports Immediately Invoked Function Expressions (IIFE). You can use the `Run` keyword followed by parameters to create an IIFE.

```
Run( )
    // Code block executed immediately
Ends
```

## 9. Exports and Imports

Algo supports Exports and Imports of files using `Export` and `Import` keyword.

### Exports:

```
Export param1, param2, ...
```

### Imports:

```
Import param1, param2, ... From path/to/file
```

## 10. Algo Specific Features

### 10.1. Link

The Link feature allows you to create and manage named links to values.

#### Syntax:

- **New Link:** `New Link("myLink")`
- **Set Link:** `Set Link(value, "myLink")`
- **Get Link:** `Get Link("myLink")`
- **Unlink:** `Unlink("myLink")`

## 11. Example

### Odd-Even Check

```
Start oddEven(num)
    If num % 2 == 0
        Print (num, ' is even')
    Else
        Print (num, ' is odd')
    End If
End
oddEven(8)
```

---

This documentation provides a basic overview of the syntax and structure of algo. Refer to specific [examples](Examples.md) or documentation for more detailed usage and features.
