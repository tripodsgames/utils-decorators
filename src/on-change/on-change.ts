import { isPropertyKey } from '../common/utils/utils';
import { OnChangeable, OnChangeConfig, OnChangeHandler } from './on-change.model';


export function onChange<T = any, D = any>(config: OnChangeConfig<T, D>): OnChangeable<T> {

  return (target: T, key: PropertyKey) => {
    const original = Object.getOwnPropertyDescriptor(target, key);

    let value: D | undefined;
    let firstChange = true;

    const onChangeFunc: OnChangeHandler<D> = isPropertyKey(config.func)
      ? (target[config.func] as any)
      : config.func;

    Object.defineProperty(target, key, {
      get: (): D => {
        if (original)
          return ('get' in original) ? original.get.call(this) : original.value;

        return value ?? undefined;
      },
      set(newValue: D): void {
        const oldValue = original
          ? ('get' in original)
            ? original.get.call(this)
            : original.value
          : value;

        if (oldValue === newValue)
          return;

        if (original) {
          if ('set' in original) {
            original.set.call(this, newValue);
          } else {
            original.value = newValue;
          }
        }

        value = newValue;

        onChangeFunc.call(this, { oldValue, newValue, firstChange });

        if (firstChange)
          firstChange = false;
      },
      configurable: true,
    });
  };

}
