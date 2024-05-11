Start twoPointerAlgorithm(arr)
Const left = 0
Const right = arr.length - 1
While left < right
    If arr[left] + arr[right] === target
        return [left, right]
    Else If arr[left] + arr[right] < target
        Let left = left + 1
    Else
        Let right = right - 1
    End Else
End While
return [-1, -1]
End