interface A<T extends string > extends B<T> {
    name: string
}

interface B<T> {
    age: number
    t: T
}

interface C {
    phone: number
}