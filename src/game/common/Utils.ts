export const rand_i = (n: number): number => Math.floor(Math.random() * n);

export const deep_copy = <T>(source: T): T => {
    return Array.isArray(source)
    ? source.map(item => deep_copy(item))
    : source instanceof Date
    ? new Date(source.getTime())
    : source && typeof source === 'object'
          ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
             Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!);
             o[prop] = deep_copy((source as { [key: string]: any })[prop]);
             return o;
          }, Object.create(Object.getPrototypeOf(source)))
    : source as T;
}
