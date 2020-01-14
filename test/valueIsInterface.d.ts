interface A {
    b: B<string>
}

interface B<T> {
    name: T
    age: number
}