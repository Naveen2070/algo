# Algo: The Pseudo-Language Syntax Guide

This guide outlines the syntax rules and conventions for writing code in the pseudo-language **Algo**.

## Table of Contents

- [1. Comments](#1-comments)
- [2. Async Functions](#2-async-functions)
- [3. Functions](#3-functions)
- [4. Variables](#4-variables)
- [5. Control Flow](#5-control-flow)
  - [5.1. Conditionals](#51-conditionals)
  - [5.2. Loops](#52-loops)
  - [5.3. Switch Case](#53-switch-case)
- [6. Printing](#6-printing)
- [7. Indentation](#7-indentation)
- [8. Inbuilt Function Conversion](#8-inbuilt-function-conversion)
  - [8.1. Unary Functions](#81-unary-functions)
  - [8.2. Math Functions](#82-math-functions)
  - [8.3. String Functions](#83-string-functions)
  - [8.4. Array Functions](#84-array-functions)
- [9. Immediately Invoked Function Expression (IIFE)](#9-immediately-invoked-function-expression-iife)
- [10. Exports and Imports](#10-exports-and-imports)
- [11. Algo Specific Features](#11-algo-specific-features)
  - [11.1. Use](#111-use)
  - [11.2. Link](#112-link)
  - [11.3. ADS (Immutable Advanced Data Structures)](#113-ads-immutable-advanced-data-structures)
    - [11.3.1. Immutable Stack](#1131-immutable-stack)
    - [11.3.2. Immutable Queue](#1132-immutable-queue)
    - [11.3.3. Immutable Linked List](#1133-immutable-linked-list)
    - [11.3.4. Immutable Map](#1134-immutable-map)
    - [11.3.5. Immutable Set](#1135-immutable-set)
- [12. Example](#12-example)

## 1. Comments

Comments in Algo are denoted by double forward slashes `//`. Anything following `//` on the same line is considered a comment and is ignored by the interpreter.

```algo
// This is a comment
```

## 2. Async Functions

Async functions are defined using the `Delay` keyword, which allows for asynchronous operations. You can wait for the result using the `Sync` keyword.

```algo
Delay main()
    const a = Sync result()
    return a
End
```

## 3. Functions

Functions are declared using the `Start` keyword followed by the function name and parameters enclosed in parentheses. The function body is defined between `Start` and `End` keywords.

```algo
Start functionName(param1, param2, ...)
// Function body
End
```

## 4. Variables

Variables can be declared using the `Const` or `Let` keyword followed by the variable name and its initial value.

```algo
Const variableName = 10
Let anotherVariable = "Hello"
```

## 5. Control Flow

### 5.1. Conditionals

Conditional statements are defined using the `If`, `Else If`, and `Else` keywords.

```algo
If condition
    // Code block executed if condition is true
Else If anotherCondition
    // Code block executed if anotherCondition is true
Else
    // Code block executed if no previous conditions are true
End Else
```

### 5.2. Loops

Loops can be implemented using the `While` and `For` keywords.

```algo
While condition
    // Code block executed while condition is true
End While

For variable in range
    // Code block executed for each value in the range
End For
```

### 5.3. Switch Case

Switch case statements are defined using the `Switch to`, `When`, and `Usually` keywords.

```algo
Switch to variable
    When condition:
        // Code block executed when condition is met
    Usually expression
End Switch
```

## 6. Printing

Output can be printed to the console using the `Print` statement.

```algo
Print('Hello, world!');
```

## 7. Indentation

While indentation is recommended for readability, it is not mandatory in Algo. However, consistent indentation is encouraged to enhance code clarity.

## 8. Inbuilt Function Conversion

Inbuilt functions can be converted to their JavaScript equivalents based on their type:

### 8.1. Unary Functions

- `Increment` -> `++`
- `Decrement` -> `--`

### 8.2. Math Functions

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

### 8.3. String Functions

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

### 8.4. Array Functions

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
- `Index Of` -> `Array.indexOf()`
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

## 9. Immediately Invoked Function Expression (IIFE)

Algo supports Immediately Invoked Function Expressions (IIFE). You can use the `Run` keyword followed by parameters to create an IIFE.

```algo
Run()
    // Code block executed immediately
Ends
```

## 10. Exports and Imports

Algo supports Exports and Imports of files using the `Export` and `Import` keywords.

### Exports

```algo
Export param1, param2, ...
```

### Imports

```algo
Import param1, param2, ... From path/to/file
```

Here's the revised section for Algo Specific Features with the additions you requested:

## 11. Algo Specific Features

### 11.1. Use

The `Use` keyword in Algo is used to import core features of the language. Multiple features can be imported using commas `,` to separate each feature.

#### Syntax

```algo
Use Feature1, Feature2, ...
```

#### Example

```algo
Use ADS, Link
```

### 11.2. Link

The Link feature in Algo allows you to create and manage named links to values and functions. Link operations are asynchronous and should be used within async functions, awaiting the results where necessary.

#### Syntax

- **New Link:** `New Link("myLink")`
- **Set Link:** `Set Link(value, "myLink")`
- **Get Link:** `Get Link("myLink")`
- **Unlink:** `Unlink("myLink")`

#### Example

```algo
Delay main()
    // Creating a new link
    Sync New Link("myLink")

    // Setting a value to the link
    Sync Set Link(42, "myLink")

    // Getting the value from the link
    const value = Sync Get Link("myLink")
    Print(value) // Output: 42

    // Unlinking
    Sync Unlink("myLink")
End
```

### 11.3. ADS (Immutable Advanced Data Structures)

Immutable data structures (ADS) in Algo provide efficient and safe manipulation of data without modifying the original structure. These structures ensure that once created, they cannot be altered, making them particularly useful in concurrent programming and scenarios requiring predictability and safety.

### 11.3.1. Immutable Stack

An `ImmutableStack` is a Last-In-First-Out (LIFO) data structure.

### 11.3.2. Immutable Queue

An `ImmutableQueue` is a First-In-First-Out (FIFO) data structure.

### 11.3.3. Immutable Linked List

An `ImmutableLinkedList` is a sequential collection of elements where each element points to the next.

### 11.3.4. Immutable Map

An `ImmutableMap` is a collection of key-value pairs.

### 11.3.5. Immutable Set

An `ImmutableSet` is a collection of unique values.

These immutable ADS allow for safe and predictable data manipulation in Algo.

## 12. Example

### Odd-Even Check

```algo
Start oddEven(num)
    If num % 2 == 0
        Print(num, ' is even')
    Else
        Print(num, ' is odd')
    End If
End
oddEven(8)
```

---

This documentation provides a basic overview of the syntax and structure of Algo, including its specific features such as importing core functionalities (`Use`), managing links (`Link`), and utilizing immutable advanced data structures (`ADS`). For more detailed usage and examples, refer to specific documentation or [examples](Examples.md) provided .
