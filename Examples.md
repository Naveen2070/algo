# Examples of Algorithms in Algo Syntax

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

## Examples Using Built-in Functions

### Example 1: Rounding Numbers

```alg
Start roundExample(num)
    Let roundedNum = Round(num)
    Print ("Rounded number:", roundedNum)
End

roundExample(3.7)
```

### Example 2: Finding Absolute Value

```alg
Start absoluteExample(num)
    Let absValue = Absolute value(num)
    Print ("Absolute value:", absValue)
End

absoluteExample(-5)
```

### Example 3: Calculating Exponential

```alg
Start exponentialExample(num)
    Let result = Exponential(num)
    Print ("Exponential:", result)
End

exponentialExample(2)
```

### Example 4: Finding Minimum and Maximum

```alg
Start minMaxExample(num1, num2)
    Let minValue = Minimum(num1, num2)
    Let maxValue = Maximum(num1, num2)
    Print ("Minimum:", minValue)
    Print ("Maximum:", maxValue)
End

minMaxExample(10, 20)
```

### Example 5: Power Calculation

```alg
Start powerExample(base, exponent)
    // Calculate the power of a number
    Let result = Power of(base, exponent)
    Print ("Result:", result)
End
powerExample(2, 3) // Calculate 2 to the power of 3
```

### Example 6: Square Root Calculation

```alg
Start squareRootExample(number)
    // Calculate the square root of a number
    Let result = Root(number)
    Print ("Square root:", result)
End
squareRootExample(16) // Calculate the square root of 16
```

### Example 7: Increment Operator

```alg
Start incrementExample(number)
    // Increment a number
    Increment(number)
    Print ("Incremented number:", number)
End
Let num = 5
incrementExample(num) // Increment the number 5
```

### Example 8: Decrement Operator

```alg
Start decrementExample(number)
    // Decrement a number
    Decrement(number)
    Print ("Decremented number:", number)
End
Let num = 10
decrementExample(num) // Decrement the number 10
```

# Examples Using Built-in Functions with IIFE

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

# Examples Using String Methods with IIFE

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

# Examples Using Array Methods with IIFE

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

# Example for Export and Import

Sure, here's the properly formatted example for Export and Import in `.alg` pseudo code:

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

These examples demonstrate various basic algorithms implemented in the Algo syntax. Feel free to use them as reference for your projects or learning purposes.
