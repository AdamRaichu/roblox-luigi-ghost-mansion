type DefinedEnum<T> = {
  [name: string]: number;
} & {
  getName(this: DefinedEnum<T>, valueOrProperty: number | T): string | undefined;
  getValue(this: DefinedEnum<T>, nameOrProperty: string | T): number | undefined;
  getProperty(this: DefinedEnum<T>, nameOrValue: string | number): T | undefined;
};

declare class Enum {
  enums: {
    Accuracy: DefinedEnum<number>;
    Detection: DefinedEnum<never>;
    [enumName: string]: DefinedEnum<unknown>;
  };
}

export = Enum;
