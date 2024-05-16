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

# Examples Using Built-in Functions and IIFE

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

These examples demonstrate various basic algorithms implemented in the Algo syntax. Feel free to use them as reference for your projects or learning purposes.
