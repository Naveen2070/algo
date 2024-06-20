# Examples of Algorithms in Algo Syntax

## Table of Contents

- [Factorial Calculation](#1-factorial-calculation)
- [Prime Number Check](#2-prime-number-check)
- [Bubble Sort](#3-bubble-sort)
- [Fibonacci Sequence](#4-fibonacci-sequence)
- [Linear Search](#5-linear-search)
- [Binary Search](#6-binary-search)
- [Examples Using Built-in Functions](#7-examples-using-built-in-functions)
  - [Rounding Numbers](#71-rounding-numbers)
  - [Finding Absolute Value](#72-finding-absolute-value)
  - [Calculating Exponential](#73-calculating-exponential)
  - [Finding Minimum and Maximum](#74-finding-minimum-and-maximum)
  - [Power Calculation](#75-power-calculation)
  - [Square Root Calculation](#76-square-root-calculation)
  - [Increment Operator](#77-increment-operator)
  - [Decrement Operator](#78-decrement-operator)
- [Examples Using Built-in Functions with IIFE](#8-examples-using-built-in-functions-with-iife)
- [Examples Using String Methods with IIFE](#9-examples-using-string-methods-with-iife)
- [Examples Using Array Methods with IIFE](#10-examples-using-array-methods-with-iife)
- [Example for Export and Import](#11-example-for-export-and-import)
- [Example for Algo Specific Features](#12-example-for-algo-specific-features)
  - [Link](#121-link)
  - [Link Across Files](#122-link-across-files)
  - [Immutable Advanced Data Structures (ADS)](#123-immutable-advanced-data-structures-ads)
    - [Immutable Stack](#1231-immutable-stack)
    - [Immutable Queue](#1232-immutable-queue)
    - [Immutable Linked List](#1233-immutable-linked-list)
    - [Immutable Map](#1234-immutable-map)
    - [Immutable Set](#1235-immutable-set)

These examples cover a variety of algorithms and built-in functions, showcasing their implementation in the Algo syntax.

## 1. Factorial Calculation

### Algorithm

Calculate the factorial of a given number `n`.

### Code

```algo
Start factorial(n)
    If n <= 1
        Return 1
    Else
        Return n * factorial(n - 1)
    End If
End
```

## 2. Prime Number Check

### Algorithm

Check if a given number `num` is a prime number.

### Code

```algo
Start isPrime(num)
    If num <= 1
        Return false
    End If
    Let i = 2
    While i * i <= num
        If num % i == 0
            Return false
        End If
        i = i + 1
    End While
    Return true
End
```

## 3. Bubble Sort

### Algorithm

Sort an array of integers using the Bubble Sort algorithm.

### Code

```algo
Start bubbleSort(arr)
    Let n = arr.length
    For i in 0 to n - 1
        For j in 0 to n - i - 1
            If arr[j] > arr[j + 1]
                // Swap arr[j] and arr[j + 1]
                Let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            End If
        End For
    End For
    Return arr
End
```

## 4. Fibonacci Sequence

### Algorithm

Generate the Fibonacci sequence up to the `n`th term.

### Code

```algo
Start fibonacci(n)
    Let a = 0
    Let b = 1
    Let c
    While n > 0
        Print  (a)
        c = a + b
        a = b
        b = c
        n = n - 1
    End While
End
```

## 5. Linear Search

### Algorithm

Search for an element `x` in an array `arr` using linear search.

### Code

```algo
Start linearSearch(arr, x)
    Let n = arr.length
    For i in 0 to n - 1
        If arr[i] == x
            Return i
        End If
    End For
    Return -1
End
```

## 6. Binary Search

### Algorithm

Search for an element `x` in a sorted array `arr` using binary search.

### Code

```algo
Start binarySearch(arr, x)
    Let low = 0
    Let high = arr.length - 1
    While low <= high
        Let mid = low + (high - low) / 2
        If arr[mid] == x
            Return mid
        Else If arr[mid] < x
            low = mid + 1
        Else
            high = mid - 1
        End If
    End While
    Return -1
End
```

## 7. Examples Using Built-in Functions

### 7.1. Rounding Numbers

```alg
Start roundExample(num)
    Let roundedNum = Round(num)
    Print ("Rounded number:", roundedNum)
End

roundExample(3.7)
```

### 7.2. Finding Absolute Value

```alg
Start absoluteExample(num)
    Let absValue = Absolute value(num)
    Print ("Absolute value:", absValue)
End

absoluteExample(-5)
```

### 7.3. Calculating Exponential

```alg
Start exponentialExample(num)
    Let result = Exponential(num)
    Print ("Exponential:", result)
End

exponentialExample(2)
```

### 7.4. Finding Minimum and Maximum

```alg
Start minMaxExample(num1, num2)
    Let minValue = Minimum(num1, num2)
    Let maxValue = Maximum(num1, num2)
    Print ("Minimum:", minValue)
    Print ("Maximum:", maxValue)
End

minMaxExample(10, 20)
```

### 7.5. Power Calculation

```alg
Start powerExample(base, exponent)
    // Calculate the power of a number
    Let result = Power of(base, exponent)
    Print ("Result:", result)
End
powerExample(2, 3) // Calculate 2 to the power of 3
```

### 7.6. Square Root Calculation

```alg
Start squareRootExample(number)
    // Calculate the square root of a number
    Let result = Root(number)
    Print ("Square root:", result)
End
squareRootExample(16) // Calculate the square root of 16
```

### 7.7. Increment Operator

```alg
Start incrementExample(number)
    // Increment a number
    Increment(number)
    Print ("Incremented number:", number)
End
Let num = 5
incrementExample(num) // Increment the number 5
```

### 7.8. Decrement Operator

```alg
Start decrementExample(number)
    // Decrement a number
    Decrement(number)
    Print ("Decremented number:", number)
End
Let num = 10
decrementExample(num) // Decrement the number 10
```

## 8. Examples Using Built-in Functions with IIFE

```alg
Run main()
    // Test Round up
    Let num1 = 3.7
    Let roundedUp = Round up(num1)
    Print ("Rounded up:", roundedUp)

    // Test Round down
    Let num2 = 4.3
    Let roundedDown = Round down(num2)
    Print ("Rounded down:", roundedDown)

    // Test Round
    Let num3 = 3.5
    Let rounded = Round(num3)
    Print ("Rounded:", rounded)

    // Test Absolute value
    Let num4 = -10
    Let absValue = Absolute value(num4)
    Print ("Absolute value:", absValue)

    // Test Exponential
    Let num5 = 2
    Let exponential = Exponential(num5)
    Print ("Exponential:", exponential)

    // Test Natural logarithm
    Let num6 = 10
    Let naturalLog = Natural logarithm(num6)
    Print ("Natural logarithm:", naturalLog)

    // Test Base 10 logarithm
    Let num7 = 100
    Let log10 = Base 10 logarithm(num7)
    Print ("Base 10 logarithm:", log10)

    // Test Minimum
    Let min = Minimum(5, 10, 15)
    Print ("Minimum:", min)

    // Test Maximum
    Let max = Maximum(5, 10, 15)
    Print ("Maximum:", max)

    // Test Power of
    Let base = 2
    Let exponent = 3
    Let power = Power of(base, exponent)
    Print ("Power:", power)

    // Test Root
    Let num8 = 16
    Let squareRoot = Root(num8)
    Print ("Square root:", squareRoot)

    // Test Increment
    Let num9 = 5
    Increment(num9)
    Print ("Incremented num9:", num9)

    // Test Decrement
    Let num10 = 10
    Decrement(num10)
    Print ("Decremented num10:", num10)
Ends
```

## 9. Examples Using String Methods with IIFE

```alg
Run testStringMethods()
    // Test To Uppercase
    Let str1 = "hello, world!";
    Let upperStr = To Uppercase(str1);
    Print ("Uppercase:", upperStr)

    // Test To Lowercase
    Let str2 = "HELLO, WORLD!";
    Let lowerStr = To Lowercase(str2);
    Print ("Lowercase:", lowerStr)

    // Test Substring
    Let str3 = "Hello, world!";
    Let subStr = Substring(str3, 0, 5);
    Print ("Substring:", subStr)

    // Test String Length
    Let str4 = "Hello, world!";
    Let strLength = String Length(str4);
    Print ("String Length:", strLength)

    // Test Char At
    Let str5 = "Hello, world!";
    Let char = Char At(str5, 7);
    Print ("Character at index 7:", char)

    // Test Char Code At
    Let str6 = "Hello, world!";
    Let charCode = Char Code At(str6, 0);
    Print ("Character code at index 0:", charCode)

    // Test At
    Let str7 = "Hello, world!";
    Let charAtIndex = At(str7, 0);
    Print ("Character at index 0:", charAtIndex)

    // Test Index Of
    Let str8 = "Hello, world!";
    Let indexOfW = Index of(str8, "world");
    Print ("Index of 'world':", indexOfW)

    // Test Last Index Of
    Let str9 = "Hello, world! Hello again!";
    Let lastIndexOfHello = Last Index of(str9, "Hello");
    Print ("Last Index of 'Hello':", lastIndexOfHello)

    // Test Starts With
    Let str10 = "Hello, world!";
    Let startsWithHello = Starts with(str10, "Hello");
    Print ("Starts with 'Hello':", startsWithHello)

    // Test Ends With
    Let str11 = "Hello, world!";
    Let endsWithWorld = Ends with(str11, "world!");
    Print ("Ends with 'world!':", endsWithWorld)

    // Test Replace
    Let str12 = "Hello, world!";
    Let replacedStr = Replace(str12, "world", "Algo");
    Print ("Replaced String:", replacedStr)

    // Test Split
    Let str13 = "Hello, world!";
    Let splitStr = Split(str13, ", ");
    Print ("Split String:", splitStr)

    // Test Concat
    Let str14 = "Hello";
    Let str15 = ", world!";
    Let concatenatedStr = Concat(str14, str15);
    Print ("Concatenated String:", concatenatedStr)

    // Test Includes
    Let str16 = "Hello, world!";
    Let includesWorld = Includes(str16, "world");
    Print ("Includes 'world':", includesWorld)

    // Test Slice
    Let str17 = "Hello, world!";
    Let slicedStr = Slice(str17, 7, 12);
    Print ("Sliced String:", slicedStr)

    // Test Substr
    Let str18 = "Hello, world!";
    Let substrStr = Substr(str18, 7, 5);
    Print ("Substring with start index 7 and length 5:", substrStr)

    // Test Pad Start
    Let str19 = "7";
    Let paddedStr = Pad Start(str19, 5, "0");
    Print ("Padded String at the start:", paddedStr)

    // Test Pad End
    Let str20 = "7";
    Let paddedEndStr = Pad End(str20, 5, "0");
    Print ("Padded String at the end:", paddedEndStr)

    // Test Repeat
    Let str21 = "Hello";
    Let repeatedStr = Repeat(str21, 3);
    Print ("Repeated String:", repeatedStr)

    // Test Replace All
    Let str22 = "Hello, world! Hello again!";
    Let replacedAllStr = Replace All(str22, "Hello", "Hi");
    Print ("Replaced All String:", replacedAllStr)

    // Test Trim Start
    Let str23 = "   Hello, world!   ";
    Let trimmedStartStr = Trim Start(str23);
    Print ("Trimmed String at the start:", trimmedStartStr)

    // Test Trim End
    Let str24 = " Hello, world! ";
    Let trimmedEndStr = Trim End(str24);
    Print ("Trimmed String at the end:", trimmedEndStr)

    // Test Trim
    Let str25 = " Hello, world! ";
    Let trimmedStr = Trim(str25);
    Print ("Trimmed String:", trimmedStr)
Ends
```

## 10. Examples Using Array Methods with IIFE

```alg
Run exampleArrayMethods()
    // Define an array
    Let numbers = [1, 2, 3, 4, 5]

    // Push elements to the end of the array
    Push Last(numbers, 6, 7)
    Print ("Array after pushing elements to the end:", numbers)

    // Pop the last element from the array
    Pop Last(numbers)
    Print ("Array after popping the last element:", numbers)

    // Pop the first element from the array
    Pop First(numbers)
    Print ("Array after popping the first element:", numbers)

    // Push elements to the beginning of the array
    Push First(numbers, 1)
    Print ("Array after pushing elements to the beginning:", numbers)

    // Slice the array from index 1 to 3
    Let slicedArray = Slice(numbers, 1, 3)
    Print ("Sliced array:", slicedArray)

    // Splice the array to remove elements from index 2 and insert elements 7, 8
    Splice(numbers, 2, 1, 7, 8)
    Print ("Array after splicing:", numbers)

    // Concatenate arrays
    Let moreNumbers = [9, 10]
    Let concatenatedArray = Concat(numbers, moreNumbers)
    Print ("Concatenated array:", concatenatedArray)

    // Join array elements into a string using a separator
    Let joinedString = Join(numbers, ', ')
    Print ("Joined string:", joinedString)

    // Reverse the array
    Reverse(numbers)
    Print ("Reversed array:", numbers)

    // Sort the array
    Sort(numbers)
    Print ("Sorted array:", numbers)

    // Find the index of element 7 in the array
    Let index = IndexOf(numbers, 7)
    Print ("Index of 7:", index)

    // Find the last index of element 2 in the array
    Let lastIndex = Last Index Of(numbers, 2)
    Print ("Last index of 2:", lastIndex)

    // Check if the array includes element 5
    Let includesFive = Includes(numbers, 5)
    Print ("Includes 5:", includesFive)

    // Check if every element in the array is greater than 0
    Let allGreaterThanZero = Every(numbers, (num) => num > 0)
    Print ("All greater than 0:", allGreaterThanZero)

    // Check if some elements in the array are greater than 7
    Let someGreaterThanSeven = Some(numbers, (num) => num > 7)
    Print ("Some greater than 7:", someGreaterThanSeven)

    // Filter elements greater than 5 from the array
    Let filteredArray = Filter(numbers, (num) => num > 5)
    Print ("Filtered array:", filteredArray)

    // Map each element to its square
    Let squaredArray = Map(numbers, (num) => num * num)
    Print ("Squared array:", squaredArray)

    // Perform an operation on each element
    ForEach(numbers, (num) =>
    Print ("Current element:", num))

    // Reduce the array to its sum
    Let sum = Reduce(numbers, (acc, curr) => acc + curr, 0)
    Print ("Sum of elements:", sum)

    // Reduce the array from the right to its product
    Let product = Reduce Right(numbers, (acc, curr) => acc * curr, 1)
    Print ("Product of elements:", product)

    // Find the first element greater than 5
    Let firstGreaterThanFive = Find(numbers, (num) => num > 5)
    Print ("First element greater than 5:", firstGreaterThanFive)

    // Find the index of the first element greater than 5
    Let firstIndexGreaterThanFive = Find Index(numbers, (num) => num > 5)
    Print ("Index of first element greater than 5:", firstIndexGreaterThanFive)
Ends
```

## 11. Example for Export and Import

**calculator.alg:**

```alg
Start add (num1, num2)
  Return num1 + num2
End

Start subtract (num1, num2)
  Return num1 - num2
End

Start multiply (num1, num2)
  Return num1 * num2
End

Start divide (num1, num2)
  If num2 == 0
    Return "Error: Division by zero"
  Else
    Return num1 / num2
  End If
End

Export add,subtract,multiply,divide
```

**main.alg:**

```alg
Import add, subtract, multiply, divide From /calculator

Run main ()
  Let addition = add(5, 3)
  Print ("Addition result:", addition)

  Let subtraction = subtract(5, 3)
  Print ("Subtraction result:", subtraction)

  Let multiplication = multiply(5, 3)
  Print ("Multiplication result:", multiplication)

  Let division = divide(5, 3)
  Print ("Division result:", division)
Ends

```

In this example:

- The arithmetic operations (add, subtract, multiply, divide) are defined in `calculator.alg`.
- Each function is exported using the `Export` keyword.
- The `Export` statement at the end of `calculator.alg` exports all the functions.
- In `main.alg`, the arithmetic functions are imported from `calculator.alg` using the `Import` keyword.
- The imported functions are then used in the `main` function to perform calculations.

## 12. Example for Algo Specific Features

### 12.1. Link

**Linked.alg:**

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

- `Get Link("myLink")` retrieves the value associated with the link named "myLink".
- `Print(result, "output")` displays the value retrieved from the link.
- `Unlink("myLink")` removes the link named "myLink" from the link registry.
- `New Link("myLink")` creates a new link named "myLink".
- `Link To("myLink")` retrieves the link named "myLink" and assigns it to the variable `myLink`.
- `Set Link(10, "myLink")` assigns the value `10` to the link named "myLink".

This feature allows for dynamic referencing and storing of values within the Algo link registry, facilitating more complex algorithms and data manipulation.

### 12.2. Link Across Files

The Link feature can be used to create and manage values across different files. This allows for data sharing between separate code modules. Below is an example demonstrating how to create a link in one file and access it in another.

**Linked.alg**

```algo
Delay link()
    // Getting the value from the link
    const value = Sync Get Link("myLink")
    Print(value) // Output: 42

    // Unlinking
    Sync Unlink("myLink")
End
link()
```

**Main.alg**

```algo
Delay main()
    // Creating a new link
    const myLink = Sync Link To("myLink")
    Sync New Link("myLink")
    // Setting a value to the link
    Sync Set Link(42, "myLink")
End
main()
```

### Explanation

In the above example, `Main.alg` is used to create a new link named `myLink` and set its value to 42. The `Linked.alg` file then accesses this link, retrieves the value, prints it, and finally unlinks it.

1. **Main.alg**:

   - Defines an async function `main()` that creates a new link named `myLink` and sets its value to 42.
   - The `main()` function is executed to initialize the link.

2. **Linked.alg**:
   - Defines an async function `link()` that retrieves the value from `myLink`, prints it, and then unlinks it.
   - The `link()` function is executed to access and manage the link.

These examples demonstrate various basic algorithms implemented in the Algo syntax. Feel free to use them as reference for your projects or learning purposes.

### 12.3. Immutable Advanced Data Structures (ADS)

Immutable data structures (ADS) in Algo are designed to provide efficient and safe manipulation of data without modifying the original structure. These structures ensure that once created, they cannot be altered, making them particularly useful in concurrent programming and scenarios requiring predictability and safety.

**Note: To use these data structures you need import them using `Use` key from core imports. Import using `Use ADS` at the top of your code.**

Below are explanations and examples for various Immutable ADS in Algo:

### 12.3.1. Immutable Stack

An `ImmutableStack` is a Last-In-First-Out (LIFO) data structure. It allows you to push and pop elements, creating new stacks without altering the original.

**ImmutableStack.alg:**

```algo
Use ADS

Delay main()
    // Creating an empty immutable stack
    const stack = Sync New ImmutableStack()

    // Pushing elements onto the stack
    const stack1 = Sync Push ImmutableStack(stack, 1)
    const stack2 = Sync Push ImmutableStack(stack1, 2)
    const stack3 = Sync Push ImmutableStack(stack2, 3)

    // Accessing the top element
    const topElement = Sync Peek ImmutableStack(stack3)
    Print(topElement) // Output: 3

    // Popping elements from the stack
    const stackAfterPop = Sync Pop ImmutableStack(stack3)
    Print(stackAfterPop) // Output: [1, 2]

    // Checking the original stack remains unchanged
    Print(stack) // Output: []
    Print(stack3) // Output: [1, 2, 3]
End
main()
```

### 12.3.2. Immutable Queue

An `ImmutableQueue` is a First-In-First-Out (FIFO) data structure. It allows you to enqueue and dequeue elements, creating new queues without altering the original.

**ImmutableQueue.alg:**

```algo
Use ADS

Delay main()
    // Creating an empty immutable queue
    const queue = Sync New ImmutableQueue()

    // Enqueuing elements into the queue
    const queue1 = Sync Enqueue ImmutableQueue(queue, 1)
    const queue2 = Sync Enqueue ImmutableQueue(queue1, 2)
    const queue3 = Sync Enqueue ImmutableQueue(queue2, 3)

    // Accessing the front element
    const frontElement = Sync Peek ImmutableQueue(queue3)
    Print(frontElement) // Output: 1

    // Dequeuing elements from the queue
    const queueAfterDequeue = Sync Dequeue ImmutableQueue(queue3)
    Print(queueAfterDequeue) // Output: [2, 3]

    // Checking the original queue remains unchanged
    Print(queue) // Output: []
    Print(queue3) // Output: [1, 2, 3]
End
main()
```

### 12.3.3. Immutable Linked List

An `ImmutableLinkedList` is a sequential collection of elements where each element points to the next. It allows you to add and remove elements, creating new linked lists without altering the original.

**ImmutableLinkedList.alg:**

```algo
Use ADS

Delay main()
    // Creating an empty immutable linked list
    const list = Sync New ImmutableLinkedList()

    // Adding elements to the linked list
    const list1 = Sync Add ImmutableLinkedList(list, 1)
    const list2 = Sync Add ImmutableLinkedList(list1, 2)
    const list3 = Sync Add ImmutableLinkedList(list2, 3)

    // Accessing elements
    const firstElement = Sync Get ImmutableLinkedList(list3, 0)
    const secondElement = Sync Get ImmutableLinkedList(list3, 1)
    Print(firstElement) // Output: 1
    Print(secondElement) // Output: 2

    // Removing an element
    const listAfterRemove = Sync Remove ImmutableLinkedList(list3, 1)
    Print(listAfterRemove) // Output: [1, 3]

    // Checking the original list remains unchanged
    Print(list) // Output: []
    Print(list3) // Output: [1, 2, 3]
End
main()
```

### 12.3.4. Immutable Map

An `ImmutableMap` is a collection of key-value pairs. It allows you to put and get values, creating new maps without altering the original.

**ImmutableMap.alg:**

```algo
Use ADS

Delay main()
    // Creating an immutable map
    const map = Sync New ImmutableMap("key1", "value1", "key2", "value2")

    // Accessing values
    const value = Sync Get ImmutableMap(map, "key1")
    Print(value) // Output: value1

    // Attempting to modify the map (will not change the original map)
    const newMap = Sync Put ImmutableMap(map, "key3", "value3")
    Print(map)     // Output: {"key1": "value1", "key2": "value2"}
    Print(newMap)  // Output: {"key1": "value1", "key2": "value2", "key3": "value3"}

    // Removing an element
    const updatedMap = Sync Remove ImmutableMap(newMap, "key1")
    Print(updatedMap) // Output: {"key2": "value2", "key3": "value3"}

    // Checking the original map remains unchanged
    Print(map) // Output: {"key1": "value1", "key2": "value2"}
End
main()
```

### 12.3.5. Immutable Set

An `ImmutableSet` is a collection of unique values. It allows you to add and remove values, creating new sets without altering the original.

**ImmutableSet.alg:**

```algo
Use ADS

Delay main()
    // Creating an empty immutable set
    const set = Sync New ImmutableSet()

    // Adding elements to the set
    const set1 = Sync Add ImmutableSet(set, 1)
    const set2 = Sync Add ImmutableSet(set1, 2)
    const set3 = Sync Add ImmutableSet(set2, 3)
    const set4 = Sync Add ImmutableSet(set3, 1) // Duplicate, will not be added

    // Checking elements in the set
    Print(set4) // Output: [1, 2, 3]

    // Removing an element
    const setAfterRemove = Sync Remove ImmutableSet(set4, 2)
    Print(setAfterRemove) // Output: [1, 3]

    // Checking the original set remains unchanged
    Print(set) // Output: []
    Print(set4) // Output: [1, 2, 3]
End
main()
```

### Summary

These examples demonstrate the use of various immutable advanced data structures (ADS) in Algo:

- **Immutable Stack**: LIFO structure with push and pop operations.
- **Immutable Queue**: FIFO structure with enqueue and dequeue operations.
- **Immutable Linked List**: Sequential collection with add and remove operations.
- **Immutable Map**: Key-value collection with put and get operations.
- **Immutable Set**: Unique value collection with add and remove operations.

Each structure provides immutability, ensuring that the original data remains unchanged while allowing for efficient creation of new versions with modifications. This immutability guarantees thread safety, predictability, and data integrity, making these structures highly suitable for complex and concurrent programming scenarios.
