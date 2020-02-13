interface H {
    i: I<string, number>
    j: J<I<boolean, boolean>>
}

interface I<T, K> {
    name: T
    age: K
}

interface J<I> {
    i: I
}