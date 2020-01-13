interface A<T extends string> {
    a: T
}

interface B<T extends string | number = number> {
    b: T
}

interface C<T extends string> extends D<T> {
    c: number
} 

interface D<T> {
    d: T
}