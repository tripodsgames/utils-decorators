export type OnChangeable<T = any> = (
  target: T,
  propertyName: PropertyKey
) => void;

export interface OnChangeConfig<T, D> {
  func: (OnChangeHandler<D>) | keyof T
}

export type Changes<D> = { oldValue?: D; newValue: D; firstChange: boolean; };

export type OnChangeHandler<D> = (values: Changes<D>) => any;
