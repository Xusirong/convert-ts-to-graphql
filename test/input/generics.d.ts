interface D<T extends string> {
    d: T
}

interface E<T extends string | number = number> {
    e: T
}

interface F<T extends string> extends G<T> {
    f: number
} 

interface G<T> {
    g: T
}