type K = {
    name: string
}

type L<T> = {
    t: T
}

type M = {
    k: K
    l: L<string>
}