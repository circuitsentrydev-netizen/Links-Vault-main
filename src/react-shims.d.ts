declare namespace JSX {
  interface IntrinsicAttributes {
    key?: string | number;
  }

  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
  export function jsxDEV(type: any, props: any, key?: any, isStaticChildren?: boolean, source?: any, self?: any): any;
}

declare module 'react' {
  export interface Attributes {
    key?: string | number;
  }
  export type SetStateAction<S> = S | ((prevState: S) => S);
  export function useState<S>(initialState: S | (() => S)): [S, (value: SetStateAction<S>) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export type FormEvent<T = Element> = {
    currentTarget: T;
    target: EventTarget;
    preventDefault(): void;
  };
  export type ChangeEvent<T = Element> = {
    currentTarget: T;
    target: T;
  };
  export const Fragment: any;
  export default any;
}

declare module 'react-dom/client' {
  export function createRoot(container: Element | null): {
    render(children: any): void;
  };
}

declare module '*.css';
