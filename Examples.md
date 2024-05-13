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
    End Else
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
        Print (a)
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
        End Else
    End While
    Return -1
End
```

---

These examples demonstrate various basic algorithms implemented in the Algo syntax. Feel free to use them as reference for your projects or learning purposes.
