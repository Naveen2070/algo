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
- [7. Example](#6-example)

## 1. Comments

Comments in the algo are denoted by double forward slashes `//`. Anything following `//` on the same line is considered a comment and is ignored by the interpreter.

```javascript
// This is a comment
```

## 2. Functions

Functions are declared using the `Start` keyword followed by the function name and parameters enclosed in parentheses. The function body is defined between `Start` and `End` keywords. **It's important to note that `End` is not just used to close a function, but also all loop and conditional statements.**

```javascript
Start functionName(param1, param2, ...)
    // Function body
End
```

## 3. Variables

Variables can be declared using the `Const` or `Let` keyword followed by the variable name and its initial value.`Const` must be initialized before using it.

```javascript
Const variableName = 10
Let anotherVariable = "Hello"
```

## 4. Control Flow

### 4.1. Conditionals

Conditional statements are defined using the `If`, `Else If`, and `Else` keywords.

```javascript
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

```javascript
While condition
    // Code block executed while condition is true
End While

For variable in range
    // Code block executed for each value in the range
End For
```

### 4.3. Switch Case

Switch case statements are defined using the `Switch to`, `When`, and `Usually` keywords.

```javascript
Switch to variable
    When condition:
        // Code block executed when condition is met
    Usually expression
End Switch
```

## 5. Printing

Output can be printed to the console using the `Print` statement.

```javascript
Print('Hello, world!');
```

## 6. Indentation

While indentation is recommended for readability, it is not mandatory in the algo. However, consistent indentation is encouraged to enhance code clarity.

## 7. Example

### Fibonacci Sequence

```javascript
Start fibonacci(n)
    Let a = 0
    Let b = 1
    Let c
    While n > 0
        Print(a)
        c = a + b
        a = b
        b = c
        n = n - 1
    End While
End
```

---

This documentation provides a basic overview of the syntax and structure of algo. Refer to specific examples or documentation for more detailed usage and features.
