import { onChange } from './on-change';
import { Changes } from './on-change.model';

describe('onChange', () => {
  it('should verify onChange called on, when as string', () => {

    class T {
      public prop = 2;

      foo(x: number): any {
        this.prop = x;
        expect(this.prop).toBe(1);
      }

      onChange(values: Changes<number>): void {
        expect(values.oldValue).toBe(2);
        expect(values.newValue).toBe(1);
        expect(values.firstChange).toBe(true);
        expect(this.prop).toBe(1);
      }
    }

    const fooDec = onChange<T, number>({ func: 'onChange' });

    const t = new T();
    const spyFoo = jest.spyOn(T.prototype, 'foo');
    const spyOnChange = jest.spyOn(T.prototype, 'onChange');

    fooDec(t, 'prop');

    t.foo(1);
    expect(spyFoo).toBeCalledTimes(1);
    expect(spyOnChange).toBeCalledTimes(1);
  });

  it('should verify onChange called on, when as function', () => {
    const onChangeFunc = jest.fn((values: Changes<number>): void => {
      console.log('123');
      expect(values.oldValue).toBe(2);
      expect(values.newValue).toBe(1);
      expect(values.firstChange).toBe(true);
    });

    class T {
      private prop = 2;

      foo(x: number): any {
        this.prop = x;
        expect(this.prop).toBe(1);
      }
    }

    const fooDec = onChange<T, number>({ func: onChangeFunc });

    const t = new T();
    const spyFoo = jest.spyOn(T.prototype, 'foo');

    fooDec(t, 'prop');

    t.foo(1);
    expect(spyFoo).toBeCalledTimes(1);
    expect(onChangeFunc).toBeCalledTimes(1);
  });

  it('should verify onChange called only once for same value', () => {

    class T {
      public prop = 2;

      foo(x: number): any {
        this.prop = x;
        expect(this.prop).toBe(1);
      }

      onChange(values: Changes<number>): void {
        expect(values.oldValue).toBe(2);
        expect(values.newValue).toBe(1);
        expect(values.firstChange).toBe(true);
        expect(this.prop).toBe(1);
      }
    }

    const fooDec = onChange<T, number>({ func: 'onChange' });

    const t = new T();
    const spyFoo = jest.spyOn(T.prototype, 'foo');
    const spyOnChange = jest.spyOn(T.prototype, 'onChange');

    fooDec(t, 'prop');

    t.foo(1);
    t.foo(1);
    expect(spyFoo).toBeCalledTimes(2);
    expect(spyOnChange).toBeCalledTimes(1);
  });
});
